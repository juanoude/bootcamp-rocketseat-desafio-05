import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionODT {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const inicialIncome = 0;
    const income = this.transactions.reduce((totalIncome, transaction) => {
      if (transaction.type === 'income') {
        return totalIncome + transaction.value;
      }
      return totalIncome;
    }, inicialIncome);

    const inicialOutcome = 0;
    const outcome = this.transactions.reduce((totalOutcome, transaction) => {
      if (transaction.type === 'outcome') {
        return totalOutcome + transaction.value;
      }
      return totalOutcome;
    }, inicialOutcome);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionODT): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
