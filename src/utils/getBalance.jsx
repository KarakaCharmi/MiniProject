function getBalance({ members, emails, transactions, debts }) {
  const totalPaid = {};
  const totalSpent = {};

  members.forEach((member) => {
    totalPaid[member] = 0;
  });

  transactions.forEach((transaction) => {
    totalPaid[transaction.paidBy] += transaction.amount;
  });

  const balance = {};
  const EmailBalance = {};

  emails.forEach((email) => {
    EmailBalance[email] = 0;
  });

  members.forEach((member) => {
    balance[member] = 0;
  });

  members.forEach((from) => {
    members.forEach((to) => {
      balance[from] += debts[to][from];
      balance[from] -= debts[from][to]; //loan
    });
  });

  members.forEach((from, index) => {
    members.forEach((to) => {
      EmailBalance[emails[index]] += debts[to][from];
      EmailBalance[emails[index]] -= debts[from][to]; //loan
    });
  });

  members.forEach((member) => {
    totalSpent[member] = totalPaid[member] - balance[member];
  });

  return { totalPaid, totalSpent, balance, EmailBalance };
}

export { getBalance };
