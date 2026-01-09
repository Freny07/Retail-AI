const products = [
  // ===== DAIRY (1–15) =====
  { name: "Amul Milk", category: "Dairy", daysLeft: 2 },
  { name: "Mother Dairy Milk", category: "Dairy", daysLeft: 3 },
  { name: "Nestle Yogurt", category: "Dairy", daysLeft: 6 },
  { name: "Amul Butter", category: "Dairy", daysLeft: 15 },
  { name: "Amul Cheese Slices", category: "Dairy", daysLeft: 20 },
  { name: "Britannia Cheese Block", category: "Dairy", daysLeft: 18 },
  { name: "Epigamia Greek Yogurt", category: "Dairy", daysLeft: 5 },
  { name: "Gowardhan Ghee", category: "Dairy", daysLeft: 120 },
  { name: "Vita Milk", category: "Dairy", daysLeft: 4 },
  { name: "Heritage Curd", category: "Dairy", daysLeft: 3 },
  { name: "Amul Fresh Cream", category: "Dairy", daysLeft: 7 },
  { name: "Nestle Slim Milk", category: "Dairy", daysLeft: 5 },
  { name: "Kwality Ice Cream", category: "Dairy", daysLeft: 45 },
  { name: "Mother Dairy Paneer", category: "Dairy", daysLeft: 6 },
  { name: "Amul Lassi", category: "Dairy", daysLeft: 10 },

  // ===== BAKERY (16–30) =====
  { name: "Britannia Bread", category: "Bakery", daysLeft: 3 },
  { name: "Harvest Gold Bread", category: "Bakery", daysLeft: 4 },
  { name: "Modern Bread", category: "Bakery", daysLeft: 6 },
  { name: "Britannia Cake", category: "Bakery", daysLeft: 10 },
  { name: "Britannia Little Hearts", category: "Bakery", daysLeft: 90 },
  { name: "Sunfeast Cookies", category: "Bakery", daysLeft: 120 },
  { name: "Britannia Rusk", category: "Bakery", daysLeft: 150 },
  { name: "Modern Buns", category: "Bakery", daysLeft: 5 },
  { name: "Elite Breadsticks", category: "Bakery", daysLeft: 60 },
  { name: "Britannia Muffins", category: "Bakery", daysLeft: 8 },
  { name: "English Oven Bread", category: "Bakery", daysLeft: 4 },
  { name: "Britannia Swiss Roll", category: "Bakery", daysLeft: 20 },
  { name: "Karachi Bakery Biscuits", category: "Bakery", daysLeft: 180 },
  { name: "Cadbury Lickables Cake", category: "Bakery", daysLeft: 30 },
  { name: "Britannia Brown Bread", category: "Bakery", daysLeft: 3 },

  // ===== SNACKS (31–45) =====
  { name: "Lays Classic Chips", category: "Snacks", daysLeft: 25 },
  { name: "Bingo Mad Angles", category: "Snacks", daysLeft: 30 },
  { name: "Haldiram Aloo Bhujia", category: "Snacks", daysLeft: 40 },
  { name: "Kurkure Masala Munch", category: "Snacks", daysLeft: 35 },
  { name: "Uncle Chips", category: "Snacks", daysLeft: 28 },
  { name: "Pringles Original", category: "Snacks", daysLeft: 120 },
  { name: "Doritos Nacho", category: "Snacks", daysLeft: 90 },
  { name: "Haldiram Moong Dal", category: "Snacks", daysLeft: 60 },
  { name: "Too Yumm Chips", category: "Snacks", daysLeft: 22 },
  { name: "Peppy Tomato Discs", category: "Snacks", daysLeft: 18 },
  { name: "Act II Popcorn", category: "Snacks", daysLeft: 150 },
  { name: "Bikano Bhujia", category: "Snacks", daysLeft: 70 },
  { name: "Kettle Studio Chips", category: "Snacks", daysLeft: 55 },
  { name: "Cornitos Nachos", category: "Snacks", daysLeft: 65 },
  { name: "MTR Chakli", category: "Snacks", daysLeft: 200 },

  // ===== BEVERAGES (46–60) =====
  { name: "Coca Cola", category: "Beverages", daysLeft: 8 },
  { name: "Pepsi", category: "Beverages", daysLeft: 12 },
  { name: "Sprite", category: "Beverages", daysLeft: 15 },
  { name: "Thums Up", category: "Beverages", daysLeft: 10 },
  { name: "Fanta", category: "Beverages", daysLeft: 18 },
  { name: "Real Orange Juice", category: "Beverages", daysLeft: 20 },
  { name: "Tropicana Apple Juice", category: "Beverages", daysLeft: 25 },
  { name: "Paper Boat Aam Panna", category: "Beverages", daysLeft: 30 },
  { name: "Minute Maid Pulpy", category: "Beverages", daysLeft: 22 },
  { name: "Red Bull Energy Drink", category: "Beverages", daysLeft: 365 },
  { name: "Monster Energy", category: "Beverages", daysLeft: 300 },
  { name: "Nescafe Cold Coffee", category: "Beverages", daysLeft: 90 },
  { name: "Bru Coffee", category: "Beverages", daysLeft: 400 },
  { name: "Lipton Green Tea", category: "Beverages", daysLeft: 500 },
  { name: "Tata Tea Gold", category: "Beverages", daysLeft: 450 },

  // ===== ELECTRONICS (61–75) =====
  { name: "Samsung Earphones", category: "Electronics", daysLeft: 300 },
  { name: "Sony Headphones", category: "Electronics", daysLeft: 400 },
  { name: "Boat Airdopes", category: "Electronics", daysLeft: 350 },
  { name: "MI Power Bank", category: "Electronics", daysLeft: 600 },
  { name: "Apple USB Cable", category: "Electronics", daysLeft: 700 },
  { name: "Realme Charger", category: "Electronics", daysLeft: 500 },
  { name: "Logitech Mouse", category: "Electronics", daysLeft: 800 },
  { name: "HP Keyboard", category: "Electronics", daysLeft: 750 },
  { name: "SanDisk Pendrive", category: "Electronics", daysLeft: 900 },
  { name: "TP-Link Router", category: "Electronics", daysLeft: 1000 },
  { name: "Dell Monitor", category: "Electronics", daysLeft: 1200 },
  { name: "Lenovo Laptop Bag", category: "Electronics", daysLeft: 850 },
  { name: "JBL Bluetooth Speaker", category: "Electronics", daysLeft: 650 },
  { name: "Canon Printer Ink", category: "Electronics", daysLeft: 200 },
  { name: "Epson Ink Bottle", category: "Electronics", daysLeft: 180 },

  // ===== BABY PRODUCTS (76–90) =====
  { name: "Pampers Diapers", category: "Baby Products", daysLeft: 90 },
  { name: "Huggies Diapers", category: "Baby Products", daysLeft: 100 },
  { name: "Johnson Baby Oil", category: "Baby Products", daysLeft: 120 },
  { name: "Himalaya Baby Lotion", category: "Baby Products", daysLeft: 150 },
  { name: "Mamaearth Baby Shampoo", category: "Baby Products", daysLeft: 200 },
  { name: "Sebamed Baby Wash", category: "Baby Products", daysLeft: 180 },
  { name: "Mee Mee Baby Cream", category: "Baby Products", daysLeft: 160 },
  { name: "Johnson Baby Powder", category: "Baby Products", daysLeft: 220 },
  { name: "Nestle Cerelac", category: "Baby Products", daysLeft: 60 },
  { name: "Farex Baby Cereal", category: "Baby Products", daysLeft: 55 },
  { name: "Baby Dove Soap", category: "Baby Products", daysLeft: 300 },
  { name: "Chicco Baby Wipes", category: "Baby Products", daysLeft: 250 },
  { name: "Pigeon Feeding Bottle", category: "Baby Products", daysLeft: 500 },
  { name: "Philips Avent Bottle", category: "Baby Products", daysLeft: 600 },
  { name: "Babyhug Cotton Bibs", category: "Baby Products", daysLeft: 700 },

  // ===== TOYS (91–100) =====
  { name: "Lego Classic Blocks", category: "Toys", daysLeft: 1000 },
  { name: "Hot Wheels Car", category: "Toys", daysLeft: 1200 },
  { name: "Funskool Puzzle", category: "Toys", daysLeft: 900 },
  { name: "Barbie Doll", category: "Toys", daysLeft: 1500 },
  { name: "Remote Control Car", category: "Toys", daysLeft: 800 },
  { name: "Nerf Gun", category: "Toys", daysLeft: 1400 },
  { name: "Rubik’s Cube", category: "Toys", daysLeft: 2000 },
  { name: "Toy Train Set", category: "Toys", daysLeft: 1100 },
  { name: "Plush Teddy Bear", category: "Toys", daysLeft: 1800 },
  { name: "Kids Building Blocks", category: "Toys", daysLeft: 1300 }
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
      const r = getRisk(p.daysLeft).toLowerCase();

      tb.innerHTML += `
        <tr class="row-${r}">
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.daysLeft}</td>
          <td>
            <span class="risk-badge risk-${r}">
              ${r.toUpperCase()}
            </span>
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
