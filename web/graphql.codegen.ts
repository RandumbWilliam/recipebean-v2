// codegen.ts
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    // generate types.ts
    "src/graphql/types.ts": { plugins: ["typescript"] },
    // generate operations.ts
    "src/graphql/operations.ts": {
      preset: "import-types",
      plugins: ["typescript-operations", "typescript-urql"],
      presetConfig: {
        typesPath: "./types",
      },
      config: {
        withHooks: false,
      },
    },
    "src/graphql/hooks.ts": {
      plugins: ["typescript-urql"],
      config: {
        withHooks: true,
        importOperationTypesFrom: "Operations",
        documentMode: "external",
        importDocumentNodeExternallyFrom: "./operations.tsx",
      },
    },
  },
};

export default config;
