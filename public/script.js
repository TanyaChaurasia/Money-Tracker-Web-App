let transactions = [];
let totalMoney = 0;

// Get transactions from local storage
const storedTransactions = localStorage.getItem('transactions');
if (storedTransactions) {
  transactions = JSON.parse(storedTransactions);
}

// Calculate total money
transactions.forEach((transaction) => {
  totalMoney += transaction.amount;
});

// Display transactions
function displayTransactions() {
  const tableBody = document.getElementById('transactionTableBody');
  tableBody.innerHTML = '';

  transactions.forEach((transaction) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${transaction.type}</td>
      <td>${transaction.name}</td>
      <td>$${transaction.amount.toFixed(2)}</td>
      <td>${transaction.date}</td>
      <td><a href="#" class="delete" data-id="${transaction.id}">Delete</a></td>
    `;

    tableBody.appendChild(row);
  });
}

// Update balance
function updateBalance() {
  const balanceElement = document.querySelector('.balance');
  const totalBalance = transactions.reduce((acc, current) => {
    if (current.type === 'income') {
      return acc + current.amount;
    } else {
      return acc - current.amount;
    }
  }, 0);
  balanceElement.textContent = `Balance: $${totalBalance.toFixed(2)}`;
}

// Update total money
function updateTotalMoney() {
  const totalMoneyElement = document.querySelector('.totalMoney');
  totalMoneyElement.textContent = `Total Money: $${totalMoney.toFixed(2)}`;
}

// Add event listener to form
document.getElementById('expForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const name = document.getElementById('name').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = new Date().toLocaleDateString();

  const transaction = {
    id: transactions.length + 1,
    type,
    name,
    amount,
    date,
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  totalMoney += amount;

  displayTransactions();
  updateBalance();
  updateTotalMoney();

  document.getElementById('expForm').reset();
});

// Add event listener to delete links
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.getAttribute('data-id');
    transactions = transactions.filter((transaction) => transaction.id!== parseInt(id));
    localStorage.setItem('transactions', JSON.stringify(transactions));

    const deletedTransaction = transactions.find((transaction) => transaction.id === parseInt(id));
    if (deletedTransaction) {
      totalMoney -= deletedTransaction.amount;
    }

    displayTransactions();
    updateBalance();
    updateTotalMoney();
  }
});

displayTransactions();
updateBalance();
updateTotalMoney();