import { Transaction } from "../src/domain/entities/transaction.entity";
import { TransactionStatus } from "../src/domain/enums/transaction-status.enum";
import { TransactionRepositoryInterface } from "../src/domain/interfaces/repositories/transaction-repository.interface";

export class InMemoryTransactionsRepository
   implements TransactionRepositoryInterface
{
   public transactions: Transaction[] = [];

   createTransaction = async (transaction: Transaction) => {
      this.transactions.push(transaction);
      return transaction;
   };
   getAllTransactions = async () => {
      return this.transactions;
   };
   getAllTransactionsBySenderId = async (senderId: number) => {
      return this.transactions.filter(
         (transaction) => transaction.getSenderId() === senderId
      );
   };
   getAllTransactionsByReceiverId = async (receiverId: number) => {
      return this.transactions.filter((transaction) => {
         return transaction.getReceiverId() === receiverId;
      });
   };
   getTransactionById = async (id: number) => {
      return (
         this.transactions.find((transaction) => transaction.getId() === id) ??
         null
      );
   };
   saveTransaction = async (
      transactionId: number,
      status: TransactionStatus
   ) => {
      const currentTransaction = this.transactions.find(
         (transaction) => transaction.getId() === transactionId
      );
      if (!currentTransaction) {
         throw new Error("Transaction not found");
      }

      currentTransaction.updateTransactionStatus(status);

      this.transactions.map((transactionItem) => {
         if (transactionItem.getId() === transactionId) {
            return currentTransaction;
         }
         return transactionItem;
      });

      return currentTransaction;
   };

   getTransactionsByStatusAndDate = async (
      status: TransactionStatus,
      date: Date
   ) => {
      const dateString = date.toISOString().split("T")[0];
      return this.transactions.filter(
         (transaction) =>
            transaction.getTransactionStatus() === status &&
            transaction.getScheduledDate().toISOString().split("T")[0] ===
               dateString
      );
   };
}
