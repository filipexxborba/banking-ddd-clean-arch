import { TransactionStatus } from "../../enums/transaction-status.enum";

export interface TransactionEntity {
   getId: () => number;
   getSenderId: () => number;
   getReceiverId: () => number;
   getScheduledDate: () => Date;
   getTransactionStatus: () => string;
   getAmount: () => number;
   updateTransactionStatus: (status: TransactionStatus) => void;
}
