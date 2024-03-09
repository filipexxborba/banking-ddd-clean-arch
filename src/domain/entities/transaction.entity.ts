import { TransactionStatus } from "../enums/transaction-status.enum";
import { TransactionEntity } from "../interfaces/transaction.interface";

export class Transaction implements TransactionEntity {
   private id: number = 1;
   private senderId: number;
   private receiverId: number;
   private amount: number;
   private status: TransactionStatus = TransactionStatus.SCHEDULED;
   private scheduledDate: Date;

   constructor(
      senderId: number,
      receiverId: number,
      amount: number,
      scheduledDate: Date,
      status?: TransactionStatus,
      id?: number
   ) {
      if (senderId === receiverId) {
         throw new Error("Invalid transaction");
      }
      if (amount <= 0) {
         throw new Error("Invalid amount");
      }
      // if scheduledDate is minus one day or more from now
      if (new Date(scheduledDate).getTime() < new Date().setDate(-1)) {
         throw new Error("Invalid scheduled date");
      }

      if (id) this.id = id;
      this.senderId = senderId;
      this.receiverId = receiverId;
      this.amount = amount;
      this.scheduledDate = scheduledDate;
      if (status) this.status = status;
   }

   getId: () => number = () => this.id;
   getScheduledDate: () => Date = () => this.scheduledDate;
   getSenderId: () => number = () => this.senderId;
   getReceiverId: () => number = () => this.receiverId;
   getAmount: () => number = () => this.amount;
   getTransactionStatus: () => string = () => this.status;

   updateTransactionStatus: (status: TransactionStatus) => void = (
      status: TransactionStatus
   ) => (this.status = status);
}
