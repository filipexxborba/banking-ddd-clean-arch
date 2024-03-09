import { Transaction } from "../../domain/entities/transaction.entity";
import { InMemoryTransactionsRepository } from "../../../tests/in-memory-transactions-repository";
import { TransactionStatus } from "../../domain/enums/transaction-status.enum";

describe("Transaction Repository Use Case", () => {
   let inMemoryTransactionsRepository: InMemoryTransactionsRepository;

   beforeEach(() => {
      inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
   });
   it("Should be able to create a new transaction", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      const sut = await inMemoryTransactionsRepository.createTransaction(
         newTransaction
      );
      expect(inMemoryTransactionsRepository.transactions.length).toBe(1);
      expect(sut.getId()).toBe(1);
   });

   it("Should be able to get all transactions", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      inMemoryTransactionsRepository.createTransaction(newTransaction);
      const sut = await inMemoryTransactionsRepository.getAllTransactions();
      expect(sut.length).toBe(1);
   });

   it("Should be able to get all transactions by sender id", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      inMemoryTransactionsRepository.createTransaction(newTransaction);
      const sut =
         await inMemoryTransactionsRepository.getAllTransactionsBySenderId(1);
      expect(sut.length).toBe(1);
   });

   it("Should be able to get all transactions by receiver id", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      inMemoryTransactionsRepository.createTransaction(newTransaction);
      const sut =
         await inMemoryTransactionsRepository.getAllTransactionsByReceiverId(2);
      expect(sut.length).toBe(1);
   });

   it("Should be able to get a transaction by id", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      inMemoryTransactionsRepository.createTransaction(newTransaction);
      const sut = await inMemoryTransactionsRepository.getTransactionById(1);
      expect(sut).toEqual(inMemoryTransactionsRepository.transactions[0]);
   });

   it("Should be able to save a transaction", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      inMemoryTransactionsRepository.createTransaction(newTransaction);
      const sut = await inMemoryTransactionsRepository.saveTransaction(
         newTransaction.getId(),
         TransactionStatus.COMPLETED
      );
      expect(sut.getTransactionStatus()).toBe(TransactionStatus.COMPLETED);
      expect(
         inMemoryTransactionsRepository.transactions[0].getTransactionStatus()
      ).toBe(TransactionStatus.COMPLETED);
   });

   it("Should not be able to save a transaction that does not exist", async () => {
      const newTransaction = new Transaction(
         1,
         2,
         100,
         new Date("2025-01-01"),
         TransactionStatus.SCHEDULED,
         999
      );
      await expect(
         inMemoryTransactionsRepository.saveTransaction(
            newTransaction.getId(),
            TransactionStatus.COMPLETED
         )
      ).rejects.toThrow("Transaction not found");
   });

   it("Should be able to update the list of transactions when saving a transaction", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      inMemoryTransactionsRepository.createTransaction(newTransaction);
      inMemoryTransactionsRepository.saveTransaction(
         newTransaction.getId(),
         TransactionStatus.COMPLETED
      );
      expect(inMemoryTransactionsRepository.transactions.length).toBe(1);
      expect(
         inMemoryTransactionsRepository.transactions[0].getTransactionStatus()
      ).toBe(TransactionStatus.COMPLETED);
   });

   it("Should be able to get transactions by status and date", async () => {
      const newTransaction = new Transaction(1, 2, 100, new Date("2025-01-01"));
      inMemoryTransactionsRepository.createTransaction(newTransaction);
      const sut =
         await inMemoryTransactionsRepository.getTransactionsByStatusAndDate(
            TransactionStatus.SCHEDULED,
            new Date("2025-01-01")
         );
      expect(sut.length).toBe(1);
   });

   it("Should not be able to create a transaction with the same sender and receiver id", async () => {
      expect(() => {
         new Transaction(1, 1, 100, new Date("2025-01-01"));
      }).toThrow("Invalid transaction");
   });

   it("Should not be able to create a transaction with a negative amount", async () => {
      expect(() => {
         new Transaction(1, 2, -100, new Date("2025-01-01"));
      }).toThrow("Invalid amount");
   });

   it("Should not be able to create a transaction with a past date", async () => {
      expect(() => {
         new Transaction(1, 2, 100, new Date("2020-01-01"));
      }).toThrow("Invalid scheduled date");
   });

   it("Should be able to return null when getting a transaction by id that does not exist", async () => {
      const sut = await inMemoryTransactionsRepository.getTransactionById(1);
      expect(sut).toBeNull();
   });
});
