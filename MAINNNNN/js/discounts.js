const products=[
 {name:"Milk",brand:"Amul",days:2,sales:3,stock:20,cat:"Dairy",price:60,cost:40},
 {name:"Bread",brand:"Britannia",days:5,sales:6,stock:35,cat:"Bakery",price:40,cost:25},
 {name:"Chips",brand:"Lays",days:30,sales:2,stock:50,cat:"Snacks",price:50,cost:30},
 {name:"Juice",brand:"Real",days:7,sales:10,stock:18,cat:"Beverages",price:80,cost:50}
];

function getDiscount(d,s,sens){
 if(d<=2)return 35+sens;
 if(d<=5&&s<5)return 20+sens;
 if(d<=7&&s<8)return 10+sens;
 return 0;
}

const sens=document.getElementById("sens");
const sensVal=document.getElementById("sensVal");
const tbody=document.getElementById("tbody");

function profitClass(val){
  if(val < 0) return "loss";
  if(val > 0) return "profit";
  return "neutral";
}

function rowClass(val){
  if(val < 0) return "row-loss";
  if(val > 0) return "row-profit";
  return "";
}

function render(){
 sensVal.innerText=sens.value;
 tbody.innerHTML="";

 products.forEach(p=>{
  const dis=getDiscount(p.days,p.sales,+sens.value);
  const amt=Math.round(p.price*dis/100);
  const fin=p.price-amt;
  const prof=fin-p.cost;

  tbody.innerHTML+=`
   <tr class="${rowClass(prof)}">
    <td>${p.name}</td>
    <td>${p.brand}</td>
    <td>${p.cat}</td>
    <td>${p.stock}</td>
    <td>${p.sales}</td>
    <td>${p.days}</td>
    <td>₹${p.price}</td>
    <td>${dis?`-₹${amt} (${dis}%)`:"—"}</td>
    <td>₹${fin}</td>
    <td>
      <span class="pl-badge ${profitClass(prof)}">
        ${prof>=0?`+₹${prof}`:`-₹${Math.abs(prof)}`}
      </span>
    </td>
    <td>${dis?`${dis}% OFF`:"Stable"}</td>
   </tr>`;
 });
}

sens.oninput=render;
render();
lucide.createIcons();
