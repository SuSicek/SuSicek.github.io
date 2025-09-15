// Iframe-based branch slideshow controlled only by map-control buttons
(function(){
  function init(){
    const slides = Array.from(document.querySelectorAll('.branches-slideshow .branch-slide'));
    if(!slides.length) return;
    const container = document.getElementById('slideshow');
    const mapButtons = Array.from(document.querySelectorAll('.map-control-btn'));
    let current = 0;

    function show(index){
      if(index<0) index = 0; if(index>=slides.length) index = slides.length-1;
      current = index;
      slides.forEach((s,i)=> s.classList.toggle('active', i===current));
      mapButtons.forEach((b,i)=> b.classList.toggle('active', i===current));
      if(container){ container.style.transform = `translateX(-${current*100}%)`; }
    }

    mapButtons.forEach((b,i)=> b.addEventListener('click', ()=> show(i)));
    show(0);
  }
  document.addEventListener('DOMContentLoaded', init);
})();