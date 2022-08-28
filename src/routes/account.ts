import { Router } from "express";
import {
  createAccount,
  depositToAccount,
  getBalance,
  withdrawalFromAccount,
  blockAccount,
  getAccountTransactions,
} from "../controllers";
const routeAccount = Router();

routeAccount.post("/create", createAccount);
routeAccount.put("/deposit/:accountId", depositToAccount);
routeAccount.get("/balance/:accountId", getBalance);
routeAccount.put("/withdrawal/:accountId", withdrawalFromAccount);
routeAccount.put("/block/:accountId", blockAccount);
routeAccount.get("/transactions/:accountId", getAccountTransactions);

export default routeAccount;
