'use strict';

// Activating Overlay and Mobile Menu
const overlay = document.querySelector('[data-overlay]');
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navbar = document.querySelector('[data-navbar]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
    for(let i = 0; i < elem.length; i++){
        elem[i].addEventListener('click', function () {
            navbar.classList.toggle('active');
            overlay.classList.toggle('active');
        })
    }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

// Header Sticky and go top
const header = document.querySelector('[data-header]');
const goTopBtn = document.querySelector('[data-go-top]');

window.addEventListener('scroll', function() {
    if(window.scrollY >= 200) {
        header.classList.add('active');
        goTopBtn.classList.add('active');
    }else{
        header.classList.remove('active');
        goTopBtn.classList.remove('active');
    }
})

// Tab Animation
document.querySelectorAll('.tabs input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.checked) {
      // Animate text content
      const content = this.nextElementSibling.nextElementSibling;
      content.style.transition = 'none';
      content.style.opacity = '0';
      content.style.transform = 'translateY(10px)';
      void content.offsetWidth; // Trigger reflow
      content.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
      
      // Animate corresponding image
      const tabId = this.id;
      const image = document.querySelector(`.tab-image[data-tab="${tabId}"]`);
      image.style.transition = 'none';
      image.style.opacity = '0';
      image.style.transform = 'translateX(20px)';
      void image.offsetWidth;
      image.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      image.style.opacity = '1';
      image.style.transform = 'translateX(0)';
      
      // Hide other images
      document.querySelectorAll(`.tab-image:not([data-tab="${tabId}"])`).forEach(otherImage => {
        otherImage.style.opacity = '0';
      });
    }
  });
});

// Initialize first tab
window.addEventListener('DOMContentLoaded', () => {
  const firstTab = document.querySelector('.tabs input[type="radio"]:checked');
  if (firstTab) {
    const tabId = firstTab.id;
    const firstImage = document.querySelector(`.tab-image[data-tab="${tabId}"]`);
    firstImage.style.opacity = '1';
    firstImage.style.transform = 'translateX(0)';
  }
});

// Tab Selector Animation
var tabs = $('.tabs');
var selector = $('.tabs').find('a').length;
var activeItem = tabs.find('.active');
var activeWidth = activeItem.innerWidth();
$(".selector").css({
  "left": activeItem.position().left + "px", 
  "width": activeWidth + "px"
});

$(".tabs").on("click","a",function(e){
  e.preventDefault();
  $('.tabs a').removeClass("active");
  $(this).addClass('active');
  var activeWidth = $(this).innerWidth();
  var itemPos = $(this).position();
  $(".selector").css({
    "left":itemPos.left + "px", 
    "width": activeWidth + "px"
  });
});

// Reference Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    // Add click event to each card
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Flip the clicked card
            this.classList.toggle('flipped');
            
            // Flip back all other cards
            cards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('flipped');
                }
            });
        });
    });
    
    // Set images for each card
    const cardImages = [
        'https://i.postimg.cc/fRNkQ8MC/popular-1.jpg',
        'https://i.postimg.cc/Nj9DZffm/popular-2.jpg',
        'https://i.postimg.cc/Hkwcrf6F/popular-3.jpg',
        'https://picsum.photos/300/300.webp?random=4',
        'https://picsum.photos/300/300.webp?random=5',
        'https://picsum.photos/300/300.webp?random=6',
        'https://picsum.photos/300/300.webp?random=7',
        'https://picsum.photos/300/300.webp?random=8'
    ];
    
    document.querySelectorAll('.card .img').forEach((img, index) => {
        img.style.backgroundImage = `url('${cardImages[index]}')`;
    });
});

// Initialize GSAP animations if needed
document.addEventListener('DOMContentLoaded', function() {
    // You can add GSAP animations here if required
    // For example:
    // gsap.from(".header", {duration: 1, y: -100, opacity: 0});
});