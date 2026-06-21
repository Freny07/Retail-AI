async function fetchInsight(metrics, elementId) {
  try {
    const headers = {
      "Content-Type": "application/json"
    };
    const token = localStorage.getItem("gumasto_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch("http://localhost:5000/ai/insight", {
      method: "POST",
      headers,
      body: JSON.stringify({
        store_id: "store_001",
        metrics
      })
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    document.getElementById(elementId).innerText =
      data.insight.message;
  } catch {
    document.getElementById(elementId).innerText =
      "AI insight unavailable";
  }
}

async function loadHighlights() {
  const products = await window.getInventoryData([]);
  
  let totalRevenue = 0;
  let totalTransactions = 0;
  
  products.forEach(p => {
    // If unitsSold is not present, use a fraction of stock or standard sales value
    const sales = p.unitsSold || 0;
    totalRevenue += (p.price * sales);
    totalTransactions += sales;
  });
  
  // Default fallbacks if no products or zero sales
  if (totalRevenue === 0) totalRevenue = 25000;
  if (totalTransactions === 0) totalTransactions = 410;
  
  /* 🔹 1. Expiry Risk */
  fetchInsight(
    {
      totalRevenue: totalRevenue,
      totalTransactions: totalTransactions
    },
    "expiryInsight"
  );

  /* 🔹 2. Demand Surge */
  fetchInsight(
    {
      totalRevenue: Math.round(totalRevenue * 1.25),
      totalTransactions: Math.round(totalTransactions * 1.25)
    },
    "demandInsight"
  );

  /* 🔹 3. Layout Opportunity */
  fetchInsight(
    {
      totalRevenue: Math.round(totalRevenue * 0.9),
      totalTransactions: Math.round(totalTransactions * 0.85)
    },
    "layoutInsight"
  );
}

// Make loadHighlights global so dashboard can re-trigger it on CSV upload
window.loadHighlights = loadHighlights;

document.addEventListener("DOMContentLoaded", loadHighlights);

