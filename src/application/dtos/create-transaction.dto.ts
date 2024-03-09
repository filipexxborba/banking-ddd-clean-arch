import { TransactionStatus } from "../../domain/enums/transaction-status.enum";

export interface CreateTransactionDTO {
   senderId: number;
   receiverId: number;
   amount: number;
   scheduledDate?: Date;
   status?: TransactionStatus;
   id?: number;
}
