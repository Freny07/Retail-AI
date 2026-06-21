window.addEventListener("load", async () => {
  const defaultMock = [
    { name: "Milk", category: "Dairy", daysLeft: 2, stock: 24 },
    { name: "Bread", category: "Bakery", daysLeft: 5, stock: 18 },
    { name: "Fruit Juice", category: "Beverages", daysLeft: 7, stock: 30 },
    { name: "Rice Pack", category: "Grains", daysLeft: 45, stock: 60 }
  ];

  let rawProducts = await window.getInventoryData([]);
  if (rawProducts.length === 0) {
    rawProducts = defaultMock;
  }

  // Filter products for disposal dashboard: items nearing expiry or already expired (daysLeft <= 15)
  const disposeProducts = rawProducts.filter(p => p.daysLeft <= 15);
  
  // Calculate metrics
  const totalItems = rawProducts.length;
  const urgentCount = rawProducts.filter(p => p.daysLeft <= 3).length;
  const safeCount = rawProducts.filter(p => p.daysLeft > 7).length;
  const avgShelfLife = Math.round(rawProducts.reduce((sum, p) => sum + Math.max(0, p.daysLeft), 0) / Math.max(totalItems, 1));

  document.getElementById("totalDisposeItems").innerText = totalItems;
  document.getElementById("urgentDisposeCount").innerText = urgentCount;
  document.getElementById("safeDisposeCount").innerText = safeCount;
  document.getElementById("avgDisposeShelfLife").innerText = `${avgShelfLife} days`;

  // Render Table
  const tbody = document.getElementById("disposeTableBody");
  tbody.innerHTML = "";
  
  const categories = new Set();
  const categoryQty = {};

  disposeProducts.forEach(p => {
    categories.add(p.category);
    categoryQty[p.category] = (categoryQty[p.category] || 0) + p.stock;
    
    tbody.innerHTML += `
      <tr data-category="${p.category}">
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.daysLeft}</td>
        <td>${p.stock}</td>
      </tr>
    `;
  });

  // Populate Categories Filter dropdown
  const filterSelect = document.getElementById("categoryFilter");
  filterSelect.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filterSelect.appendChild(opt);
  });

  // Table filter logic
  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    const tableRows = document.querySelectorAll("#disposeTable tbody tr");
    tableRows.forEach(row => {
      row.style.display = value === "all" || row.dataset.category === value ? "" : "none";
    });
  });

  // Draw chart
  const chartLabels = Object.keys(categoryQty);
  const chartData = Object.values(categoryQty);
  
  const finalLabels = chartLabels.length ? chartLabels : ["Dairy", "Bakery", "Beverages", "Grains"];
  const finalData = chartData.length ? chartData : [24, 18, 30, 60];

  const ctx = document.getElementById("disposeChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: finalLabels,
      datasets: [{
        label: "Dispose Qty",
        data: finalData,
        backgroundColor: [
          "#fecaca",
          "#ef4444",
          "#dc2626",
          "#fbcfe8",
          "#f472b6"
        ].slice(0, finalLabels.length),
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
});
