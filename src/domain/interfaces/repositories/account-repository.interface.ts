import { Account } from "../../../domain/entities/account.entity";

export interface AccountRepositoryInterface {
   createAccount: (account: Account) => Promise<Account>;
   findAccountById: (id: number) => Promise<Account | null>;
   saveAccount: (account: Account) => Promise<Account>;
}
