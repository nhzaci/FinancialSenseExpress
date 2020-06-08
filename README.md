# FinancialSense

### About
This is the Express.js server set up with MongoDB as the database for my FinancialSense front-end webpage.

### Usage
For full API documentation, kindly visit the [wiki](https://github.com/nhzaci/FinancialSenseExpress/wiki).

### Installation

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000 using nodemon
$ npm run dev
```

To run the server successfully, a DB connection has to be set up.

```bash
# bash terminal
$ touch .env
$ vim .env
```

```.env
# .env file
DB_CONNECTION = <MongoDB Address Here>
```

This API is intended for the front-end SPA, FinancialSense, which is accessible [here](https://github.com/nhzaci/FinancialSense).

### TODO:

* Authentication system on the back-end
