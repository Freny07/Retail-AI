/* ================= DATA ================= */

const brands = [
  { name:"Brand A", price:40, sales:18, margin:22, expiry:65, pref:55 },
  { name:"Brand B", price:45, sales:28, margin:30, expiry:35, pref:78 },
  { name:"Brand C", price:38, sales:12, margin:18, expiry:72, pref:48 }
];

const grid = document.getElementById("brand-grid");
const worstText = document.getElementById("worst-brand");
const bestText  = document.getElementById("best-brand");

/* ================= CORE LOGIC ================= */

function profit(b){
  return Math.round(b.price * b.sales * (b.margin / 100));
}

function aiScore(b){
  return (
    b.sales * 0.35 +
    b.margin * 0.3 +
    b.pref * 0.25 -
    b.expiry * 0.2
  );
}

/* ================= RANKING ================= */

const ranked = brands
  .map(b => ({
    ...b,
    profit: profit(b),
    ai: aiScore(b)
  }))
  .sort((a, b) => b.ai - a.ai);

const bestBrand  = ranked[0];
const worstBrand = ranked[ranked.length - 1];

/* ================= RENDER BRAND CARDS ================= */

ranked.forEach(b => grid.appendChild(card(b)));

function card(b){
  const d = document.createElement("div");
  d.className = "glass";

  const isProfit = b.profit >= 0;
  const cls = isProfit ? "profit" : "loss";
  const icon = isProfit ? "▲" : "▼";
  const label = isProfit ? "Estimated Monthly Profit" : "Estimated Monthly Loss";

  d.innerHTML = `
    <h3>${b.name}</h3>

    ${bar("Sales Velocity", b.sales, 30)}
    ${bar("Profit Margin", b.margin, 40)}
    ${bar("Customer Preference", b.pref, 100)}
    ${bar("Expiry Risk", b.expiry, 100)}

    <div class="money ${cls}">
      <span class="money-label">${icon} ${label}</span>
      <span class="money-value">₹ ${Math.abs(b.profit).toLocaleString()}</span>
    </div>

    <p class="ai-score"><b>AI Performance Score:</b> ${b.ai.toFixed(1)}</p>
  `;
  return d;
}

/* ================= METRIC BAR ================= */

function bar(label, value, max){
  const percent = Math.min((value / max) * 100, 100);
  const color =
    percent > 70 ? "green" :
    percent > 45 ? "orange" :
    "red";

  return `
    <div class="metric">
      <div class="metric-label">
        <span>${label}</span>
        <span>${value}</span>
      </div>
      <div class="progress-bg">
        <div class="progress ${color}" style="width:${percent}%"></div>
      </div>
    </div>
  `;
}

/* ================= AI EXPLANATION ENGINE ================= */

function analyseBrand(b, mode){
  const reasons = [];

  if (mode === "bad") {
    if (b.sales < 15) reasons.push("low sales velocity");
    if (b.expiry > 60) reasons.push("high expiry risk");
    if (b.pref < 55) reasons.push("weaker customer preference");
    if (b.margin < 20) reasons.push("low profit margins");
  }

  if (mode === "good") {
    if (b.sales > 22) reasons.push("strong demand");
    if (b.margin > 25) reasons.push("better margins");
    if (b.expiry < 40) reasons.push("lower expiry risk");
    if (b.pref > 65) reasons.push("high customer preference");
  }

  return reasons;
}

/* ================= BUILD AI TEXT ================= */

function buildInsight(){
  const badReasons  = analyseBrand(worstBrand, "bad");
  const goodReasons = analyseBrand(bestBrand, "good");

  worstText.innerHTML = `
    <b>${worstBrand.name}</b> is underperforming due to
    <span class="loss-text">${badReasons.join(", ")}</span>.
  `;

  bestText.innerHTML = `
    <b>${bestBrand.name}</b> outperforms competitors with
    <span class="profit-text">${goodReasons.join(", ")}</span>.
  `;
}

buildInsight();

/* ================= SIMULATION ================= */

document.getElementById("simulate-btn").onclick = () => {
  const impact = document.getElementById("impact-grid");
  impact.classList.remove("hidden");

  const gain = bestBrand.profit - worstBrand.profit;
  const isGain = gain >= 0;

  impact.innerHTML = `
    <div class="glass impact-card ${isGain ? "profit" : "loss"}">
      ${isGain ? "📈 Revenue Gain" : "📉 Revenue Loss"}
      <h2>${isGain ? "+" : "−"}₹ ${Math.abs(gain).toLocaleString()}</h2>
    </div>

    <div class="glass impact-card profit">
      ⏳ Expiry Loss Reduction
      <h2>-31%</h2>
    </div>

    <div class="glass impact-card profit">
      ⚡ Shelf Efficiency Improvement
      <h2>+18%</h2>
    </div>
  `;
};


