/* Hickory Hill Arms — main.js */

// Nav scroll class
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile burger
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    // Animate spans
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Gallery thumbs (product detail)
const thumbs = document.querySelectorAll('.pd-gallery__thumb');
const mainImg = document.querySelector('.pd-gallery__img');
if (thumbs.length && mainImg) {
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const src = thumb.querySelector('img').src;
      mainImg.style.opacity = '0';
      setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 200);
    });
  });
}

// Model selector (product detail)
document.querySelectorAll('.pd-model-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pd-model-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Update price/specs
    const price = btn.dataset.price;
    const priceEl = document.querySelector('.pd-price');
    if (price && priceEl) priceEl.textContent = '$' + price;
  });
});

// Finish selector
document.querySelectorAll('.pd-finish-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pd-finish-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const label = document.querySelector('.pd-finish-label');
    if (label) label.textContent = btn.dataset.finish.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  });
});

// ATC button
const atcBtn = document.querySelector('.pd-atc');
if (atcBtn) {
  atcBtn.addEventListener('click', () => {
    const orig = atcBtn.innerHTML;
    atcBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Request Submitted`;
    atcBtn.style.background = '#3a7a4a';
    atcBtn.style.borderColor = '#3a7a4a';
    setTimeout(() => {
      atcBtn.innerHTML = orig;
      atcBtn.style.background = '';
      atcBtn.style.borderColor = '';
    }, 3000);
  });
}

// Filter buttons (products page)
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
