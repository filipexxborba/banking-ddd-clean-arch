import swaggerAutogen from "swagger-autogen";
import * as dotenv from "dotenv";
dotenv.config();

const doc = {
   openapi: "3.0.0",
   info: {
      version: "v1.0.0",
      title: "Mini Bank API",
      description: "This is a simple API for a mini bank.",
   },
   host: `localhost:${process.env.PORT || 3000}`,
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
