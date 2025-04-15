const expenseList = document.getElementById("expense-list");
const totalAmountEl = document.getElementById("total-amount");
const refreshBtn = document.getElementById("refresh-btn");
const accountSelect = document.getElementById("account-select");
const accountBalancesDiv = document.getElementById("account-balances");

let expensesData = [];

async function loadExpenses() {
    expensesData = await fetchExpenses();
    renderList(expensesData);
    updateTotal(expensesData);
    renderCategoryChart(expensesData); // ← Add this line
  }  

function renderList(data) {
  expenseList.innerHTML = "";
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.category}: $${item.amount.toFixed(2)} (${item.description || ""})`;
    expenseList.appendChild(li);
  });
}

function updateTotal(data) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  totalAmountEl.textContent = total.toFixed(2);
}

refreshBtn.addEventListener("click", async () => {
  await deleteAllExpenses();
  expensesData = [];
  updateTotal(expensesData);
  loadExpenses();
  loadAccounts();
});

async function loadAccounts() {
  const accounts = await getAccounts();
  accountSelect.innerHTML = "";
  accountBalancesDiv.innerHTML = "";

  accounts.forEach((acc) => {
    // Populate dropdown
    const option = document.createElement("option");
    option.value = acc.id;
    option.textContent = `${acc.name}`;
    accountSelect.appendChild(option);

    // Show balances
    const balanceEl = document.createElement("div");
    balanceEl.className = "account-balance";
    balanceEl.textContent = `${acc.name}: $${acc.balance.toFixed(2)}`;
    accountBalancesDiv.appendChild(balanceEl);
  });
}

document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const accountId = parseInt(accountSelect.value);

  const newExpense = {
    amount,
    category,
    description,
    account_id: accountId,
  };

  await createExpense(newExpense);
  document.getElementById("expense-form").reset();

  await loadExpenses();
  await loadAccounts();
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadAccounts();
  await loadExpenses();
});