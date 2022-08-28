1. install yarn
2. yarn db
3. yarn knex:seed:run
4. yarn start:dev
5. POST localhost:3030/account/create
    ```
    "personId": 1,
    "balance": 123,
    "daliyWithdrawalLimit": 101,
    "accountType": 1
6. PUT localhost:3030/account/deposit/1
    ```
    {
        "amount" : 100
    }
7. GET localhost:3030/account/balance/1
8. PUT localhost:3030/account/withdrawal/1
    ```
    {
        "amount" : 100
    }
9. PUT localhost:3030/account/block/1
    ```
    {
       "activeFlag": true
    }
10. GET localhost:3030/account/transactions/1