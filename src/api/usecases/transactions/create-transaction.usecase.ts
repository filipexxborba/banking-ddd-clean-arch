import { CreateTransactionDTO } from "../../../application/dtos/create-transaction.dto";
import { TransactionService } from "../../../application/services/transaction.service";

export class CreateTransactionUseCase {
   constructor(private readonly transactionService: TransactionService) {}

   async execute(createTransactionDTO: CreateTransactionDTO) {
      return await this.transactionService.createTransaction(
         createTransactionDTO
      );
   }
}
