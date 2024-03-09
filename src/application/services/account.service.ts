import { CreateAccountDTO } from "../dtos/create-account.dto";
import { Account } from "../../domain/entities/account.entity";
import { TransferAccountDTO } from "../dtos/transfer-account.dto";
import { AccountRepositoryInterface } from "../../domain/interfaces/repositories/account-repository.interface";
import { AccountRepository } from "../../infra/repositories/account.repository";
import { AccountDTO } from "../dtos/account.dto";
import { TransferDTO } from "../dtos/transfer.dto";
import { AccountServiceInterface } from "../interfaces/account-service.interface";

export class AccountService implements AccountServiceInterface {
   private readonly accountRepository: AccountRepositoryInterface;

   constructor(accountRepository?: AccountRepositoryInterface) {
      if (accountRepository) this.accountRepository = accountRepository;
      else this.accountRepository = new AccountRepository();
   }

   async createAccount(
      createAccountDTO: CreateAccountDTO
   ): Promise<AccountDTO> {
      const account = new Account(
         createAccountDTO.name,
         createAccountDTO.amount,
         createAccountDTO.id
      );
      const newAccount = await this.accountRepository.createAccount(account);
      return {
         id: newAccount.getId(),
         name: newAccount.getName(),
         amount: newAccount.getAmount(),
      };
   }

   async findAccountById(id: number): Promise<AccountDTO | null> {
      const account = await this.accountRepository.findAccountById(id);
      if (!account) return null;
      return {
         id: account.getId(),
         name: account.getName(),
         amount: account.getAmount(),
      };
   }

   async transfer(
      transferAccountDTO: TransferAccountDTO
   ): Promise<TransferDTO> {
      const senderAccount = await this.accountRepository.findAccountById(
         transferAccountDTO.senderId
      );
      if (!senderAccount) throw new Error("Sender account not found");

      const receiverAccount = await this.accountRepository.findAccountById(
         transferAccountDTO.receiverId
      );
      if (!receiverAccount) throw new Error("Receiver account not found");

      senderAccount.debit(transferAccountDTO.amount);
      receiverAccount.credit(transferAccountDTO.amount);

      await this.accountRepository.saveAccount(senderAccount);
      await this.accountRepository.saveAccount(receiverAccount);

      return {
         senderId: senderAccount.getId(),
         receiverId: receiverAccount.getId(),
         amount: transferAccountDTO.amount,
         description: "Transfer between accounts done successfully!",
      };
   }
}
