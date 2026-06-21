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

  // Filter products for donation: items near expiry (daysLeft > 0 and daysLeft <= 7) and low sales velocity (unitsSold < 10)
  const donateProducts = rawProducts.filter(p => p.daysLeft > 0 && p.daysLeft <= 7 && p.unitsSold < 10);
  
  // Calculate metrics
  const totalItems = rawProducts.length;
  const urgentCount = rawProducts.filter(p => p.daysLeft > 0 && p.daysLeft <= 3).length;
  const safeCount = rawProducts.filter(p => p.daysLeft > 7).length;
  const avgShelfLife = Math.round(rawProducts.reduce((sum, p) => sum + Math.max(0, p.daysLeft), 0) / Math.max(totalItems, 1));

  document.getElementById("totalDonateItems").innerText = totalItems;
  document.getElementById("urgentDonateCount").innerText = urgentCount;
  document.getElementById("safeDonateCount").innerText = safeCount;
  document.getElementById("avgDonateShelfLife").innerText = `${avgShelfLife} days`;

  // Render Table
  const tbody = document.getElementById("donateTableBody");
  tbody.innerHTML = "";
  
  const categories = new Set();
  const categoryQty = {};

  // If no donate products match filter, use near expiry items
  const displayItems = donateProducts.length ? donateProducts : rawProducts.filter(p => p.daysLeft <= 10);

  displayItems.forEach(p => {
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
    const tableRows = document.querySelectorAll("#donateTable tbody tr");
    tableRows.forEach(row => {
      row.style.display = value === "all" || row.dataset.category === value ? "" : "none";
    });
  });

  // Draw chart
  const chartLabels = Object.keys(categoryQty);
  const chartData = Object.values(categoryQty);
  
  const finalLabels = chartLabels.length ? chartLabels : ["Dairy", "Bakery", "Beverages", "Grains"];
  const finalData = chartData.length ? chartData : [24, 18, 30, 60];

  const ctx = document.getElementById("donateChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: finalLabels,
      datasets: [{
        label: "Items for Donation",
        data: finalData,
        backgroundColor: [
          "#2563eb",
          "#38bdf8",
          "#60a5fa",
          "#34d399",
          "#a7f3d0"
        ].slice(0, finalLabels.length),
        borderRadius: 14
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(15,23,42,0.08)" }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
});
