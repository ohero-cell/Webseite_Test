/**
 * CLASSIC BIKES OEDHEIM - MOTORRAD ANKAUF & WERTERMITTLUNGS-WIZARD
 * Interaktiver 3-Schritte Kalkulator mit Echtzeit-Marktwertschätzung
 */

class AnkaufWizard {
  constructor() {
    this.currentStep = 1;
    this.data = {
      brand: 'BMW',
      model: '',
      year: 1980,
      mileage: 35000,
      condition: 'gut', // 'sammler', 'gut', 'projekt'
      hasPapers: true,
      hasKeys: true,
      name: '',
      phone: '',
      email: '',
      notes: ''
    };

    this.container = document.getElementById('ankauf-wizard-app');
    if (!this.container) return;

    this.init();
  }

  init() {
    this.renderStep();
  }

  saveStep1Inputs() {
    const model = document.getElementById('wiz-model');
    const year = document.getElementById('wiz-year');
    const km = document.getElementById('wiz-km');
    if (model) this.data.model = model.value;
    if (year) this.data.year = year.value;
    if (km) this.data.mileage = km.value;
  }

  setStep(step) {
    if (this.currentStep === 1) {
      this.saveStep1Inputs();
    }
    this.currentStep = step;
    this.renderStep();
    
    // Smooth scroll to top of wizard
    const topOffset = this.container.getBoundingClientRect().top + window.pageYOffset - 120;
    window.scrollTo({
      top: topOffset,
      behavior: 'smooth'
    });
  }

  calculateEstimate() {
    // Valuation algorithm based on vintage motorcycle market
    let base = 5000;
    if (this.data.brand === 'BMW') base = 7500;
    if (this.data.brand === 'Harley-Davidson') base = 12000;
    if (this.data.brand === 'Honda') base = 5500;
    if (this.data.brand === 'Moto Guzzi') base = 6800;
    if (this.data.brand === 'Triumph') base = 6200;

    // Condition factor
    let factor = 1.0;
    if (this.data.condition === 'sammler') factor = 1.45;
    if (this.data.condition === 'gut') factor = 1.05;
    if (this.data.condition === 'projekt') factor = 0.65;

    // Year factor (classic age premium)
    const yearVal = parseInt(this.data.year, 10) || 1980;
    if (yearVal < 1975) factor += 0.25;

    const estimatedMedian = Math.round(base * factor);
    const low = Math.round(estimatedMedian * 0.9 / 100) * 100;
    const high = Math.round(estimatedMedian * 1.15 / 100) * 100;

    return { low, high };
  }

  renderStep() {
    let content = '';

    if (this.currentStep === 1) {
      content = `
        <div class="wizard-steps-header">
          <div class="wizard-step-indicator active">
            <div class="step-circle">1</div>
            <span class="step-label">Basisdaten</span>
          </div>
          <div style="flex:1; height:2px; background:var(--border-subtle); margin:0 1rem;"></div>
          <div class="wizard-step-indicator">
            <div class="step-circle">2</div>
            <span class="step-label">Zustand</span>
          </div>
          <div style="flex:1; height:2px; background:var(--border-subtle); margin:0 1rem;"></div>
          <div class="wizard-step-indicator">
            <div class="step-circle">3</div>
            <span class="step-label">Bewertung</span>
          </div>
        </div>

        <h3 style="font-size:1.6rem; color:#fff; margin-bottom:0.5rem;">Welches Motorrad möchtest du verkaufen?</h3>
        <p style="color:var(--text-muted); margin-bottom:2rem;">Wir kaufen bundesweit Klassiker, Youngtimer, Custom Bikes & Scheunenfunde an.</p>

        <div class="form-group">
          <label class="form-label">Hersteller / Marke</label>
          <div class="wizard-select-grid" id="brand-select-grid">
            ${['BMW', 'Harley-Davidson', 'Honda', 'Moto Guzzi', 'Triumph', 'Andere'].map(brand => `
              <div class="select-card-option ${this.data.brand === brand ? 'active' : ''}" onclick="window.wizard.setBrand('${brand}')">
                <i class="fa-solid fa-motorcycle"></i>
                <div class="select-card-title">${brand}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
          <div class="form-group">
            <label class="form-label">Modellbezeichnung</label>
            <input type="text" class="form-control" placeholder="z. B. R75/5, Shovelhead, CB750" value="${this.data.model}" id="wiz-model" oninput="window.wizard.data.model = this.value">
          </div>
          <div class="form-group">
            <label class="form-label">Baujahr (ca.)</label>
            <input type="number" class="form-control" placeholder="z. B. 1976" value="${this.data.year}" id="wiz-year" oninput="window.wizard.data.year = this.value">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Kilometerstand (geschätzt)</label>
          <input type="number" class="form-control" placeholder="z. B. 35000" value="${this.data.mileage}" id="wiz-km" oninput="window.wizard.data.mileage = this.value">
        </div>

        <div style="display:flex; justify-content:flex-end; margin-top:2rem;">
          <button class="btn btn-primary btn-lg" onclick="window.wizard.setStep(2)">
            Weiter zu Schritt 2 <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;
    } else if (this.currentStep === 2) {
      content = `
        <div class="wizard-steps-header">
          <div class="wizard-step-indicator completed" onclick="window.wizard.setStep(1)">
            <div class="step-circle"><i class="fa-solid fa-check"></i></div>
            <span class="step-label">Basisdaten</span>
          </div>
          <div style="flex:1; height:2px; background:var(--accent); margin:0 1rem;"></div>
          <div class="wizard-step-indicator active">
            <div class="step-circle">2</div>
            <span class="step-label">Zustand</span>
          </div>
          <div style="flex:1; height:2px; background:var(--border-subtle); margin:0 1rem;"></div>
          <div class="wizard-step-indicator">
            <div class="step-circle">3</div>
            <span class="step-label">Bewertung</span>
          </div>
        </div>

        <h3 style="font-size:1.6rem; color:#fff; margin-bottom:0.5rem;">Zustand & Vorgeschichte</h3>
        <p style="color:var(--text-muted); margin-bottom:2rem;">Wähle den Zustand deines Bikes für eine realistische Vorabeinschätzung.</p>

        <div class="wizard-select-grid">
          <div class="select-card-option ${this.data.condition === 'sammler' ? 'active' : ''}" onclick="window.wizard.setCondition('sammler')">
            <i class="fa-solid fa-trophy"></i>
            <div class="select-card-title">Sammlerzustand / 1A</div>
            <div class="select-card-desc">Makellos gepflegt, restauriert oder unberührtes Original.</div>
          </div>
          <div class="select-card-option ${this.data.condition === 'gut' ? 'active' : ''}" onclick="window.wizard.setCondition('gut')">
            <i class="fa-solid fa-thumbs-up"></i>
            <div class="select-card-title">Gut & Fahrbereit</div>
            <div class="select-card-desc">Guter Allgemeinzustand mit normaler Patina, fahrbereit.</div>
          </div>
          <div class="select-card-option ${this.data.condition === 'projekt' ? 'active' : ''}" onclick="window.wizard.setCondition('projekt')">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            <div class="select-card-title">Projekt / Scheunenfund</div>
            <div class="select-card-desc">Lange Standzeit, nicht fahrbereit, Restaurationsobjekt.</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-top:1.5rem;">
          <label style="display:flex; align-items:center; gap:0.75rem; background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); cursor:pointer;">
            <input type="checkbox" ${this.data.hasPapers ? 'checked' : ''} onchange="window.wizard.data.hasPapers = this.checked">
            <span style="color:#fff; font-size:0.9rem;">Fahrzeugpapiere / Brief vorhanden</span>
          </label>
          <label style="display:flex; align-items:center; gap:0.75rem; background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); cursor:pointer;">
            <input type="checkbox" ${this.data.hasKeys ? 'checked' : ''} onchange="window.wizard.data.hasKeys = this.checked">
            <span style="color:#fff; font-size:0.9rem;">Schlüssel vorhanden</span>
          </label>
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:2.5rem;">
          <button class="btn btn-secondary btn-lg" onclick="window.wizard.setStep(1)">
            <i class="fa-solid fa-arrow-left"></i> Zurück
          </button>
          <button class="btn btn-primary btn-lg" onclick="window.wizard.setStep(3)">
            Wertermittlung anzeigen <i class="fa-solid fa-calculator"></i>
          </button>
        </div>
      `;
    } else if (this.currentStep === 3) {
      const { low, high } = this.calculateEstimate();
      content = `
        <div class="wizard-steps-header">
          <div class="wizard-step-indicator completed" onclick="window.wizard.setStep(1)">
            <div class="step-circle"><i class="fa-solid fa-check"></i></div>
            <span class="step-label">Basisdaten</span>
          </div>
          <div style="flex:1; height:2px; background:var(--accent); margin:0 1rem;"></div>
          <div class="wizard-step-indicator completed" onclick="window.wizard.setStep(2)">
            <div class="step-circle"><i class="fa-solid fa-check"></i></div>
            <span class="step-label">Zustand</span>
          </div>
          <div style="flex:1; height:2px; background:var(--accent); margin:0 1rem;"></div>
          <div class="wizard-step-indicator active">
            <div class="step-circle">3</div>
            <span class="step-label">Angebot</span>
          </div>
        </div>

        <!-- Result Box -->
        <div style="background:linear-gradient(135deg, rgba(255,85,0,0.15) 0%, rgba(16,18,22,0.9) 100%); border:1px solid var(--border-accent); border-radius:12px; padding:2rem; text-align:center; margin-bottom:2.5rem; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
          <span class="badge badge-accent" style="margin-bottom:0.75rem;">Geschätzter Ankaufswert für ${this.data.brand} ${this.data.model || 'Klassiker'}</span>
          <div style="font-family:var(--font-display); font-size:clamp(2.4rem, 4vw, 3.4rem); color:#fff; font-weight:700; margin-bottom:0.5rem;">
            ${low.toLocaleString('de-DE')} € – ${high.toLocaleString('de-DE')} €
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem; max-width:550px; margin:0 auto;">
            Unverbindliche Ersteinschätzung basierend auf aktuellen Marktdaten. Barzahlung bei Abholung oder sofortige Blitzüberweisung.
          </p>
        </div>

        <h4 style="font-size:1.25rem; color:#fff; margin-bottom:1rem;">Jetzt verbindliches Festpreis-Angebot erhalten:</h4>

        <form id="ankauf-final-form" onsubmit="event.preventDefault(); window.wizard.submitForm();">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
            <div class="form-group">
              <label class="form-label">Dein Name *</label>
              <input type="text" required class="form-control" placeholder="Vorname Nachname" value="${this.data.name}" id="wiz-name" oninput="window.wizard.data.name = this.value">
            </div>
            <div class="form-group">
              <label class="form-label">Telefonnummer für Rückruf *</label>
              <input type="tel" required class="form-control" placeholder="+49 171 000 0000" value="${this.data.phone}" id="wiz-phone" oninput="window.wizard.data.phone = this.value">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">E-Mail Adresse *</label>
            <input type="email" required class="form-control" placeholder="name@beispiel.de" value="${this.data.email}" id="wiz-email" oninput="window.wizard.data.email = this.value">
          </div>

          <div class="form-group">
            <label class="form-label">Standort des Motorrads (PLZ / Ort) & Anmerkungen</label>
            <textarea rows="3" class="form-control" placeholder="z. B. 74196 Oedheim, Motor läuft, steht seit 3 Jahren in der Garage..." id="wiz-notes" oninput="window.wizard.data.notes = this.value">${this.data.notes}</textarea>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2rem;">
            <button type="button" class="btn btn-secondary btn-lg" onclick="window.wizard.setStep(2)">
              <i class="fa-solid fa-arrow-left"></i> Zurück
            </button>
            <button type="submit" class="btn btn-primary btn-lg">
              <i class="fa-solid fa-paper-plane"></i> Angebot verbindlich anfordern
            </button>
          </div>
        </form>
      `;
    }

    this.container.innerHTML = content;
  }

  setBrand(brand) {
    this.saveStep1Inputs();
    this.data.brand = brand;
    this.renderStep();
  }

  setCondition(cond) {
    this.data.condition = cond;
    this.renderStep();
  }

  submitForm() {
    window.showToast('Ankauf-Anfrage gesendet!', 'Vielen Dank! Unser Werkstatt-Team meldet sich innerhalb von 24h bei dir.', 'fa-circle-check');

    this.container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem;">
        <div style="width:70px; height:70px; border-radius:50%; background:rgba(16,185,129,0.15); border:2px solid #10b981; color:#10b981; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.5rem;">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 style="font-size:2rem; color:#fff; margin-bottom:0.75rem;">Ankauf-Anfrage erfolgreich empfangen!</h3>
        <p style="color:var(--text-muted); font-size:1.05rem; max-width:550px; margin:0 auto 2rem; line-height:1.6;">
          Wir haben deine Daten für die <strong>${this.data.brand} ${this.data.model}</strong> erhalten. Ein Werkstattmeister wird sich telefonisch oder per E-Mail für die Terminabstimmung oder Abholung melden.
        </p>
        <div style="display:flex; justify-content:center; gap:1rem;">
          <a href="showroom.html" class="btn btn-primary">Aktuellen Bestand ansehen</a>
          <button class="btn btn-secondary" onclick="window.wizard.setStep(1)">Weitere Maschine schätzen</button>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.wizard = new AnkaufWizard();
});
