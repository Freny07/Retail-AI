window.addEventListener("load", () => {
  const ctx = document.getElementById("discountChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Headphones", "Olive Oil", "Chair Set", "T-Shirt Pack"],
      datasets: [{
        label: "Discount %",
        data: [20, 15, 10, 25],
        backgroundColor: [
          "#ffe7b3", // very light orange
          "#fff0b3", // light yellow
          "#ffe0a1", // soft golden
          "#fff4cc"  // light yellow-orange
        ],
        borderRadius: 14
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(30,58,138,0.08)" }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  // Table filter
  const filterSelect = document.getElementById("categoryFilter");
  const tableRows = document.querySelectorAll("#discountTable tbody tr");

  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    tableRows.forEach(row => {
      row.style.display = value === "all" || row.dataset.category === value ? "" : "none";
    });
  });
});
