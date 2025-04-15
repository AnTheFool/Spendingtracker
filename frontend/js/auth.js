// auth.js

// Login
async function login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  
    return data;
  }
  
  // Logout
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  
  // Get token for authenticated requests
  function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  
  // Check login status
  function isLoggedIn() {
    return !!localStorage.getItem("token");
  }  