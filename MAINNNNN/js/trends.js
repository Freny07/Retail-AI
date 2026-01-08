const ctx = document.getElementById("demandChart");
let chart;

const monthly = {
  labels: ["Jan","Feb","Mar","Apr","May","Jun"],
  data: [420,680,510,740,820,760]
};

const weekly = {
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

draw(monthly);

/* TOGGLE */
document.querySelectorAll(".forecast-toggle button").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll(".forecast-toggle button")
      .forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    b.dataset.range==="weekly" ? draw(weekly) : draw(monthly);
  };
});
