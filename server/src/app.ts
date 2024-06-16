import config from "@config";
import { COOKIE_NAME, PROD } from "@constants";
import DI from "@database/index";
import MikroORMConfig from "@database/mikro-orm.config";
import { MikroORM } from "@mikro-orm/core";
import RedisStore from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { Ingredient } from "@entities/ingredient.entity";
import { IngredientItem } from "@entities/ingredient_item.entity";
import { Instruction } from "@entities/instruction.entity";
import { InstructionItem } from "@entities/instruction_item.entity";
import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";

import { ErrorMiddleware } from "@middlewares/error.middleware";
import {
  AuthCheckerMiddleware,
  AuthMiddleware,
} from "./middlewares/auth.middleware";

export class App {
  public app: express.Application;
  public apollo: ApolloServer;
  public redis: Redis;
  public env: string;
  public port: string | number;

  // @ts-ignore
  constructor(resolvers) {
    this.app = express();
    this.port = config.PORT;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeSession();
    this.initializeApolloServer(resolvers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      DI.orm = await MikroORM.init(MikroORMConfig);
      await DI.orm.getMigrator().up();
      DI.em = DI.orm.em.fork();

      DI.userRepository = DI.em.getRepository(User);
      DI.recipeRespository = DI.em.getRepository(Recipe);
      DI.instructionItemRepository = DI.em.getRepository(InstructionItem);
      DI.instructionRepository = DI.em.getRepository(Instruction);
      DI.ingredientItemRepository = DI.em.getRepository(IngredientItem);
      DI.ingredientRepository = DI.em.getRepository(Ingredient);
    } catch (error) {
      console.log(error);
    } finally {
      // RequestContext does not work on Node 18
      // this.app.use((_1, _2, next) => RequestContext.create(DI.orm.em, next));
    }
  }

  private initializeMiddlewares() {
    this.app.set("trust proxy", true);

    if (PROD) {
      this.app.use(
        helmet({
          crossOriginEmbedderPolicy: false,
          contentSecurityPolicy: {
            directives: {
              imgSrc: [
                `'self'`,
                "data:",
                "apollo-server-landing-page.cdn.apollographql.com",
              ],
              scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
              manifestSrc: [
                `'self'`,
                "apollo-server-landing-page.cdn.apollographql.com",
              ],
              frameSrc: [`'self'`, "sandbox.embed.apollographql.com"],
            },
          },
        })
      );
    }

    this.app.use(
      express.json({
        limit: "10mb",
      })
    );

    this.app.use(
      cors({
        origin: [config.CLIENT_BASE_URL, "https://studio.apollographql.com"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async initializeSession() {
    this.redis = new Redis(config.REDIS_URL);

    this.app.use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({ client: this.redis, disableTouch: true }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 1,
          httpOnly: true,
          secure: PROD,
          sameSite: "lax",
        },
        saveUninitialized: false,
        secret: config.SESSION_SECRET,
        resave: false,
      })
    );
  }

  // @ts-ignore
  private async initializeApolloServer(resolvers) {
    const schema = await buildSchema({
      resolvers,
      authChecker: AuthCheckerMiddleware,
      validate: true,
    });

    const apolloServer = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          includeCookies: true,
          embed: true,
        }),
      ],
    });
    await apolloServer.start();

    this.app.use(
      "/graphql",
      expressMiddleware(apolloServer, {
        context: async ({ req, res }) => {
          try {
            const user = await AuthMiddleware(req);
            return {
              req,
              res,
              user,
              redis: this.redis,
            };
          } catch (error) {
            throw new Error(error as string);
          }
        },
      })
    );
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
