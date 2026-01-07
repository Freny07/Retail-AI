const countrySelect = document.getElementById("countrySelect");
const currencySelect = document.getElementById("currencySelect");
const uploadBtn = document.getElementById("uploadBtn");
const csvInput = document.getElementById("csvFile");
const errorMsg = document.createElement("div");
errorMsg.style.color = "#dc2626";
errorMsg.style.fontSize = "14px";
errorMsg.style.marginTop = "12px";
errorMsg.style.fontWeight = "600";
errorMsg.style.display = "none";
uploadBtn.insertAdjacentElement("afterend", errorMsg);


/* ===============================
   EMBEDDED WORLD COUNTRIES & CURRENCIES
   =============================== */

const countryCurrencyList = [
  { country: "Afghanistan", currencyCode: "AFN", currencyName: "Afghan Afghani", symbol: "؋" },
  { country: "Albania", currencyCode: "ALL", currencyName: "Albanian Lek", symbol: "L" },
  { country: "Algeria", currencyCode: "DZD", currencyName: "Algerian Dinar", symbol: "د.ج" },
  { country: "Andorra", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Angola", currencyCode: "AOA", currencyName: "Angolan Kwanza", symbol: "Kz" },
  { country: "Antigua and Barbuda", currencyCode: "XCD", currencyName: "East Caribbean Dollar", symbol: "$" },
  { country: "Argentina", currencyCode: "ARS", currencyName: "Argentine Peso", symbol: "$" },
  { country: "Armenia", currencyCode: "AMD", currencyName: "Armenian Dram", symbol: "֏" },
  { country: "Australia", currencyCode: "AUD", currencyName: "Australian Dollar", symbol: "$" },
  { country: "Austria", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Azerbaijan", currencyCode: "AZN", currencyName: "Azerbaijani Manat", symbol: "₼" },
  { country: "Bahamas", currencyCode: "BSD", currencyName: "Bahamian Dollar", symbol: "$" },
  { country: "Bahrain", currencyCode: "BHD", currencyName: "Bahraini Dinar", symbol: "ب.د" },
  { country: "Bangladesh", currencyCode: "BDT", currencyName: "Bangladeshi Taka", symbol: "৳" },
  { country: "Barbados", currencyCode: "BBD", currencyName: "Barbadian Dollar", symbol: "$" },
  { country: "Belarus", currencyCode: "BYN", currencyName: "Belarusian Ruble", symbol: "Br" },
  { country: "Belgium", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Belize", currencyCode: "BZD", currencyName: "Belize Dollar", symbol: "$" },
  { country: "Benin", currencyCode: "XOF", currencyName: "West African CFA Franc", symbol: "Fr" },
  { country: "Bhutan", currencyCode: "BTN", currencyName: "Bhutanese Ngultrum", symbol: "Nu." },
  { country: "Bolivia", currencyCode: "BOB", currencyName: "Bolivian Boliviano", symbol: "Bs." },
  { country: "Bosnia and Herzegovina", currencyCode: "BAM", currencyName: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  { country: "Botswana", currencyCode: "BWP", currencyName: "Botswana Pula", symbol: "P" },
  { country: "Brazil", currencyCode: "BRL", currencyName: "Brazilian Real", symbol: "R$" },
  { country: "Brunei", currencyCode: "BND", currencyName: "Brunei Dollar", symbol: "$" },
  { country: "Bulgaria", currencyCode: "BGN", currencyName: "Bulgarian Lev", symbol: "лв" },
  { country: "Burkina Faso", currencyCode: "XOF", currencyName: "West African CFA Franc", symbol: "Fr" },
  { country: "Burundi", currencyCode: "BIF", currencyName: "Burundian Franc", symbol: "Fr" },
  { country: "Cabo Verde", currencyCode: "CVE", currencyName: "Cape Verdean Escudo", symbol: "$" },
  { country: "Cambodia", currencyCode: "KHR", currencyName: "Cambodian Riel", symbol: "៛" },
  { country: "Cameroon", currencyCode: "XAF", currencyName: "Central African CFA Franc", symbol: "Fr" },
  { country: "Canada", currencyCode: "CAD", currencyName: "Canadian Dollar", symbol: "$" },
  { country: "Central African Republic", currencyCode: "XAF", currencyName: "Central African CFA Franc", symbol: "Fr" },
  { country: "Chad", currencyCode: "XAF", currencyName: "Central African CFA Franc", symbol: "Fr" },
  { country: "Chile", currencyCode: "CLP", currencyName: "Chilean Peso", symbol: "$" },
  { country: "China", currencyCode: "CNY", currencyName: "Chinese Yuan", symbol: "¥" },
  { country: "Colombia", currencyCode: "COP", currencyName: "Colombian Peso", symbol: "$" },
  { country: "Comoros", currencyCode: "KMF", currencyName: "Comorian Franc", symbol: "Fr" },
  { country: "Congo, Democratic Republic", currencyCode: "CDF", currencyName: "Congolese Franc", symbol: "Fr" },
  { country: "Congo, Republic", currencyCode: "XAF", currencyName: "Central African CFA Franc", symbol: "Fr" },
  { country: "Costa Rica", currencyCode: "CRC", currencyName: "Costa Rican Colón", symbol: "₡" },
  { country: "Croatia", currencyCode: "HRK", currencyName: "Croatian Kuna", symbol: "kn" },
  { country: "Cuba", currencyCode: "CUP", currencyName: "Cuban Peso", symbol: "$" },
  { country: "Cyprus", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Czech Republic", currencyCode: "CZK", currencyName: "Czech Koruna", symbol: "Kč" },
  { country: "Denmark", currencyCode: "DKK", currencyName: "Danish Krone", symbol: "kr" },
  { country: "Djibouti", currencyCode: "DJF", currencyName: "Djiboutian Franc", symbol: "Fr" },
  { country: "Dominica", currencyCode: "XCD", currencyName: "East Caribbean Dollar", symbol: "$" },
  { country: "Dominican Republic", currencyCode: "DOP", currencyName: "Dominican Peso", symbol: "$" },
  { country: "East Timor (Timor-Leste)", currencyCode: "USD", currencyName: "United States Dollar", symbol: "$" },
  { country: "Ecuador", currencyCode: "USD", currencyName: "United States Dollar", symbol: "$" },
  { country: "Egypt", currencyCode: "EGP", currencyName: "Egyptian Pound", symbol: "£" },
  { country: "El Salvador", currencyCode: "USD", currencyName: "United States Dollar", symbol: "$" },
  { country: "Equatorial Guinea", currencyCode: "XAF", currencyName: "Central African CFA Franc", symbol: "Fr" },
  { country: "Eritrea", currencyCode: "ERN", currencyName: "Eritrean Nakfa", symbol: "Nfk" },
  { country: "Estonia", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Eswatini", currencyCode: "SZL", currencyName: "Swazi Lilangeni", symbol: "L" },
  { country: "Ethiopia", currencyCode: "ETB", currencyName: "Ethiopian Birr", symbol: "Br" },
  { country: "Fiji", currencyCode: "FJD", currencyName: "Fijian Dollar", symbol: "$" },
  { country: "Finland", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "France", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Gabon", currencyCode: "XAF", currencyName: "Central African CFA Franc", symbol: "Fr" },
  { country: "Gambia", currencyCode: "GMD", currencyName: "Gambian Dalasi", symbol: "D" },
  { country: "Georgia", currencyCode: "GEL", currencyName: "Georgian Lari", symbol: "₾" },
  { country: "Germany", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Ghana", currencyCode: "GHS", currencyName: "Ghanaian Cedi", symbol: "₵" },
  { country: "Greece", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Grenada", currencyCode: "XCD", currencyName: "East Caribbean Dollar", symbol: "$" },
  { country: "Guatemala", currencyCode: "GTQ", currencyName: "Guatemalan Quetzal", symbol: "Q" },
  { country: "Guinea", currencyCode: "GNF", currencyName: "Guinean Franc", symbol: "Fr" },
  { country: "Guinea-Bissau", currencyCode: "XOF", currencyName: "West African CFA Franc", symbol: "Fr" },
  { country: "Guyana", currencyCode: "GYD", currencyName: "Guyanese Dollar", symbol: "$" },
  { country: "Haiti", currencyCode: "HTG", currencyName: "Haitian Gourde", symbol: "G" },
  { country: "Honduras", currencyCode: "HNL", currencyName: "Honduran Lempira", symbol: "L" },
  { country: "Hungary", currencyCode: "HUF", currencyName: "Hungarian Forint", symbol: "Ft" },
  { country: "Iceland", currencyCode: "ISK", currencyName: "Icelandic Krona", symbol: "kr" },
  { country: "India", currencyCode: "INR", currencyName: "Indian Rupee", symbol: "₹" },
  { country: "Indonesia", currencyCode: "IDR", currencyName: "Indonesian Rupiah", symbol: "Rp" },
  { country: "Iran", currencyCode: "IRR", currencyName: "Iranian Rial", symbol: "﷼" },
  { country: "Iraq", currencyCode: "IQD", currencyName: "Iraqi Dinar", symbol: "ع.د" },
  { country: "Ireland", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Israel", currencyCode: "ILS", currencyName: "Israeli New Shekel", symbol: "₪" },
  { country: "Italy", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Jamaica", currencyCode: "JMD", currencyName: "Jamaican Dollar", symbol: "$" },
  { country: "Japan", currencyCode: "JPY", currencyName: "Japanese Yen", symbol: "¥" },
  { country: "Jordan", currencyCode: "JOD", currencyName: "Jordanian Dinar", symbol: "د.ا" },
  { country: "Kazakhstan", currencyCode: "KZT", currencyName: "Kazakhstani Tenge", symbol: "₸" },
  { country: "Kenya", currencyCode: "KES", currencyName: "Kenyan Shilling", symbol: "Sh" },
  { country: "Kiribati", currencyCode: "AUD", currencyName: "Australian Dollar", symbol: "$" },
  { country: "Kuwait", currencyCode: "KWD", currencyName: "Kuwaiti Dinar", symbol: "د.ك" },
  { country: "Kyrgyzstan", currencyCode: "KGS", currencyName: "Kyrgyzstani Som", symbol: "лв" },
  { country: "Laos", currencyCode: "LAK", currencyName: "Lao Kip", symbol: "₭" },
  { country: "Latvia", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Lebanon", currencyCode: "LBP", currencyName: "Lebanese Pound", symbol: "ل.ل" },
  { country: "Lesotho", currencyCode: "LSL", currencyName: "Lesotho Loti", symbol: "L" },
  { country: "Liberia", currencyCode: "LRD", currencyName: "Liberian Dollar", symbol: "$" },
  { country: "Libya", currencyCode: "LYD", currencyName: "Libyan Dinar", symbol: "ل.د" },
  { country: "Liechtenstein", currencyCode: "CHF", currencyName: "Swiss Franc", symbol: "Fr" },
  { country: "Lithuania", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Luxembourg", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Madagascar", currencyCode: "MGA", currencyName: "Malagasy Ariary", symbol: "Ar" },
  { country: "Malawi", currencyCode: "MWK", currencyName: "Malawian Kwacha", symbol: "MK" },
  { country: "Malaysia", currencyCode: "MYR", currencyName: "Malaysian Ringgit", symbol: "RM" },
  { country: "Maldives", currencyCode: "MVR", currencyName: "Maldivian Rufiyaa", symbol: "Rf" },
  { country: "Mali", currencyCode: "XOF", currencyName: "West African CFA Franc", symbol: "Fr" },
  { country: "Malta", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Marshall Islands", currencyCode: "USD", currencyName: "United States Dollar", symbol: "$" },
  { country: "Mauritania", currencyCode: "MRU", currencyName: "Mauritanian Ouguiya", symbol: "UM" },
  { country: "Mauritius", currencyCode: "MUR", currencyName: "Mauritian Rupee", symbol: "₨" },
  { country: "Mexico", currencyCode: "MXN", currencyName: "Mexican Peso", symbol: "$" },
  { country: "Micronesia", currencyCode: "USD", currencyName: "United States Dollar", symbol: "$" },
  { country: "Moldova", currencyCode: "MDL", currencyName: "Moldovan Leu", symbol: "L" },
  { country: "Monaco", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Mongolia", currencyCode: "MNT", currencyName: "Mongolian Tögrög", symbol: "₮" },
  { country: "Montenegro", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Morocco", currencyCode: "MAD", currencyName: "Moroccan Dirham", symbol: "د.م." },
  { country: "Mozambique", currencyCode: "MZN", currencyName: "Mozambican Metical", symbol: "MT" },
  { country: "Myanmar", currencyCode: "MMK", currencyName: "Burmese Kyat", symbol: "Ks" },
  { country: "Namibia", currencyCode: "NAD", currencyName: "Namibian Dollar", symbol: "$" },
  { country: "Nauru", currencyCode: "AUD", currencyName: "Australian Dollar", symbol: "$" },
  { country: "Nepal", currencyCode: "NPR", currencyName: "Nepalese Rupee", symbol: "₨" },
  { country: "Netherlands", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "New Zealand", currencyCode: "NZD", currencyName: "New Zealand Dollar", symbol: "$" },
  { country: "Nicaragua", currencyCode: "NIO", currencyName: "Nicaraguan Córdoba", symbol: "C$" },
  { country: "Niger", currencyCode: "XOF", currencyName: "West African CFA Franc", symbol: "Fr" },
  { country: "Nigeria", currencyCode: "NGN", currencyName: "Nigerian Naira", symbol: "₦" },
  { country: "North Korea", currencyCode: "KPW", currencyName: "North Korean Won", symbol: "₩" },
  { country: "North Macedonia", currencyCode: "MKD", currencyName: "Macedonian Denar", symbol: "ден" },
  { country: "Norway", currencyCode: "NOK", currencyName: "Norwegian Krone", symbol: "kr" },
  { country: "Oman", currencyCode: "OMR", currencyName: "Omani Rial", symbol: "ر.ع." },
  { country: "Pakistan", currencyCode: "PKR", currencyName: "Pakistani Rupee", symbol: "₨" },
  { country: "Palau", currencyCode: "USD", currencyName: "United States Dollar", symbol: "$" },
  { country: "Palestine", currencyCode: "ILS", currencyName: "Israeli New Shekel", symbol: "₪" },
  { country: "Panama", currencyCode: "PAB", currencyName: "Panamanian Balboa", symbol: "B/." },
    { country: "Papua New Guinea", currencyCode: "PGK", currencyName: "Papua New Guinean Kina", symbol: "K" },
  { country: "Paraguay", currencyCode: "PYG", currencyName: "Paraguayan Guaraní", symbol: "₲" },
  { country: "Peru", currencyCode: "PEN", currencyName: "Peruvian Sol", symbol: "S/." },
  { country: "Philippines", currencyCode: "PHP", currencyName: "Philippine Peso", symbol: "₱" },
  { country: "Poland", currencyCode: "PLN", currencyName: "Polish Złoty", symbol: "zł" },
  { country: "Portugal", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Qatar", currencyCode: "QAR", currencyName: "Qatari Riyal", symbol: "ر.ق" },
  { country: "Romania", currencyCode: "RON", currencyName: "Romanian Leu", symbol: "lei" },
  { country: "Russia", currencyCode: "RUB", currencyName: "Russian Ruble", symbol: "₽" },
  { country: "Rwanda", currencyCode: "RWF", currencyName: "Rwandan Franc", symbol: "Fr" },
  { country: "Saint Kitts and Nevis", currencyCode: "XCD", currencyName: "East Caribbean Dollar", symbol: "$" },
  { country: "Saint Lucia", currencyCode: "XCD", currencyName: "East Caribbean Dollar", symbol: "$" },
  { country: "Saint Vincent and the Grenadines", currencyCode: "XCD", currencyName: "East Caribbean Dollar", symbol: "$" },
  { country: "Samoa", currencyCode: "WST", currencyName: "Samoan Tala", symbol: "T" },
  { country: "San Marino", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Sao Tome and Principe", currencyCode: "STN", currencyName: "São Tomé and Príncipe Dobra", symbol: "Db" },
  { country: "Saudi Arabia", currencyCode: "SAR", currencyName: "Saudi Riyal", symbol: "ر.س" },
  { country: "Senegal", currencyCode: "XOF", currencyName: "West African CFA Franc", symbol: "Fr" },
  { country: "Serbia", currencyCode: "RSD", currencyName: "Serbian Dinar", symbol: "дин." },
  { country: "Seychelles", currencyCode: "SCR", currencyName: "Seychellois Rupee", symbol: "₨" },
  { country: "Sierra Leone", currencyCode: "SLL", currencyName: "Sierra Leonean Leone", symbol: "Le" },
  { country: "Singapore", currencyCode: "SGD", currencyName: "Singapore Dollar", symbol: "$" },
  { country: "Slovakia", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Slovenia", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Solomon Islands", currencyCode: "SBD", currencyName: "Solomon Islands Dollar", symbol: "$" },
  { country: "Somalia", currencyCode: "SOS", currencyName: "Somali Shilling", symbol: "Sh" },
  { country: "South Africa", currencyCode: "ZAR", currencyName: "South African Rand", symbol: "R" },
  { country: "South Korea", currencyCode: "KRW", currencyName: "South Korean Won", symbol: "₩" },
  { country: "South Sudan", currencyCode: "SSP", currencyName: "South Sudanese Pound", symbol: "£" },
  { country: "Spain", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Sri Lanka", currencyCode: "LKR", currencyName: "Sri Lankan Rupee", symbol: "₨" },
  { country: "Sudan", currencyCode: "SDG", currencyName: "Sudanese Pound", symbol: "£" },
  { country: "Suriname", currencyCode: "SRD", currencyName: "Surinamese Dollar", symbol: "$" },
  { country: "Sweden", currencyCode: "SEK", currencyName: "Swedish Krona", symbol: "kr" },
  { country: "Switzerland", currencyCode: "CHF", currencyName: "Swiss Franc", symbol: "Fr" },
  { country: "Syria", currencyCode: "SYP", currencyName: "Syrian Pound", symbol: "£" },
  { country: "Taiwan", currencyCode: "TWD", currencyName: "New Taiwan Dollar", symbol: "NT$" },
  { country: "Tajikistan", currencyCode: "TJS", currencyName: "Tajikistani Somoni", symbol: "ЅМ" },
  { country: "Tanzania", currencyCode: "TZS", currencyName: "Tanzanian Shilling", symbol: "Sh" },
  { country: "Thailand", currencyCode: "THB", currencyName: "Thai Baht", symbol: "฿" },
  { country: "Togo", currencyCode: "XOF", currencyName: "West African CFA Franc", symbol: "Fr" },
  { country: "Tonga", currencyCode: "TOP", currencyName: "Tongan Paʻanga", symbol: "T$" },
  { country: "Trinidad and Tobago", currencyCode: "TTD", currencyName: "Trinidad and Tobago Dollar", symbol: "$" },
  { country: "Tunisia", currencyCode: "TND", currencyName: "Tunisian Dinar", symbol: "د.ت" },
  { country: "Turkey", currencyCode: "TRY", currencyName: "Turkish Lira", symbol: "₺" },
  { country: "Turkmenistan", currencyCode: "TMT", currencyName: "Turkmenistan Manat", symbol: "m" },
  { country: "Tuvalu", currencyCode: "AUD", currencyName: "Australian Dollar", symbol: "$" },
  { country: "Uganda", currencyCode: "UGX", currencyName: "Ugandan Shilling", symbol: "Sh" },
  { country: "Ukraine", currencyCode: "UAH", currencyName: "Ukrainian Hryvnia", symbol: "₴" },
  { country: "United Arab Emirates", currencyCode: "AED", currencyName: "United Arab Emirates Dirham", symbol: "د.إ" },
  { country: "United Kingdom", currencyCode: "GBP", currencyName: "British Pound Sterling", symbol: "£" },
  { country: "United States", currencyCode: "USD", currencyName: "United States Dollar", symbol: "$" },
  { country: "Uruguay", currencyCode: "UYU", currencyName: "Uruguayan Peso", symbol: "$" },
  { country: "Uzbekistan", currencyCode: "UZS", currencyName: "Uzbekistani Som", symbol: "лв" },
  { country: "Vanuatu", currencyCode: "VUV", currencyName: "Vanuatu Vatu", symbol: "VT" },
  { country: "Vatican City", currencyCode: "EUR", currencyName: "Euro", symbol: "€" },
  { country: "Venezuela", currencyCode: "VES", currencyName: "Venezuelan Bolívar", symbol: "Bs." },
  { country: "Vietnam", currencyCode: "VND", currencyName: "Vietnamese Dong", symbol: "₫" },
  { country: "Western Sahara", currencyCode: "MAD", currencyName: "Moroccan Dirham", symbol: "د.م." },
  { country: "Yemen", currencyCode: "YER", currencyName: "Yemeni Rial", symbol: "﷼" },
  { country: "Zambia", currencyCode: "ZMW", currencyName: "Zambian Kwacha", symbol: "ZK" },
  { country: "Zimbabwe", currencyCode: "ZWL", currencyName: "Zimbabwean Dollar", symbol: "$" }
];

/* ===============================
   POPULATE COUNTRY DROPDOWN
   =============================== */

countrySelect.innerHTML = `<option value="">Select country</option>`;
countryCurrencyList.forEach(item => {
  const option = document.createElement("option");
  option.value = JSON.stringify(item);
  option.textContent = `${item.country} (${item.currencyCode} ${item.symbol})`;
  countrySelect.appendChild(option);
});

/* ===============================
   COUNTRY → CURRENCY LINK
   =============================== */

countrySelect.addEventListener("change", () => {
  if (!countrySelect.value) {
    currencySelect.disabled = true;
    uploadBtn.disabled = true;
    currencySelect.innerHTML = `<option>Auto-selected</option>`;
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

  localStorage.setItem("country", data.country);
  localStorage.setItem("currency", data.currencyCode);
  localStorage.setItem("currencySymbol", data.symbol);
});

/* ===============================
   CSV UPLOAD
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
    errorMsg.style.display = "none";

    const text = reader.result;
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");

    if (lines.length === 0) {
      errorMsg.textContent = "CSV file is empty.";
      errorMsg.style.display = "block";
      csvInput.value = "";
      return;
    }

    const normalize = str =>
      str.toLowerCase().replace(/[\s-_]/g, "");

    const headers = lines[0].split(",").map(h => normalize(h));

    const requiredColumns = [
    "Product_name",
    "Brand",
    "Category",
    "Price",
    "Stock",
    "Units_sold",
    "Expiry_date"
    ].map(normalize);

    const missing = requiredColumns.filter(
      col => !headers.includes(col)
    );

    if (missing.length > 0) {
      errorMsg.innerHTML =
        "Missing required columns:<br>" +
        missing.map(m => `• ${m}`).join("<br>");
      errorMsg.style.display = "block";
      csvInput.value = "";
      return;
    }

  // extra columns ignored automatically
    localStorage.setItem("inventoryCSV", text);

    alert(
      "CSV uploaded successfully.\n" +
      "Country & currency linked automatically."
    );
  };


  reader.readAsText(file);
});
