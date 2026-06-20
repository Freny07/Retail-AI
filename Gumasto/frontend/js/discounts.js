let products = [
  // ===== DAIRY =====
  {name:"Amul Milk",brand:"Amul",days:2,sales:15,stock:280,cat:"Dairy",price:52,cost:50},
  {name:"Mother Dairy Milk",brand:"Mother Dairy",days:3,sales:13,stock:260,cat:"Dairy",price:50,cost:48},
  {name:"Nestle Yogurt",brand:"Nestle",days:6,sales:7,stock:180,cat:"Dairy",price:70,cost:65},
  {name:"Amul Butter",brand:"Amul",days:15,sales:3,stock:130,cat:"Dairy",price:520,cost:420},
  {name:"Amul Cheese Slices",brand:"Amul",days:20,sales:2,stock:150,cat:"Dairy",price:650,cost:520},
  {name:"Britannia Cheese Block",brand:"Britannia",days:18,sales:2,stock:110,cat:"Dairy",price:720,cost:590},
  {name:"Epigamia Greek Yogurt",brand:"Epigamia",days:5,sales:6,stock:90,cat:"Dairy",price:90,cost:85},
  {name:"Gowardhan Ghee",brand:"Gowardhan",days:120,sales:1,stock:75,cat:"Dairy",price:680,cost:540},
  {name:"Vita Milk",brand:"Vita",days:4,sales:10,stock:210,cat:"Dairy",price:54,cost:51},
  {name:"Heritage Curd",brand:"Heritage",days:3,sales:12,stock:170,cat:"Dairy",price:48,cost:46},
  {name:"Amul Fresh Cream",brand:"Amul",days:7,sales:6,stock:120,cat:"Dairy",price:80,cost:72},
  {name:"Nestle Slim Milk",brand:"Nestle",days:5,sales:8,stock:160,cat:"Dairy",price:60,cost:55},
  {name:"Kwality Ice Cream",brand:"Kwality",days:45,sales:2,stock:95,cat:"Dairy",price:180,cost:140},
  {name:"Mother Dairy Paneer",brand:"Mother Dairy",days:6,sales:9,stock:85,cat:"Dairy",price:340,cost:310},
  {name:"Amul Lassi",brand:"Amul",days:10,sales:5,stock:140,cat:"Dairy",price:70,cost:60},

  // ===== BAKERY =====
  {name:"Britannia Bread",brand:"Britannia",days:3,sales:10,stock:220,cat:"Bakery",price:40,cost:38},
  {name:"Harvest Gold Bread",brand:"Harvest Gold",days:4,sales:8,stock:190,cat:"Bakery",price:42,cost:39},
  {name:"Modern Bread",brand:"Modern",days:6,sales:6,stock:170,cat:"Bakery",price:45,cost:41},
  {name:"Britannia Cake",brand:"Britannia",days:10,sales:4,stock:140,cat:"Bakery",price:120,cost:100},
  {name:"Britannia Little Hearts",brand:"Britannia",days:90,sales:2,stock:210,cat:"Bakery",price:180,cost:140},
  {name:"Sunfeast Cookies",brand:"Sunfeast",days:120,sales:2,stock:230,cat:"Bakery",price:160,cost:130},
  {name:"Britannia Rusk",brand:"Britannia",days:150,sales:1,stock:260,cat:"Bakery",price:90,cost:70},
  {name:"Modern Buns",brand:"Modern",days:5,sales:7,stock:130,cat:"Bakery",price:35,cost:32},
  {name:"Elite Breadsticks",brand:"Elite",days:60,sales:2,stock:120,cat:"Bakery",price:150,cost:120},
  {name:"Britannia Muffins",brand:"Britannia",days:8,sales:5,stock:140,cat:"Bakery",price:60,cost:50},
  {name:"English Oven Bread",brand:"English Oven",days:4,sales:9,stock:200,cat:"Bakery",price:42,cost:39},
  {name:"Britannia Swiss Roll",brand:"Britannia",days:20,sales:3,stock:160,cat:"Bakery",price:90,cost:72},
  {name:"Karachi Bakery Biscuits",brand:"Karachi Bakery",days:180,sales:1,stock:300,cat:"Bakery",price:200,cost:160},
  {name:"Cadbury Lickables Cake",brand:"Cadbury",days:30,sales:2,stock:180,cat:"Bakery",price:140,cost:110},
  {name:"Britannia Brown Bread",brand:"Britannia",days:3,sales:11,stock:210,cat:"Bakery",price:40,cost:38},

  // ===== SNACKS =====
  {name:"Lays Classic Chips",brand:"Lays",days:25,sales:4,stock:260,cat:"Snacks",price:50,cost:43},
  {name:"Bingo Mad Angles",brand:"Bingo",days:30,sales:3,stock:240,cat:"Snacks",price:45,cost:39},
  {name:"Haldiram Aloo Bhujia",brand:"Haldiram",days:40,sales:2,stock:300,cat:"Snacks",price:120,cost:105},
  {name:"Kurkure Masala Munch",brand:"Kurkure",days:35,sales:3,stock:270,cat:"Snacks",price:55,cost:48},
  {name:"Uncle Chips",brand:"Uncle Chips",days:28,sales:4,stock:250,cat:"Snacks",price:40,cost:34},
  {name:"Pringles Original",brand:"Pringles",days:120,sales:1,stock:90,cat:"Snacks",price:180,cost:140},
  {name:"Doritos Nacho",brand:"Doritos",days:90,sales:1,stock:100,cat:"Snacks",price:160,cost:125},
  {name:"Haldiram Moong Dal",brand:"Haldiram",days:60,sales:2,stock:220,cat:"Snacks",price:130,cost:110},
  {name:"Too Yumm Chips",brand:"Too Yumm",days:22,sales:5,stock:200,cat:"Snacks",price:48,cost:42},
  {name:"Peppy Tomato Discs",brand:"Peppy",days:18,sales:6,stock:180,cat:"Snacks",price:45,cost:39},
  {name:"Act II Popcorn",brand:"Act II",days:150,sales:1,stock:200,cat:"Snacks",price:140,cost:110},
  {name:"Bikano Bhujia",brand:"Bikano",days:70,sales:2,stock:210,cat:"Snacks",price:125,cost:105},
  {name:"Kettle Studio Chips",brand:"Kettle Studio",days:55,sales:2,stock:170,cat:"Snacks",price:160,cost:130},
  {name:"Cornitos Nachos",brand:"Cornitos",days:65,sales:2,stock:180,cat:"Snacks",price:150,cost:120},
  {name:"MTR Chakli",brand:"MTR",days:200,sales:1,stock:190,cat:"Snacks",price:170,cost:140},

  // ===== BEVERAGES =====
  {name:"Coca Cola",brand:"Coca Cola",days:8,sales:8,stock:300,cat:"Beverages",price:90,cost:70},
  {name:"Pepsi",brand:"Pepsi",days:12,sales:7,stock:280,cat:"Beverages",price:90,cost:72},
  {name:"Sprite",brand:"Sprite",days:15,sales:6,stock:260,cat:"Beverages",price:90,cost:74},
  {name:"Thums Up",brand:"Thums Up",days:10,sales:7,stock:290,cat:"Beverages",price:95,cost:76},
  {name:"Fanta",brand:"Fanta",days:18,sales:5,stock:240,cat:"Beverages",price:85,cost:70},
  {name:"Real Orange Juice",brand:"Real",days:20,sales:4,stock:210,cat:"Beverages",price:110,cost:90},
  {name:"Tropicana Apple Juice",brand:"Tropicana",days:25,sales:3,stock:200,cat:"Beverages",price:115,cost:95},
  {name:"Paper Boat Aam Panna",brand:"Paper Boat",days:30,sales:3,stock:180,cat:"Beverages",price:120,cost:98},
  {name:"Minute Maid Pulpy",brand:"Minute Maid",days:22,sales:4,stock:190,cat:"Beverages",price:105,cost:86},
  {name:"Red Bull Energy Drink",brand:"Red Bull",days:365,sales:1,stock:150,cat:"Beverages",price:140,cost:90},
  {name:"Monster Energy",brand:"Monster",days:300,sales:1,stock:140,cat:"Beverages",price:150,cost:100},
  {name:"Nescafe Cold Coffee",brand:"Nescafe",days:90,sales:2,stock:160,cat:"Beverages",price:130,cost:105},
  {name:"Bru Coffee",brand:"Bru",days:400,sales:1,stock:130,cat:"Beverages",price:180,cost:140},
  {name:"Lipton Green Tea",brand:"Lipton",days:500,sales:1,stock:120,cat:"Beverages",price:220,cost:170},
  {name:"Tata Tea Gold",brand:"Tata",days:450,sales:1,stock:110,cat:"Beverages",price:240,cost:190},

  // ===== ELECTRONICS =====
  {name:"Samsung Earphones",brand:"Samsung",days:300,sales:1,stock:60,cat:"Electronics",price:1200,cost:900},
  {name:"Sony Headphones",brand:"Sony",days:400,sales:1,stock:55,cat:"Electronics",price:3200,cost:2500},
  {name:"Boat Airdopes",brand:"Boat",days:350,sales:1,stock:58,cat:"Electronics",price:2500,cost:1700},
  {name:"MI Power Bank",brand:"MI",days:600,sales:1,stock:45,cat:"Electronics",price:2200,cost:1500},
  {name:"Apple USB Cable",brand:"Apple",days:700,sales:1,stock:50,cat:"Electronics",price:1900,cost:1300},
  {name:"Realme Charger",brand:"Realme",days:500,sales:1,stock:52,cat:"Electronics",price:1500,cost:1100},
  {name:"Logitech Mouse",brand:"Logitech",days:800,sales:1,stock:40,cat:"Electronics",price:1800,cost:1300},
  {name:"HP Keyboard",brand:"HP",days:750,sales:1,stock:42,cat:"Electronics",price:1700,cost:1250},
  {name:"SanDisk Pendrive",brand:"SanDisk",days:900,sales:1,stock:48,cat:"Electronics",price:1400,cost:950},
  {name:"TP-Link Router",brand:"TP-Link",days:1000,sales:1,stock:35,cat:"Electronics",price:2800,cost:2100},
  {name:"Dell Monitor",brand:"Dell",days:1200,sales:1,stock:20,cat:"Electronics",price:12500,cost:9800},
  {name:"Lenovo Laptop Bag",brand:"Lenovo",days:850,sales:1,stock:45,cat:"Electronics",price:1800,cost:1300},
  {name:"JBL Bluetooth Speaker",brand:"JBL",days:650,sales:1,stock:38,cat:"Electronics",price:3500,cost:2700},
  {name:"Canon Printer Ink",brand:"Canon",days:200,sales:1,stock:70,cat:"Electronics",price:900,cost:780},
  {name:"Epson Ink Bottle",brand:"Epson",days:180,sales:1,stock:65,cat:"Electronics",price:850,cost:730},

  // ===== BABY PRODUCTS =====
  {name:"Pampers Diapers",brand:"Pampers",days:90,sales:2,stock:200,cat:"Baby Products",price:900,cost:650},
  {name:"Huggies Diapers",brand:"Huggies",days:100,sales:2,stock:210,cat:"Baby Products",price:880,cost:640},
  {name:"Johnson Baby Oil",brand:"Johnson",days:120,sales:2,stock:180,cat:"Baby Products",price:350,cost:260},
  {name:"Himalaya Baby Lotion",brand:"Himalaya",days:150,sales:2,stock:170,cat:"Baby Products",price:330,cost:240},
  {name:"Mamaearth Baby Shampoo",brand:"Mamaearth",days:200,sales:1,stock:160,cat:"Baby Products",price:420,cost:300},
  {name:"Sebamed Baby Wash",brand:"Sebamed",days:180,sales:1,stock:150,cat:"Baby Products",price:480,cost:340},
  {name:"Mee Mee Baby Cream",brand:"Mee Mee",days:160,sales:1,stock:140,cat:"Baby Products",price:260,cost:180},
  {name:"Johnson Baby Powder",brand:"Johnson",days:220,sales:1,stock:130,cat:"Baby Products",price:300,cost:210},
  {name:"Nestle Cerelac",brand:"Nestle",days:60,sales:3,stock:120,cat:"Baby Products",price:390,cost:310},
  {name:"Farex Baby Cereal",brand:"Farex",days:55,sales:3,stock:115,cat:"Baby Products",price:380,cost:300},
  {name:"Baby Dove Soap",brand:"Dove",days:300,sales:1,stock:140,cat:"Baby Products",price:180,cost:130},
  {name:"Chicco Baby Wipes",brand:"Chicco",days:250,sales:1,stock:150,cat:"Baby Products",price:220,cost:160},
  {name:"Pigeon Feeding Bottle",brand:"Pigeon",days:500,sales:1,stock:80,cat:"Baby Products",price:350,cost:250},
  {name:"Philips Avent Bottle",brand:"Philips",days:600,sales:1,stock:75,cat:"Baby Products",price:480,cost:360},
  {name:"Babyhug Cotton Bibs",brand:"Babyhug",days:700,sales:1,stock:90,cat:"Baby Products",price:260,cost:180},

  // ===== TOYS =====
  {name:"Lego Classic Blocks",brand:"Lego",days:1000,sales:1,stock:40,cat:"Toys",price:3500,cost:2600},
  {name:"Hot Wheels Car",brand:"Hot Wheels",days:1200,sales:1,stock:60,cat:"Toys",price:450,cost:300},
  {name:"Funskool Puzzle",brand:"Funskool",days:900,sales:1,stock:50,cat:"Toys",price:650,cost:480},
  {name:"Barbie Doll",brand:"Barbie",days:1500,sales:1,stock:35,cat:"Toys",price:2200,cost:1600},
  {name:"Remote Control Car",brand:"Generic",days:800,sales:1,stock:30,cat:"Toys",price:1800,cost:1300},
  {name:"Nerf Gun",brand:"Nerf",days:1400,sales:1,stock:25,cat:"Toys",price:3200,cost:2500},
  {name:"Rubik’s Cube",brand:"Rubiks",days:2000,sales:1,stock:70,cat:"Toys",price:250,cost:160},
  {name:"Toy Train Set",brand:"Funskool",days:1100,sales:1,stock:40,cat:"Toys",price:1500,cost:1100},
  {name:"Plush Teddy Bear",brand:"Generic",days:1800,sales:1,stock:45,cat:"Toys",price:900,cost:650},
  {name:"Kids Building Blocks",brand:"Generic",days:1300,sales:1,stock:50,cat:"Toys",price:1200,cost:900}
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

async function loadDiscounts() {
  try {
    const headers = {};
    const token = localStorage.getItem("gumasto_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch("http://localhost:5000/api/products", { headers });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();

    if (data && data.length > 0) {
      products = data.map(p => {
        const daysLeft = p.expiryDate ? Math.ceil((new Date(p.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) : 10;
        return {
          name: p.name,
          brand: p.brand || "Generic",
          cat: p.category || "Uncategorized",
          stock: p.stock || 0,
          sales: p.sales || 0,
          days: daysLeft,
          price: p.price || 0,
          cost: p.cost || Math.round(p.price * 0.8)
        };
      });
    }
  } catch (err) {
    console.warn("Could not fetch real products for discounts, displaying mockup data:", err);
  }
  render();
}

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
loadDiscounts();
lucide.createIcons();

