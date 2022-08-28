import { ACCOUNT } from "../interfaces";
import db from "../database/db";

export class AccountModel {
  public async insert(item: ACCOUNT): Promise<ACCOUNT> {
    return await db("account")
      .insert(item)
      .returning(["accountId", "personId", "balance", "daliyWithdrawalLimit"]);
  }

  public async getById(id: number): Promise<ACCOUNT> {
    return await db("account").where("accountId", id).returning("*").first();
  }

  public async updateAmount(
    accountId: number,
    amount: number
  ): Promise<ACCOUNT> {
    return await db("account")
      .where("accountId", accountId)
      .update({ balance: amount })
      .returning(["accountId", "personId", "balance", "daliyWithdrawalLimit"]);
  }

  public async updateActiveFlag(
    accountId: number,
    activeFlag: boolean
  ): Promise<ACCOUNT[]> {
    return await db("account")
      .where("accountId", accountId)
      .update({ activeFlag })
      .returning(["activeFlag"]);
  }
  // public async countByParams(item: DATA): Promise<DATA[]> {
  //   console.log({ item });
  //   let query = db("data");

  //   if (item.Age) {
  //     query
  //       .join("age", "age.code", "data.Age")
  //       // .where("data.Age", ">", item.Age);
  //       .where({ "age.description": item.Age });
  //   }

  //   if (item.Area) {
  //     query
  //       .join("area", "data.Area", "area.code")
  //       .where({ "area.description": item.Area });
  //   }

  //   if (item.Ethnic) {
  //     query
  //       .join("ethnic", "data.Ethnic", "ethnic.code")
  //       .where({ "ethnic.description": item.Ethnic });
  //   }

  //   if (item.Sex) {
  //     query
  //       .join("sex", "data.Sex", "sex.code")
  //       .where({ "sex.description": item.Sex });
  //   }

  //   if (item.Year) {
  //     query
  //       .join("year", "data.Year", "year.code")
  //       .where({ "year.description": item.Year });
  //   }

  //   return query.count();
  // }
}
