/* ================= CATEGORY → BRAND DATA ================= */

let categoryBrands = {
  "Dairy": [
    { name:"Amul", price:40, sales:22, margin:25, expiry:45, pref:70 },
    { name:"Mother Dairy", price:42, sales:26, margin:28, expiry:35, pref:78 },
    { name:"Nestle", price:45, sales:20, margin:30, expiry:40, pref:75 }
  ],

  "Bakery": [
    { name:"Britannia", price:30, sales:28, margin:32, expiry:25, pref:80 },
    { name:"Harvest Gold", price:28, sales:22, margin:26, expiry:30, pref:68 },
    { name:"Modern", price:26, sales:18, margin:22, expiry:35, pref:60 }
  ],

  "Snacks": [
    { name:"Lays", price:20, sales:40, margin:35, expiry:20, pref:85 },
    { name:"Bingo", price:18, sales:32, margin:30, expiry:25, pref:75 },
    { name:"Haldiram", price:25, sales:28, margin:38, expiry:30, pref:80 }
  ],

  "Beverages": [
    { name:"Coca Cola", price:35, sales:30, margin:34, expiry:28, pref:82 },
    { name:"Pepsi", price:33, sales:26, margin:30, expiry:32, pref:75 },
    { name:"Real", price:40, sales:22, margin:28, expiry:40, pref:70 }
  ],

  "Electronics": [
    { name:"Samsung", price:1200, sales:8, margin:22, expiry:10, pref:80 },
    { name:"Sony", price:1500, sales:6, margin:28, expiry:8, pref:85 },
    { name:"Boat", price:900, sales:14, margin:35, expiry:12, pref:78 }
  ],

  "Baby Products": [
    { name:"Pampers", price:900, sales:18, margin:30, expiry:20, pref:85 },
    { name:"Huggies", price:880, sales:16, margin:28, expiry:22, pref:80 },
    { name:"Mamaearth", price:650, sales:14, margin:26, expiry:30, pref:75 }
  ],

  "Toys": [
    { name:"Lego", price:1200, sales:10, margin:35, expiry:5, pref:90 },
    { name:"Funskool", price:800, sales:12, margin:30, expiry:8, pref:78 },
    { name:"Hot Wheels", price:300, sales:25, margin:40, expiry:6, pref:88 }
  ]
};
/* ================= CATEGORY AI INSIGHTS ================= */

const categoryInsights = {
  "Dairy":
    "Dairy products perform best at eye-level shelves with frequent replenishment. Brands with faster sales velocity and lower expiry risk significantly reduce wastage.",

  "Bakery":
    "Bakery items benefit from mid-shelf visibility and strong brand recall. Faster-moving brands with moderate margins outperform premium but slower alternatives.",

  "Snacks":
    "Snacks thrive on impulse buying. High customer preference and checkout placement dramatically boost conversions and overall profitability.",

  "Beverages":
    "Beverages show strong demand in high-traffic zones. Brands with balanced margins and consistent preference deliver stable revenue.",

  "Electronics":
    "Electronics rely on trust and brand strength. Higher margins and customer preference outweigh sales volume in driving profitability.",

  "Baby Products":
    "Baby products demand reliability and brand loyalty. Low expiry risk and high customer trust are key drivers of sustained performance.",

  "Toys":
    "Toys benefit from visual appeal and emotional buying. High preference and strong margins make premium brands more profitable despite lower volume."
};


/* ================= ELEMENTS ================= */

const select = document.getElementById("categorySelect");
const grid = document.getElementById("brand-grid");
const worstText = document.getElementById("worst-brand");
const bestText  = document.getElementById("best-brand");
const msg = document.getElementById("select-msg");
const simulateBtn = document.getElementById("simulate-btn");
const impact = document.getElementById("impact-grid");
const aiInsightBox = document.querySelector(".ai-insight");
const replaceMsg = document.getElementById("replace-msg");
/* ================= CORE ================= */

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

/* ================= UI RESET ================= */

function resetUI(){
  // Brand comparison
  grid.innerHTML = "";
  worstText.innerHTML = "";
  bestText.innerHTML = "";
  msg.classList.remove("hidden");

  // Simulation
  simulateBtn.classList.add("hidden");
  impact.classList.add("hidden");
  replaceMsg.classList.remove("hidden");

  // AI Insight
  aiInsightBox.innerHTML = `
    🤖 <b>AI Insight:</b>
    Select a category to view AI-driven insights.
  `;
}
/* ================= RENDER ================= */

function renderCategory(category){
  resetUI();

  const brands = categoryBrands[category];
  msg.classList.add("hidden");
  replaceMsg.classList.add("hidden");
  simulateBtn.classList.remove("hidden");

  const ranked = brands
    .map(b => ({ ...b, profit: profit(b), ai: aiScore(b) }))
    .sort((a,b)=>b.ai-a.ai);

  const best = ranked[0];
  const worst = ranked[ranked.length - 1];

  ranked.forEach(b => grid.appendChild(card(b)));

  worstText.innerHTML =
    `<b>${worst.name}</b> is underperforming due to lower ROI and higher risk.`;

  bestText.innerHTML =
    `<b>${best.name}</b> leads due to strong demand and better margins.`;

  aiInsightBox.innerHTML = `
    🤖 <b>AI Insight:</b>
    ${categoryInsights[category]}
  `;

  simulateBtn.onclick = () => simulate(best, worst);
}



/* ================= CARD ================= */

function card(b){
  const d = document.createElement("div");
  d.className = "glass";

  d.innerHTML = `
    <h3>${b.name}</h3>
    ${bar("Sales Velocity", b.sales, 40)}
    ${bar("Profit Margin", b.margin, 40)}
    ${bar("Customer Preference", b.pref, 100)}
    ${bar("Expiry Risk", b.expiry, 100)}
    <div class="money profit">
      ₹ ${b.profit.toLocaleString()}
    </div>
    <p class="ai-score"><b>AI Score:</b> ${b.ai.toFixed(1)}</p>
  `;
  return d;
}

/* ================= BAR ================= */

function bar(label, value, max){
  const p = Math.min((value/max)*100,100);
  const c = p>70?"green":p>45?"orange":"red";

  return `
    <div class="metric">
      <div class="metric-label">
        <span>${label}</span>
        <span>${value}</span>
      </div>
      <div class="progress-bg">
        <div class="progress ${c}" style="width:${p}%"></div>
      </div>
    </div>
  `;
}
/*==========AI INSIGHT==========*/
function resetUI(){
  grid.innerHTML = "";
  worstText.innerHTML = "";
  bestText.innerHTML = "";
  impact.classList.add("hidden");
  simulateBtn.classList.add("hidden");
  msg.classList.remove("hidden");

  aiInsightBox.innerHTML = `
    🤖 <b>AI Insight:</b>
    Select a category to view AI-driven insights.
  `;
}


/* ================= SIMULATION ================= */

function simulate(best, worst){
  impact.classList.remove("hidden");

  const gain = best.profit - worst.profit;

  impact.innerHTML = `
    <div class="glass impact-card profit">
      📈 Revenue Gain
      <h2>₹ ${gain.toLocaleString()}</h2>
    </div>
    <div class="glass impact-card profit">
      ⚡ Shelf Efficiency
      <h2>+20%</h2>
    </div>
    <div class="glass impact-card profit">
      ⏳ Expiry Loss Reduction
      <h2>-25%</h2>
    </div>
  `;
}

/* ================= EVENTS ================= */

resetUI();

select.addEventListener("change", e => {
  if(!e.target.value) resetUI();
  else renderCategory(e.target.value);
});

async function initComparison() {
  try {
    const products = await window.getInventoryData([]);
    if (products && products.length > 0) {
      const parsedBrands = {};
      products.forEach(p => {
        const cat = p.category;
        if (!parsedBrands[cat]) {
          parsedBrands[cat] = {};
        }
        const brand = p.brand || "Generic";
        if (!parsedBrands[cat][brand]) {
          parsedBrands[cat][brand] = {
            name: brand,
            totalPrice: 0,
            totalSales: 0,
            totalDaysLeft: 0,
            count: 0
          };
        }
        parsedBrands[cat][brand].totalPrice += p.price;
        parsedBrands[cat][brand].totalSales += p.unitsSold;
        parsedBrands[cat][brand].totalDaysLeft += p.daysLeft;
        parsedBrands[cat][brand].count += 1;
      });

      const finalCategoryBrands = {};
      for (const cat in parsedBrands) {
        finalCategoryBrands[cat] = [];
        const brandList = Object.values(parsedBrands[cat]);
        const maxSales = Math.max(...brandList.map(b => b.totalSales), 1);
        
        brandList.forEach(b => {
          const avgPrice = Math.round(b.totalPrice / b.count);
          const sales = b.totalSales;
          const avgDaysLeft = Math.round(b.totalDaysLeft / b.count);
          const pref = Math.round(50 + (sales / maxSales) * 45);
          const margin = 20 + (b.name.length % 15);
          const expiry = Math.max(0, Math.min(avgDaysLeft, 100));
          
          finalCategoryBrands[cat].push({
            name: b.name,
            price: avgPrice,
            sales: sales,
            margin: margin,
            expiry: expiry,
            pref: pref
          });
        });
      }
      
      categoryBrands = finalCategoryBrands;

      // Populate Select Categories Dropdown
      const selectEl = document.getElementById("categorySelect");
      selectEl.innerHTML = '<option value="">Select Category</option>';
      Object.keys(categoryBrands).forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        selectEl.appendChild(option);
      });
    }
  } catch (err) {
    console.warn("Failed to dynamically build categoryBrands, using mock", err);
  }
}

initComparison();

