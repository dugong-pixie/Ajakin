document.addEventListener('DOMContentLoaded', function () {
  // 1. Seleksi Elemen Accordion
  const teamCards = document.querySelectorAll('.team-acc-card');

  if (!teamCards.length) return;

  // 2. Event Listener Klik untuk Menggeser Status Aktif Permanen
  teamCards.forEach((card) => {
    card.addEventListener('click', function () {
      // Jika kartu yang di-klik sudah aktif, biarkan tetap aktif
      if (this.classList.contains('active-card')) return;

      // Hapus kelas active-card dari kartu manapun yang memilikinya
      const currentActive = document.querySelector('.team-acc-card.active-card');
      if (currentActive) {
        currentActive.classList.remove('active-card');
      }

      // Tambahkan kelas active-card ke kartu yang di-klik
      this.classList.add('active-card');
    });
  });
});