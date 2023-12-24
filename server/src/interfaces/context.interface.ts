import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import Redis from "ioredis";

// declare module "express-session" {
//   interface SessionData {
//     userId?: string;
//   }
// }

// export type SessionRequest = Request & {
//   session?: Session & Partial<SessionData> & { userId?: string };
// };

export type MyContext = {
  req: Request & {
    session?: Session & Partial<SessionData> & { userId?: string };
  };
  res: Response;
  redis: Redis;
};
