// Expenses
async function fetchExpenses() {
    const res = await fetch(`${API_BASE_URL}/expenses`);
    return res.json();
  }
  
  async function createExpense(data) {
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
  
  async function deleteExpense(id) {
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  }
  
  async function deleteAllExpenses() {
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: "DELETE",
    });
    return res.ok;
  }
  
  // Accounts
  async function getAccounts() {
    const res = await fetch(`${API_BASE_URL}/accounts`);
    return res.json();
  }
  
  async function createAccount(data) {
    const res = await fetch(`${API_BASE_URL}/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }  