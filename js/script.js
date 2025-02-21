document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("myButton");
  if (button) {
    button.onclick = function() {
      alert("Button clicked!");
    };
  }
});


// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = (e) => {
  navbarNav.classList.toggle('active');
  e.preventDefault(); // Tambahkan ini
  e.stopPropagation(); // Tambahkan ini
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('item-detail-modal');
  const modalContainer = modal.querySelector('.modal-container');

  // Fungsi untuk menutup modal
  function closeModal() {
      modal.style.display = 'none';
  }

  // Event listener untuk menutup modal saat mengklik di luar area modal
  modal.addEventListener('click', function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });

  // Event listener untuk tombol close
  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', closeModal);
});