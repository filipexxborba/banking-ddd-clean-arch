import { AccountDTO } from "../dtos/account.dto";
import { CreateAccountDTO } from "../dtos/create-account.dto";
import { TransferAccountDTO } from "../dtos/transfer-account.dto";
import { TransferDTO } from "../dtos/transfer.dto";

export interface AccountServiceInterface {
   createAccount(createAccountDTO: CreateAccountDTO): Promise<AccountDTO>;
   findAccountById(id: number): Promise<AccountDTO | null>;
   transfer(transferAccountDTO: TransferAccountDTO): Promise<TransferDTO>;
}
