import { TransactionStatus } from "../../domain/enums/transaction-status.enum";

export interface SaveTransactionDTO {
   id: number;
   status: TransactionStatus;
}
