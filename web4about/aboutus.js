document.addEventListener('DOMContentLoaded', () => {
  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Simple counters
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const co = new IntersectionObserver((ents) => {
    ents.forEach(ent => {
      if (!ent.isIntersecting) return;
      const el = ent.target;
      const target = parseInt(el.dataset.count || '0', 10);
      const start = performance.now();
      const dur = 1000 + Math.min(2000, target * 15);

      function tick(ts) {
        const p = Math.min(1, (ts - start) / dur);
        el.textContent = Math.round(target * (0.2 + 0.8 * p));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      co.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => co.observe(el));

  // Mark "O nás" as active in navbar (if links are already rendered)
  const markActive = () => {
    const links = document.querySelectorAll('.navbar-link');
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const text = a.textContent?.trim().toLowerCase();
      const isAbout = href.endsWith('aboutus.html') || text === 'o nás';
      a.classList.toggle('active', isAbout);
    });
  };
  // Run after content-loader likely renders nav
  setTimeout(markActive, 200);

  // Horizontal Timeline init
  (function(){
    if (typeof jQuery === 'undefined') return;
    jQuery(function($){
      var timelines = $('.cd-horizontal-timeline'), eventsMinDistance = 60;
      if (!timelines.length) return;

      function daydiff(first, second){ return Math.round((second-first)); }
      function setTransform(el, prop, val){ el.style['transform']=prop+'('+val+')'; el.style['-webkit-transform']=prop+'('+val+')'; }
      function getTranslateX($el){
        var st = window.getComputedStyle($el.get(0), null);
        var tr = st.getPropertyValue('transform') || 'matrix(1,0,0,1,0,0)';
        var vals = tr.match(/matrix\(([^)]+)\)/);
        if (!vals) return 0; var parts = vals[1].split(','); return Number(parts[4]||0);
      }
      function parseDate($events){ var arr=[]; $events.each(function(){ var d=$(this).data('date').split('/'); arr.push(new Date(d[2], d[1]-1, d[0])); }); return arr; }
      function minLapse(ds){ var gaps=[]; for (var i=1;i<ds.length;i++){ gaps.push(daydiff(ds[i-1], ds[i])); } return Math.min.apply(null,gaps); }
      function setDatePosition(c,min){
        for (i = 0; i < c.timelineDates.length; i++) {
          if (i === 0) { // place first dot closer to the left
            c.timelineEvents.eq(i).css('left', (0.5 * min) + 'px');
            continue;
          }
          var dist = daydiff(c.timelineDates[0], c.timelineDates[i]);
          var norm = Math.round(dist / c.eventsMinLapse) + 2;
          var leftPx = norm * min;
          if (i === 2) { // nudge the 3rd dot a bit left
            leftPx -= 0.5 * min;
          }
          c.timelineEvents.eq(i).css('left', leftPx + 'px');
        }
      }
      function updateFilling($ev,$fill,tot){ var st=window.getComputedStyle($ev.get(0),null); var left=Number(st.left.replace('px','')); var w=Number(st.width.replace('px','')); var cx = left + w/2; var s = cx/tot; setTransform($fill.get(0),'scaleX',s); }
      function setTimelineWidth(c,min){ var span=daydiff(c.timelineDates[0], c.timelineDates[c.timelineDates.length-1]); var norm=Math.round(span/c.eventsMinLapse)+4; var total=norm*min; c.eventsWrapper.css('width', total+'px'); updateFilling(c.timelineEvents.eq(0), c.fillingLine, total); return total; }
      function translateTimeline(c,val,limit){ var el=c.eventsWrapper.get(0); val = Math.min(0, val); if (typeof limit!=='undefined') val = Math.max(val, limit); setTransform(el,'translateX',val+'px'); c.timelineNavigation.find('.prev').toggleClass('inactive', val===0); c.timelineNavigation.find('.next').toggleClass('inactive', val===limit); }
      function updateSlide(c,tot,dir){ var tx=getTranslateX(c.eventsWrapper), w=Number(c.timelineWrapper.css('width').replace('px','')); if (dir==='next') translateTimeline(c, tx - w + eventsMinDistance, w - tot); else translateTimeline(c, tx + w - eventsMinDistance); }
      function updateVisibleContent($ev,$content){ var d=$ev.data('date'); var $vis=$content.find('.selected'); var $sel=$content.find('[data-date="'+d+'"]'); var h=$sel.height(); var entering = ($sel.index()>$vis.index())? 'selected enter-right' : 'selected enter-left'; var leaving = ($sel.index()>$vis.index())? 'leave-left' : 'leave-right'; $sel.attr('class', entering); $vis.attr('class', leaving).one('animationend webkitAnimationEnd oanimationend', function(){ $vis.removeClass('leave-right leave-left'); $sel.removeClass('enter-left enter-right'); }); $content.css('height', h+'px'); }
      function updateOlder($ev){
        // ensure selected is not marked as older
        $ev.removeClass('older-event');
        $ev.parent('li').prevAll('li').children('a').addClass('older-event')
          .end().end().nextAll('li').children('a').removeClass('older-event');
      }

      timelines.each(function(){
        var t=$(this), c={};
        c.timelineWrapper = t.find('.events-wrapper');
        c.eventsWrapper = c.timelineWrapper.children('.events');
        c.fillingLine = c.eventsWrapper.children('.filling-line');
        c.timelineEvents = c.eventsWrapper.find('a');
        c.timelineDates = parseDate(c.timelineEvents);
        c.eventsMinLapse = minLapse(c.timelineDates);
        c.timelineNavigation = t.find('.cd-timeline-navigation');
        c.eventsContent = t.children('.events-content');

        setDatePosition(c, eventsMinDistance);
        var tot = setTimelineWidth(c, eventsMinDistance);
        t.addClass('loaded');

        // Ensure the content area has height initially
        var $initSel = c.eventsContent.find('.selected');
        if ($initSel.length) {
          c.eventsContent.css('height', $initSel.height() + 'px');
        }
        // Recalculate on window load (after fonts/images)
        $(window).on('load', function(){
          var $cur = c.eventsContent.find('.selected');
          if ($cur.length) c.eventsContent.css('height', $cur.height() + 'px');
        });

        c.timelineNavigation.on('click', '.next', function(e){ e.preventDefault(); updateSlide(c, tot, 'next'); });
        c.timelineNavigation.on('click', '.prev', function(e){ e.preventDefault(); updateSlide(c, tot, 'prev'); });
        c.eventsWrapper.on('click', 'a', function(e){ e.preventDefault(); c.timelineEvents.removeClass('selected'); var $this=$(this).addClass('selected'); updateOlder($this); updateFilling($this, c.fillingLine, tot); updateVisibleContent($this, c.eventsContent); });

        $(document).on('keyup', function(e){ if (e.which===37) updateSlide(c, tot, 'prev'); else if (e.which===39) updateSlide(c, tot, 'next'); });
        $(window).on('resize', function(){ setDatePosition(c, eventsMinDistance); tot=setTimelineWidth(c, eventsMinDistance); });
      });
    });
  })();
});
