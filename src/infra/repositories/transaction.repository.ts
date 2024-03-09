import { Transaction } from "../../domain/entities/transaction.entity";
import { TransactionRepositoryInterface } from "../../domain/interfaces/repositories/transaction-repository.interface";
import { supabaseData } from "../data/supabase/supabase.data";
import { TransactionStatus } from "../../domain/enums/transaction-status.enum";

export class TransactionRepository implements TransactionRepositoryInterface {
   createTransaction = async (transaction: Transaction) => {
      const { data: newTransaction, error } = await supabaseData
         .from("Transactions")
         .insert({
            sender_id: transaction.getSenderId(),
            receiver_id: transaction.getReceiverId(),
            amount: transaction.getAmount(),
            scheduled_date: transaction.getScheduledDate(),
            status: transaction.getTransactionStatus(),
         })
         .select();

      if (error) {
         throw new Error(error.message);
      }
      return new Transaction(
         newTransaction[0].sender_id,
         newTransaction[0].receiver_id,
         newTransaction[0].amount,
         newTransaction[0].scheduled_date,
         newTransaction[0].status,
         newTransaction[0].id
      );
   };

   getAllTransactions: () => Promise<Transaction[]> = async () => {
      const { data, error } = await supabaseData
         .from("Transactions")
         .select("*");

      if (error) {
         throw new Error(error.message);
      }
      const tempList: Transaction[] = [];
      data.map((transaction) => {
         const newTransaction = new Transaction(
            transaction.sender_id,
            transaction.receiver_id,
            transaction.amount,
            transaction.scheduled_date,
            transaction.status,
            transaction.id
         );
         tempList.push(newTransaction);
      });
      return tempList;
   };
   getAllTransactionsBySenderId: (senderId: number) => Promise<Transaction[]> =
      async (senderId: number) => {
         const { data, error } = await supabaseData
            .from("Transactions")
            .select("*")
            .eq("sender_id", senderId);
         if (error) {
            throw new Error(error.message);
         }
         return data.map((transaction: any) => {
            return new Transaction(
               transaction.sender_id,
               transaction.receiver_id,
               transaction.amount,
               transaction.scheduled_date,
               transaction.status,
               transaction.id
            );
         });
      };
   getAllTransactionsByReceiverId: (
      receiverId: number
   ) => Promise<Transaction[]> = async (receiverId: number) => {
      const { data, error } = await supabaseData
         .from("Transactions")
         .select("*")
         .eq("receiver_id", receiverId);
      if (error) {
         throw new Error(error.message);
      }
      return data.map((transaction: any) => {
         return new Transaction(
            transaction.sender_id,
            transaction.receiver_id,
            transaction.amount,
            transaction.scheduled_date,
            transaction.status,
            transaction.id
         );
      });
   };
   getTransactionById: (id: number) => Promise<Transaction | null> = async (
      id: number
   ) => {
      const { data, error } = await supabaseData
         .from("Transactions")
         .select("*")
         .eq("id", id);
      if (error) {
         throw new Error(error.message);
      }
      if (data.length === 0) {
         return null;
      }
      const transaction = data[0];
      return new Transaction(
         transaction.sender_id,
         transaction.receiver_id,
         transaction.amount,
         transaction.scheduled_date,
         transaction.status,
         transaction.id
      );
   };
   saveTransaction = async (
      transactionId: number,
      status: TransactionStatus
   ) => {
      const { data, error } = await supabaseData
         .from("Transactions")
         .update({
            status: status,
         })
         .eq("id", transactionId)
         .select();
      if (error) {
         throw new Error(error.message);
      }
      const {
         id: currentId,
         sender_id: senderId,
         receiver_id: receiverId,
         amount,
         scheduled_date: scheduledDate,
         status: newStatus,
      } = data[0];
      return new Transaction(
         senderId,
         receiverId,
         amount,
         scheduledDate,
         newStatus,
         currentId
      );
   };
   getTransactionsByStatusAndDate = async (
      status: TransactionStatus,
      date: Date
   ) => {
      const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const { data, error } = await supabaseData
         .from("Transactions")
         .select("*")
         .eq("status", status)
         .eq("scheduled_date", dateString);
      if (error) {
         throw new Error(error.message);
      }
      return data.map((transaction) => {
         return new Transaction(
            transaction.id,
            transaction.sender_id,
            transaction.receiver_id,
            transaction.amount,
            transaction.scheduled_date
         );
      });
   };
}
