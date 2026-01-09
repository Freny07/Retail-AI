const select = document.getElementById("categorySelect");
const cells = document.querySelectorAll(".cell");
const insight = document.getElementById("insight");

/* ===============================
   CATEGORY-WISE AI CURATED SCORES
   =============================== */

const categoryScores = {
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

  const scores = categoryScores[category];

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
