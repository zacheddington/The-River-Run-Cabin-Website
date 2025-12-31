
// Dynamically load all images from images/Cabin into the gallery and enable modal navigation
(function() {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return;
  const images = [
    '02-Outside.jpg',
    '03-Entrance-1.jpg',
    '03-Entrance-2.jpg',
    '04-Living-Kitchen.jpg',
    '05-Kitchen.JPG',
    '06-Master-1.JPG',
    '06-Master-2.jpg',
    '07-Bathroom-1.jpg',
    '07-Bathroom-2.jpg',
    '08-Loft-1.jpg',
    '08-Loft-2.jpg',
    '08-Loft-3.jpg',
    '08-Loft-Kitchen.JPG',
    '09-Kitchen-Living.jpg',
    '10-Living-1.jpg',
    '11-Fireplace-1.jpg',
    'Sunset Over River.jpg',
    'Sunset.jpg',
    'Snowmobile.jpg',
    'ATV.jpg'
  ];

  // Custom titles for each image (same order as images array)
  const titles = [
    'Cabin Exterior',
    'Main Entrance',
    'Living Room',
    'Living Room & Kitchen',
    'Kitchen',
    'Master Bedroom',
    'Master Bedroom (View 2)',
    'Bathroom/Laundry',
    'Bathroom (View 2)',
    'Loft',
    'Loft (View 2)',
    'Loft (View 3)',
    'Kitechen from Loft',
    'Kitchen & Living Room',
    'Living Room',
    'Fireplace',
    'Sunset Over River',
    'Sunset',
    'Snowmobiling',
    'Offroading'
  ];

  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <span class="gallery-modal-close" title="Close">&times;</span>
    <span class="gallery-modal-arrow gallery-modal-arrow-left">&#10094;</span>
    <span class="gallery-modal-arrow gallery-modal-arrow-right">&#10095;</span>
    <img class="gallery-modal-img" src="" alt="" />
    <div class="gallery-modal-caption"></div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('.gallery-modal-img');
  const modalCaption = modal.querySelector('.gallery-modal-caption');
  const closeBtn = modal.querySelector('.gallery-modal-close');
  const leftArrow = modal.querySelector('.gallery-modal-arrow-left');
  const rightArrow = modal.querySelector('.gallery-modal-arrow-right');

  let currentIndex = 0;


  function animateModalImg(direction, nextIndex) {
    // direction: 'left' or 'right'
    modalImg.classList.remove('sweep-in-left', 'sweep-in-right', 'sweep-out-left', 'sweep-out-right');
    // Animate out
    modalImg.classList.add(direction === 'left' ? 'sweep-out-right' : 'sweep-out-left');
    setTimeout(() => {
      // Change image after out
      modalImg.classList.remove('sweep-out-left', 'sweep-out-right');
      modalImg.src = `images/Cabin/${images[nextIndex]}`;
      modalImg.alt = titles[nextIndex] || '';
      modalCaption.textContent = titles[nextIndex] || '';
      // Animate in
      modalImg.classList.add(direction === 'left' ? 'sweep-in-left' : 'sweep-in-right');
      setTimeout(() => {
        modalImg.classList.remove('sweep-in-left', 'sweep-in-right');
      }, 350);
    }, 350);
  }

  function openModal(index) {
    currentIndex = index;
    modalImg.src = `images/Cabin/${images[index]}`;
    modalImg.alt = titles[index] || '';
    modalCaption.textContent = titles[index] || '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }


  function showPrev() {
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    animateModalImg('left', nextIndex);
    currentIndex = nextIndex;
  }

  function showNext() {
    const nextIndex = (currentIndex + 1) % images.length;
    animateModalImg('right', nextIndex);
    currentIndex = nextIndex;
  }

  closeBtn.addEventListener('click', closeModal);
  leftArrow.addEventListener('click', showPrev);
  rightArrow.addEventListener('click', showNext);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeModal();
    }
  });

  images.forEach((filename, idx) => {
    const img = document.createElement('img');
    img.src = `images/Cabin/${filename}`;
    img.alt = titles[idx] || '';
    img.tabIndex = 0;
    img.addEventListener('click', () => openModal(idx));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal(idx);
    });
    galleryGrid.appendChild(img);
  });
})();
