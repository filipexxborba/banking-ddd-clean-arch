import swaggerAutogen from "swagger-autogen";

const doc = {
   openapi: "3.0.0",
   info: {
      version: "v1.0.0",
      title: "Mini Bank API",
      description: "This is a simple API for a mini bank.",
   },
   tags: [
      {
         name: "Accounts",
         description: "Endpoints",
      },
      {
         name: "Transactions",
         description: "Endpoints",
      },
   ],
   paths: {
      "/accounts/": {
         post: {
            tags: ["Accounts"],
            description: "",
            responses: {
               "200": {
                  description: "Created Successfully",
                  content: {
                     "application/json": {
                        schema: {
                           $ref: "#/components/schemas/responseCreateAccountSchema",
                        },
                     },
                  },
               },
               "201": {
                  description: "Created",
               },
               "400": {
                  description: "Bad Request",
               },
            },
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/createAccountSchema",
                     },
                  },
               },
            },
         },
      },
      "/accounts/{id}": {
         get: {
            tags: ["Accounts"],
            description: "",
            parameters: [
               {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                     type: "string",
                  },
               },
            ],
            responses: {
               "200": {
                  description: "OK",
               },
               "400": {
                  description: "Bad Request",
               },
            },
         },
         put: {
            tags: ["Accounts"],
            description: "",
            parameters: [
               {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                     type: "string",
                  },
               },
            ],
            responses: {
               "200": {
                  description: "OK",
               },
               "400": {
                  description: "Bad Request",
               },
            },
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           amount: {
                              example: "any",
                           },
                        },
                     },
                  },
               },
            },
         },
      },
      "/transactions/": {
         post: {
            tags: ["Transactions"],
            description: "",
            responses: {
               "200": {
                  description: "Create Successfully with status SCHEDULED",
                  content: {
                     "application/json": {
                        schema: {
                           $ref: "#/components/schemas/responseCreateTransactionSchema",
                        },
                     },
                  },
               },
               "201": {
                  description: "Created",
               },
               "400": {
                  description: "Bad Request",
               },
            },
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/createTransactionSchema",
                     },
                  },
               },
            },
         },
         get: {
            tags: ["Transactions"],
            description: "",
            responses: {
               "200": {
                  description: "OK",
               },
               "400": {
                  description: "Bad Request",
               },
            },
         },
      },
      "/transactions/sender/{id}": {
         get: {
            tags: ["Transactions"],
            description: "",
            parameters: [
               {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                     type: "string",
                  },
               },
            ],
            responses: {
               "200": {
                  description: "OK",
               },
               "400": {
                  description: "Bad Request",
               },
            },
         },
      },
      "/transactions/receiver/{id}": {
         get: {
            tags: ["Transactions"],
            description: "",
            parameters: [
               {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                     type: "string",
                  },
               },
            ],
            responses: {
               "200": {
                  description: "OK",
               },
               "400": {
                  description: "Bad Request",
               },
            },
         },
      },
      "/transactions/{id}": {
         get: {
            tags: ["Transactions"],
            description: "",
            parameters: [
               {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                     type: "string",
                  },
               },
            ],
            responses: {
               "200": {
                  description: "OK",
               },
               "400": {
                  description: "Bad Request",
               },
            },
         },
         put: {
            tags: ["Transactions"],
            description: "",
            parameters: [
               {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: {
                     type: "string",
                  },
               },
            ],
            responses: {
               "200": {
                  description: "OK",
               },
               "400": {
                  description: "Bad Request",
               },
            },
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           status: {
                              example: "any",
                           },
                        },
                     },
                  },
               },
            },
         },
      },
   },
   components: {
      schemas: {
         createAccountSchema: {
            $name: "John Doe",
            amount: 100,
         },
         responseCreateAccountSchema: {
            id: 1,
            name: "John Doe",
            amount: 100,
         },
         responseGetAccountByIdSchema: {
            id: 1,
            name: "John Doe",
            amount: 100,
         },
         createTransactionSchema: {
            $senderId: 1,
            $receiverId: 2,
            $amount: 100,
         },
         saveAccountSchema: {
            $amount: 100,
         },
         responseSaveAccountSchema: {
            id: 1,
            name: "John Doe",
            amount: 100,
         },
         responseCreateTransactionSchema: {
            id: 1,
            senderId: 1,
            receiverId: 2,
            amount: 100,
            scheduledDate: "2022-01-01",
            status: "SCHEDULED",
         },
         responseGetTransactionsListSchema: [
            {
               id: 1,
               senderId: 1,
               receiverId: 2,
               amount: 100,
               scheduledDate: "2022-01-01",
               status: "SCHEDULED",
            },
         ],
         genericErrorResponseSchema: {
            message: "any",
         },
      },
   },
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/api/server.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
