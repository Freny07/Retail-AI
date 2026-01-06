const products = [
 { name:"Milk", daysLeft:2, category:"Dairy" },
 { name:"Bread", daysLeft:3, category:"Bakery" },
 { name:"Yogurt", daysLeft:6, category:"Dairy" },
 { name:"Chips", daysLeft:25, category:"Snacks" },
 { name:"Juice", daysLeft:8, category:"Beverages" },
 { name:"Butter", daysLeft:15, category:"Dairy" }
];

function getRisk(d){
  if(d <= 3) return "HIGH";
  if(d <= 7) return "MEDIUM";
  return "SAFE";
}

let filter = "ALL";

function render(){
  const tb = document.getElementById("invBody");
  tb.innerHTML = "";

  products
    .filter(p => filter === "ALL" || getRisk(p.daysLeft) === filter)
    .forEach(p => {
      const r = getRisk(p.daysLeft);

      tb.innerHTML += `
        <tr data-risk="${r}">
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.daysLeft}</td>
          <td>
            <span class="risk-badge risk-${r.toLowerCase()}">${r}</span>
          </td>
        </tr>
      `;
    });
}

document.querySelectorAll(".f").forEach(b=>{
  b.onclick = () => {
    document.querySelectorAll(".f").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    filter = b.dataset.f;
    render();
  };
});

render();
