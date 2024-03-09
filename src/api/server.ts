import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

// Init the express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
