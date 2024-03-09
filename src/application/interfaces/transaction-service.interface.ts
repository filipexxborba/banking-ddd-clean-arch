import { TransactionStatus } from "../../domain/enums/transaction-status.enum";
import { CreateTransactionDTO } from "../dtos/create-transaction.dto";
import { TransactionDTO } from "../dtos/transaction.dto";

export interface TransactionServiceInterface {
   createTransaction(
      createTransactionDTO: CreateTransactionDTO
   ): Promise<TransactionDTO>;
   getAllTransactions(): Promise<TransactionDTO[]>;
   getAllTransactionsBySenderId(senderId: number): Promise<TransactionDTO[]>;
   getAllTransactionsByReceiverId(
      receiverId: number
   ): Promise<TransactionDTO[]>;
   getTransactionById(id: number): Promise<TransactionDTO | null>;
   getTransactionsByStatusAndDate(
      status: TransactionStatus,
      date: Date
   ): Promise<TransactionDTO[]>;
   saveTransaction(
      id: number,
      status: TransactionStatus
   ): Promise<TransactionDTO | null>;
}
