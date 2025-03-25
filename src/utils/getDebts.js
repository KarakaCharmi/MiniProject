export function getDebts({ members, transactions }) {
  const debts = {};
  members.forEach((member) => {
    debts[member] = {};
  });

  members.forEach((from) => {
    members.forEach((to) => {
      if (from !== to) debts[from][to] = 0;
    });
  });

  transactions.forEach((transaction) => {
    const to = transaction.paidBy;
    transaction.splitBetween.forEach((from) => {
      debts[from][to] += transaction.amount / transaction.splitBetween.length;
    });
  });

  members.forEach((from) => {
    members.forEach((to) => {
      const fromto = debts[from][to];
      const tofrom = debts[to][from];
      if (fromto > tofrom) {
        debts[from][to] = fromto - tofrom;
        debts[to][from] = 0;
      } else {
        debts[to][from] = tofrom - fromto;
        debts[from][to] = 0;
      }
    });
  });

  return debts;
}
