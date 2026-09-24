/**
 * CLASSIC BIKES OEDHEIM - SHOWROOM & INVENTORY ENGINE
 * Search, Category Filtering, Sort, Wishlist & Rich Detail Modal
 */

const BIKES_DATABASE = [
  {
    id: 'bmw-r90-6-1974',
    title: 'BMW R90/6 Concourse Restauration',
    brand: 'BMW',
    category: 'classic',
    price: 16900,
    priceFormatted: '16.900 €',
    year: 1974,
    mileage: '1.200 km (nach Revision)',
    displacement: '898 ccm',
    power: '60 PS (44 kW)',
    transmission: '5-Gang Kardan',
    tuv: 'Neu (08/2028)',
    owners: '2 Vorbesitzer',
    status: 'Sofort verfügbar',
    badge: 'Meisterwerk',
    badgeType: 'badge-accent',
    image: 'images/restoration_after.jpg',
    description: 'Vollständige "Nut & Bolt" Concourse-Restauration unserer Schmiede in Oedheim. Rahmen pulverbeschichtet, Motor komplett zerlegt und neu vermessen, poliertes Aluminium, handlinierte Zierstreifen im Original-BMW-Schema. Matching Numbers mit Zertifikat.',
    features: ['Original BMW Bordwerkzeug', 'Matching Numbers & Zertifikat', 'Edelstahl-Auspuffanlage', 'Elektronische Zündung nachgerüstet', 'Wertgutachten Note 1- vorhanden']
  },
  {
    id: 'harley-custom-bobber',
    title: 'Harley-Davidson Shovelhead Custom',
    brand: 'Harley-Davidson',
    category: 'custom',
    price: 24500,
    priceFormatted: '24.500 €',
    year: 1981,
    mileage: '8.400 km',
    displacement: '1.340 ccm (80ci)',
    power: '68 PS (50 kW)',
    transmission: '4-Gang Ratchet Top',
    tuv: 'Neu (Alles eingetragen)',
    owners: '1 deutscher Vorbesitzer',
    status: 'Sofort verfügbar',
    badge: 'Custom Unikat',
    badgeType: 'badge-accent',
    image: 'images/bike_harley.jpg',
    description: 'Brachialer Shovelhead-Umbau mit extremer Detailtiefe. Messing-Akzente, handgefertigter Leder-Schwingsattel, offener Primärtrieb, handgefertigte Krümmer mit Keramikbeschichtung und unnachahmlichem Vintage-V-Twin Klang. 100% straßenzugelassen.',
    features: ['Alles im Fahrzeugschein eingetragen', 'S&S Super E Vergaser', 'Bates-Style Scheinwerfer', 'Messing-Armaturen & Riser', 'Handgefertigter Öltank']
  },
  {
    id: 'honda-cb750-four-cafe',
    title: 'Honda CB 750 Four Cafe Racer',
    brand: 'Honda',
    category: 'caferacer',
    price: 14800,
    priceFormatted: '14.800 €',
    year: 1977,
    mileage: '18.200 km',
    displacement: '736 ccm',
    power: '67 PS (49 kW)',
    transmission: '5-Gang Kette',
    tuv: 'Neu (06/2028)',
    owners: '3 Vorbesitzer',
    status: 'Sofort verfügbar',
    badge: 'Cafe Racer',
    badgeType: 'badge-emerald',
    image: 'images/bike_caferacer.jpg',
    description: 'Ikonischer 4-Zylinder Klassiker, neu interpretiert als puristischer Cafe Racer. Gebürsteter Aluminium-Tank mit Klarlack-Finish, M-Unit Blue Bordelektronik, offene Ansaugtrichter mit TÜV-Sondereintragung und gekürztes Rahmenheck mit LED-Blinker.',
    features: ['Motogadget Digital-Cockpit', '4-in-1 Sportauspuff mit E-Prüfzeichen', 'Tarozzi Stummellenker', 'Koni Stoßdämpfer hinten', 'Große Vergaser-Synchronisation neu']
  },
  {
    id: 'moto-guzzi-lemans-1',
    title: 'Moto Guzzi Le Mans I (850)',
    brand: 'Moto Guzzi',
    category: 'classic',
    price: 18500,
    priceFormatted: '18.500 €',
    year: 1978,
    mileage: '34.500 km',
    displacement: '844 ccm',
    power: '71 PS (52 kW)',
    transmission: '5-Gang Kardan',
    tuv: 'Neu (04/2028)',
    owners: '2 Sammlerhände',
    status: 'Reserviert',
    badge: 'Reserviert',
    badgeType: 'badge-muted',
    image: 'images/bike_guzzi.jpg',
    description: 'Eine der begehrtesten italienischen Sport-Ikonen aller Zeiten. Originale Serie 1 mit der markanten Scheinwerferverkleidung und der originalen roten Werkslackierung. Dell\'Orto 36er Vergaser mit Beschleunigerpumpe, fantastische Kompression.',
    features: ['Originalzustand Note 2+', 'Lafranconi Auspuffanlage', 'Brembo Doppelscheibenbremse mit Integral-Bremssystem', 'Frischer Service & Kardanöl-Wechsel', 'Historisches H-Kennzeichen']
  },
  {
    id: 'bmw-r75-5-toaster',
    title: 'BMW R75/5 "Toaster Tank"',
    brand: 'BMW',
    category: 'classic',
    price: 12900,
    priceFormatted: '12.900 €',
    year: 1972,
    mileage: '41.000 km',
    displacement: '745 ccm',
    power: '50 PS (37 kW)',
    transmission: '4-Gang Kardan',
    tuv: 'Neu',
    owners: 'Aus Erstbesitz-Familie',
    status: 'Sofort verfügbar',
    badge: 'Original Patina',
    badgeType: 'badge-emerald',
    image: 'images/hero.jpg',
    description: 'Seltener 1972er Toaster-Tank Boxer im unberührten Originalzustand mit charismatischer Alters-Patina. Technisch von unserem Meister durchgesehen und fahrfertig aufbereitet: Vergaser im Ultraschallbad gereinigt, Bremsen überholt.',
    features: ['Original Chrom-Tankblenden', 'Matching Numbers Rahmen & Motor', 'Originaler Pappdeckelbrief vorhanden', 'H-Zulassung fahrbereit']
  },
  {
    id: 'barn-find-restoration-project',
    title: 'Scheunenfund Restaurationsobjekt',
    brand: 'BMW',
    category: 'restoration',
    price: 5800,
    priceFormatted: '5.800 €',
    year: 1973,
    mileage: '54.000 km',
    displacement: '750 ccm',
    power: '50 PS',
    transmission: '4-Gang Kardan',
    tuv: 'Ohne (Restaurationsbasis)',
    owners: '35 Jahre trocken eingelagert',
    status: 'In Bearbeitung',
    badge: 'Projekt / Basis',
    badgeType: 'badge-muted',
    image: 'images/restoration_before.jpg',
    description: 'Echte Scheunenfund-Substanz für Enthusiasten oder als Auftrags-Restauration bei uns in der Werkstatt. Der Motor dreht frei, Getriebe schaltet sauber. Kann wahlweise als Rohbasis gekauft oder von uns nach deinen Wünschen fertig aufgebaut werden.',
    features: ['Motor dreht frei, gute Kompression', 'Deutsche Papiere vollständig', 'Ideale Basis für Custom- oder Originalaufbau', 'Gerne mit Festpreis-Restauration durch uns']
  }
];

class ShowroomApp {
  constructor() {
    this.bikes = [...BIKES_DATABASE];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.wishlist = JSON.parse(localStorage.getItem('classicbikes_wishlist') || '[]');

    this.gridEl = document.getElementById('bike-gallery');
    this.filterContainer = document.getElementById('filter-container');
    this.searchInput = document.getElementById('showroom-search');
    this.sortSelect = document.getElementById('showroom-sort');
    this.resultsCountEl = document.getElementById('results-count');

    this.modalEl = document.getElementById('bike-modal');
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Filter Buttons
    if (this.filterContainer) {
      this.filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        this.filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.currentCategory = btn.dataset.filter || 'all';
        this.render();
      });
    }

    // Live Search
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Sort Dropdown
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.render();
      });
    }

    // Wishlist & Modal delegation on bike gallery
    if (this.gridEl) {
      this.gridEl.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.bike-fav-btn');
        if (favBtn) {
          e.stopPropagation();
          const bikeId = favBtn.dataset.id;
          this.toggleWishlist(bikeId);
          return;
        }

        const card = e.target.closest('.bike-card');
        if (card) {
          const bikeId = card.dataset.id;
          this.openModal(bikeId);
        }
      });
    }

    // Modal Close
    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.closest('.modal-close-btn')) {
          this.closeModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeModal();
      });
    }
  }

  toggleWishlist(bikeId) {
    const bike = this.bikes.find(b => b.id === bikeId);
    if (!bike) return;

    const index = this.wishlist.indexOf(bikeId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      window.showToast('Merkliste aktualisiert', `"${bike.title}" wurde von deiner Merkliste entfernt.`);
    } else {
      this.wishlist.push(bikeId);
      window.showToast('Auf Merkliste gespeichert', `"${bike.title}" ist jetzt auf deiner Merkliste gemerkt!`, 'fa-heart');
    }

    localStorage.setItem('classicbikes_wishlist', JSON.stringify(this.wishlist));
    this.render();
  }

  getFilteredBikes() {
    return this.bikes.filter(bike => {
      const matchesCategory = this.currentCategory === 'all' || bike.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        bike.title.toLowerCase().includes(this.searchQuery) ||
        bike.brand.toLowerCase().includes(this.searchQuery) ||
        bike.displacement.toLowerCase().includes(this.searchQuery) ||
        bike.year.toString().includes(this.searchQuery);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (this.sortBy === 'price-asc') return a.price - b.price;
      if (this.sortBy === 'price-desc') return b.price - a.price;
      if (this.sortBy === 'year-desc') return b.year - a.year;
      return 0; // featured default
    });
  }

  render() {
    if (!this.gridEl) return;

    const filtered = this.getFilteredBikes();

    if (this.resultsCountEl) {
      this.resultsCountEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'Maschine' : 'Maschinen'} gefunden`;
    }

    if (filtered.length === 0) {
      this.gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <i class="fa-solid fa-motorcycle" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem; opacity: 0.5;"></i>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff;">Kein passendes Motorrad gefunden</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">
            Versuche einen anderen Suchbegriff oder kontaktiere unsere Werkstatt für Suchaufträge nach seltenen Klassikern.
          </p>
          <a href="kontakt.html" class="btn btn-primary btn-sm">Suchauftrag anfragen</a>
        </div>
      `;
      return;
    }

    this.gridEl.innerHTML = filtered.map(bike => {
      const isFav = this.wishlist.includes(bike.id);
      return `
        <article class="bike-card" data-id="${bike.id}">
          <div class="bike-card-img-wrap">
            <img src="${bike.image}" alt="${bike.title}" class="bike-card-img" loading="lazy">
            <div class="bike-badge-top">
              <span class="badge ${bike.badgeType}">
                <span class="badge-dot" style="background: currentColor;"></span>
                ${bike.badge}
              </span>
            </div>
            <button class="bike-fav-btn ${isFav ? 'active' : ''}" data-id="${bike.id}" title="${isFav ? 'Von Merkliste entfernen' : 'Auf Merkliste speichern'}">
              <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
            </button>
          </div>
          
          <div class="bike-card-body">
            <span class="bike-card-meta-category">${bike.brand} • ${bike.category.toUpperCase()}</span>
            <h3 class="bike-card-title">${bike.title}</h3>
            
            <div class="bike-specs-grid">
              <div class="bike-spec-item">
                <i class="fa-solid fa-calendar"></i>
                <span>${bike.year}</span>
              </div>
              <div class="bike-spec-item">
                <i class="fa-solid fa-gauge-high"></i>
                <span>${bike.mileage}</span>
              </div>
              <div class="bike-spec-item">
                <i class="fa-solid fa-bolt"></i>
                <span>${bike.power}</span>
              </div>
              <div class="bike-spec-item">
                <i class="fa-solid fa-shield-halved"></i>
                <span>TÜV: ${bike.tuv}</span>
              </div>
            </div>

            <div class="bike-card-footer">
              <div class="bike-price-block">
                <span class="bike-price-label">Kaufpreis</span>
                <span class="bike-price-value">${bike.priceFormatted}</span>
              </div>
              <button class="btn btn-outline-accent btn-sm" onclick="event.stopPropagation(); window.showroomApp.openModal('${bike.id}')">
                Details <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  openModal(bikeId) {
    const bike = this.bikes.find(b => b.id === bikeId);
    if (!bike || !this.modalEl) return;

    const modalBody = this.modalEl.querySelector('.modal-dynamic-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-grid">
        <div class="modal-gallery">
          <img src="${bike.image}" alt="${bike.title}" class="modal-main-img">
          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.75rem 1rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <span style="font-size:0.85rem; color:var(--text-muted);"><i class="fa-solid fa-location-dot" style="color:var(--accent); margin-right:0.5rem;"></i>Standort: Werkstatt Oedheim</span>
            <button class="btn btn-outline-accent btn-sm" id="sound-btn" onclick="window.showroomApp.simulateEngineSound()">
              <i class="fa-solid fa-volume-high"></i> Motorsound
            </button>
          </div>
        </div>

        <div class="modal-details">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span class="badge ${bike.badgeType}">${bike.badge}</span>
            <span style="color:var(--emerald); font-size:0.85rem; font-weight:600;"><i class="fa-solid fa-circle-check"></i> ${bike.status}</span>
          </div>

          <h2 style="font-size:1.85rem; color:#fff; margin-bottom:0.25rem;">${bike.title}</h2>
          <div style="font-size:1.75rem; font-weight:700; color:var(--accent); font-family:var(--font-display); margin-bottom:1.25rem;">
            ${bike.priceFormatted} <span style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-body); font-weight:normal;">(Differenzbesteuert nach §25a UStG)</span>
          </div>

          <p style="color:var(--text-muted); font-size:0.92rem; line-height:1.65; margin-bottom:1.5rem;">
            ${bike.description}
          </p>

          <table class="modal-specs-table">
            <tbody>
              <tr><td>Baujahr</td><td>${bike.year}</td></tr>
              <tr><td>Kilometerstand</td><td>${bike.mileage}</td></tr>
              <tr><td>Hubraum & Leistung</td><td>${bike.displacement} / ${bike.power}</td></tr>
              <tr><td>Antrieb / Getriebe</td><td>${bike.transmission}</td></tr>
              <tr><td>TÜV / HU</td><td>${bike.tuv}</td></tr>
              <tr><td>Historie</td><td>${bike.owners}</td></tr>
            </tbody>
          </table>

          <div style="margin-bottom:1.75rem;">
            <h4 style="font-size:0.9rem; margin-bottom:0.75rem; color:#fff;">Highlights & Zubehör:</h4>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:0.4rem; font-size:0.85rem; color:var(--text-muted);">
              ${bike.features.map(f => `<li><i class="fa-solid fa-check" style="color:var(--accent); margin-right:0.5rem;"></i> ${f}</li>`).join('')}
            </ul>
          </div>

          <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            <a href="kontakt.html?bike=${encodeURIComponent(bike.title)}" class="btn btn-primary" style="flex:1;">
              <i class="fa-solid fa-calendar-check"></i> Probefahrt / Kauf anfragen
            </a>
            <a href="https://wa.me/4915112345678?text=${encodeURIComponent('Hallo Classic Bikes Oedheim, ich interessiere mich für das Motorrad: ' + bike.title)}" target="_blank" class="btn btn-secondary" style="background:#25D366; color:#fff; border-color:#25D366;">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  simulateEngineSound() {
    // Web Audio API simulated motorcycle throttle rev sound!
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 1.2);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 1.8);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.9);

      window.showToast('V-Twin / Boxer Sound', 'Motorsound-Simulation aktiv! 🏍️💨', 'fa-volume-high');
    } catch (e) {
      window.showToast('Motorsound', 'Audio-Sound abspielen nicht unterstützt.', 'fa-volume-xmark');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.showroomApp = new ShowroomApp();
});
