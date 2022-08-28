import {
  ACCOUNT,
  ACCOUNT_AMOUNT,
  ACCOUNT_BALANCE,
  ACCOUNT_BLOCK,
  TRANSACTION,
} from "../interfaces";
import { AccountModel, TransactionModel } from "../models";

export class AccountService {
  static async createAccount(account: ACCOUNT): Promise<ACCOUNT> {
    try {
      const accountModel = new AccountModel();
      const accountResultPromise = accountModel.insert(account);
      return accountResultPromise;
    } catch (error) {
      throw error;
    }
  }

  static async depositToAccount(
    accountId: number,
    deposit: ACCOUNT_AMOUNT
  ): Promise<ACCOUNT> {
    try {
      const accountModel = new AccountModel();
      const transactionModel = new TransactionModel();

      const account = await accountModel.getById(accountId);
      const amount = deposit.amount + parseFloat(`${account.balance}`);
      await transactionModel.insert({ accountId, value: deposit.amount });
      const accountResultPromise = accountModel.updateAmount(accountId, amount);
      return accountResultPromise;
    } catch (error) {
      throw error;
    }
  }

  static async getAccountBalance(accountId: number): Promise<ACCOUNT_BALANCE> {
    try {
      const accountModel = new AccountModel();

      const account = await accountModel.getById(accountId);
      const balance: ACCOUNT_BALANCE = {
        balance: account.balance,
      };
      return balance;
    } catch (error) {
      throw error;
    }
  }

  static async withdrawalFromAccount(
    accountId: number,
    withdrawal: ACCOUNT_AMOUNT
  ): Promise<ACCOUNT> {
    try {
      const accountModel = new AccountModel();
      const transactionModel = new TransactionModel();

      const account = await accountModel.getById(accountId);
      if (!account.activeFlag) {
        throw new Error("Account not active");
      }

      const { sum } =
        await transactionModel.getWithdrawalAmountLimitByAccountId(accountId);

      if (
        sum &&
        account.daliyWithdrawalLimit &&
        withdrawal.amount &&
        !(+sum + +account.daliyWithdrawalLimit >= withdrawal.amount)
      ) {
        console.log(sum);
        throw new Error("daliy withdrawal limit exceeded");
      }

      const amount = parseFloat(`${account.balance}`) - withdrawal.amount;
      await transactionModel.insert({
        accountId,
        value: withdrawal.amount * -1,
      });
      const accountResultPromise = accountModel.updateAmount(accountId, amount);
      return accountResultPromise;
    } catch (error) {
      throw error;
    }
  }

  static async blockAccount(
    accountId: number,
    block: ACCOUNT_BLOCK
  ): Promise<ACCOUNT_BLOCK> {
    try {
      const accountModel = new AccountModel();

      const account = await accountModel.getById(accountId);
      if (
        (account.activeFlag && !block.activeFlag) ||
        (!account.activeFlag && block.activeFlag)
      ) {
        const [accountResultPromise] = await accountModel.updateActiveFlag(
          accountId,
          block.activeFlag
        );
        return accountResultPromise;
      }
      return { activeFlag: block.activeFlag };
    } catch (error) {
      throw error;
    }
  }

  static async getAccountTransactions(
    accountId: number
  ): Promise<TRANSACTION[]> {
    try {
      const transactionModel = new TransactionModel();
      const transactionsResultPromise = await transactionModel.getByAccountId(
        accountId
      );
      return transactionsResultPromise;
    } catch (error) {
      throw error;
    }
  }
}
