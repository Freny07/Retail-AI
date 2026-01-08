const ctx = document.getElementById("donateChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Dairy", "Bakery", "Beverages", "Grains"],
    datasets: [{
      label: "Items for Donation",
      data: [24, 18, 30, 60],
      backgroundColor: [
        "#2563eb",
        "#38bdf8",
        "#60a5fa",
        "#34d399"
      ],
      borderRadius: 14
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(15,23,42,0.08)" }
      },
      x: {
        grid: { display: false }
      }
    }
  }
});
