import { AccountRepositoryInterface } from "../src/domain/interfaces/repositories/account-repository.interface";
import { Account } from "../src/domain/entities/account.entity";

export class InMemoryAccountsRepository implements AccountRepositoryInterface {
   public accounts: Account[] = [];

   createAccount = async (account: Account) => {
      this.accounts.push(account);
      return account;
   };

   findAccountById = async (id: number) => {
      return this.accounts.find((account) => account.getId() === id) ?? null;
   };

   saveAccount = async (account: Account) => {
      const index = this.accounts.findIndex(
         (a) => a.getId() === account.getId()
      );
      this.accounts[index] = account;
      return account;
   };
}
