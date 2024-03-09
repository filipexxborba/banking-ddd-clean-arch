import { Transaction } from "../entities/transaction.entity";
import { TransactionStatus } from "../enums/transaction-status.enum";

describe("Transaction domain usecases", () => {
   it("Should be able to create a new transaction", () => {
      const sut = new Transaction(1, 2, 100, new Date("2025-01-01"));
      expect(sut.getId()).toBe(1);
      expect(sut.getTransactionStatus()).toBe(TransactionStatus.SCHEDULED);
   });
   it("Should be able to create a new transaction with a custom id and custom status", () => {
      const sut = new Transaction(
         1,
         2,
         100,
         new Date("2025-01-01"),
         TransactionStatus.COMPLETED,
         2
      );
      expect(sut.getId()).toBe(2);
      expect(sut.getTransactionStatus()).toBe(TransactionStatus.COMPLETED);
   });

   it("Should not be able to create a new transaction to the same account", () => {
      expect(() => new Transaction(1, 1, 100, new Date())).toThrow(
         "Invalid transaction"
      );
   });
   it("Should not be able to create a new transaction with invalid amount", () => {
      expect(() => new Transaction(1, 2, -200, new Date())).toThrow(
         "Invalid amount"
      );
   });
   it("Should not be able to create a new transaction with invalid date", () => {
      expect(() => new Transaction(1, 2, 100, new Date("2020-01-01"))).toThrow(
         "Invalid scheduled date"
      );
   });
   it("Should be able to update the transaction status", () => {
      const sut = new Transaction(1, 2, 100, new Date());
      sut.updateTransactionStatus(TransactionStatus.COMPLETED);
      expect(sut.getTransactionStatus()).toBe(TransactionStatus.COMPLETED);
   });
});
