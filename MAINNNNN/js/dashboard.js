const countrySelect = document.getElementById("countrySelect");
const currencySelect = document.getElementById("currencySelect");
const uploadBtn = document.getElementById("uploadBtn");
const csvInput = document.getElementById("csvFile");

/* ===============================
   LOAD COUNTRIES & CURRENCIES
   =============================== */

fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(countries => {
    countrySelect.innerHTML =
      `<option value="">Select country</option>`;

    countries
      .filter(c => c.currencies && c.name?.common)
      .sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      )
      .forEach(country => {
        const currencyCode =
          Object.keys(country.currencies)[0];
        const currency =
          country.currencies[currencyCode];

        const option = document.createElement("option");

        option.value = JSON.stringify({
          country: country.name.common,
          currencyCode: currencyCode,
          currencyName: currency.name,
          symbol: currency.symbol || ""
        });

        option.textContent =
          `${country.name.common} (${currencyCode} ${currency.symbol || ""})`;

        countrySelect.appendChild(option);
      });
  })
  .catch(() => {
    countrySelect.innerHTML =
      `<option>Error loading countries</option>`;
  });

/* ===============================
   COUNTRY → CURRENCY LINK
   =============================== */

countrySelect.addEventListener("change", () => {
  if (!countrySelect.value) {
    currencySelect.disabled = true;
    uploadBtn.disabled = true;
    currencySelect.innerHTML =
      `<option>Auto-selected</option>`;
    return;
  }

  const data = JSON.parse(countrySelect.value);

  currencySelect.disabled = false;
  currencySelect.innerHTML = `
    <option value="${data.currencyCode}">
      ${data.currencyName} (${data.currencyCode} ${data.symbol})
    </option>
  `;

  uploadBtn.disabled = false;

  // store for later use
  localStorage.setItem("country", data.country);
  localStorage.setItem("currency", data.currencyCode);
  localStorage.setItem("currencySymbol", data.symbol);
});

/* ===============================
   CSV UPLOAD (UNCHANGED LOGIC)
   =============================== */

uploadBtn.addEventListener("click", () => csvInput.click());

csvInput.addEventListener("change", () => {
  const file = csvInput.files[0];
  if (!file) return;

  const MAX_SIZE = 500 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    alert("CSV file size must be under 500MB");
    csvInput.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    localStorage.setItem("inventoryCSV", reader.result);
    alert(
      "CSV uploaded successfully.\n" +
      "Country & currency linked automatically."
    );
  };

  reader.readAsText(file);
});
