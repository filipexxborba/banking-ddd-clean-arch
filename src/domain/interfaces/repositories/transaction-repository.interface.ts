import { Transaction } from "../../entities/transaction.entity";
import { TransactionStatus } from "../../enums/transaction-status.enum";

export interface TransactionRepositoryInterface {
   createTransaction: (transaction: Transaction) => Promise<Transaction>;
   getAllTransactions: () => Promise<Transaction[]>;
   getAllTransactionsBySenderId: (senderId: number) => Promise<Transaction[]>;
   getAllTransactionsByReceiverId: (
      receiverId: number
   ) => Promise<Transaction[]>;
   getTransactionById: (id: number) => Promise<Transaction | null>;
   saveTransaction: (
      transactionId: number,
      status: TransactionStatus
   ) => Promise<Transaction>;
   getTransactionsByStatusAndDate: (
      status: TransactionStatus,
      date: Date
   ) => Promise<Transaction[]>;
}
