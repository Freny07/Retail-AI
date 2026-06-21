const ctx = document.getElementById("demandChart");
let chart;

let monthly = {
  labels: ["Jan","Feb","Mar","Apr","May","Jun"],
  data: [420,680,510,740,820,760]
};

let weekly = {
  labels: ["W1","W2","W3","W4"],
  data: [160,210,190,240]
};

function draw(data){
  if(chart) chart.destroy();

  chart = new Chart(ctx,{
    type:"line",
    data:{
      labels:data.labels,
      datasets:[{
        data:data.data,
        borderColor:"#38bdf8",
        borderWidth:4,
        tension:.45,
        pointRadius:6,
        pointHoverRadius:8,
        pointBackgroundColor:"#fff",
        pointBorderColor:"#38bdf8",
        pointBorderWidth:3
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{
        x:{ grid:{display:false}, ticks:{color:"#64748b"} },
        y:{ grid:{color:"#e5e7eb",borderDash:[4,4]}, ticks:{color:"#64748b"} }
      }
    }
  });
}

async function initTrends() {
  try {
    const products = await window.getInventoryData([]);
    if (products && products.length > 0) {
      let totalSales = 0;
      let totalStock = 0;
      const catSales = {};
      let underperforming = 0;
      
      products.forEach(p => {
        totalSales += (p.unitsSold || 0);
        totalStock += (p.stock || 0);
        catSales[p.category] = (catSales[p.category] || 0) + (p.unitsSold || 0);
        if (p.stock > 100 && (p.unitsSold || 0) < 5) {
          underperforming++;
        }
      });
      
      const growthVal = Math.round(10 + (totalSales / Math.max(totalStock, 1)) * 30);
      document.getElementById("predictedGrowthVal").innerText = `+${growthVal}%`;
      
      let bestCat = "Dairy & Beverages";
      let maxCatSales = -1;
      for (const cat in catSales) {
        if (catSales[cat] > maxCatSales) {
          maxCatSales = catSales[cat];
          bestCat = cat;
        }
      }
      document.getElementById("highDemandCategoryVal").innerText = bestCat;
      document.getElementById("underperformingSKUsVal").innerText = underperforming;
      
      const baseMonthly = Math.round(totalSales / 6) || 100;
      monthly.data = [
        Math.round(baseMonthly * 0.7),
        Math.round(baseMonthly * 1.1),
        Math.round(baseMonthly * 0.9),
        Math.round(baseMonthly * 1.2),
        Math.round(baseMonthly * 1.4),
        Math.round(baseMonthly * 1.3)
      ];
      
      const baseWeekly = Math.round(totalSales / 4) || 60;
      weekly.data = [
        Math.round(baseWeekly * 0.8),
        Math.round(baseWeekly * 1.1),
        Math.round(baseWeekly * 0.95),
        Math.round(baseWeekly * 1.2)
      ];
      
      document.getElementById("trendsInsightChip").innerHTML = `
        🤖 AI Insight: Demand peaks during May–June for ${bestCat}. Pre-stocking is highly recommended.
      `;
    }
  } catch (err) {
    console.warn("Failed to load dynamic trends data", err);
  }
  draw(monthly);
}

initTrends();

/* TOGGLE */
document.querySelectorAll(".forecast-toggle button").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll(".forecast-toggle button")
      .forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    b.dataset.range==="weekly" ? draw(weekly) : draw(monthly);
  };
});

/* THEME */
const t=document.getElementById("themeToggle");
t.onclick=()=>{
  document.body.classList.toggle("dark");
  t.innerHTML=document.body.classList.contains("dark")
    ?'<i data-lucide="sun"></i>'
    :'<i data-lucide="moon"></i>';
  lucide.createIcons();
};
