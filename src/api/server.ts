import express from "express";
import accountController from "./controllers/account.controller";
import transactionController from "./controllers/transaction.controller";

import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "./swagger_output.json";

import * as dotenv from "dotenv";
dotenv.config();

// Init the express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/accounts", accountController);
app.use("/transactions", transactionController);

// Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
   console.log(
      `To access the API documentation, go to http://localhost:${PORT}/docs`
   );
});
