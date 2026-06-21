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

const darkBtn = document.getElementById("darkToggle") || document.getElementById("themeToggle");

if(localStorage.getItem("darkMode")==="on"){
  document.body.classList.add("dark");
}

if (darkBtn) {
  darkBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode",
      document.body.classList.contains("dark") ? "on" : "off"
    );
  });

  darkBtn.addEventListener("click",()=>{
    setTimeout(()=>lucide.createIcons(),100);
  });
}

/* ==========================================================
   DYNAMIC CSV PARSING & DATA GETTER UTILITIES (GLOBAL)
   ========================================================== */

window.parseCSV = function(csvString) {
  if (!csvString) return [];
  const lines = csvString.split(/\r?\n/).filter(line => line.trim() !== "");
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(",").map(h => h.trim());
  const headerMap = {};
  headers.forEach((h, index) => {
    const normalized = h.toLowerCase().replace(/[\s-_]/g, "");
    headerMap[normalized] = index;
  });
  
  const getIndex = (name) => headerMap[name.toLowerCase().replace(/[\s-_]/g, "")];
  
  const nameIdx = getIndex("Product_name");
  const brandIdx = getIndex("Brand");
  const catIdx = getIndex("Category");
  const priceIdx = getIndex("Price");
  const stockIdx = getIndex("Stock");
  const soldIdx = getIndex("Units_sold");
  const expiryIdx = getIndex("Expiry_date");
  
  const products = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",").map(cell => cell.trim().replace(/^["']|["']$/g, ""));
    if (row.length < headers.length) continue;
    
    const expiryStr = row[expiryIdx] || "";
    let daysLeft = 10;
    if (expiryStr) {
      const expDate = new Date(expiryStr);
      const today = new Date();
      expDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      const diffTime = expDate - today;
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    products.push({
      name: row[nameIdx] || "Unknown Product",
      brand: row[brandIdx] || "Generic",
      category: row[catIdx] || "Uncategorized",
      price: parseFloat(row[priceIdx]) || 0,
      stock: parseInt(row[stockIdx], 10) || 0,
      unitsSold: parseInt(row[soldIdx], 10) || 0,
      expiryDate: expiryStr,
      daysLeft: daysLeft
    });
  }
  return products;
};

window.getInventoryData = async function(defaultMockData = []) {
  // 1. Try backend
  try {
    const headers = {};
    const token = localStorage.getItem("gumasto_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch("http://localhost:5000/api/products", { headers });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        console.log("Loaded inventory from Backend API");
        return data.map(p => {
          const daysLeft = p.expiryDate ? Math.ceil((new Date(p.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) : 10;
          return {
            name: p.name,
            brand: p.brand || "Generic",
            category: p.category || "Uncategorized",
            price: p.price || 0,
            stock: p.stock || 0,
            unitsSold: p.sales || 0,
            expiryDate: p.expiryDate || "",
            daysLeft: daysLeft
          };
        });
      }
    }
  } catch (e) {
    console.warn("Failed to fetch from backend API, falling back to CSV/Mock:", e);
  }

  // 2. Try localStorage CSV
  try {
    const csvStr = localStorage.getItem("inventoryCSV");
    if (csvStr) {
      const parsed = window.parseCSV(csvStr);
      if (parsed && parsed.length > 0) {
        console.log("Loaded inventory from Local CSV storage");
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to parse local CSV storage:", e);
  }

  // 3. Fallback to default mock
  console.log("Loaded default mock inventory");
  return defaultMockData;
};



