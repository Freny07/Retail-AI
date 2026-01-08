let collapsed = false;
console.log("sidebar.js loaded");

const links = [
  { name: "Dashboard", path: "dashboard.html", icon: "layout-dashboard" },
  { name: "Inventory", path: "inventory.html", icon: "boxes" },
  { name: "Discounts", path: "discount.html", icon: "tag" },
  { name: "Trends", path: "trends.html", icon: "trending-up" },
  { name: "Waste Management", path: "waste.html", icon: "trash-2" },
  { name: "Placement", path: "placement.html", icon: "eye" },
  { name: "Comparison", path: "comparison.html", icon: "bar-chart-2" },
];
let arr = document.getElementById("arrow");
function loadSidebar() {
  const nav = document.getElementById("navLinks");
  const cur = location.pathname.split("/").pop();
  nav.innerHTML = links
    .map((l) => {
      const a = l.path === cur ? "active" : "";
      return `<a href="${l.path}" class="${a}">
    <i data-lucide="${l.icon}"></i>
    <span class="sb-text">${l.name}</span></a>`;
    })
    .join("");

  lucide.createIcons();
}

function toggleSidebar(){
  const sb = document.getElementById("sidebar");
  sb.classList.toggle("collapsed");

  const arrow = document.getElementById("arrow");
  arrow.style.transform = sb.classList.contains("collapsed")
    ? "rotate(180deg)"
    : "rotate(0deg)";

  document.querySelectorAll(".sb-text").forEach(e=>{
    e.style.display = sb.classList.contains("collapsed") ? "none" : "inline";
  });

  document.getElementById("logo-full").style.display =
    sb.classList.contains("collapsed") ? "none" : "block";

  document.getElementById("logo-icon").style.display =
    sb.classList.contains("collapsed") ? "block" : "none";
}

const darkBtn = document.getElementById("darkToggle");

if(localStorage.getItem("darkMode")==="on"){
  document.body.classList.add("dark");
}

darkBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode",
    document.body.classList.contains("dark") ? "on" : "off"
  );
});

document.getElementById("darkToggle").addEventListener("click",()=>{
  setTimeout(()=>lucide.createIcons(),100);
});


