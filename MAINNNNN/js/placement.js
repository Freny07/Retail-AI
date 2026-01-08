const select = document.getElementById("categorySelect");
const cells = document.querySelectorAll(".cell");
const insight = document.getElementById("insight");

const scores = {
  "top-left": 35,
  "top-mid": 45,
  "top-right": 40,
  "mid-left": 70,
  "mid-mid": 90,
  "mid-right": 75,
  "bot-left": 30,
  "bot-mid": 38,
  "bot-right": 42,
  "checkout": 85
};

function resetCells() {
  cells.forEach(cell => {
    cell.className = cell.classList.contains("checkout-cell")
      ? "cell checkout-cell"
      : "cell";
    cell.querySelector("span").textContent = "--";
  });
}

select.addEventListener("change", () => {
  if (!select.value) {
    resetCells();
    insight.textContent = "Select a category to view AI insight.";
    return;
  }

  cells.forEach(cell => {
    const score = scores[cell.dataset.id];
    cell.querySelector("span").textContent = score;

    if (score >= 85) cell.classList.add("critical");
    else if (score >= 70) cell.classList.add("high");
    else if (score >= 40) cell.classList.add("medium");
    else cell.classList.add("low");
  });

  insight.textContent =
    "Eye-level shelves and checkout zones capture the highest customer attention.";
});
