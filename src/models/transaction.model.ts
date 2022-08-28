import { TRANSACTION } from "../interfaces";
import db from "../database/db";

export class TransactionModel {
  public async insert(item: TRANSACTION): Promise<TRANSACTION> {
    return await db("transaction").insert(item).returning("transactionId");
  }

  public async getByAccountId(id: number): Promise<TRANSACTION[]> {
    return await db("transaction").where("accountId", id).returning("*");
  }

  public async getWithdrawalAmountLimitByAccountId(
    id: number
  ): Promise<any> {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return await db("transaction")
      .where("accountId", id)
      .where("transactionDate", ">=", `${year}-${month}-${day}T00:00:00Z`)
      .where("transactionDate", "<", `${year}-${month}-${day + 1}T00:00:00Z`)
      .sum("value").first();
  }
}
