window.addEventListener("load", () => {
  const ctx = document.getElementById("saleChart").getContext("2d");

  const labels = ["Headphones", "Olive Oil", "Chair Set", "T-Shirt Pack"];
  const data = [20, 15, 10, 25];

  const colors = [
    "#dcfce7", // soft mint green
    "#bbf7d0", // light green
    "#d9f99d", // pale yellow-green
    "#bef264"  // lime
  ];

  const saleChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Sale %",
        data: data,
        backgroundColor: colors,
        borderRadius: 14,
        barPercentage: 0.6,
        categoryPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#f3f4f6",
          titleColor: "#1e3a8a",
          bodyColor: "#1e3a8a",
          titleFont: { weight: "700", size: 14 },
          bodyFont: { size: 13 },
          cornerRadius: 12,
          padding: 12
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(15,23,42,0.08)" },
          ticks: { font: { size: 14, weight: "600" } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 14, weight: "600" } }
        }
      },
      animation: {
        duration: 1000,
        easing: "easeOutQuart"
      }
    }
  });

  // Table filter
  const filterSelect = document.getElementById("categoryFilter");
  const tableRows = document.querySelectorAll("#saleTable tbody tr");

  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    tableRows.forEach(row => {
      row.style.display = value === "all" || row.dataset.category === value ? "" : "none";
    });
  });
});
