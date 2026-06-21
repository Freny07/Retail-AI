const ctx = document.getElementById("wasteChart").getContext("2d");

const labels = ["Dispose", "Donate", "Discount", "Sale"];
let values = [3, 1, 9, 8];

const colors = {
  Dispose: "#dc2626",
  Donate: "#2563eb",
  Discount: "#ea580c",
  Sale: "#16a34a",
};

let activeIndex = null;

/* ---------- Create Chart ---------- */
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels,
    datasets: [{
      data: values,
      backgroundColor: labels.map(l => colors[l]),
      borderRadius: 14,
      borderSkipped: false,
      hoverBackgroundColor: labels.map(l => colors[l]+"cc"),
      barPercentage: 0.65
    }]
  },
  options: {
    responsive:true,
    maintainAspectRatio:false,
    animation: { duration:1000, easing:"easeOutQuart" },
    onClick: (_, elements) => { if(elements.length) setActive(elements[0].index); },
    plugins: {
      legend: { display:false },
      tooltip: {
        backgroundColor:"#020617",
        titleColor:"#e5e7eb",
        bodyColor:"#c7d2fe",
        padding:12,
        cornerRadius:10
      }
    },
    scales:{
      x:{
        grid:{display:false},
        ticks:{ color:"#64748b", font:{weight:"600"} }
      },
      y:{
        beginAtZero:true,
        ticks:{ stepSize:1, color:"#64748b", font:{weight:"600"} },
        grid:{ display:false }
      },
    },
  }
});

/* ---------- Card Interaction ---------- */
const cards = document.querySelectorAll(".card");

function setActive(index){
  activeIndex = index;

  chart.data.datasets[0].backgroundColor = labels.map((l,i) =>
    i===index ? `linear-gradient(180deg, ${colors[l]} 0%, rgba(255,255,255,0.6) 80%)` : colors[l]+"55"
  );
  chart.update();

  cards.forEach((card,i)=> card.classList.toggle("active", i===index));
}

cards.forEach((card,index)=>{
  card.addEventListener("click", ()=>setActive(index));
});

async function initWaste() {
  try {
    const products = await window.getInventoryData([]);
    if (products && products.length > 0) {
      let dispose = 0;
      let donate = 0;
      let discount = 0;
      let sale = 0;
      
      products.forEach(p => {
        const days = p.daysLeft;
        if (days <= 0) {
          dispose++;
        } else if (days <= 3) {
          if (p.unitsSold < 10) {
            donate++;
          } else {
            dispose++;
          }
        } else if (days <= 10) {
          discount++;
        } else if (days <= 30) {
          sale++;
        }
      });
      
      values[0] = dispose;
      values[1] = donate;
      values[2] = discount;
      values[3] = sale;
      
      document.getElementById("disposeCount").innerText = dispose;
      document.getElementById("donateCount").innerText = donate;
      document.getElementById("discountCount").innerText = discount;
      document.getElementById("saleCount").innerText = sale;
      
      chart.data.datasets[0].data = values;
      chart.update();
    }
  } catch (err) {
    console.warn("Failed to load dynamic waste overview", err);
  }
}

initWaste();

