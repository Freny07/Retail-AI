document.addEventListener("DOMContentLoaded", () => {
  const chooseFileBtn = document.getElementById("chooseFileBtn");
  const fileInput = document.getElementById("csvFile");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileNameSpan = document.getElementById("fileName");

  // Open file picker
  chooseFileBtn.addEventListener("click", () => fileInput.click());

  // When file selected
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
      uploadBtn.disabled = false;
    } else {
      fileNameSpan.textContent = "No file chosen";
      uploadBtn.disabled = true;
    }
  });

  // Upload CSV
  uploadBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // STOP the file picker from opening

    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    uploadBtn.disabled = true;
    uploadBtn.textContent = "Uploading...";

    try {
      const headers = {};
      const token = localStorage.getItem("gumasto_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("http://localhost:5000/api/upload/csv", {
        method: "POST",
        headers,
        body: formData
      });

      const data = await res.json();
      console.log("Upload response:", data);

      if (res.ok) {
        alert(data.message || "Upload successful!");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("Upload failed");
      console.error("Upload error:", err);
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.textContent = "Upload CSV File";
      fileInput.value = "";
      fileNameSpan.textContent = "No file chosen";
    }
  });
});
