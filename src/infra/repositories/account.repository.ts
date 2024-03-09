import { Account } from "../../domain/entities/account.entity";
import { AccountRepositoryInterface } from "../../domain/interfaces/repositories/account-repository.interface";
import { supabaseData } from "../data/supabase.data";

export class AccountRepository implements AccountRepositoryInterface {
   createAccount = async (account: Account) => {
      const { data: newAccount, error } = await supabaseData
         .from("Account")
         .insert({
            name: account.getName(),
            amount: account.getAmount(),
         })
         .select();

      if (error) {
         throw new Error(error.message);
      }
      const { id, name, amount } = newAccount[0];
      return new Account(name, amount, id);
   };

   findAccountById = async (id: number) => {
      const { data: account, error } = await supabaseData
         .from("Account")
         .select("*")
         .eq("id", id);

      if (account?.length === 0) return null;

      if (error) {
         throw new Error(error.message);
      }

      const { id: accountId, name, amount } = account[0];
      return new Account(name, amount, accountId);
   };

   saveAccount = async (account: Account) => {
      const { data, error } = await supabaseData
         .from("Account")
         .update({
            amount: account.getAmount(),
         })
         .eq("id", account.getId())
         .select();

      if (error) {
         throw new Error(error.message);
      }
      const { id, name, amount } = data[0];
      return new Account(id, name, amount);
   };
}
