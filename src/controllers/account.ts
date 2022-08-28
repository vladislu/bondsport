import { Request, Response, NextFunction } from "express";
import { AccountService } from "../services";

export const createAccount = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const body = req.body;

    const result = await AccountService.createAccount(body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: error.status, message: error.message });
  }
};

export const depositToAccount = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const body = req.body;
    const accountId = +req.params.accountId;

    if (body.amount < 0) throw new Error("amount cannot be negative");

    const result = await AccountService.depositToAccount(accountId, body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: error.status, message: error.message });
  }
};

export const getBalance = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const accountId = +req.params.accountId;

    const result = await AccountService.getAccountBalance(accountId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: error.status, message: error.message });
  }
};

export const withdrawalFromAccount = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const body = req.body;
    const accountId = +req.params.accountId;

    if (body.amount < 0) throw new Error("amount cannot be negative");

    const result = await AccountService.withdrawalFromAccount(accountId, body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: error.status, message: error.message });
  }
};

export const blockAccount = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const body = req.body;
    const accountId = +req.params.accountId;

    const result = await AccountService.blockAccount(accountId, body);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: error.status, message: error.message });
  }
};

export const getAccountTransactions = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const accountId = +req.params.accountId;

    const result = await AccountService.getAccountTransactions(accountId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(404)
      .json({ status: error.status, message: error.message });
  }
};