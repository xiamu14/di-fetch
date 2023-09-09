export default {
  petStoreV2: {
    input: "https://petstore.swagger.io/v2/swagger.json",
    output: {
      mode: "tags",
      target: "./src/api/generated/spec",
      schemas: "./src/api/generated/model",
      client: "swr",
      override: {
        mutator: {
          path: "./src/api/fetch-transit.ts",
          name: "fetchTransit",
        },
      },
      clean: true,
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
};
