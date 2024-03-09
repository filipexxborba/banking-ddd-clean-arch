import { TransactionStatus } from "../../domain/enums/transaction-status.enum";
import { InMemoryTransactionsRepository } from "../../../tests/in-memory-transactions-repository";
import { TransactionRepositoryInterface } from "../../domain/interfaces/repositories/transaction-repository.interface";
import { TransactionService } from "../services/transaction.service";
import { TransactionServiceInterface } from "../interfaces/transaction-service.interface";

describe("Transaction Service Use Case", () => {
   let transactionService: TransactionServiceInterface;
   let transactionRepository: TransactionRepositoryInterface;

   beforeEach(() => {
      transactionRepository = new InMemoryTransactionsRepository();
      transactionService = new TransactionService(transactionRepository);
   });

   it("Should be able to create a new transaction with a scheduled date", async () => {
      const transaction = await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
         scheduledDate: new Date("2025-05-01"),
      });
      expect(transaction.id).toBe(1);
      expect(transaction.status).toBe("SCHEDULED");
   });

   it("Should be able to create a new transaction with custom id", async () => {
      const transaction = await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
         id: 10,
      });
      expect(transaction.id).toBe(10);
   });

   it("Should be able to throw an error if sender and receiver are the same", async () => {
      try {
         await transactionService.createTransaction({
            senderId: 1,
            receiverId: 1,
            amount: 100,
         });
      } catch (error) {
         expect((error as Error).message).toBe("Invalid transaction");
      }
   });

   it("Should be able to throw an error if amount is invalid", async () => {
      try {
         await transactionService.createTransaction({
            senderId: 1,
            receiverId: 2,
            amount: 0,
         });
      } catch (error) {
         expect((error as Error).message).toBe("Invalid amount");
      }
   });

   it("Should be able to throw an error if scheduled date is invalid", async () => {
      try {
         await transactionService.createTransaction({
            senderId: 1,
            receiverId: 2,
            amount: 100,
            scheduledDate: new Date("2020-05-01"),
         });
      } catch (error) {
         expect((error as Error).message).toBe("Invalid scheduled date");
      }
   });

   it("Should be able to create a new transaction with a default scheduled date", async () => {
      const transaction = await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      expect(transaction.id).toBe(1);
      expect(transaction.status).toBe("SCHEDULED");
   });

   it("Should be able to create a new transaction with a status", async () => {
      const transaction = await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
         status: TransactionStatus.SCHEDULED,
      });
      expect(transaction.id).toBe(1);
      expect(transaction.status).toBe("SCHEDULED");
   });

   it("Should be able to get all transactions", async () => {
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      const transactions = await transactionService.getAllTransactions();
      expect(transactions.length).toBe(2);
   });

   it("Should be able to get all transactions by sender id", async () => {
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      const transactions =
         await transactionService.getAllTransactionsBySenderId(1);
      expect(transactions.length).toBe(2);
   });

   it("Should be able to get all transactions by receiver id", async () => {
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      const transactions =
         await transactionService.getAllTransactionsByReceiverId(2);
      expect(transactions.length).toBe(2);
   });

   it("Should be able to get a transaction by id", async () => {
      const transaction = await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      const seatchedTransaction = await transactionService.getTransactionById(
         transaction.id
      );
      expect(seatchedTransaction?.id).toBe(1);
   });

   it("should be able to get null if transaction does not exist", async () => {
      const seatchedTransaction = await transactionService.getTransactionById(
         1
      );
      expect(seatchedTransaction).toBe(null);
   });

   it("Should be able to get a transaction by status and date", async () => {
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 50,
         scheduledDate: new Date("2025-05-01"),
         status: TransactionStatus.SCHEDULED,
      });
      await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 50,
         scheduledDate: new Date("2025-05-01"),
         status: TransactionStatus.SCHEDULED,
      });
      const transactions =
         await transactionService.getTransactionsByStatusAndDate(
            TransactionStatus.SCHEDULED,
            new Date("2025-05-01")
         );
      expect(transactions.length).toBe(2);
   });

   it("Should be able to save a transaction", async () => {
      const transaction = await transactionService.createTransaction({
         senderId: 1,
         receiverId: 2,
         amount: 100,
      });
      const updatedTransaction = await transactionService.saveTransaction(
         transaction.id,
         TransactionStatus.COMPLETED
      );
      expect(updatedTransaction?.status).toBe("COMPLETED");
   });

   it("Should be able to throw an error if transaction does not exist", async () => {
      try {
         await transactionService.saveTransaction(
            1,
            TransactionStatus.COMPLETED
         );
      } catch (error) {
         expect((error as Error).message).toBe("Transaction not found");
      }
   });
});
