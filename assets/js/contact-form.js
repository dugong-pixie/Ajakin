// ============================================================
// contact-form.js — Ajakin Graphic
// Mengirim data form ke Google Spreadsheet via Apps Script
// ============================================================

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxfxwRCqlUYXkT6cYuROyRH5uIR0LYsdAJG-UmSTRI_bcxQ8po7EpodAwDbv4OEOSA_bw/exec";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Kumpulkan data dari form
    const data = {
      nama: document.getElementById("nama").value.trim(),
      email: document.getElementById("email").value.trim(),
      whatsapp: document.getElementById("whatsapp").value.trim(),
      domisili: document.getElementById("domisili").value,
      layanan: document.querySelector('input[name="jenisKerjasama"]:checked')?.value || "-",
      pesan: document.getElementById("pesan").value.trim(),
      tanggal: document.getElementById("tanggalKerjasama").value,
    };

    // Validasi sederhana
    if (!data.nama || !data.email || !data.whatsapp || !data.domisili || !data.pesan || !data.tanggal) {
      showNotif("Harap lengkapi semua field terlebih dahulu.", "error");
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>Mengirim...`;

    // Kirim ke Google Apps Script
    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // diperlukan karena Google Apps Script tidak support CORS penuh
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => {
        // no-cors → response selalu "opaque", anggap sukses jika tidak error
        showNotif("✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.", "success");
        form.reset();
      })
      .catch((err) => {
        console.error("Gagal mengirim:", err);
        showNotif("❌ Gagal mengirim pesan. Coba lagi beberapa saat.", "error");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Kirim Pesan <i class="fas fa-paper-plane ms-2"></i>`;
      });
  });
});

// ============================================================
// Fungsi notifikasi (muncul di atas form)
// ============================================================
function showNotif(message, type) {
  // Hapus notif lama jika ada
  const old = document.getElementById("form-notif");
  if (old) old.remove();

  const notif = document.createElement("div");
  notif.id = "form-notif";
  notif.style.cssText = `
    padding: 14px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 0.95rem;
    opacity: 0;
    transition: opacity 0.4s ease;
    background-color: ${type === "success" ? "#d1f0dc" : "#fde8e8"};
    color: ${type === "success" ? "#1a6b3a" : "#9b1c1c"};
    border-left: 4px solid ${type === "success" ? "#5a7a66" : "#c81e1e"};
  `;
  notif.textContent = message;

  const form = document.querySelector("form");
  form.insertBefore(notif, form.firstChild);

  // Fade in
  requestAnimationFrame(() => {
    notif.style.opacity = "1";
  });

  // Auto hilang setelah 5 detik
  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 400);
  }, 5000);
}
