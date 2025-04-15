// charts.js

let categoryChart;

function renderCategoryChart(expenses) {
  const categories = {};
  expenses.forEach((exp) => {
    categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Spending by Category",
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56",
          "#4BC0C0", "#9966FF", "#FF9F40",
          "#66CC99", "#FF6666"
        ],
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
  };

  if (categoryChart) {
    categoryChart.destroy();
  }

  const ctx = document.getElementById("categoryChart").getContext("2d");
  categoryChart = new Chart(ctx, config);
}