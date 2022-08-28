export interface ACCOUNT extends ACCOUNT_BLOCK, ACCOUNT_BALANCE {
  accountId?: number;
  personId: number;
  daliyWithdrawalLimit: number;
  accountType?: number;
  createDate?: Date;
}

export interface ACCOUNT_AMOUNT {
  amount: number;
}

export interface ACCOUNT_BALANCE {
  balance: number;
}

export interface ACCOUNT_BLOCK {
  activeFlag: boolean;
}
