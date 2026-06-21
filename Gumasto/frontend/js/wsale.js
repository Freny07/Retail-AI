window.addEventListener("load", async () => {
  const defaultMock = [
    { name: "Headphones", category: "Electronics", price: 120, daysLeft: 30, stock: 40 },
    { name: "Olive Oil", category: "Food", price: 25, daysLeft: 180, stock: 120 },
    { name: "Chair Set", category: "Furniture", price: 200, daysLeft: 365, stock: 15 },
    { name: "T-Shirt Pack", category: "Clothing", price: 40, daysLeft: 90, stock: 80 }
  ];

  let rawProducts = await window.getInventoryData([]);
  if (rawProducts.length === 0) {
    rawProducts = defaultMock;
  }

  // Filter products for sale dashboard: items with daysLeft > 15 and daysLeft <= 90 (or similar window)
  const saleProducts = rawProducts.filter(p => p.daysLeft > 15 && p.daysLeft <= 90);
  
  // Calculate metrics
  const totalItems = rawProducts.length;
  const urgentCount = rawProducts.filter(p => p.daysLeft > 15 && p.daysLeft <= 30).length;
  const safeCount = rawProducts.filter(p => p.daysLeft > 30).length;
  const avgShelfLife = Math.round(rawProducts.reduce((sum, p) => sum + Math.max(0, p.daysLeft), 0) / Math.max(totalItems, 1));

  document.getElementById("totalSaleItems").innerText = totalItems;
  document.getElementById("urgentSaleCount").innerText = urgentCount;
  document.getElementById("safeSaleCount").innerText = safeCount;
  document.getElementById("avgSaleShelfLife").innerText = `${avgShelfLife} days`;

  // Render Table
  const tbody = document.getElementById("saleTableBody");
  tbody.innerHTML = "";
  
  const categories = new Set();
  const categoryQty = {};

  const displayItems = saleProducts.length ? saleProducts : rawProducts;

  displayItems.forEach(p => {
    categories.add(p.category);
    categoryQty[p.category] = (categoryQty[p.category] || 0) + p.stock;
    
    // Simulate a discount % for sales (e.g. based on category or days left)
    const discPercent = p.daysLeft <= 30 ? 20 : p.daysLeft <= 90 ? 15 : 10;
    
    tbody.innerHTML += `
      <tr data-category="${p.category}">
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.daysLeft}</td>
        <td>${discPercent}%</td>
      </tr>
    `;
  });

  // Populate Filter
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
    const tableRows = document.querySelectorAll("#saleTable tbody tr");
    tableRows.forEach(row => {
      row.style.display = value === "all" || row.dataset.category === value ? "" : "none";
    });
  });

  // Draw chart
  const chartLabels = Object.keys(categoryQty);
  const chartData = Object.values(categoryQty);
  
  const finalLabels = chartLabels.length ? chartLabels : ["Electronics", "Groceries", "Furniture", "Clothing"];
  const finalData = chartData.length ? chartData : [20, 15, 10, 25];

  const ctx = document.getElementById("saleChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: finalLabels,
      datasets: [{
        label: "Sale Qty",
        data: finalData,
        backgroundColor: [
          "#dcfce7",
          "#bbf7d0",
          "#d9f99d",
          "#bef264",
          "#a3e635"
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
