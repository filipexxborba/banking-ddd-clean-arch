import { CreateAccountDTO } from "../../../application/dtos/create-account.dto";
import { AccountService } from "../../../application/services/account.service";

export class CreateAccountUseCase {
   constructor(private readonly accountService: AccountService) {}

   async execute(createAccountDTO: CreateAccountDTO) {
      return await this.accountService.createAccount({
         name: createAccountDTO.name,
         amount: createAccountDTO?.amount ?? 0,
      });
   }
}
