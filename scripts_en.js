document.addEventListener("DOMContentLoaded", () => {
    // Detect browser language (e.g., "en", "fr", "en-CA", "fr-FR")
    const userLang = navigator.language || navigator.userLanguage;

    // Normalize to just the first two letters
    const lang = userLang.substring(0, 2).toLowerCase();

    // If you are currently on index.html (English default)
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        if (lang === "fr") {
            window.location.href = "PORTFOLIO_FR.html"; // redirect to your French page
        }
    }
    // Or if you’re on fr.html and user’s language is English, send back:
    else if (window.location.pathname.endsWith("PORTFOLIO_FR.html")) {
        if (lang === "en") {
            window.location.href = "index.html";
        }
    }
});




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
        text: "In collaboration with Réservoir Audio",
        video: "https://player.vimeo.com/video/1084336528?h=c195e369fb",
        tags: ["SOUND DESIGN", "MIX"],
        width: 697,
        height: 465
    },

    {
        title: "PUMA × FORMULA 1",
        text: "In collaboration with Réservoir Audio",
        video: "https://player.vimeo.com/video/1104570769?h=1260a8a708",
        tags: ["SOUND DESIGN", "MIX"],
        width: 697,
        height: 392
    },

    {
        title: "October's Very Own × WNBA",
        text: "In collaboration with Réservoir Audio",
        video: "https://player.vimeo.com/video/1093861951?h=3413530c5f",
        tags: ["SOUND DESIGN", "MIX"],
        width: 248,
        height: 150
    },

    {
        title: "CAMAQ AEROSPATIALE",
        text: "In collaboration with Réservoir Audio",
        video: "https://www.youtube.com/embed/GLj3fNteAbs?si=BdpukUOh9FpleM6A",
        tags: ["SOUND DESIGN"],
        width: 697,
        height: 392
    },

    {
        title: "STUKELY - DEMO REEL 2025",
        text: "In collaboration with Réservoir Audio",
        video: "https://player.vimeo.com/video/1065983306?h=fe56a5e7d3",
        tags: ["SOUND DESIGN", "MIX"],
        width: 697,
        height: 392
    },

    {
        title: "DIVING CANADA - LYSANNE RICHARD",
        text: "In collaboration with Réservoir Audio",
        video: "https://player.vimeo.com/video/1120839490?h=85ec468af1",
        tags: ["SOUND DESIGN"],
        width: 697,
        height: 392
    },

    {
        title: "FESTIF! AFTERMOVIE - 16th EDITION",
        text: "Sound design of the animated maps • In collaboration with Réservoir Audio",
        video: "https://www.youtube.com/embed/rTF6DZ8v2CI?si=oaXvIoLKScieYWsa",
        tags: ["SOUND DESIGN"],
        width: 560,
        height: 315
    },

    {
        title: "RÊVE TON FUTUR - TOBI",
        text: "In collaboration with Réservoir Audio",
        video: "https://www.youtube.com/embed/boms1JLVgsM?si=rVA39jok2SL-M7bM",
        tags: ["SOUND DESIGN", "DIALOG EDITING", "PREMIX"],
        width: 560,
        height: 315
    },

    {
        title: "MANO A MANO - PODCAST",
        text: "In collaboration with Réservoir Audio.",
        video: "https://www.youtube.com/embed/6WXP3eEs0u8?si=EOKSH63uaEzIxEBe",
        tags: ["SOUND DESIGN", "DIALOG EDITING"],
        width: 560,
        height: 315
    },

    {
        title: "COMPLÈTEMENT LYCÉE - SEASON 2 & 3",
        text: "In collaboration with Réservoir Audio.",
        video: "https://www.youtube.com/embed/qug2Xkqwe9Q?si=j0VC0iIUsSFfWg6S",
        tags: ["DIALOG SYNCING", "DIALOG EDITING"],
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



//CARROUSSEL
//
// $(function() {
//         /* -------------------------------------------------------
//         Subtitling Reel – robust build + constant-speed scroll
//         -------------------------------------------------------
//         HOW TO CONTROL SPEED:
//         - Default: CSS controls speed via :root { --reel-speed: 120s; }
//         - If you want JS to control it, set USE_CSS_SPEED = false
//         and tweak SPEED_MULTIPLIER / BASE_PX_PER_SEC.
//         -------------------------------------------------------- */
//
//         // 0) CONFIG
//         const USE_CSS_SPEED   = true;  // 👈 leave true if you want :root --reel-speed to win
//         const SPEED_MULTIPLIER = 3;    // only used when USE_CSS_SPEED === false
//         const BASE_PX_PER_SEC  = 110;  // ~110px/s baseline; higher = faster (when JS controls)
//
//         // 1) Your subtitling items
//         // If you already define subtitleProjects elsewhere, remove this block.
//         const subtitleProjects = (window.subtitleProjects ?? [
//         { title: "Complètement Lycée : Season 2",      thumb: "assets/completement_lycee_S02.jpg",      url: "#work" },
//         { title: "Complètement Lycée : Season 3",      thumb: "assets/completement_lycee_S03.jpg",      url: "#work" },
//         { title: "À bout d'bras : la petite histoire d'un patrimoine festif!", thumb: "assets/aboutdebrasfestif.jpg", url: "#work" },
//         { title: "Papa(s)",     thumb: "assets/papas.jpg",     url: "#work" },
//         { title: "Neglected", thumb: "assets/neglected.jpg",    url: "#work" },
//         { title: "Plaza Plaisir : Season 1 (promos)", thumb: "assets/plaza_plaisir2.jpg",    url: "#work" },
//         ]);
//
//         // 2) Build the reel
//         (function initReel(){
//         const track = document.getElementById('reelTrack');
//         const mask  = track?.closest('.reel__mask');
//         if (!track || !mask) return;
//
//         // Render a single set (no lazyload to avoid start delay)
//         const render = arr => arr.map(p => `
//     <li class="reel__item">
//       <div class="reel__thumb" href="${p.url}" aria-label="${p.title}">
//         <img src="${p.thumb}" alt="${p.title} — subtitling" width="320" height="180" decoding="async">
//       </div>
//       <span class="reel__title">${p.title}</span>
//     </li>
//   `).join('');
//
//         function build() {
//         // Reset to one set
//         track.classList.remove('is-ready');
//         track.innerHTML = render(subtitleProjects);
//
//         // Duplicate until the track exceeds ~2× viewport width
//         const vw = mask.clientWidth;
//         let TW = track.scrollWidth;
//         const oneSet = track.innerHTML;
//         let safety = 16; // avoid runaway loops
//
//         while (TW < vw * 2.1 && safety-- > 0) {
//         track.insertAdjacentHTML('beforeend', oneSet);
//         TW = track.scrollWidth;
//     }
//
//         // Seamless distance = half of final width
//         const distance = track.scrollWidth / 2; // px
//         track.style.setProperty('--reel-distance', distance + 'px');
//
//         // SPEED: either respect CSS variable or compute in JS
//         if (!USE_CSS_SPEED) {
//         const seconds = Math.max(
//         22,
//         Math.round(distance / BASE_PX_PER_SEC) * SPEED_MULTIPLIER
//         );
//         track.style.setProperty('--reel-speed', seconds + 's');
//     } else {
//         // Make sure we don't accidentally keep an old JS override
//         track.style.removeProperty('--reel-speed');
//     }
//
//         // Start animation (constant speed is ensured by CSS: linear)
//         track.classList.add('is-ready');
//
//
//     }
//
//         build();
//
//             // 🧠 Pause animation only when hovering over a thumbnail
//             track.addEventListener('mouseover', e => {
//                 if (e.target.closest('.reel__thumb')) {
//                     track.style.animationPlayState = 'paused';
//                 }
//             });
//             track.addEventListener('mouseout', e => {
//                 if (e.target.closest('.reel__thumb')) {
//                     track.style.animationPlayState = 'running';
//                 }
//             });
//
//         // Rebuild on resize (debounced by rAF)
//         let raf;
//         window.addEventListener('resize', () => {
//         cancelAnimationFrame(raf);
//         raf = requestAnimationFrame(build);
//     });
//     })();
//
//
// });

// $(function() {
//         /* -------------------------------------------------------
//         Subtitling Reel – robust build + constant-speed scroll
//         -------------------------------------------------------
//         HOW TO CONTROL SPEED:
//         - Default: CSS controls speed via :root { --reel-speed: 120s; }
//         - If you want JS to control it, set USE_CSS_SPEED = false
//         and tweak SPEED_MULTIPLIER / BASE_PX_PER_SEC.
//         -------------------------------------------------------- */
//
//         // 0) CONFIG
//         const USE_CSS_SPEED   = true;  // 👈 leave true if you want :root --reel-speed to win
//         const SPEED_MULTIPLIER = 3;    // only used when USE_CSS_SPEED === false
//         const BASE_PX_PER_SEC  = 110;  // ~110px/s baseline; higher = faster (when JS controls)
//
//         // 1) Your subtitling items
//         // If you already define subtitleProjects elsewhere, remove this block.
//         const subtitleProjects = (window.subtitleProjects ?? [
//         { title: "Complètement Lycée : Season 2",      thumb: "assets/completement_lycee_S02.jpg",      url: "#work" },
//         { title: "Complètement Lycée : Season 3",      thumb: "assets/completement_lycee_S03.jpg",      url: "#work" },
//         { title: "À bout d'bras : la petite histoire d'un patrimoine festif!", thumb: "assets/aboutdebrasfestif.jpg", url: "#work" },
//         { title: "Papa(s)",     thumb: "assets/papas.jpg",     url: "#work" },
//         { title: "Neglected", thumb: "assets/neglected.jpg",    url: "#work" },
//         { title: "Plaza Plaisir : Season 1 (promos)", thumb: "assets/plaza_plaisir2.jpg",    url: "#work" },
//         ]);
//
//         // 2) Build the reel
//         (function initReel(){
//         const track = document.getElementById('reelTrack');
//         const mask  = track?.closest('.reel__mask');
//         if (!track || !mask) return;
//
//         // Render a single set (no lazyload to avoid start delay)
//         const render = arr => arr.map(p => `
//     <li class="reel__item">
//       <div class="reel__thumb" href="${p.url}" aria-label="${p.title}">
//         <img src="${p.thumb}" alt="${p.title} — subtitling" width="320" height="180" decoding="async">
//       </div>
//       <span class="reel__title">${p.title}</span>
//     </li>
//   `).join('');
//
//         function build() {
//         // Reset to one set
//         track.classList.remove('is-ready');
//         track.innerHTML = render(subtitleProjects);
//
//         // Duplicate until the track exceeds ~2× viewport width
//         const vw = mask.clientWidth;
//         let TW = track.scrollWidth;
//         const oneSet = track.innerHTML;
//         let safety = 16; // avoid runaway loops
//
//         while (TW < vw * 2.1 && safety-- > 0) {
//         track.insertAdjacentHTML('beforeend', oneSet);
//         TW = track.scrollWidth;
//     }
//
//         // Seamless distance = half of final width
//         const distance = track.scrollWidth / 2; // px
//         track.style.setProperty('--reel-distance', distance + 'px');
//
//         // SPEED: either respect CSS variable or compute in JS
//         if (!USE_CSS_SPEED) {
//         const seconds = Math.max(
//         22,
//         Math.round(distance / BASE_PX_PER_SEC) * SPEED_MULTIPLIER
//         );
//         track.style.setProperty('--reel-speed', seconds + 's');
//     } else {
//         // Make sure we don't accidentally keep an old JS override
//         track.style.removeProperty('--reel-speed');
//     }
//
//         // Start animation (constant speed is ensured by CSS: linear)
//         track.classList.add('is-ready');
//
//
//     }
//
//         build();
//
//             // 🧠 Pause animation only when hovering over a thumbnail
//             track.addEventListener('mouseover', e => {
//                 if (e.target.closest('.reel__thumb')) {
//                     track.style.animationPlayState = 'paused';
//                 }
//             });
//             track.addEventListener('mouseout', e => {
//                 if (e.target.closest('.reel__thumb')) {
//                     track.style.animationPlayState = 'running';
//                 }
//             });
//
//         // Rebuild on resize (debounced by rAF)
//         let raf;
//         window.addEventListener('resize', () => {
//         cancelAnimationFrame(raf);
//         raf = requestAnimationFrame(build);
//     });
//     })();
//
//
// });

// SUBTITLING CAROUSEL — robust build + drag + infinite wrap
window.addEventListener('DOMContentLoaded', () => {

    function buildSubsOnce(trackSel, data){
        const track = document.querySelector(trackSel);
        if (!track) return null;

        // Solid fallback logic even if window.subtitleProjects = []
        const defaultProjects = [
            { title: "Complètement Lycée : Season 2",  thumb: "assets/completement_lycee_S02.jpg",  url: "#work" },
            { title: "Complètement Lycée : Season 3",  thumb: "assets/completement_lycee_S03.jpg",  url: "#work" },
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

    // function initInfiniteReel(containerSel){
    //     const container = document.querySelector(containerSel);
    //     if (!container) return;
    //
    //     const mask  = container.querySelector('.reel__mask');
    //     const track = container.querySelector('.reel__track');
    //     if (!mask || !track) return;
    //
    //     const baseHTML = track.innerHTML.trim();
    //     if (!baseHTML) return; // nothing to loop — bail gracefully
    //
    //     // Duplicate 3× for seamless wrap
    //     track.innerHTML = baseHTML + baseHTML + baseHTML;
    //
    //     let oneSetWidth = 0;
    //     let isDragging = false, dragMoved = false;
    //     let startX = 0, startLeft = 0;
    //
    //     const measure = () => { oneSetWidth = track.scrollWidth / 3; };
    //     const seatMiddle = () => { mask.scrollLeft = oneSetWidth; };
    //     const wrapIfNeeded = () => {
    //         if (mask.scrollLeft <= 0) mask.scrollLeft += oneSetWidth;
    //         else if (mask.scrollLeft >= oneSetWidth * 2) mask.scrollLeft -= oneSetWidth;
    //     };


    //     // Drag (pointer) support
    //     const getX = (e) => ('clientX' in e ? e.clientX : (e.touches?.[0]?.clientX || 0));
    //     function onDown(e){
    //         isDragging = true; dragMoved = false;
    //         startX = getX(e); startLeft = mask.scrollLeft;
    //         mask.classList.add('is-dragging');
    //         if (e.pointerId != null && mask.setPointerCapture) mask.setPointerCapture(e.pointerId);
    //     }
    //     function onMove(e){
    //         if (!isDragging) return;
    //         const dx = getX(e) - startX;
    //         if (Math.abs(dx) > 3) dragMoved = true;
    //         mask.scrollLeft = startLeft - dx;
    //         wrapIfNeeded();
    //     }
    //     function onUp(e){
    //         if (!isDragging) return;
    //         isDragging = false; mask.classList.remove('is-dragging');
    //         if (dragMoved){
    //             const a = e.target.closest('a');
    //             if (a) a.addEventListener('click', (ev)=>{ ev.preventDefault(); ev.stopPropagation(); }, { once:true, capture:true });
    //         }
    //     }
    //
    //     // Wheel → horizontal
    //     function onWheel(e){
    //         if (Math.abs(e.deltaY) > Math.abs(e.deltaX)){
    //             e.preventDefault();
    //             mask.scrollLeft += e.deltaY;
    //             wrapIfNeeded();
    //         }
    //     }
    //
    //     // Re-seat after images and on resize
    //     function afterImages(cb){
    //         const imgs = track.querySelectorAll('img');
    //         if (!imgs.length) return cb();
    //         let left = imgs.length;
    //         imgs.forEach(img => {
    //             if (img.complete) { if (--left === 0) cb(); }
    //             else img.addEventListener('load', () => { if (--left === 0) cb(); }, { once:true });
    //         });
    //     }
    //
    //     function setup(){
    //         measure();
    //         seatMiddle();
    //     }
    //
    //     // Listeners
    //     mask.addEventListener('pointerdown', onDown);
    //     mask.addEventListener('pointermove', onMove);
    //     mask.addEventListener('pointerup', onUp);
    //     mask.addEventListener('pointercancel', onUp);
    //     mask.addEventListener('mouseleave', onUp);
    //
    //     mask.addEventListener('touchstart', onDown, { passive:true });
    //     mask.addEventListener('touchmove', onMove, { passive:true });
    //     mask.addEventListener('touchend', onUp);
    //
    //     mask.addEventListener('wheel', onWheel, { passive:false });
    //     mask.addEventListener('scroll', wrapIfNeeded, { passive:true });
    //
    //     let raf;
    //     window.addEventListener('resize', () => {
    //         cancelAnimationFrame(raf);
    //         raf = requestAnimationFrame(() => {
    //             const ratio = oneSetWidth ? (mask.scrollLeft % oneSetWidth) / oneSetWidth : 0;
    //             measure(); seatMiddle(); mask.scrollLeft += ratio * oneSetWidth;
    //         });
    //     });
    //
    //     document.addEventListener('visibilitychange', () => {
    //         if (document.visibilityState === 'visible') seatMiddle();
    //     });
    //
    //     afterImages(setup);
    //     setup();
    // }

    // function initInfiniteReel(containerSel){
    //     const container = document.querySelector(containerSel);
    //     if (!container) return;
    //
    //     const mask  = container.querySelector('.reel__mask');
    //     const track = container.querySelector('.reel__track');
    //     if (!mask || !track) return;
    //
    //     const baseHTML = track.innerHTML.trim();
    //     if (!baseHTML) return; // nothing to loop
    //
    //     // Duplicate 3× for seamless wrap
    //     track.innerHTML = baseHTML + baseHTML + baseHTML;
    //
    //     let oneSetWidth = 0;
    //     let isDragging = false, dragMoved = false;
    //     let startX = 0, startLeft = 0;
    //
    //     // ===== Auto scroll state =====
    //     const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    //     let rafId = null;
    //     let lastTs = 0;
    //     let pxPerSec = 40; // feel free to tweak (e.g., 60–120)
    //     let isPaused = false;
    //
    //     const measure = () => { oneSetWidth = track.scrollWidth / 3; };
    //     const seatMiddle = () => { mask.scrollLeft = oneSetWidth; };
    //     const wrapIfNeeded = () => {
    //         if (mask.scrollLeft <= 0) mask.scrollLeft += oneSetWidth;
    //         else if (mask.scrollLeft >= oneSetWidth * 2) mask.scrollLeft -= oneSetWidth;
    //     };
    //
    //     // ===== Auto scroll loop (requestAnimationFrame) =====
    //     function tick(ts){
    //         if (isPaused || isDragging || reduceMotion) {
    //             lastTs = ts;
    //             rafId = requestAnimationFrame(tick);
    //             return;
    //         }
    //         if (!lastTs) lastTs = ts;
    //         const dt = (ts - lastTs) / 1000; // seconds
    //         lastTs = ts;
    //
    //         mask.scrollLeft += pxPerSec * dt;
    //         wrapIfNeeded();
    //         rafId = requestAnimationFrame(tick);
    //     }
    //
    //     function startAuto(){
    //         if (reduceMotion) return; // honor the user’s setting
    //         if (rafId == null) {
    //             lastTs = 0;
    //             rafId = requestAnimationFrame(tick);
    //         }
    //     }
    //
    //     function stopAuto(){
    //         if (rafId != null) {
    //             cancelAnimationFrame(rafId);
    //             rafId = null;
    //         }
    //     }
    //
    //     // Rather than stopping the loop entirely on hover, we flag pause
    //     function pauseAuto(){ isPaused = true; }
    //     function resumeAuto(){ isPaused = false; }
    //
    //     // ===== Drag (pointer/touch) =====
    //     const getX = (e) => ('clientX' in e ? e.clientX : (e.touches?.[0]?.clientX || 0));
    //
    //     function onDown(e){
    //         isDragging = true; dragMoved = false;
    //         startX = getX(e); startLeft = mask.scrollLeft;
    //         mask.classList.add('is-dragging');
    //         pauseAuto(); // pause while dragging
    //         if (e.pointerId != null && mask.setPointerCapture) mask.setPointerCapture(e.pointerId);
    //     }
    //     function onMove(e){
    //         if (!isDragging) return;
    //         const dx = getX(e) - startX;
    //         if (Math.abs(dx) > 3) dragMoved = true;
    //         mask.scrollLeft = startLeft - dx;
    //         wrapIfNeeded();
    //     }
    //     function onUp(e){
    //         if (!isDragging) return;
    //         isDragging = false; mask.classList.remove('is-dragging');
    //         // if dragged, absorb the click on the link under the cursor
    //         if (dragMoved){
    //             const a = e.target.closest('a');
    //             if (a) a.addEventListener('click', (ev)=>{ ev.preventDefault(); ev.stopPropagation(); }, { once:true, capture:true });
    //         }
    //         resumeAuto();
    //     }
    //
    //     // Wheel → horizontal; pause briefly while user interacts
    //     let wheelPauseTimer = null;
    //     function onWheel(e){
    //         if (Math.abs(e.deltaY) > Math.abs(e.deltaX)){
    //             e.preventDefault();
    //             mask.scrollLeft += e.deltaY;
    //             wrapIfNeeded();
    //             pauseAuto();
    //             clearTimeout(wheelPauseTimer);
    //             wheelPauseTimer = setTimeout(resumeAuto, 400);
    //         }
    //     }
    //
    //     // Build helpers
    //     function afterImages(cb){
    //         const imgs = track.querySelectorAll('img');
    //         if (!imgs.length) return cb();
    //         let left = imgs.length;
    //         imgs.forEach(img => {
    //             if (img.complete) { if (--left === 0) cb(); }
    //             else img.addEventListener('load', () => { if (--left === 0) cb(); }, { once:true });
    //         });
    //     }
    //
    //     // Init / listeners
    //     function setup(){
    //         measure();
    //         seatMiddle();
    //         startAuto();
    //     }
    //
    //     // Hover pause (desktop)
    //     mask.addEventListener('mouseenter', pauseAuto);
    //     mask.addEventListener('mouseleave', resumeAuto);
    //
    //     // Drag
    //     mask.addEventListener('pointerdown', onDown);
    //     mask.addEventListener('pointermove', onMove);
    //     mask.addEventListener('pointerup', onUp);
    //     mask.addEventListener('pointercancel', onUp);
    //     mask.addEventListener('mouseleave', onUp); // safety
    //
    //     mask.addEventListener('touchstart', onDown, { passive:true });
    //     mask.addEventListener('touchmove', onMove, { passive:true });
    //     mask.addEventListener('touchend', onUp);
    //
    //     // Wheel
    //     mask.addEventListener('wheel', onWheel, { passive:false });
    //
    //     // Keep wrapping on any scroll (programmatic or user)
    //     mask.addEventListener('scroll', wrapIfNeeded, { passive:true });
    //
    //     // Resize: preserve relative position
    //     let resizeRaf;
    //     window.addEventListener('resize', () => {
    //         cancelAnimationFrame(resizeRaf);
    //         resizeRaf = requestAnimationFrame(() => {
    //             const ratio = oneSetWidth ? (mask.scrollLeft % oneSetWidth) / oneSetWidth : 0;
    //             measure(); seatMiddle(); mask.scrollLeft += ratio * oneSetWidth;
    //         });
    //     });
    //
    //     // Tab visibility wake-up
    //     document.addEventListener('visibilitychange', () => {
    //         if (document.visibilityState === 'visible') {
    //             seatMiddle();
    //             startAuto();
    //         } else {
    //             stopAuto();
    //         }
    //     });
    //
    //     // Run
    //     afterImages(setup);
    //     setup();
    // }

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
    { title: "Un souper presque parfait", img: "assets/uspp.jpg", tags: ["Voice-over"], year: "2024 - Present" },
    { title: "À la poursuite du rêve glacé",       img: "assets/poursuite_reve.jpg", tags: ["Voice-over"], year: "2025" },
    { title: "Complètement Lycée : Season 2",       img: "assets/completement_lycee_s2.jpeg", tags: ["Dubbing"], year: "2023" },
    { title: "Complètement Lycée : Season 3",         img: "assets/completement_lycee_s3.jpeg", tags: ["Dubbing"], year: "2024" },
    { title: "J'adore le jus",      img: "assets/JLJ.jpg", tags: ["Voice-over"], year: "2024" },
    { title: "Sports Experts",      img: "assets/sports_experts.jpeg", tags: ["Voice-Over"], year: "2023 - Present" },
    { title: "Les Grands Ballets Canadiens",      img: "assets/LGBC.jpg", tags: ["Voice-Over"], year: "2024 - Present" },
    { title: "Silk : Next Milk",      img: "assets/silk_nextmilk.jpg", tags: ["Voice-Over"], year: "2023" },
    { title: "Sur paroles: Le son du rap queb",      img: "assets/sur_paroles.jpg", tags: ["Dubbing", "Vocal Overlay"], year: "2023" },

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

//
// // Drag-to-scroll for horizontal reels (desktop + mobile)
// (() => {
//     function hook(el){
//         let isDown = false, startX = 0, startLeft = 0, dragged = false;
//
//         const down = (e) => {
//             // primary button / any pointer
//             if (e.button !== undefined && e.button !== 0) return;
//             isDown = true;
//             dragged = false;
//             startX = (e.clientX ?? e.pageX);
//             startLeft = el.scrollLeft;
//             el.classList.add('is-dragging');
//             if (e.pointerId !== undefined && el.setPointerCapture) {
//                 el.setPointerCapture(e.pointerId);
//             }
//         };
//
//         const move = (e) => {
//             if (!isDown) return;
//             const x = (e.clientX ?? e.pageX);
//             const dx = x - startX;
//             if (Math.abs(dx) > 3) dragged = true;
//             el.scrollLeft = startLeft - dx;
//         };
//
//         const up = (e) => {
//             if (!isDown) return;
//             isDown = false;
//             el.classList.remove('is-dragging');
//             if (e.pointerId !== undefined && el.releasePointerCapture) {
//                 el.releasePointerCapture(e.pointerId);
//             }
//         };
//
//         // If user dragged, suppress clicks on links/images inside
//         el.addEventListener('click', (e) => { if (dragged) e.preventDefault(); }, true);
//
//         el.addEventListener('pointerdown', down);
//         window.addEventListener('pointermove', move);
//         window.addEventListener('pointerup', up);
//         window.addEventListener('pointercancel', up);
//         window.addEventListener('pointerleave', up);
//     }
//
//     function init(){
//         document.querySelectorAll('[data-drag-scroll]').forEach(hook);
//     }
//
//     (document.readyState === 'loading')
//         ? document.addEventListener('DOMContentLoaded', init)
//         : init();
// })();
//


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

















