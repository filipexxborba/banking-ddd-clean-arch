import express from "express";
import { AccountService } from "../../application/services/account.service";
import { CreateAccountUseCase } from "../usecases/accounts/create-account.usecase";
import { FindAccountByIdUseCase } from "../usecases/accounts/find-account-by-id.usecases";

const router = express.Router();

const accountService = new AccountService();

router.post("/", async (req, res) => {
   // #swagger.tags = ['Accounts']
   // #swagger.summary = 'Create a new account.'
   // #swagger.description = 'Endpoint to create a new account.'
   /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createAccountSchema"
                    }  
                }
            }
        } 
    */
   /* #swagger.responses[201] = {
            description: "Created Successfully",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseCreateAccountSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to create account",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */
   const { name, amount = 0 } = req.body;
   const createNewAccount = new CreateAccountUseCase(accountService);
   if (!name) {
      res.status(400).json({ message: "Account name must be provided" });
      return;
   }
   if (amount < 0) {
      res.status(400).json({
         message: "Account amount must be greater than 0",
      });
      return;
   }

   try {
      const account = await createNewAccount.execute({
         name,
         amount,
      });
      res.status(201).json(account);
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

router.get("/:id", async (req, res) => {
   // #swagger.tags = ['Accounts']
   // #swagger.summary = 'Get account by id.'
   // #swagger.description = 'Endpoint to get account by id.'
   /* #swagger.responses[200] = {
            description: "Success to get account",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/responseGetAccountByIdSchema"
                    }
                }           
            }
        }   
    */
   /* #swagger.responses[400] = {
            description: "Error to get account",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/genericErrorResponseSchema"
                    }
                }           
            }
        }   
    */
   const findAccountById = new FindAccountByIdUseCase(accountService);
   try {
      const account = await findAccountById.execute(Number(req.params.id));
      res.status(200).json(account ?? {});
   } catch (e) {
      res.status(400).json({ message: (e as Error).message });
   }
});

export default router;
