// 1. Data Konten Teks
const portofolioData = [
  {
    title: "Branding & Identity",
    desc: "Solusi lengkap untuk membangun identitas visual bisnis Anda, mulai dari logo hingga panduan branding."
  },
  {
    title: "Digital Marketing Campaign",
    desc: "Strategi pemasaran media sosial yang interaktif dan efektif untuk meningkatkan konversi dan engagement."
  },
  {
    title: "Desain Banner Promosi",
    desc: "Pembuatan materi promosi fisik (banner, x-banner, baliho) dengan kualitas visual terbaik dan hierarki terbaca."
  },
  {
    title: "Desain Banner ",
    desc: "Pembuatan materi promosi fisik (banner, x-banner, baliho) dengan kualitas visual terbaik dan hierarki terbaca."
  }
];

// 2. Seleksi Elemen
const track = document.getElementById('stackTrack');
const allCards = document.querySelectorAll('.carousel-card');
const carouselArea = document.querySelector('.carousel-stack-area');
const cardTitle = document.getElementById('cardTitle');
const cardDesc = document.getElementById('cardDesc');
const infoCard = document.getElementById('infoCard');

let currentIndex = 0;
let totalCards = allCards.length;
let isDragging = false;
let startX = 0;
let currentX = 0;
const dragThreshold = 60;

function resetDragEffect() {
  allCards.forEach((card) => {
    card.style.transition = 'transform 0.2s ease';
    card.style.transform = '';
  });
}

function applyDragEffect(deltaX) {
  const activeCard = allCards[currentIndex];
  const rotateY = deltaX / 10;
  const translateZ = Math.min(Math.max(Math.abs(deltaX) / 8, 0), 30);

  activeCard.style.transition = 'transform 0s';
  activeCard.style.transform = `translate3d(${deltaX}px, 0, 0) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
}

function showNextCard() {
  resetDragEffect();
  currentIndex = (currentIndex + 1) % totalCards;
  rotateStack();
}

function showPrevCard() {
  resetDragEffect();
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  rotateStack();
}

// 3. Fungsi Utama Pengubah Stack dan Teks
function rotateStack() {
  resetDragEffect();

  // Update Teks (Kanan)
  // Berikan efek fade-out pada teks sebelum diganti
  infoCard.style.opacity = '0';
  infoCard.style.transform = 'translateY(10px)';

  setTimeout(() => {
    cardTitle.textContent = portofolioData[currentIndex].title;
    cardDesc.textContent = portofolioData[currentIndex].desc;
    // Berikan efek fade-in dengan teks baru
    infoCard.style.opacity = '1';
    infoCard.style.transform = 'translateY(0)';
  }, 250); // Eksekusi saat transisi gambar berada di tengah jalan

  // Update Stack (Kiri)
  allCards.forEach((card, index) => {
    // 1. Reset Semua Kelas
    card.classList.remove('stack-front', 'stack-back', 'stack-back-hidden', 'stack-back-hidden2', 'stack-out');

    // 2. Berikan Kelas Baru Berdasarkan Posisi Index
    if (index === currentIndex) {
      // Depan
      card.classList.add('stack-front');
    } else if (index === (currentIndex + 1) % totalCards) {
      // Siap di Belakang
      card.classList.add('stack-back');
    } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
      // Baru Keluar (Kiri)
      card.classList.add('stack-out');
    } else {
      // Sangat Belakang
      card.classList.add('stack-back-hidden');
    }
  });
}

function onPointerDown(event) {
  isDragging = true;
  startX = event.clientX;
  currentX = startX;
  carouselArea.classList.add('dragging');
  carouselArea.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function onPointerMove(event) {
  if (!isDragging) return;
  currentX = event.clientX;
  const deltaX = currentX - startX;
  applyDragEffect(deltaX);
}

function onPointerUp() {
  if (!isDragging) return;
  isDragging = false;
  carouselArea.classList.remove('dragging');
  const deltaX = currentX - startX;

  if (deltaX <= -dragThreshold) {
    showNextCard();
  } else if (deltaX >= dragThreshold) {
    showPrevCard();
  } else {
    resetDragEffect();
  }
}

carouselArea.addEventListener('pointerdown', onPointerDown);
carouselArea.addEventListener('pointermove', onPointerMove);
carouselArea.addEventListener('pointerup', onPointerUp);
carouselArea.addEventListener('pointerleave', onPointerUp);
carouselArea.addEventListener('pointercancel', onPointerUp);

// Tambahan opsional: Jalankan inisialisasi di awal
rotateStack();