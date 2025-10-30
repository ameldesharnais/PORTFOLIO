


//NAVBAR
$(function () {
    const $win   = $(window);
    const $nav   = $('.navbar');
    const $hero  = $('.hero').first();
    const $bio   = $('.bio_container').first();
    const $proj  = $('.projects');   // ⬅️ switched from .project1 to #projects
    const $subs = $('#subs-reel');          // subtitling
    const $studio = $('#studio, #studio-recording');
    const $contact = $('#contact-magic');


    if (!$nav.length || !$hero.length) return;

    const HIDE_AFTER = 80;
    const DELTA_DOWN = 6;
    const DELTA_UP   = 6;

    let lastY = $win.scrollTop();
    let navHidden = false;

    $nav.addClass('no-animate');
    requestAnimationFrame(() => $nav.removeClass('no-animate'));

    function getSectionBottom($el) {
        return $el.length ? $el.offset().top + $el.outerHeight() : -Infinity;
    }

    function updateNavState(y) {
        const navHeight   = $nav.outerHeight();
        const heroTop     = $hero.offset().top;
        const heroHeight  = $hero.outerHeight();
        const heroQuarter = heroTop + heroHeight / 4;

        const heroBottom  = getSectionBottom($hero);
        const bioBottom   = getSectionBottom($bio);
        const projBottom  = getSectionBottom($proj);
        const subsBottom  = getSectionBottom($subs);
        const studioBottom  = getSectionBottom($studio);
        const contactBottom  = getSectionBottom($contact);



        // 🟡 Top state — until 1/4 of hero
        if (y <= heroQuarter) {
            $nav.attr('class', 'navbar nav--top' + (navHidden ? ' nav--hidden' : ''));
            return;
        }

        // 🔵 Solid — from 1/4 hero until hero bottom
        if (y + navHeight < heroBottom) {
            $nav.attr('class', 'navbar nav--solid' + (navHidden ? ' nav--hidden' : ''));
            return;
        }

        // 🟢 Bio — from hero bottom until bio bottom
        if (y + navHeight >= heroBottom && y + navHeight < bioBottom) {
            $nav.attr('class', 'navbar nav--bio_container' + (navHidden ? ' nav--hidden' : ''));
            return;
        }

        // 🟠 Projects — from bio bottom until projects bottom
        if (y + navHeight >= bioBottom && y + navHeight < projBottom) {
            $nav.attr('class', 'navbar nav--projects' + (navHidden ? ' nav--hidden' : ''));
            return;
        }

        // Subtitling
        if (y + navHeight >= projBottom && y + navHeight < subsBottom) {
            $nav.attr('class', 'navbar nav--subs' + (navHidden ? ' nav--hidden' : ''));
            return;
        }

        // Studio
        if (y + navHeight >= subsBottom && y + navHeight < studioBottom) {
            $nav.attr('class', 'navbar nav--studio' + (navHidden ? ' nav--hidden' : ''));
            return;
        }

        // Contact
        if (y + navHeight >= studioBottom && y + navHeight < contactBottom) {
            $nav.attr('class', 'navbar nav--contact' + (navHidden ? ' nav--hidden' : ''));
            return;
        }

        // ⚪ Transparent past projects
        if (y + navHeight >= contactBottom) {
            $nav.attr('class', 'navbar nav--transparent-past' + (navHidden ? ' nav--hidden' : ''));
            return;
        }
    }

    function onScroll() {
        const y = $win.scrollTop();

        // Hide / show navbar on scroll direction
        if (y - lastY > DELTA_DOWN && y > HIDE_AFTER) {
            navHidden = true;
        } else if (lastY - y > DELTA_UP) {
            navHidden = false;
        }

        updateNavState(y);
        lastY = y;
    }

    navHidden = false;
    updateNavState($win.scrollTop());
    $win.on('scroll', onScroll);
    $win.on('resize', () => updateNavState($win.scrollTop()));
});

// $(document).ready(function () {
//     const $nav = $('.navbar');
//     const scrollDuration = 1400; // 👈 adjust this for speed (in ms)
//
//     $('a[href^="#"]').on('click', function (e) {
//         const targetID = $(this).attr('href');
//         const $target = $(targetID);
//
//         if ($target.length) {
//             e.preventDefault();
//
//             const navHeight = $nav.outerHeight() || 0;
//             const targetPosition = $target.offset().top - navHeight;
//
//             // Animate scrolling
//             $('html, body').animate(
//                 { scrollTop: targetPosition },
//                 scrollDuration,
//                 'linear'
//             );
//         }
//     });
// });





//SECTION PROJETS

// 1. Your project data
const projects = [
    {
        title: "Sherwood × October's Very Own",
        text: "Projet chez Réservoir Audio.",
        video: "https://player.vimeo.com/video/1084336528?h=c195e369fb",
        tags: ["CONCEPTION SONORE", "MIX"],
        width: 697,
        height: 465
    },

    {
        title: "PUMA × FORMULA 1",
        text: "Projet chez Réservoir Audio.",
        video: "https://player.vimeo.com/video/1104570769?h=1260a8a708",
        tags: ["CONCEPTION SONORE", "MIX"],
        width: 697,
        height: 392
    },

    {
        title: "October's Very Own × WNBA",
        text: "Projet chez Réservoir Audio.",
        video: "https://player.vimeo.com/video/1093861951?h=3413530c5f",
        tags: ["CONCEPTION SONORE", "MIX"],
        width: 248,
        height: 150
    },

    {
        title: "CAMAQ AEROSPATIALE",
        text: "Projet chez Réservoir Audio.",
        video: "https://www.youtube.com/embed/GLj3fNteAbs?si=BdpukUOh9FpleM6A",
        tags: ["CONCEPTION SONORE"],
        width: 697,
        height: 392
    },

    {
        title: "STUKELY - DEMO REEL 2025",
        text: "Projet chez Réservoir Audio.",
        video: "https://player.vimeo.com/video/1065983306?h=fe56a5e7d3",
        tags: ["CONCEPTION SONORE", "MIX"],
        width: 697,
        height: 392
    },

    {
        title: "PLONGEON CANADA - LYSANNE RICHARD",
        text: "Projet chez Réservoir Audio.",
        video: "https://player.vimeo.com/video/1120839490?h=85ec468af1",
        tags: ["CONCEPTION SONORE"],
        width: 697,
        height: 392
    },

    {
        title: "FESTIF! AFTERMOVIE - 16e ÉDITION",
        text: "Conception sonore des cartes interactives • Projet chez Réservoir Audio.",
        video: "https://www.youtube.com/embed/rTF6DZ8v2CI?si=oaXvIoLKScieYWsa",
        tags: ["CONCEPTION SONORE"],
        width: 560,
        height: 315
    },

    {
        title: "RÊVE TON FUTUR - TOBI",
        text: "Projet chez Réservoir Audio.",
        video: "https://www.youtube.com/embed/boms1JLVgsM?si=rVA39jok2SL-M7bM",
        tags: ["CONCEPTION SONORE", "MONTAGE DIALOGUE", "PREMIX"],
        width: 560,
        height: 315
    },

    {
        title: "MANO A MANO - PODCAST",
        text: "Projet chez Réservoir Audio.",
        video: "https://www.youtube.com/embed/6WXP3eEs0u8?si=EOKSH63uaEzIxEBe",
        tags: ["CONCEPTION SONORE", "MONTAGE DIALOGUE"],
        width: 560,
        height: 315
    },

    {
        title: "COMPLÈTEMENT LYCÉE - SAISON 2 & 3",
        text: "Projet chez Réservoir Audio.",
        video: "https://www.youtube.com/embed/qug2Xkqwe9Q?si=j0VC0iIUsSFfWg6S",
        tags: ["POSTSYNCHRONISTION", "MONTAGE DIALOGUE"],
        width: 560,
        height: 315
    },



];


// 2. Render once the DOM is ready
$(function () {
    $.each(projects, function (i, p) {
        const sectionClass = (i % 2 === 0) ? "projet1 wrap" : "projet1 wrap invert";
        const tagsHTML = (p.tags || []).map(tag => `<li class="project__chip">${tag}</li>`).join("");


        $(".projects").append(`
      <section class="${sectionClass}">
        <div class="container_projet">
          <div class="text-content-projet">
            <div class="titre1"><h1>${p.title}</h1></div>
            <ul class="project__chips">${tagsHTML}</ul>
            <p class="contenu">${p.text}</p>
          </div>
          <div class="video-content">
            <div class="video-wrapper">
                <iframe 
                        src="${p.video}"
						style="aspect-ratio: ${p.width} / ${p.height}"
                        frameBorder="0"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        >
                </iframe>
            </div>
          </div>
        </div>
      </section>
    `);
    });
});


// SUBTITLING CAROUSEL — robust build + drag + infinite wrap
window.addEventListener('DOMContentLoaded', () => {

    function buildSubsOnce(trackSel, data){
        const track = document.querySelector(trackSel);
        if (!track) return null;

        // Solid fallback logic even if window.subtitleProjects = []
        const defaultProjects = [
            { title: "Complètement Lycée : Saison 2",  thumb: "assets/completement_lycee_S02.jpg",  url: "#work" },
            { title: "Complètement Lycée : Saison 3",  thumb: "assets/completement_lycee_S03.jpg",  url: "#work" },
            { title: "À bout d'bras : la petite histoire d'un patrimoine festif!",    thumb: "assets/aboutdebrasfestif.jpg",        url: "#work" },
            { title: "Papa(s)",                         thumb: "assets/papas.jpg",                   url: "#work" },
            { title: "Neglected",                       thumb: "assets/neglected.jpg",               url: "#work" },
            { title: "Plaza Plaisir : S1 (promos)",     thumb: "assets/plaza_plaisir2.jpg",          url: "#work" },
        ];

        const pick = (arr) => Array.isArray(arr) && arr.length ? arr : null;
        const projects = pick(data) || pick(window.subtitleProjects) || defaultProjects;

        const html = projects.map(p => `
      <li class="reel__item">
        <a class="reel__thumb" href="${p.url}" onclick="return false;" aria-label="${p.title}">
          <img src="${p.thumb}" alt="${p.title} — subtitling" width="320" height="180" decoding="async">
        </a>
        <span class="reel__title">${p.title}</span>
      </li>
    `).join('');

    //     const html = projects.map(p => `
    //   <li class="reel__item">
    //     <a class="reel__thumb" href="${p.url}" onclick="return false;" aria-label="${p.title}">
    //       <img src="${p.thumb}" alt="${p.title} — subtitling" width="320" height="180" decoding="async">
    //     </a>
    //     <span class="reel__title">${p.title}</span>
    //   </li>
    // `).join('');


        track.innerHTML = html;
        return track;
    }



    function initInfiniteReel() {
        // ⬇ change this to anything (even 1)
        const SPEED_PX_PER_SEC = 12;

        const scroller = document.querySelector('.subs-scroller');
        const mask = scroller?.querySelector('.reel__mask');
        const track = scroller?.querySelector('.reel__track');
        if (!mask || !track) return;

        // 0) Make sure CSS isn't also animating the track
        track.style.animation = 'none'; // kill any marquee keyframes if present

        // 1) Build enough clones to cover 2x mask width (true seamless loop)
        const unitItems = Array.from(track.children);
        if (!unitItems.length) return;

        // Measure one cycle width (the original list)
        const unitWidth = unitItems.reduce((w, el) => w + el.getBoundingClientRect().width, 0);

        // If the DOM doesn’t already have extra items, append until at least 2× mask width
        const needWidth = Math.max(mask.clientWidth * 2, unitWidth * 2);
        while (track.scrollWidth < needWidth) {
            unitItems.forEach(node => track.appendChild(node.cloneNode(true)));
        }

        // 2) Animation state
        let x = 0;                      // scrolling offset in pixels
        let last = performance.now();
        let playing = true;
        let dragging = false;
        let startX = 0;
        let startOffset = 0;

        // 3) Pointer-based drag (desktop & mobile)
        mask.addEventListener('pointerdown', (e) => {
            dragging = true;
            mask.setPointerCapture(e.pointerId);
            startX = e.clientX;
            startOffset = x;
        });
        mask.addEventListener('pointermove', (e) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            x = startOffset - dx;
            apply();
        });
        const endDrag = () => { dragging = false; };
        mask.addEventListener('pointerup', endDrag);
        mask.addEventListener('pointercancel', endDrag);
        mask.addEventListener('pointerleave', (e) => {
            if (dragging && e.pointerType !== 'touch') endDrag();
        });

        // 4) If you previously paused on hover via CSS, move that here or remove it
        //    Comment these 2 lines out if you NEVER want hover to pause.
        mask.addEventListener('mouseenter', () => (playing = true));   // keep running
        mask.addEventListener('mouseleave', () => (playing = true));    // keep running

        // 5) Render using sub-pixel precision and GPU compositing
        function apply() {
            // Wrap by the width of ONE unit cycle (the original list),
            // not by track.scrollWidth (which grows with clones).
            const period = unitWidth || track.scrollWidth;
            if (period > 0) {
                x = ((x % period) + period) % period; // keep in [0, period)
            }
            track.style.transform = `translate3d(${-x.toFixed(3)}px, 0, 0)`;
        }

        // 6) RAF loop (frame-rate independent)
        function tick(now) {
            const dt = (now - last) / 1000;
            last = now;

            if (playing && !dragging) {
                x += SPEED_PX_PER_SEC * dt; // sub-pixel accumulation
                apply();
            }
            requestAnimationFrame(tick);
        }

        // 7) Ensure smoothness
        track.style.willChange = 'transform';
        requestAnimationFrame((t) => { last = t; requestAnimationFrame(tick); });
    }



    // RUN
    buildSubsOnce('#reelTrack');
    initInfiniteReel('.subs-scroller');
});












// Swap the labels/links in-place (no stacked rows)
$(function () {
    const $navbar = $('.navbar');
    const $nav    = $('.nav-links');
    const $slot1  = $nav.find('.slot-1'); // PROJECTS link

    let closeTimer = null;

    function setSwap(on) {
        clearTimeout(closeTimer);
        if (on) {
            $navbar.addClass('nav--swap');
            $nav.find('.nav-link').each(function () {
                const $a = $(this);
                const swapHref = $a.data('swap-href');
                if (swapHref) $a.attr('href', swapHref);
            });
        } else {
            $navbar.removeClass('nav--swap');
            $nav.find('.nav-link').each(function () {
                const $a = $(this);
                const defHref = $a.data('default-href');
                if (defHref) $a.attr('href', defHref);
            });
        }
    }

    // Only hovering Projects opens the swap
    $slot1.on('mouseenter focusin', () => setSwap(true));

    // Keep open while inside the nav area
    $nav.on('mouseenter', () => clearTimeout(closeTimer));
    $nav.on('mouseleave', () => { closeTimer = setTimeout(() => setSwap(false), 140); });

    // Keyboard: close when focus leaves the nav
    $nav.on('focusout', (e) => {
        if (!$.contains($nav[0], e.relatedTarget)) setSwap(false);
    });
});


// ==== Studio Recording 4×4 Grid ====
const studioProjects = [
    // replace thumbs with your own; keep to 4:3 framing
    { title: "Un souper presque parfait", img: "assets/uspp.jpg", tags: ["Voix hors champ"], year: "2024 - Aujourd'hui" },
    { title: "À la poursuite du rêve glacé",       img: "assets/poursuite_reve.jpg", tags: ["Voix hors champ"], year: "2025" },
    { title: "Complètement Lycée : Season 2",       img: "assets/completement_lycee_s2.jpeg", tags: ["Doublage"], year: "2023" },
    { title: "Complètement Lycée : Season 3",         img: "assets/completement_lycee_s3.jpeg", tags: ["Doublage"], year: "2024" },
    { title: "J'adore le jus",      img: "assets/JLJ.jpg", tags: ["Voix hors champ"], year: "2024" },
    { title: "Sports Experts",      img: "assets/sports_experts.jpeg", tags: ["Voix hors champ"], year: "2023 - Aujourd'hui" },
    { title: "Les Grands Ballets Canadiens",      img: "assets/LGBC.jpg", tags: ["Voix hors champ"], year: "2024 - Aujourd'hui" },
    { title: "Silk : Next Milk",      img: "assets/silk_nextmilk.jpg", tags: ["Voix hors champ"], year: "2023" },
    { title: "Sur paroles: Le son du rap queb",      img: "assets/sur_paroles.jpg", tags: ["Doublage", "Surimpression vocale"], year: "2023" },

];


$(function(){
    const $grid = $("#studioGrid");
    if (!$grid.length) return;

    studioProjects.forEach(p => {
        const chips = (p.tags || []).map(t => `<li class="studio__chip">${t}</li>`).join("");
        $grid.append(`
      <li class="studio__item">
        <div class="studio__thumb">
          <img src="${p.img}" alt="${p.title}">
        </div>
        <div class="studio__meta">
          <h3 class="studio__title">${p.title}</h3>
          <span class="studio__year">${p.year}</span>
        </div>
        <ul class="studio__chips">${chips}</ul>
      </li>
    `);
    });
});




document.addEventListener('DOMContentLoaded', () => {
    // === Mobile drawer toggle ===
    const btn    = document.querySelector('.nav-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const scrim  = document.querySelector('.mobile-scrim');
    if (!btn || !drawer || !scrim) return;

    const close = () => {
        btn.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
        scrim.classList.remove('is-visible');
        scrim.hidden = true;
        document.documentElement.style.overflow = '';
    };

    const open = () => {
        btn.setAttribute('aria-expanded', 'true');
        drawer.classList.add('is-open');
        scrim.hidden = false;
        requestAnimationFrame(() => scrim.classList.add('is-visible'));
        document.documentElement.style.overflow = 'hidden';
    };

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        expanded ? close() : open();
    });

    scrim.addEventListener('click', close);
    drawer.querySelector('.drawer-close')?.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
});

// ==============================
// MOBILE NAV DRAWER & PROJECTS TOGGLE
// ==============================
(function () {
    const btn = document.getElementById('mProjects');
    const sub = document.getElementById('mProjectsSub');
    if (!btn || !sub) return;

    const openSub = () => {
        sub.hidden = false;
        const h = sub.scrollHeight;
        sub.style.maxHeight = h + 'px';
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
    };

    const closeSub = () => {
        const h = sub.scrollHeight;
        sub.style.maxHeight = h + 'px';
        requestAnimationFrame(() => {
            sub.style.maxHeight = '0px';
        });
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        sub.addEventListener('transitionend', function onEnd() {
            if (btn.getAttribute('aria-expanded') === 'false') sub.hidden = true;
            sub.removeEventListener('transitionend', onEnd);
        });
    };

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        expanded ? closeSub() : openSub();
    });
})();


// Mobile "Projects" accordion in the drawer
document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.getElementById('mProjects');
    const sub   = document.getElementById('mProjectsSub');
    const item  = btn ? btn.closest('.mobile-li') : null;
    if (!btn || !sub || !item) return;

    // Ensure we can animate: remove 'hidden', start collapsed
    if (sub.hasAttribute('hidden')) sub.removeAttribute('hidden');
    sub.style.maxHeight = '0px';

    const open = () => {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        // set to content height so it slides open
        sub.style.maxHeight = sub.scrollHeight + 'px';
    };

    const close = () => {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        sub.style.maxHeight = '0px';
    };

    btn.addEventListener('click', (e) => {
        e.preventDefault(); // works whether it's a button or anchor
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        expanded ? close() : open();
    });

    // If content changes (e.g., fonts load), keep height correct while open
    const ro = new ResizeObserver(() => {
        if (btn.getAttribute('aria-expanded') === 'true') {
            sub.style.maxHeight = sub.scrollHeight + 'px';
        }
    });
    ro.observe(sub);
});


(function initInfiniteReel(selector){
    const scroller = document.querySelector(selector);
    if (!scroller) return;

    const mask  = scroller.querySelector('.reel__mask');
    const track = scroller.querySelector('.reel__track');
    if (!mask || !track) return;

    // 0) Guard: if we already initialized, bail
    if (track.__infiniteInit) return;
    track.__infiniteInit = true;

    // 1) Collect real items
    const reals = Array.from(track.children);
    const REAL_COUNT = reals.length;
    if (!REAL_COUNT) return;

    // If there are very few, we’ll clone more so the wrap feels real
    const CLONE_COUNT = Math.max(4, Math.min(REAL_COUNT, 8));

    // 2) Build clones at BOTH ends
    for (let i = 0; i < CLONE_COUNT; i++){
        track.appendChild(reals[i % REAL_COUNT].cloneNode(true));               // head -> end
    }
    for (let i = REAL_COUNT - 1; i >= REAL_COUNT - CLONE_COUNT; i--){
        track.insertBefore(reals[(i + REAL_COUNT) % REAL_COUNT].cloneNode(true), track.firstChild); // tail -> start
    }

    // 3) Recompute references after cloning
    const all = Array.from(track.children);
    const prefix = all.slice(0, CLONE_COUNT);
    const realEls = all.slice(CLONE_COUNT, CLONE_COUNT + REAL_COUNT);

    // 4) Measure widths after fonts/images
    const sumWidth = (els) => els.reduce((w, el) => w + el.offsetWidth, 0);
    let prefixW = 0, realW = 0;

    function measure(){
        prefixW = sumWidth(prefix);
        realW   = sumWidth(realEls);
    }

    // 5) Seat at the start of real content (+1px so you can drag LEFT immediately)
    function seat(){
        mask.scrollLeft = prefixW + 1;
    }

    // 6) Drag-to-scroll (desktop + touch)
    let isDragging = false;
    let startX = 0;
    let startSL = 0;

    function onDown(e){
        isDragging = true;
        mask.classList.add('is-dragging');
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        startSL = mask.scrollLeft;

        // prevent link/img from hijacking
        if (e.target.closest('a, img')) e.preventDefault();

        window.addEventListener('mousemove', onMove, { passive:false });
        window.addEventListener('touchmove', onMove, { passive:false });
        window.addEventListener('mouseup', onUp, { once:true });
        window.addEventListener('touchend', onUp, { once:true });
    }
    function onMove(e){
        if (!isDragging) return;
        const x = (e.touches ? e.touches[0].clientX : e.clientX);
        mask.scrollLeft = startSL - (x - startX);
        wrapIfNeeded();
    }
    function onUp(){
        isDragging = false;
        mask.classList.remove('is-dragging');
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
    }

    ['mousedown','touchstart','pointerdown'].forEach(evt => {
        mask.addEventListener(evt, onDown, { passive:false });
    });

    // 7) Wheel → horizontal (desktop)
    mask.addEventListener('wheel', (e)=>{
        // Natural horizontal if available; otherwise convert vertical to horizontal
        const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        mask.scrollLeft += dx;
        wrapIfNeeded();
        e.preventDefault();
    }, { passive:false });

    // 8) Wrap logic both sides
    const EPS = 2;
    function wrapIfNeeded(){
        const sl = mask.scrollLeft;
        const left  = prefixW;
        const right = prefixW + realW;

        if (sl < left - EPS){
            mask.scrollLeft = sl + realW;     // jumped into head clones → push forward
        } else if (sl > right + EPS){
            mask.scrollLeft = sl - realW;     // jumped into tail clones → pull back
        }
    }
    mask.addEventListener('scroll', wrapIfNeeded);

    // 9) Ensure measure happens AFTER fonts & images, then seat
    function afterReady(cb){
        let pending = 1;
        const done = () => (--pending === 0 && cb());

        // fonts
        if (document.fonts && document.fonts.ready){
            pending++;
            document.fonts.ready.then(done);
        }

        // images inside the track
        track.querySelectorAll('img').forEach(img=>{
            if (!img.complete){
                pending++;
                img.addEventListener('load', done, { once:true });
                img.addEventListener('error', done, { once:true });
            }
        });

        done();
    }

    afterReady(()=>{
        measure();
        // Important: seat AFTER a frame so cloned nodes have layout
        requestAnimationFrame(()=>{
            measure();
            seat();
        });
    });

    // 10) Re-measure on resize (cards change size)
    let rTO;
    window.addEventListener('resize', ()=>{
        clearTimeout(rTO);
        rTO = setTimeout(()=>{
            const prevCenter = mask.scrollLeft - prefixW;
            measure();
            // keep the same relative position within the real band
            mask.scrollLeft = prefixW + Math.max(1, Math.min(realW-1, prevCenter));
        }, 120);
    });
})('.subs-scroller');


// 1) Clean any hash if the page loads with one (e.g., from external links)
if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
}

// 2) Intercept same-page anchor clicks, scroll, then remove the hash
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const hash = a.getAttribute('href');
    const id = decodeURIComponent(hash.slice(1));
    const target = id ? document.getElementById(id) : null;

    if (!target) return; // No matching element => let browser do its thing

    e.preventDefault(); // stop the hash from hitting the URL
    // Use your existing smooth scroll if you have one; otherwise:
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Remove the hash from the address bar (keeps history intact)
    history.replaceState(null, '', location.pathname + location.search);
});

// // Language switcher: load /fr or /en cleanly (no trailing filename)
// document.querySelectorAll('.lang-btn').forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         e.preventDefault(); // stop default navigation

//         // Check current language
//         const isFrench = window.location.pathname.includes('/fr');
//         const newLang = isFrench ? '/en' : '/fr';

//         // Redirect cleanly to base + newLang (without extra filename or hash)
//         const base = window.location.origin;
//         window.location.href = base + newLang + '/';
//     });
// });

window.addEventListener('load', () => {
  const cleanPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/fr\.html$/, '/fr/').replace(/\/en\.html$/, '/en/');
  history.replaceState(null, '', cleanPath);
});

















