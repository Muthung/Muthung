document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
      });
    }
  
    // Set animation delay for fade elements based on data-delay attribute
    const fadeElements = document.querySelectorAll('.fade-element');
    fadeElements.forEach(el => {
      const delay = el.getAttribute('data-delay') || '0';
      el.style.animationDelay = delay + 's';
    });
  
    // Floating buttons: show after scrolling halfway down the page
    const backToTop = document.getElementById('back-to-top');
    const messageIcon = document.getElementById('message-icon');
    window.addEventListener('scroll', function () {
      if (window.scrollY > window.innerHeight / 2) {
        backToTop.style.display = 'flex';
        messageIcon.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
        messageIcon.style.display = 'none';
      }
    });
  
    // Back to Top functionality
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  