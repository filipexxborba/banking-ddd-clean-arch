import { TransactionService } from "../../../application/services/transaction.service";

export class GetTransactionByIdUseCase {
   constructor(private readonly transactionService: TransactionService) {}

   async execute(receiverId: number) {
      return await this.transactionService.getTransactionById(receiverId);
   }
}
