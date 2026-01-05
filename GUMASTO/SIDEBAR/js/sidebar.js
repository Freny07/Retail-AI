let collapsed = false;

const links = [
  { name: "Dashboard", path: "dashboard.html", icon: "layout-dashboard" },
  { name: "Inventory", path: "inventory.html", icon: "boxes" },
  { name: "Discounts", path: "discounts.html", icon: "tag" },
  { name: "Trends", path: "trends.html", icon: "trending-up" },
  { name: "Waste", path: "waste.html", icon: "trash-2" },
  { name: "Simulation", path: "simulation.html", icon: "layers" },
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



function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  sb.classList.toggle("collapsed");
  
  
  document.querySelectorAll(".sb-text").forEach((e) => {
    e.style.display = sb.classList.contains("collapsed") ? "none" : "inline";
  });
}
