window.addEventListener("load", async () => {
  const defaultMock = [
    { name: "Headphones", category: "Electronics", price: 120, daysLeft: 12, stock: 40 },
    { name: "Olive Oil", category: "Groceries", price: 25, daysLeft: 18, stock: 120 },
    { name: "Chair Set", category: "Furniture", price: 200, daysLeft: 35, stock: 15 },
    { name: "T-Shirt Pack", category: "Clothing", price: 40, daysLeft: 22, stock: 80 }
  ];

  let rawProducts = await window.getInventoryData([]);
  if (rawProducts.length === 0) {
    rawProducts = defaultMock;
  }

  // Calculate discount percent helper
  function getDiscountPercent(daysLeft) {
    if (daysLeft <= 0) return 0;
    if (daysLeft <= 3) return 30;
    if (daysLeft <= 7) return 20;
    if (daysLeft <= 15) return 10;
    return 0;
  }

  const discountProducts = rawProducts.map(p => {
    const disPercent = getDiscountPercent(p.daysLeft);
    const amt = Math.round(p.price * disPercent / 100);
    const finalPrice = p.price - amt;
    return {
      ...p,
      discountPercent: disPercent,
      finalPrice: finalPrice
    };
  });

  const activeDiscounts = discountProducts.filter(p => p.discountPercent > 0);
  
  // Calculate metrics
  const totalItems = rawProducts.length;
  const itemsOnDiscount = activeDiscounts.length;
  const highPriority = rawProducts.filter(p => p.daysLeft > 0 && p.daysLeft <= 7).length;
  const avgDiscount = activeDiscounts.length 
    ? Math.round(activeDiscounts.reduce((sum, p) => sum + p.discountPercent, 0) / activeDiscounts.length)
    : 0;

  document.getElementById("totalDiscountItems").innerText = totalItems;
  document.getElementById("itemsOnDiscountCount").innerText = itemsOnDiscount;
  document.getElementById("highPriorityDiscountCount").innerText = highPriority;
  document.getElementById("avgDiscountPercent").innerText = `${avgDiscount}%`;

  // Render Table
  const tbody = document.getElementById("discountTableBody");
  tbody.innerHTML = "";
  
  const categories = new Set();
  const categoryDiscounts = {};
  const categoryCount = {};

  const displayItems = activeDiscounts.length ? activeDiscounts : discountProducts;

  displayItems.forEach(p => {
    categories.add(p.category);
    categoryDiscounts[p.category] = (categoryDiscounts[p.category] || 0) + (p.discountPercent || 15);
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    
    const currency = localStorage.getItem("currencySymbol") || "₹";
    const discStr = p.discountPercent ? `${p.discountPercent}%` : "—";
    
    tbody.innerHTML += `
      <tr data-category="${p.category}">
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${currency}${p.price.toLocaleString()}</td>
        <td>${discStr}</td>
        <td>${currency}${p.finalPrice.toLocaleString()}</td>
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
    const tableRows = document.querySelectorAll("#discountTable tbody tr");
    tableRows.forEach(row => {
      row.style.display = value === "all" || row.dataset.category === value ? "" : "none";
    });
  });

  // Draw chart
  const chartLabels = Object.keys(categoryDiscounts);
  const chartData = chartLabels.map(cat => Math.round(categoryDiscounts[cat] / categoryCount[cat]));
  
  const finalLabels = chartLabels.length ? chartLabels : ["Electronics", "Groceries", "Furniture", "Clothing"];
  const finalData = chartData.length ? chartData : [20, 15, 10, 25];

  const ctx = document.getElementById("discountChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: finalLabels,
      datasets: [{
        label: "Discount %",
        data: finalData,
        backgroundColor: [
          "#ffe7b3",
          "#fff0b3",
          "#ffe0a1",
          "#fff4cc",
          "#ffedd5"
        ].slice(0, finalLabels.length),
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
});
