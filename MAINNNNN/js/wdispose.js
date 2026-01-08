window.addEventListener("load", () => {
  const ctx = document.getElementById("disposeChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Milk", "Bread", "Fruit Juice", "Rice Pack"],
      datasets: [{
        label: "Dispose Qty",
        data: [24, 18, 30, 60],
        backgroundColor: [
          "#fecaca",
          "#ef4444",
          "#dc2626",
          "#fecaca"
        ],
        borderRadius: 14
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#f3f4f6",
          titleColor: "#7f1d1d",
          bodyColor: "#7f1d1d",
          titleFont: { weight: "700", size: 14 },
          bodyFont: { size: 13 },
          cornerRadius: 12,
          padding: 12
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.08)" },
          ticks: { font: { size: 14, weight: "600" } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 14, weight: "600" } }
        }
      },
      animation: { duration: 1000, easing: "easeOutQuart" }
    }
  });

  // Table filter
  const filterSelect = document.getElementById("categoryFilter");
  const tableRows = document.querySelectorAll("#disposeTable tbody tr");

  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    tableRows.forEach(row => {
      row.style.display = value === "all" || row.dataset.category === value ? "" : "none";
    });
  });
});
/* THEME */
