/**
 * Winnica Gostchorze — Galeria
 * =============================
 * Logika galerii: siatka miniatur + lightbox ze sliderem.
 * Dopasowana do stylu strony (krem/złoto/ciemna zieleń).
 */
(function() {
 'use strict';
 /* ── Konfiguracja ── */
 const GALLERY_BASE_PATH = '/winnica/images/galeria/';
 const VISIBLE_THUMBS = 6; 
 const THUMB_ASPECT = '4/3'; 
 /* ── Dane galerii (wbudowane — wygenerowane z OPISY.txt) ── */
 const GALLERY_ITEMS = [
 {id:"Winnica-Dubois-0003",filename:"Winnica-Dubois-0003.webp",description:"Sadzenie winorośli – praca przy sadzeniu młodych krzewów winorośli w winnicy Gostchorze.",descEN:"Planting vines – work on planting young grapevines at the Gostchorze vineyard.",descFR:"Plantation de vignes – travail de plantation de jeunes ceps dans le vignoble de Gostchorze."},
 {id:"Winnica-Dubois-0023",filename:"Winnica-Dubois-0023.webp",description:"Winogrona na krzewie – zbliżenie na dojrzałe grona winogron rosnące na krzewie w winnicy.",descEN:"Grapes on the vine – close-up of ripe grape clusters growing on a vine in the vineyard.",descFR:"Raisins sur la vigne – gros plan sur des grappes de raisins mûrs poussant sur un cep dans le vignoble."},
 {id:"Winnica-Dubois-0025",filename:"Winnica-Dubois-0025.webp",description:"Zielone winogrona – fotografia przedstawiająca zielone grona winogron na tle liści winorośli.",descEN:"Green grapes – photograph showing green grape clusters against vine leaves.",descFR:"Raisins verts – photographie montrant des grappes de raisins verts sur fond de feuilles de vigne."},
 {id:"Winnica-Dubois-0080",filename:"Winnica-Dubois-0080.webp",description:"Wiosenne prace – prace w winnicy w okresie wiosennym, przygotowanie krzewów do sezonu.",descEN:"Spring work – vineyard work in spring, preparing the vines for the season.",descFR:"Travaux de printemps – travaux dans le vignoble au printemps, préparation des ceps pour la saison."},
 {id:"Winnica-Dubois-0120",filename:"Winnica-Dubois-0120.webp",description:"Panorama winnicy – szeroki kadr na rozległe plantacje winorośli w Gostchorzu.",descEN:"Vineyard panorama – wide shot of the extensive vine plantations in Gostchorze.",descFR:"Panorama du vignoble – plan large sur les vastes plantations de vignes à Gostchorze."},
 {id:"Winnica-Dubois-0123",filename:"Winnica-Dubois-0123.webp",description:"Rzędy winorośli – widok na długie, równoległe rzędy krzewów winorośli ciągnące się w dal.",descEN:"Vine rows – view of long, parallel rows of grapevines stretching into the distance.",descFR:"Rangées de vignes – vue sur de longues rangées parallèles de ceps de vigne s'étendant à l'horizon."},
 {id:"Winnica-Dubois-0231",filename:"Winnica-Dubois-0231.webp",description:"Zbiór winogron – prace przy zbiorze winogron w sezonie winobraniowym.",descEN:"Grape harvest – work during the grape picking season.",descFR:"Récolte des raisins – travaux de cueillette des raisins pendant la saison des vendanges."},
 {id:"Winnica-Dubois-0237",filename:"Winnica-Dubois-0237.webp",description:"Dojrzałe winogrona – zbliżenie na dojrzałe, ciemne grona winogron gotowe do zbioru.",descEN:"Ripe grapes – close-up of ripe, dark grape clusters ready for harvest.",descFR:"Raisins mûrs – gros plan sur des grappes de raisins sombres et mûrs prêts pour la récolte."},
 {id:"Winnica-Dubois-0258",filename:"Winnica-Dubois-0258.webp",description:"Winiarski sprzęt – maszyny i narzędzia używane w procesie produkcji wina.",descEN:"Winemaking equipment – machines and tools used in the wine production process.",descFR:"Équipement vinicole – machines et outils utilisés dans le processus de production du vin."},
 {id:"Winnica-Dubois-0276",filename:"Winnica-Dubois-0276.webp",description:"Degustacja wina – moment degustacji wina w winnicy, próbowanie produktu.",descEN:"Wine tasting – a moment of wine tasting at the vineyard, sampling the product.",descFR:"Dégustation de vin – moment de dégustation de vin dans le vignoble, dégustation du produit."},
 {id:"Winnica-Dubois-0394",filename:"Winnica-Dubois-0394.webp",description:"Architektura winnicy – budynek i infrastruktura winnicy Gostchorze.",descEN:"Vineyard architecture – the building and infrastructure of the Gostchorze vineyard.",descFR:"Architecture du vignoble – le bâtiment et l'infrastructure du vignoble de Gostchorze."},
 {id:"Winnica-Gostchorze-00000",filename:"Winnica-Gostchorze-00000.webp",description:"Obróbka winogron – proces przetwarzania zebranych winogron w winiarni.",descEN:"Grape processing – the process of processing harvested grapes in the winery.",descFR:"Traitement du raisin – le processus de transformation des raisins récoltés dans la cave."},
 {id:"Winnica-Gostchorze-00001",filename:"Winnica-Gostchorze-00001.webp",description:"Winiarnia wnętrze – wnętrze budynku winiarni z beczkami lub zbiornikami.",descEN:"Winery interior – inside the winery building with barrels or tanks.",descFR:"Intérieur de la cave – l'intérieur du bâtiment de la cave avec des barriques ou des cuves."},
 {id:"Winnica-Gostchorze-00002",filename:"Winnica-Gostchorze-00002.webp",description:"Produkcja wina – etap produkcji wina musującego metodą tradycyjną.",descEN:"Wine production – stage of sparkling wine production using the traditional method.",descFR:"Production de vin – étape de production de vin effervescent par la méthode traditionnelle."},
 {id:"Winnica-Gostchorze-00003",filename:"Winnica-Gostchorze-00003.webp",description:"Butelki wina – rząd butelek wina GostArt ułożonych w piwnicy do leżakowania.",descEN:"Wine bottles – a row of GostArt wine bottles arranged in the cellar for ageing.",descFR:"Bouteilles de vin – une rangée de bouteilles de vin GostArt disposées dans la cave pour le vieillissement."},
 {id:"Winnica-Gostchorze-00004",filename:"Winnica-Gostchorze-00004.webp",description:"Leżakowanie wina – butelki wina leżakujące w pozycji poziomej w piwnicy.",descEN:"Wine ageing – bottles of wine ageing in a horizontal position in the cellar.",descFR:"Vieillissement du vin – bouteilles de vin vieillissant en position horizontale dans la cave."},
 {id:"Winnica-Gostchorze-00005",filename:"Winnica-Gostchorze-00005.webp",description:"Zbiornik winiarski – duży stal zbiornik do fermentacji wina.",descEN:"Wine tank – large steel tank for wine fermentation.",descFR:"Cuve vinicole – grande cuve en acier pour la fermentation du vin."},
 {id:"Winnica-Gostchorze-00006",filename:"Winnica-Gostchorze-00006.webp",description:"Winiarska technologia – nowoczesny sprzęt do produkcji wina musującego.",descEN:"Winemaking technology – modern equipment for sparkling wine production.",descFR:"Technologie vinicole – équipement moderne pour la production de vin effervescent."},
 {id:"Winnica-Gostchorze-00007",filename:"Winnica-Gostchorze-00007.webp",description:"Etykietowanie – proces naklejania etykiet na butelki wina GostArt.",descEN:"Labelling – the process of applying labels to GostArt wine bottles.",descFR:"Étiquetage – le processus d'application d'étiquettes sur les bouteilles de vin GostArt."},
 {id:"Winnica-Gostchorze-00008-683x1024",filename:"Winnica-Gostchorze-00008-683x1024.webp",description:"Butelka wina GostArt – eleganckie zdjęcie butelki wina musującego GostArt na ciemnym tle.",descEN:"GostArt wine bottle – elegant photo of a GostArt sparkling wine bottle on a dark background.",descFR:"Bouteille de vin GostArt – photo élégante d'une bouteille de vin effervescent GostArt sur fond sombre."},
 {id:"Winnica-Gostchorze-00152-kw",filename:"Winnica-Gostchorze-00152-kw.webp",description:"Para wśród winorośli – Guillaume Dubois z żoną Virginie stojący wśród zielonych krzewów winorośli.",descEN:"Couple among the vines – Guillaume Dubois with his wife Virginie standing among green grapevines.",descFR:"Couple parmi les vignes – Guillaume Dubois avec son épouse Virginie debout parmi les vignes vertes."},
 {id:"Winnica-Gostchorze-007",filename:"Winnica-Gostchorze-007.webp",description:"Widok na winnicę – malowniczy widok na wzgórza winnicy Gostchorze nad Odrą.",descEN:"Vineyard view – picturesque view of the Gostchorze vineyard hills above the Oder river.",descFR:"Vue sur le vignoble – vue pittoresque sur les collines du vignoble de Gostchorze au-dessus de l'Oder."},
 {id:"Winnica-Gostchorze-012",filename:"Winnica-Gostchorze-012.webp",description:"Młode winorośle – młode krzewy winorośli na wiosnę, początek sezonu wegetacyjnego.",descEN:"Young vines – young grapevines in spring, the beginning of the growing season.",descFR:"Jeunes vignes – jeunes ceps de vigne au printemps, début de la saison de végétation."},
 {id:"Winnica-Gostchorze-017",filename:"Winnica-Gostchorze-017.webp",description:"Zielona winnica – winnica w pełnej krasie zielonych liści latem.",descEN:"Green vineyard – the vineyard in full splendour of green leaves in summer.",descFR:"Vignoble vert – le vignoble dans toute sa splendeur de feuilles vertes en été."},
 {id:"Winnica-Gostchorze-019",filename:"Winnica-Gostchorze-019.webp",description:"Krajobraz winnicy – rozległy widok na winnice z okolicznym krajobrazem.",descEN:"Vineyard landscape – expansive view of the vineyard with the surrounding landscape.",descFR:"Paysage du vignoble – vue panoramique sur le vignoble avec le paysage environnant."},
 {id:"Winnica-Gostchorze-023",filename:"Winnica-Gostchorze-023.webp",description:"Jesienna winnica – winnica w barwach jesiennych, okres zbiorów.",descEN:"Autumn vineyard – the vineyard in autumn colours, harvest time.",descFR:"Vignoble d'automne – le vignoble aux couleurs de l'automne, période des vendanges."},
 {id:"Winnica-Gostchorze-027",filename:"Winnica-Gostchorze-027.webp",description:"Oświetlona winnica – winnica w złotym świetle słonecznym o zachodzie.",descEN:"Sunlit vineyard – the vineyard in golden sunlight at sunset.",descFR:"Vignoble ensoleillé – le vignoble dans la lumière dorée du soleil couchant."},
 {id:"Winnica-Gostchorze-032",filename:"Winnica-Gostchorze-032.webp",description:"Zimowa winnica – winnica w okresie zimowym, cięcie i pielęgnacja krzewów.",descEN:"Winter vineyard – the vineyard in winter, pruning and vine maintenance.",descFR:"Vignoble d'hiver – le vignoble en hiver, taille et entretien des ceps."},
 {id:"Winnica-Gostchorze-035",filename:"Winnica-Gostchorze-035.webp",description:"Prace sezonowe – personel wykonujący prace w winnicy w okresie wegetacyjnym.",descEN:"Seasonal work – staff carrying out work in the vineyard during the growing season.",descFR:"Travaux saisonniers – personnel effectuant des travaux dans le vignoble pendant la saison de végétation."},
 {id:"Winnica-Gostchorze-038",filename:"Winnica-Gostchorze-038.webp",description:"Winnicza ścieżka – ścieżka biegnąca pomiędzy rzędami winorośli.",descEN:"Vineyard path – a path running between the rows of grapevines.",descFR:"Chemin du vignoble – un chemin traversant les rangées de vignes."},
 {id:"Winnica-Gostchorze-041",filename:"Winnica-Gostchorze-041.webp",description:"Zbliżenie na liście – detale liści winorośli w słońcu.",descEN:"Leaf close-up – details of vine leaves in the sun.",descFR:"Gros plan sur les feuilles – détails des feuilles de vigne au soleil."},
 {id:"Winnica-Gostchorze-043",filename:"Winnica-Gostchorze-043.webp",description:"Butelka GostArt detal – zbliżenie na etykietę butelki wina GostArt.",descEN:"GostArt bottle detail – close-up of the GostArt wine bottle label.",descFR:"Détail bouteille GostArt – gros plan sur l'étiquette de la bouteille de vin GostArt."},
 {id:"Winnica-Gostchorze-057",filename:"Winnica-Gostchorze-057.webp",description:"Prezentacja wina – prezentacja butelki wina GostArt podczas wydarzenia.",descEN:"Wine presentation – presentation of a GostArt wine bottle at an event.",descFR:"Présentation du vin – présentation d'une bouteille de vin GostArt lors d'un événement."},
 {id:"Winnica-Gostchorze-GOSTART-2016-Winobranie-2017-gold",filename:"Winnica-Gostchorze-GOSTART-2016-Winobranie-2017-gold.webp",description:"Złoty medal Winobranie 2017 – dyplom przyznany winu GostArt 2016 w kategorii wina musujące.",descEN:"Gold medal Winobranie 2017 – diploma awarded to GostArt 2016 in the sparkling wine category.",descFR:"Médaille d'or Winobranie 2017 – diplôme décerné au GostArt 2016 dans la catégorie vin effervescent."},
 {id:"cropped-Winnica-Gostchorze-widok",filename:"cropped-Winnica-Gostchorze-widok.webp",description:"Widok lotniczy na Winnicę Gostchorze – panoramiczne zdjęcie z lotu ptaka pokazujące rozległe winnice, rzekę Odrę i zielone wzgórza.",descEN:"Aerial view of Winnica Gostchorze – panoramic bird's-eye photo showing extensive vineyards, the Oder river and green hills.",descFR:"Vue aérienne de Winnica Gostchorze – photo panoramique à vol d'oiseau montrant d'extensives vignes, la rivière Oder et les collines vertes."}
 ];
 const TOTAL_COUNT = GALLERY_ITEMS.length;
 /* ── Teksty wielojęzyczne ── */
 function getTexts() {
 var lang = (document.documentElement.getAttribute('data-lang') || 'PL').toUpperCase();
 if (lang === 'FR') return {
 eyebrow: 'Galerie',
 title: 'La Vigne en Images',
 subtitle: "Découvrez les moments clés de la vie du vignoble — du plantage à la dégustation.",
 cta: 'Voir toute la galerie',
 counter: 'photos',
 close: 'Fermer',
 prev: 'Précédent',
 next: 'Suivant'
 };
 if (lang === 'EN') return {
 eyebrow: 'Gallery',
 title: 'The Vineyard in Images',
 subtitle: 'Discover the key moments of vineyard life — from planting to tasting.',
 cta: 'View full gallery',
 counter: 'photos',
 close: 'Close',
 prev: 'Previous',
 next: 'Next'
 };
 return {
 eyebrow: 'Galeria',
 title: 'Winnica w Obiektywie',
 subtitle: 'Odkryj kluczowe momenty życia winnicy — od sadzenia po degustację.',
 cta: 'Zobacz pełną galerię',
 counter: 'zdjęć',
 close: 'Zamknij',
 prev: 'Poprzednie',
 next: 'Następne'
 };
 }
 /* ── Get description in current language ── */
function getDescription(item) {
 var lang = (document.documentElement.getAttribute('data-lang') || 'PL').toUpperCase();
 if (lang === 'EN' && item.descEN) return item.descEN;
 if (lang === 'FR' && item.descFR) return item.descFR;
 return item.description;
}

 /* ── Stan lightboxa ── */
 var lbState = {
 open: false,
 index: 0,
 el: null,
 imgEl: null,
 descEl: null,
 counterEl: null,
 dotsContainer: null,
 thumbsContainer: null
 };
 function buildGalleryHTML() {
 var t = getTexts();
 var thumbsHTML = GALLERY_ITEMS.slice(0, VISIBLE_THUMBS).map(function(item, i) {
 var desc = getDescription(item); return '<div class="gallery-thumb" data-index="' + i + '" role="listitem" tabindex="0" aria-label="' + desc + '">'
 + '<img src="' + GALLERY_BASE_PATH + item.filename + '" alt="' + desc + '" loading="lazy" decoding="async" />'
 + '<span class="gallery-thumb-label">' + desc + '</span>'
 + '</div>';
 }).join('');
 return '<div class="gallery-section">'
 + '<header class="gallery-head">'
 + '<span class="gallery-eyebrow">' + t.eyebrow + '</span>'
 + '<h2 class="gallery-title">' + t.title + '</h2>'
 + '<p class="gallery-subtitle">' + t.subtitle + '</p>'
 + '</header>'
 + '<div class="gallery-grid" role="list">' + thumbsHTML + '</div>'
 + '<div class="gallery-cta-wrap">'
 + '<button type="button" class="gallery-cta" id="gallery-open-btn">'
 + '<span>' + t.cta + '</span>'
 + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
 + '</button>'
 + '</div>'
 + '<p class="gallery-counter">' + TOTAL_COUNT + ' ' + t.counter + '</p>'
 + '</div>';
 }
 function buildLightboxHTML() {
 var t = getTexts();
 return '<div class="gallery-lightbox" id="gallery-lightbox" aria-modal="true" role="dialog" aria-label="' + t.title + '">'
 + '<button type="button" class="gallery-lb-close" aria-label="' + t.close + '">&times;</button>'
 + '<button type="button" class="gallery-lb-arrow gallery-lb-arrow--prev" aria-label="' + t.prev + '">'
 + '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>'
 + '</button>'
 + '<button type="button" class="gallery-lb-arrow gallery-lb-arrow--next" aria-label="' + t.next + '">'
 + '<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>'
 + '</button>'
 + '<div class="gallery-lb-container">'
 + '<div class="gallery-lb-img-wrap">'
 + '<div class="gallery-lb-spinner"></div>'
 + '<img class="gallery-lb-img" id="gallery-lb-img" src="" alt="" />'
 + '</div>'
 + '</div>'
 + '<div class="gallery-lb-dots" id="gallery-lb-dots"></div>'
 + '<div class="gallery-lb-info">'
 + '<p class="gallery-lb-desc" id="gallery-lb-desc"></p>'
 + '<span class="gallery-lb-counter" id="gallery-lb-counter"></span>'
 + '</div>'
 + '<div class="gallery-lb-thumbs" id="gallery-lb-thumbs"></div>'
 + '</div>';
 }
 function openLightbox(index) {
 if (!lbState.el) return;
 lbState.open = true;
 lbState.index = index;
 lbState.el.classList.add('is-open');
 document.body.style.overflow = 'hidden';
 loadImage(index);
 updateDots();
 updateThumbs();
 }
 function closeLightbox() {
 lbState.open = false;
 if (lbState.el) lbState.el.classList.remove('is-open');
 document.body.style.overflow = '';
 }
 function loadImage(index) {
 if (!lbState.imgEl || !lbState.descEl || !lbState.counterEl) return;
 var item = GALLERY_ITEMS[index];
 if (!item) return;
 lbState.imgEl.classList.remove('is-loaded');
 var img = new Image();
 img.onload = function() {
 lbState.imgEl.src = GALLERY_BASE_PATH + item.filename;
 lbState.imgEl.alt = getDescription(item);
 requestAnimationFrame(function() {
 lbState.imgEl.classList.add('is-loaded');
 });
 };
 img.src = GALLERY_BASE_PATH + item.filename;
 lbState.descEl.textContent = getDescription(item);
 lbState.counterEl.textContent = (index + 1) + ' / ' + TOTAL_COUNT;
 }
 function goTo(index) {
 if (index < 0) index = TOTAL_COUNT - 1;
 if (index >= TOTAL_COUNT) index = 0;
 lbState.index = index;
 loadImage(index);
 updateDots();
 updateThumbs();
 }
 function goPrev() { goTo(lbState.index - 1); }
 function goNext() { goTo(lbState.index + 1); }
 function updateDots() {
 if (!lbState.dotsContainer) return;
 var dots = lbState.dotsContainer.querySelectorAll('.gallery-lb-dot');
 dots.forEach(function(dot, i) {
 dot.classList.toggle('is-active', i === lbState.index);
 });
 }
 function updateThumbs() {
 if (!lbState.thumbsContainer) return;
 var thumbs = lbState.thumbsContainer.querySelectorAll('.gallery-lb-thumb');
 thumbs.forEach(function(thumb, i) {
 thumb.classList.toggle('is-active', i === lbState.index);
 });
 var active = thumbs[lbState.index];
 if (active) {
 active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
 }
 }
 function buildDots() {
 if (!lbState.dotsContainer) return;
 lbState.dotsContainer.innerHTML = GALLERY_ITEMS.map(function(_, i) {
 var dotLabel = (document.documentElement.getAttribute("data-lang") || "PL").toUpperCase() === "EN" ? "Photo" : ((document.documentElement.getAttribute("data-lang") || "PL").toUpperCase() === "FR" ? "Photo" : "Zdjęcie"); return '<button type="button" class="gallery-lb-dot" data-index="' + i + '" aria-label="' + dotLabel + ' ' + (i + 1) + '"></button>';
 }).join('');
 }
 function buildThumbs() {
 if (!lbState.thumbsContainer) return;
 lbState.thumbsContainer.innerHTML = GALLERY_ITEMS.map(function(item, i) {
 var desc = getDescription(item); return '<div class="gallery-lb-thumb" data-index="' + i + '" role="button" tabindex="0" aria-label="' + desc + '">'
 + '<img src="' + GALLERY_BASE_PATH + item.filename + '" alt="" loading="lazy" />'
 + '</div>';
 }).join('');
 }
 function bindEvents() {
 var section = document.querySelector('.gallery-section');
 if (section) {
 section.querySelectorAll('.gallery-thumb').forEach(function(thumb) {
 thumb.addEventListener('click', function() {
 var idx = parseInt(this.getAttribute('data-index'), 10);
 openLightbox(idx);
 });
 thumb.addEventListener('keydown', function(e) {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 var idx = parseInt(this.getAttribute('data-index'), 10);
 openLightbox(idx);
 }
 });
 });
 var cta = section.querySelector('#gallery-open-btn');
 if (cta) {
 cta.addEventListener('click', function() {
 openLightbox(0);
 });
 }
 }
 if (lbState.el) {
 lbState.el.querySelector('.gallery-lb-close').addEventListener('click', closeLightbox);
 lbState.el.querySelector('.gallery-lb-arrow--prev').addEventListener('click', goPrev);
 lbState.el.querySelector('.gallery-lb-arrow--next').addEventListener('click', goNext);
 lbState.el.addEventListener('click', function(e) {
 if (e.target === lbState.el) closeLightbox();
 });
 lbState.dotsContainer.addEventListener('click', function(e) {
 var dot = e.target.closest('.gallery-lb-dot');
 if (dot) goTo(parseInt(dot.getAttribute('data-index'), 10));
 });
 lbState.thumbsContainer.addEventListener('click', function(e) {
 var thumb = e.target.closest('.gallery-lb-thumb');
 if (thumb) goTo(parseInt(thumb.getAttribute('data-index'), 10));
 });
 }
 document.addEventListener('keydown', function(e) {
 if (!lbState.open) return;
 if (e.key === 'Escape') closeLightbox();
 if (e.key === 'ArrowLeft') goPrev();
 if (e.key === 'ArrowRight') goNext();
 });
 var touchStartX = 0;
 if (lbState.el) {
 lbState.el.addEventListener('touchstart', function(e) {
 touchStartX = e.changedTouches[0].screenX;
 }, { passive: true });
 lbState.el.addEventListener('touchend', function(e) {
 var dx = e.changedTouches[0].screenX - touchStartX;
 if (Math.abs(dx) > 50) {
 dx < 0 ? goNext() : goPrev();
 }
 }, { passive: true });
 }
 }
 function initGallery() {
 if (document.querySelector('.layout--gallery')) return;
 var visitLayout = document.querySelector('.layout[data-scene="visit"]');
 if (!visitLayout) {
 var stage = document.querySelector('.stage');
 if (stage) {
 var wrap = document.createElement('div');
 wrap.innerHTML = '<section class="layout layout--gallery" data-scene="gallery">' + buildGalleryHTML() + '</section>';
 stage.appendChild(wrap.firstChild);
 }
 } else {
 var galleryLayout = document.createElement('section');
 galleryLayout.className = 'layout layout--gallery';
 galleryLayout.setAttribute('data-scene', 'gallery');
 galleryLayout.innerHTML = buildGalleryHTML();
 visitLayout.parentNode.insertBefore(galleryLayout, visitLayout);
 }
 var lbWrap = document.createElement('div');
 lbWrap.innerHTML = buildLightboxHTML();
 document.body.appendChild(lbWrap.firstChild);
 lbState.el = document.getElementById('gallery-lightbox');
 lbState.imgEl = document.getElementById('gallery-lb-img');
 lbState.descEl = document.getElementById('gallery-lb-desc');
 lbState.counterEl = document.getElementById('gallery-lb-counter');
 lbState.dotsContainer = document.getElementById('gallery-lb-dots');
 lbState.thumbsContainer = document.getElementById('gallery-lb-thumbs');
 buildDots();
 buildThumbs();
 bindEvents();
 injectGalleryNav();
 }
 function injectGalleryNav() {
 var sidebar = document.querySelector('.sidebar');
 if (!sidebar) return;
 if (sidebar.querySelector('[data-scene="gallery"]')) return;
 var visitNav = sidebar.querySelector('[data-scene="visit"]');
 if (!visitNav) return;
 var lang = (document.documentElement.getAttribute('data-lang') || 'PL').toUpperCase();
 var labels = { PL: 'Galeria', FR: 'Galerie', EN: 'Gallery' };
 var label = labels[lang] || labels['PL'];
 var navItem = document.createElement('button');
 navItem.type = 'button';
 navItem.className = 'nav-item';
 navItem.setAttribute('data-scene', 'gallery');
 navItem.innerHTML = '<span class="nav-index">06</span><span class="nav-dot"></span><span class="nav-label">' + label + '</span>';
 visitNav.parentNode.insertBefore(navItem, visitNav);
 var visitIndex = visitNav.querySelector('.nav-index');
 if (visitIndex) visitIndex.textContent = '07';
 navItem.addEventListener('click', function() {
 var target = document.querySelector('.layout[data-scene="gallery"]');
 if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
 });
 }
 if (typeof window !== 'undefined') {
 var origDefine = Object.defineProperty;
 var patchSceneOrder = function() {
 if (window.SCENE_ORDER && Array.isArray(window.SCENE_ORDER)) {
 if (!window.SCENE_ORDER.includes('gallery')) {
 var pressIdx = window.SCENE_ORDER.indexOf('press');
 var visitIdx = window.SCENE_ORDER.indexOf('visit');
 if (pressIdx !== -1 && visitIdx !== -1) {
 window.SCENE_ORDER.splice(visitIdx, 0, 'gallery');
 } else {
 window.SCENE_ORDER.push('gallery');
 }
 }
 }
 };
 patchSceneOrder();
 window.addEventListener('load', patchSceneOrder);
 setTimeout(patchSceneOrder, 500);
 setTimeout(patchSceneOrder, 1500);
 }
 function tryInit() {
 if (document.querySelector('.stage') || document.querySelector('.layout[data-scene="visit"]')) {
 initGallery();
 return true;
 }
 return false;
 }
 if (!tryInit()) {
 var obs = new MutationObserver(function() {
 if (tryInit()) obs.disconnect();
 });
 obs.observe(document.documentElement, { childList: true, subtree: true });
 }
 [300, 800, 1500, 3000, 5000].forEach(function(t) {
 setTimeout(tryInit, t);
 });
})();