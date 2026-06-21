const select = document.getElementById("categorySelect");
const cells = document.querySelectorAll(".cell");
const insight = document.getElementById("insight");

/* ===============================
   CATEGORY-WISE AI CURATED SCORES
   =============================== */

let categoryScores = {
  "Dairy": {
    "top-left": 30,
    "top-mid": 45,
    "top-right": 35,
    "mid-left": 70,
    "mid-mid": 90,   // eye level best for dairy
    "mid-right": 75,
    "bot-left": 25,
    "bot-mid": 30,
    "bot-right": 28,
    "checkout": 65
  },

  "Bakery": {
    "top-left": 40,
    "top-mid": 55,
    "top-right": 50,
    "mid-left": 75,
    "mid-mid": 85,
    "mid-right": 78,
    "bot-left": 35,
    "bot-mid": 40,
    "bot-right": 38,
    "checkout": 70
  },

  "Snacks": {
    "top-left": 50,
    "top-mid": 60,
    "top-right": 55,
    "mid-left": 65,
    "mid-mid": 75,
    "mid-right": 70,
    "bot-left": 45,
    "bot-mid": 50,
    "bot-right": 48,
    "checkout": 95   // impulse buys 🔥
  },

  "Beverages": {
    "top-left": 35,
    "top-mid": 50,
    "top-right": 45,
    "mid-left": 70,
    "mid-mid": 85,
    "mid-right": 80,
    "bot-left": 40,
    "bot-mid": 45,
    "bot-right": 42,
    "checkout": 75
  },

  "Electronics": {
    "top-left": 60,
    "top-mid": 65,
    "top-right": 62,
    "mid-left": 80,
    "mid-mid": 88,
    "mid-right": 85,
    "bot-left": 50,
    "bot-mid": 55,
    "bot-right": 52,
    "checkout": 90
  },

  "Baby Products": {
    "top-left": 45,
    "top-mid": 55,
    "top-right": 50,
    "mid-left": 78,
    "mid-mid": 88,
    "mid-right": 82,
    "bot-left": 40,
    "bot-mid": 45,
    "bot-right": 42,
    "checkout": 60
  },

  "Toys": {
    "top-left": 65,
    "top-mid": 70,
    "top-right": 68,
    "mid-left": 85,
    "mid-mid": 92,
    "mid-right": 88,
    "bot-left": 55,
    "bot-mid": 60,
    "bot-right": 58,
    "checkout": 80
  }
};

/* ===============================
   RESET
   =============================== */

function resetCells() {
  cells.forEach(cell => {
    cell.className = cell.classList.contains("checkout-cell")
      ? "cell checkout-cell"
      : "cell";
    cell.querySelector("span").textContent = "--";
  });
}

/* ===============================
   DROPDOWN CHANGE
   =============================== */

select.addEventListener("change", () => {
  const category = select.value;

  if (!category) {
    resetCells();
    insight.textContent = "Select a category to view AI insight.";
    return;
  }

  // Check if category exists in scores
  const scores = categoryScores[category] || {
    "top-left": 30, "top-mid": 50, "top-right": 40,
    "mid-left": 70, "mid-mid": 85, "mid-right": 75,
    "bot-left": 25, "bot-mid": 35, "bot-right": 30,
    "checkout": 65
  };

  cells.forEach(cell => {
    const score = scores[cell.dataset.id];
    cell.querySelector("span").textContent = score;

    cell.classList.remove("critical", "high", "medium", "low");

    if (score >= 90) cell.classList.add("critical");
    else if (score >= 75) cell.classList.add("high");
    else if (score >= 50) cell.classList.add("medium");
    else cell.classList.add("low");
  });

  insight.textContent =
    `AI Insight: ${category} products perform best at eye-level shelves and strategically placed zones like checkout for maximum visibility.`;
});

async function initPlacement() {
  try {
    const products = await window.getInventoryData([]);
    if (products && products.length > 0) {
      const parsedScores = {};
      const categories = [...new Set(products.map(p => p.category))];
      
      categories.forEach(cat => {
        const catProducts = products.filter(p => p.category === cat);
        const totalSales = catProducts.reduce((sum, p) => sum + p.unitsSold, 0);
        const avgSales = totalSales / catProducts.length;
        const velocityFactor = Math.min(Math.max(avgSales / 5, 0.8), 1.5);
        
        parsedScores[cat] = {
          "top-left": Math.round(Math.min(100, 30 * velocityFactor)),
          "top-mid": Math.round(Math.min(100, 50 * velocityFactor)),
          "top-right": Math.round(Math.min(100, 40 * velocityFactor)),
          "mid-left": Math.round(Math.min(100, 70 * velocityFactor)),
          "mid-mid": Math.round(Math.min(100, 85 * velocityFactor)),
          "mid-right": Math.round(Math.min(100, 75 * velocityFactor)),
          "bot-left": Math.round(Math.min(100, 25 * velocityFactor)),
          "bot-mid": Math.round(Math.min(100, 35 * velocityFactor)),
          "bot-right": Math.round(Math.min(100, 30 * velocityFactor)),
          "checkout": Math.round(Math.min(100, (cat === "Snacks" ? 95 : 65) * velocityFactor))
        };
      });
      
      categoryScores = parsedScores;

      // Populate Select Categories Dropdown
      const selectEl = document.getElementById("categorySelect");
      selectEl.innerHTML = '<option value="">Select Category</option>';
      Object.keys(categoryScores).forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        selectEl.appendChild(option);
      });
    }
  } catch (err) {
    console.warn("Failed to dynamically build categoryScores, using mock", err);
  }
}

initPlacement();
