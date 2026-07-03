const portofolioData = [
  {
    title: "Bambang Supriadi a.k.a ceo Ajakin",
    nim: "NIM. 25.12.3610",
    desc: "Membuat konsep branding yang kuat, desain visual yang menarik, dan strategi pemasaran yang efektif untuk meningkatkan kesadaran merek.",
    extra: "Hobi: Friendzone | Motivasi: serendah - rendahnya palung mariana, saya lebih rendah"
  },
  {
    title: "Jatmiko Adhi Prasetyo a.k.a CMO Ajakin",
    nim: "NIM. 25.12.3638",
    desc: "Strategi pemasaran media sosial yang interaktif dan efektif untuk meningkatkan konversi dan engagement.",
    extra: "Hobi: Bersabar | Motivasi: Hari ini harus lebih baik dari kemarin."
  },
  {
    title: "Ahmad Mukhlisin Fahriel Diza a.k.a Fullstack Developer Ajakin",
    nim: "NIM. 25.12.3644",
    desc: "Pembuatan sistem web dinamis, manajemen database performa tinggi, dan optimasi interaksi antar tumpukan kartu.",
    extra: "Hobi: Gaming | Motivasi: Ilmu tanah-tetap rebahan walaupun diinjak-injak."
  },
  {
    title: "Nur Dwi Cahyo a.k.a Desainer Ajakin",
    nim: "NIM. 25.12.3609",
    desc: "Pembuatan materi promosi fisik (banner, x-banner, baliho) dengan kualitas visual terbaik dan hierarki terbaca.",
    extra: "Hobi: Desain | Motivasi: Error adalah jalan ninja ku."
  }
];

// 2. Seleksi Elemen
const gridCards = document.querySelectorAll('.grid-card');
const cardTitle = document.getElementById('cardTitle');
const cardNim = document.getElementById('cardNim');
const cardDesc = document.getElementById('cardDesc');
const cardFooter = document.getElementById('cardFooter');
const infoCard = document.getElementById('infoCard');

// 3. Fungsi untuk Mengubah Teks Info Card
function updateInfoCard(index) {
  if (infoCard && cardTitle && cardNim && cardDesc && cardFooter) {
    // Beri efek transpirasi transisi keluar singkat
    infoCard.style.opacity = '0';
    infoCard.style.transform = 'translateY(10px)';

    setTimeout(() => {
      // Masukkan data sesuai indeks kartu yang diklik
      cardTitle.textContent = portofolioData[index].title;
      cardNim.textContent = portofolioData[index].nim;
      cardDesc.textContent = portofolioData[index].desc;
      cardFooter.textContent = portofolioData[index].extra;
      
      // Munculkan kembali teks dengan halus
      infoCard.style.opacity = '1';
      infoCard.style.transform = 'translateY(0)';
    }, 200);
  }
}

// 4. Tambahkan Event Listener Klik ke Setiap Kartu
gridCards.forEach((card) => {
  card.addEventListener('click', function() {
    // Hapus class active-card dari kartu mana pun yang sedang aktif
    document.querySelector('.grid-card.active-card')?.classList.remove('active-card');
    
    // Tambahkan class active-card ke kartu yang baru diklik
    this.classList.add('active-card');
    
    // Ambil indeks atribut data-index kartu
    const clickedIndex = parseInt(this.getAttribute('data-index'));
    
    // Jalankan fungsi pengubah teks
    updateInfoCard(clickedIndex);
  });
});

// Inisialisasi tampilan awal data indeks ke-0 (Bambang) saat halaman dimuat
updateInfoCard(0);