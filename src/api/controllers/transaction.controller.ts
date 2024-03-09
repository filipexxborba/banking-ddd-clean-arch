import { TransactionService } from "../../application/services/transaction.service";
import express from "express";
import { CreateTransactionUseCase } from "../usecases/transactions/create-transaction.usecase";
import { GetAllTransactionsUseCase } from "../usecases/transactions/get-all-transactions.usecase";
import { GetAllTransactionsBySenderId } from "../usecases/transactions/get-all-transactions-by-senderid";
import { GetAllTransactionsByReceiverId } from "../usecases/transactions/get-all-transactions-by-receiverid";
import { GetTransactionByIdUseCase } from "../usecases/transactions/get-transaction-by-id.usecase";
import { SaveTransactionUseCase } from "../usecases/transactions/save-transaction.usecase";
import { Utils } from "../../core/api/utils";
import { AuthorizerService } from "../../application/services/authorizer.service";
import { ExternalAuthorizer } from "../../domain/entities/external-authorizer.entity";
import { AccountService } from "../../application/services/account.service";
import { TransactionStatus } from "../enums/transaction-status.enum";
const router = express.Router();

const transactionService = new TransactionService();
const accountService = new AccountService();
const authorizerService = new AuthorizerService(new ExternalAuthorizer());

const utils = new Utils();

router.post("/", async (req, res) => {
   // #swagger.tags = ['Transactions']
   // #swagger.summary = 'Create a new transaction.'
   // #swagger.description = 'Endpoint to create a new transaction.'
   /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createTransactionSchema"
                    }  
                }
            }
        } 
    */
   /* #swagger.responses[201] = {
            description: "Create Successfully with status SCHEDULED",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseCreateTransactionSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to create transaction",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */

   const {
      senderId,
      receiverId,
      amount,
      scheduledDate = new Date(),
      status = TransactionStatus.SCHEDULED,
   } = req.body;

   const senderAccount = await accountService.findAccountById(senderId);
   if (!senderAccount) {
      return res.status(400).json({ message: "Sender account not found" });
   }
   const receiverAccount = await accountService.findAccountById(receiverId);
   if (!receiverAccount) {
      return res.status(400).json({ message: "Receiver account not found" });
   }
   const createNewTransaction = new CreateTransactionUseCase(
      transactionService
   );
   try {
      const transaction = await createNewTransaction.execute({
         senderId,
         receiverId,
         amount,
         scheduledDate,
         status,
      });
      if (scheduledDate && utils.isToday(new Date(scheduledDate))) {
         const isAuthorized = await authorizerService.authorize(
            senderId,
            receiverId,
            amount
         );
         if (!isAuthorized) {
            const updatedTransaction = await transactionService.saveTransaction(
               transaction.id,
               TransactionStatus.NOT_AUTHORIZED
            );
            return res.status(200).json(updatedTransaction);
         }
         await accountService.transfer({
            senderId,
            receiverId,
            amount,
         });
         const updatedTransaction = await transactionService.saveTransaction(
            transaction.id,
            TransactionStatus.COMPLETED
         );
         return res.status(200).json(updatedTransaction);
      }
      res.status(201).json(transaction);
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

router.get("/", async (_req, res) => {
   // #swagger.tags = ['Transactions']
   // #swagger.summary = 'Get all transactions.'
   // #swagger.description = 'Endpoint to get all transactions.'
   /* #swagger.responses[200] = {
            description: "Success to get all transactions",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseGetTransactionsListSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to get transactions",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */
   const getAllTransaction = new GetAllTransactionsUseCase(transactionService);
   try {
      const transactions = await getAllTransaction.execute();
      res.status(200).json(transactions);
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

router.get("/sender/:id", async (req, res) => {
   // #swagger.tags = ['Transactions']
   // #swagger.summary = 'Get all transactions by sender id.'
   // #swagger.description = 'Endpoint to get all transactions by sender id.'
   /* #swagger.responses[200] = {
            description: "Success to get all transactions",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseGetTransactionsListSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to get transactions",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */

   const getAllTransactionsBySenderId = new GetAllTransactionsBySenderId(
      transactionService
   );
   try {
      const transactions = await getAllTransactionsBySenderId.execute(
         Number(req.params.id)
      );
      res.status(200).json(transactions);
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

router.get("/receiver/:id", async (req, res) => {
   // #swagger.tags = ['Transactions']
   // #swagger.summary = 'Get all transactions by receiver id.'
   // #swagger.description = 'Endpoint to get all transactions by receiver id.'
   /* #swagger.responses[200] = {
            description: "Success to get all transactions",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseGetTransactionsListSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to get transactions",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */
   const getAllTransactionsBySenderId = new GetAllTransactionsByReceiverId(
      transactionService
   );
   try {
      const transactions = await getAllTransactionsBySenderId.execute(
         Number(req.params.id)
      );
      res.status(200).json(transactions);
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

router.get("/:id", async (req, res) => {
   // #swagger.tags = ['Transactions']
   // #swagger.summary = 'Get transaction by id.'
   // #swagger.description = 'Endpoint to get transaction by id.'
   /* #swagger.responses[200] = {
            description: "Success to get transaction by id",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseCreateTransactionSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to get transaction by id",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */
   const getTransactionById = new GetTransactionByIdUseCase(transactionService);
   try {
      const transaction = await getTransactionById.execute(
         Number(req.params.id)
      );
      res.status(200).json(transaction);
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

router.put("/:id", async (req, res) => {
   // #swagger.tags = ['Transactions']
   // #swagger.summary = 'Update transaction status by id.'
   // #swagger.description = 'Endpoint to update transaction status by id'
   /* #swagger.responses[200] = {
            description: "Success to update transaction status",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseCreateTransactionSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to update transaction status",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */
   const { status } = req.body;
   const saveTransaction = new SaveTransactionUseCase(transactionService);
   try {
      const transaction = await saveTransaction.execute({
         id: Number(req.params.id),
         status,
      });
      res.status(200).json(transaction);
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

export default router;
