// 1. Data Konten Teks (Sudah Ditambah NIM, Hobi, & Motivasi)
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
const track = document.getElementById('stackTrack');
const allCards = document.querySelectorAll('.carousel-card');
const carouselArea = document.querySelector('.carousel-stack-area');
const cardTitle = document.getElementById('cardTitle');
const cardNim = document.getElementById('cardNim'); // Baru
const cardDesc = document.getElementById('cardDesc');
const cardFooter = document.getElementById('cardFooter'); // Baru
const infoCard = document.getElementById('infoCard');

let currentIndex = 0;
let totalCards = allCards.length;
let isDragging = false;
let startX = 0;
let currentX = 0;
const dragThreshold = 60;
const maxDragDistance = 150; 

function resetDragEffect() {
  allCards.forEach((card) => {
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease';
    card.style.transform = '';
  });
}

function applyDragEffect(deltaX) {
  if (deltaX > maxDragDistance) deltaX = maxDragDistance;
  if (deltaX < -maxDragDistance) deltaX = -maxDragDistance;

  const progress = Math.abs(deltaX) / maxDragDistance;

  // --- ANIMASI KARTU DEPAN (Active Card) ---
  const activeCard = allCards[currentIndex];
  if (activeCard) {
    const rotateY = deltaX / 5; 
    const translateZ = progress * 40;
    activeCard.style.transition = 'transform 0s, opacity 0s';
    activeCard.style.transform = `translate3d(${deltaX}px, ${progress * 10}px, ${translateZ}px) rotateY(${rotateY}deg)`;
  }

  // --- ANIMASI KARTU BELAKANG (Back Card) ---
  const backCardIndex = (currentIndex + 1) % totalCards;
  const backCard = allCards[backCardIndex];

  if (backCard) {
    const currentTranslateX = 80 - (progress * 80);      
    const currentTranslateY = -20 + (progress * 20);     
    const currentTranslateZ = -200 + (progress * 200);   
    const currentRotateY = -20 + (progress * 20);        
    const currentRotateX = 2 - (progress * 2);          

    backCard.style.transition = 'transform 0s, opacity 0s';
    backCard.style.transform = `translate3d(${currentTranslateX}px, ${currentTranslateY}px, ${currentTranslateZ}px) rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
  }
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
  if (infoCard && cardTitle && cardNim && cardDesc && cardFooter) {
    infoCard.style.opacity = '0';
    infoCard.style.transform = 'translateY(10px)';

    setTimeout(() => {
      cardTitle.textContent = portofolioData[currentIndex].title;
      cardNim.textContent = portofolioData[currentIndex].nim; // Update NIM
      cardDesc.textContent = portofolioData[currentIndex].desc;
      cardFooter.textContent = portofolioData[currentIndex].extra; // Update Hobi & Motivasi
      
      infoCard.style.opacity = '1';
      infoCard.style.transform = 'translateY(0)';
    }, 250);
  }

  // Update Stack (Kiri) - Animasi Kartu Hilang Di-disable (Langsung ke Belakang)
  allCards.forEach((card, index) => {
    card.classList.remove('stack-front', 'stack-back', 'stack-back-hidden', 'stack-back-hidden2', 'stack-out');

    if (index === currentIndex) {
      card.classList.add('stack-front');
    } else if (index === (currentIndex + 1) % totalCards) {
      card.classList.add('stack-back');
    } else {
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

function onPointerUp(event) {
  if (!isDragging) return;
  isDragging = false;
  carouselArea.classList.remove('dragging');
  
  let deltaX = currentX - startX;
  if (deltaX > maxDragDistance) deltaX = maxDragDistance;
  if (deltaX < -maxDragDistance) deltaX = -maxDragDistance;

  if (deltaX <= -dragThreshold) {
    showNextCard();
  } else if (deltaX >= dragThreshold) {
    showPrevCard();
  } else {
    resetDragEffect();
  }
}

// 4. Event Listeners
carouselArea.addEventListener('pointerdown', onPointerDown);
carouselArea.addEventListener('pointermove', onPointerMove);
carouselArea.addEventListener('pointerup', onPointerUp);
carouselArea.addEventListener('pointerleave', onPointerUp);
carouselArea.addEventListener('pointercancel', onPointerUp);

rotateStack();