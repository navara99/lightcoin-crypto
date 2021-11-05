class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((acc, curr) => acc += curr.value, 0);
  }

  addTransactions(transaction) {
    this.transactions.push(transaction);
  }

}

const myAccount = new Account("snow-patrol");

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransactions(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  isAllowed() {
    return (this.account.balance - this.amount) >= 0;
  }

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}

const t1 = new Withdrawal(50.25, myAccount);
console.log(t1.commit()); // Rejected
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(9.99, myAccount);
console.log(t2.commit()); // Rejected
console.log('Transaction 2:', t2);

const t3 = new Deposit(120.00, myAccount);
console.log(t3.commit()); // Passed
console.log("Transaction 3:", t3);

console.log('Balance:', myAccount.balance);

const t4 = new Withdrawal(100, myAccount);
console.log(t4.commit()); // Passed
console.log("Transaction 4:", t4);

console.log('Balance:', myAccount.balance);

