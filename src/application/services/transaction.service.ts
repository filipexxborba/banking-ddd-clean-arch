import { TransactionStatus } from "../../domain/enums/transaction-status.enum";
import { Transaction } from "../../domain/entities/transaction.entity";
import { TransactionRepositoryInterface } from "../../domain/interfaces/repositories/transaction-repository.interface";
import { CreateTransactionDTO } from "../dtos/create-transaction.dto";
import { TransactionRepository } from "../../infra/repositories/transaction.repository";
import { TransactionDTO } from "../dtos/transaction.dto";
import { TransactionServiceInterface } from "../interfaces/transaction-service.interface";

export class TransactionService implements TransactionServiceInterface {
   private readonly transactionRepository: TransactionRepositoryInterface;

   constructor(transactionRepository?: TransactionRepositoryInterface) {
      if (transactionRepository)
         this.transactionRepository = transactionRepository;
      else this.transactionRepository = new TransactionRepository();
   }

   async createTransaction(
      createTransactionDTO: CreateTransactionDTO
   ): Promise<TransactionDTO> {
      const {
         senderId,
         receiverId,
         amount,
         scheduledDate,
         status,
         id = 1,
      } = createTransactionDTO;

      const transaction = new Transaction(
         senderId,
         receiverId,
         amount,
         scheduledDate ?? new Date(),
         status,
         id
      );

      const createdTransaction =
         await this.transactionRepository.createTransaction(transaction);

      return {
         id: createdTransaction.getId(),
         senderId: createdTransaction.getSenderId(),
         receiverId: createdTransaction.getReceiverId(),
         amount: createdTransaction.getAmount(),
         status: createdTransaction.getTransactionStatus(),
         scheduledDate: createdTransaction.getScheduledDate(),
      };
   }

   async getAllTransactions(): Promise<TransactionDTO[]> {
      const transactionsList =
         await this.transactionRepository.getAllTransactions();
      return transactionsList.map((transaction) => {
         return {
            id: transaction.getId(),
            senderId: transaction.getSenderId(),
            receiverId: transaction.getReceiverId(),
            amount: transaction.getAmount(),
            status: transaction.getTransactionStatus(),
            scheduledDate: transaction.getScheduledDate(),
         };
      });
   }

   async getAllTransactionsBySenderId(
      senderId: number
   ): Promise<TransactionDTO[]> {
      const transactionsList =
         await this.transactionRepository.getAllTransactionsBySenderId(
            senderId
         );

      return transactionsList.map((transaction) => {
         return {
            id: transaction.getId(),
            senderId: transaction.getSenderId(),
            receiverId: transaction.getReceiverId(),
            amount: transaction.getAmount(),
            status: transaction.getTransactionStatus(),
            scheduledDate: transaction.getScheduledDate(),
         };
      });
   }

   async getAllTransactionsByReceiverId(
      receiverId: number
   ): Promise<TransactionDTO[]> {
      const transactionsList =
         await this.transactionRepository.getAllTransactionsByReceiverId(
            receiverId
         );

      return transactionsList.map((transaction) => {
         return {
            id: transaction.getId(),
            senderId: transaction.getSenderId(),
            receiverId: transaction.getReceiverId(),
            amount: transaction.getAmount(),
            status: transaction.getTransactionStatus(),
            scheduledDate: transaction.getScheduledDate(),
         };
      });
   }

   async getTransactionById(id: number): Promise<TransactionDTO | null> {
      const transaction = await this.transactionRepository.getTransactionById(
         id
      );
      if (!transaction) return null;
      return {
         id: transaction.getId(),
         senderId: transaction.getSenderId(),
         receiverId: transaction.getReceiverId(),
         amount: transaction.getAmount(),
         status: transaction.getTransactionStatus(),
         scheduledDate: transaction.getScheduledDate(),
      };
   }

   async getTransactionsByStatusAndDate(
      status: TransactionStatus,
      date: Date
   ): Promise<TransactionDTO[]> {
      const transactionsList =
         await this.transactionRepository.getTransactionsByStatusAndDate(
            status,
            date
         );

      return transactionsList.map((transaction) => {
         return {
            id: transaction.getId(),
            senderId: transaction.getSenderId(),
            receiverId: transaction.getReceiverId(),
            amount: transaction.getAmount(),
            status: transaction.getTransactionStatus(),
            scheduledDate: transaction.getScheduledDate(),
         };
      });
   }

   async saveTransaction(
      transactionId: number,
      status: TransactionStatus
   ): Promise<TransactionDTO> {
      const savedTransaction = await this.transactionRepository.saveTransaction(
         transactionId,
         status
      );
      return {
         id: savedTransaction.getId(),
         senderId: savedTransaction.getSenderId(),
         receiverId: savedTransaction.getReceiverId(),
         amount: savedTransaction.getAmount(),
         status: savedTransaction.getTransactionStatus(),
         scheduledDate: savedTransaction.getScheduledDate(),
      };
   }
}
