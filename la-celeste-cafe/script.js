/**
 * ==============================================================================
 * LA CÉLESTE CAFÉ • Basaveshwaranagar, Bengaluru
 * Master JavaScript: WeatherAPI, Party Hall Projector, Music Curator & Occasions
 * ==============================================================================
 * 
 * 🎓 LEARNING GUIDE: HOW THE WEATHER API & FETCH() WORK
 * ------------------------------------------------------------------------------
 * 1. What is an API?
 *    An API (Application Programming Interface) allows our webpage to talk to 
 *    another server (WeatherAPI.com) to ask for real-time sky & temperature data.
 * 
 * 2. What is an API Key?
 *    The API key is a unique password provided by WeatherAPI. It authenticates who
 *    is making the request so the service grants permission to stream weather data.
 * 
 * 3. What does fetch() do?
 *    `fetch()` is a modern browser function that sends an asynchronous HTTP GET
 *    request across the web without refreshing or freezing the user interface.
 * 
 * 4. Why use async / await?
 *    `async` and `await` pause execution on that line until the server answers,
 *    turning asynchronous network promises into clean, sequential, readable code.
 * ==============================================================================
 */

// --- STEP 1: API CONFIGURATION ---
const WEATHER_API_KEY = 'c1c41aaff94c40aaaca160340263009'; // Free WeatherAPI key
const WEATHER_LOCATION = 'Bengaluru';                     // Target city

// State variable to store the current weather after fetching
let liveWeatherState = {
  tempC: 24, // sensible fallback until API responds
  conditionText: 'Pleasant & Breezy',
  iconUrl: '',
  isLoaded: false
};

// --- STEP 2: OCCASION DATA, BUDGET GEMS & TAILORED WISHES ---
const OCCASION_DATA = {
  date: {
    title: 'Romantic Date',
    emoji: '💖',
    greeting: (name) => `Welcome, ${name || 'two sweet souls'}! 🕯️❤️`,
    tag: 'Romantic Date Match',
    hotDrinkHero: {
      name: "Lavender Iced Cold Brew (₹150)",
      reason: "Because Bengaluru is warm at 26°C today, this slow-steeped iced infusion with organic lavender blossom is light, calming, and deeply romantic!"
    },
    coolDrinkHero: {
      name: "Signature Belgian Hot Chocolate & 3 French Macarons (₹99 for 3)",
      reason: "Breezy Bengaluru evenings are made for warm whispers over molten chocolate and melt-in-mouth pistachio macarons under starlight!"
    },
    closingWish: (name) => `"🕯️✨ Wishing ${name ? name + ' and your partner' : 'you two'} an enchanting date filled with starlight in your eyes, soft music, and unforgettable romantic moments! ☕❤️"`
  },

  friends: {
    title: 'Chilling with Friends',
    emoji: '👯',
    greeting: (name) => `Hey ${name || 'friends'}! 🎉🥐`,
    tag: 'Squad Favorite Pick',
    hotDrinkHero: {
      name: "Wild Berry Sparkling Cooler (₹160) & Macarons",
      reason: "Fizzy wild raspberries and fresh mint coolers paired with an assorted box of French macarons (₹99 for 3) to keep the banter bubbling!"
    },
    coolDrinkHero: {
      name: "Hot Coffee with Garlic Toast (₹130)",
      reason: "Budget-friendly, comforting, and wonderfully aromatic — the ultimate companion for unstoppable laughter and cafe memories."
    },
    closingWish: (name) => `"✨🎉 The sweetest stories in life are shared with true friends over warm bakes! Wishing ${name ? name + ' and your cherished friends' : 'you and your squad'} boundless laughter, wild dreams, and joyful memories! 🥐☕"`
  },

  family: {
    title: 'Family Get-Together',
    emoji: '👨‍👩‍👧‍👦',
    greeting: (name) => `Warm welcome to the whole family ${name ? name : ''}! 🏡❤️`,
    tag: 'Family Feast Pick',
    hotDrinkHero: {
      name: "Vanilla Cloud Coffee Frappe (₹175)",
      reason: "Creamy, chilled, and loved by kids and elders alike as you gather around our garden terrace."
    },
    coolDrinkHero: {
      name: "Butter Croissant with Berry Jam (₹120) & Hot Cocoa",
      reason: "Flaky golden butter croissants with homemade berry jam that warm every heart at the table."
    },
    closingWish: (name) => `"🏡👨‍👩‍👧‍👦 Cherish every warm bite, shared smile, and family story! Wishing ${name ? name + ' and your beloved family' : 'your whole family'} health, radiant joy, and full happy hearts at La Céleste Café! 🍕🍰"`
  },

  birthday: {
    title: 'Birthday Celebration',
    emoji: '🎂',
    greeting: (name) => `Happy Birthday, ${name || 'Birthday Star'}! 🎈🧁`,
    tag: 'Birthday Star Treat',
    hotDrinkHero: {
      name: "Vanilla Caramel Tart (₹160) & Lavender Cold Brew",
      reason: "Crack through crisp caramelized sugar into silky vanilla custard while celebrating another fabulous year around the sun!"
    },
    coolDrinkHero: {
      name: "Red Velvet Cream Cheese Éclair (₹110) & Belgian Hot Chocolate",
      reason: "A crown of crimson cocoa and gold dust, perfect for a candle wish at La Céleste Café!"
    },
    closingWish: (name) => `"🎂🎈 Happy Birthday, ${name ? name : 'dear star'}! May this new chapter overflow with boundless starlight, sweet triumphs, and every dessert your heart desires! Make a magnificent wish! 🧁✨"`
  },

  anniversary: {
    title: 'Anniversary Special',
    emoji: '💍',
    greeting: (name) => `Happy Anniversary, ${name || 'charming couple'}! 🌹✨`,
    tag: 'Everlasting Love Match',
    hotDrinkHero: {
      name: "Wild Berry Sparkling Cooler & Macaron Box (₹99 for 3)",
      reason: "Toast to your wonderful years together with bubbly berry coolers and our delicate French almond macarons."
    },
    coolDrinkHero: {
      name: "Signature Molten Hot Chocolate & Warm Croissant",
      reason: "Velvety, rich, and unforgettable — just like the timeless milestones you celebrate together."
    },
    closingWish: (name) => `"💍🥂 Happy Anniversary! Celebrating true love and sweet memories together. May your bond grow stronger with each passing year! 🌹☕"`
  },

  solo: {
    title: 'Solo Coffee Break',
    emoji: '📖',
    greeting: (name) => `Welcome to your quiet corner, ${name || 'dear friend'}! 🌿☕`,
    tag: 'Peaceful Me-Time Treat',
    hotDrinkHero: {
      name: "Lavender Iced Cold Brew (₹150)",
      reason: "A soothing floral iced coffee that keeps you relaxed and focused as you read or work peacefully."
    },
    coolDrinkHero: {
      name: "Hot Coffee & Chocolate Croissant (₹140)",
      reason: "A warm, comforting treat: melting chocolate ribbons inside flaky pastry with hot brewed coffee."
    },
    closingWish: (name) => `"📖☕ Enjoy this peaceful sanctuary, ${name || 'friend'}! You deserve this quiet relaxation, starlit ambiance, and your favorite warm brew at La Céleste Café! 🌿✨"`
  }
};

// Drinks list when temperature is HOT (> 25°C)
const HOT_WEATHER_DRINKS = [
  { name: "Lavender Iced Cold Brew", price: "₹150", badge: "Iced Floral", icon: "🪻" },
  { name: "Vanilla Cloud Coffee Frappe", price: "₹175", badge: "Creamy", icon: "🍦" },
  { name: "Wild Berry Sparkling Cooler", price: "₹160", badge: "Fizzy Berry", icon: "🍓" },
  { name: "Assorted French Macarons (Box of 3)", price: "₹99", badge: "Budget Gem", icon: "✨" }
];

// Drinks list when temperature is COOL / COZY (<= 25°C or rainy)
const COOL_WEATHER_DRINKS = [
  { name: "Signature Belgian Hot Chocolate", price: "₹210", badge: "Molten Cacao", icon: "🍫" },
  { name: "Butter Croissant with Berry Jam", price: "₹120", badge: "Warm Flaky", icon: "🥐" },
  { name: "Hot Coffee with Garlic Toast", price: "₹130", badge: "Combo Pick", icon: "☕" },
  { name: "Vanilla Caramel Tart", price: "₹160", badge: "Caramelized", icon: "🍮" }
];

// ==============================================================================
// STEP 3: THE FETCH() CALL TO GET LIVE WEATHER FROM WEATHERAPI
// ==============================================================================
async function fetchLiveBengaluruWeather() {
  const loadingEl = document.getElementById('weather-loading');
  const contentEl = document.getElementById('weather-content');
  const tempEl = document.getElementById('weather-temp');
  const conditionEl = document.getElementById('weather-condition');
  const feelsEl = document.getElementById('weather-feels');
  const iconEl = document.getElementById('weather-icon');

  // Build the API URL with query string
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(WEATHER_LOCATION)}&aqi=no`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`WeatherAPI returned error status: ${response.status}`);
    }

    const data = await response.json();

    const currentTemp = Math.round(data.current.temp_c);
    const conditionText = data.current.condition.text;
    const feelsLikeTemp = Math.round(data.current.feelslike_c);
    let iconSrc = data.current.condition.icon;
    if (iconSrc && iconSrc.startsWith('//')) {
      iconSrc = 'https:' + iconSrc;
    }

    liveWeatherState = {
      tempC: currentTemp,
      conditionText: conditionText,
      iconUrl: iconSrc,
      isLoaded: true
    };

    // Update Banner UI
    if (tempEl) tempEl.textContent = `${currentTemp}°C`;
    if (conditionEl) conditionEl.textContent = conditionText;
    if (feelsEl) feelsEl.textContent = `Feels like ${feelsLikeTemp}°C`;
    if (iconEl && iconSrc) {
      iconEl.src = iconSrc;
      iconEl.alt = conditionText;
    }

    if (loadingEl) loadingEl.classList.add('hidden');
    if (contentEl) contentEl.classList.remove('hidden');

    updateCompanionUI();

  } catch (error) {
    console.error('Error fetching live weather from WeatherAPI:', error);
    if (loadingEl) {
      loadingEl.innerHTML = '<span>🌤️ Bengaluru: 24°C • Pleasant &amp; Breezy</span>';
    }
    liveWeatherState = {
      tempC: 24,
      conditionText: 'Pleasant & Breezy',
      iconUrl: '',
      isLoaded: true
    };
    updateCompanionUI();
  }
}

// ==============================================================================
// STEP 4: OCCASION & WEATHER ENGINE
// ==============================================================================
let currentSelectedOccasion = 'date';

function updateCompanionUI() {
  const nameInput = document.getElementById('companion-name');
  const enteredName = nameInput ? nameInput.value.trim() : '';

  const snapshotTempDisplay = document.getElementById('snapshot-temp-display');
  const tempIndicatorPill = document.getElementById('temp-indicator-pill');
  const tempSummaryText = document.getElementById('temp-condition-summary');

  const greetingTitle = document.getElementById('companion-greeting-title');
  const greetingText = document.getElementById('companion-greeting-text');

  const recHeading = document.getElementById('rec-heading');
  const drinksListContainer = document.getElementById('drinks-list-container');

  const heroTag = document.getElementById('hero-rec-tag');
  const heroTitle = document.getElementById('hero-rec-title');
  const heroReason = document.getElementById('hero-rec-reason');

  const wishMessageText = document.getElementById('wish-message-text');

  const temp = liveWeatherState.tempC;
  const isHot = temp > 25;

  const occasionConfig = OCCASION_DATA[currentSelectedOccasion] || OCCASION_DATA.date;

  if (snapshotTempDisplay) {
    snapshotTempDisplay.textContent = `${temp}°C • ${liveWeatherState.conditionText}`;
  }

  if (tempIndicatorPill && tempSummaryText) {
    if (isHot) {
      tempIndicatorPill.className = 'weather-temp-indicator hot-weather';
      tempSummaryText.textContent = `☀️ Warm in Bengaluru (${temp}°C) — Chilled Refreshment Mode`;
    } else {
      tempIndicatorPill.className = 'weather-temp-indicator cool-weather';
      tempSummaryText.textContent = `🍃 Cozy Starlight Weather (${temp}°C) — Warm Bakes & Cocoa Mode`;
    }
  }

  if (greetingTitle) {
    greetingTitle.textContent = occasionConfig.greeting(enteredName);
  }
  if (greetingText) {
    greetingText.textContent = `You're celebrating ${occasionConfig.title} at La Céleste Café, Bengaluru! Here are our chef recommendations for today's sky:`;
  }

  const drinksToRender = isHot ? HOT_WEATHER_DRINKS : COOL_WEATHER_DRINKS;
  if (recHeading) {
    recHeading.textContent = isHot 
      ? `🍹 It's Warm (>25°C)! Top Chilled Refreshments for Your ${occasionConfig.title}:`
      : `☕ Cozy Weather (≤25°C)! Warm Comfort Bakes & Drinks for Your ${occasionConfig.title}:`;
  }

  if (drinksListContainer) {
    drinksListContainer.innerHTML = '';
    drinksToRender.forEach(drink => {
      const itemEl = document.createElement('div');
      itemEl.className = 'rec-drink-pill';
      itemEl.innerHTML = `
        <div>
          <span>${drink.icon}</span>
          <strong>${drink.name}</strong>
        </div>
        <span class="rec-drink-price">${drink.price}</span>
      `;
      drinksListContainer.appendChild(itemEl);
    });
  }

  const heroPick = isHot ? occasionConfig.hotDrinkHero : occasionConfig.coolDrinkHero;
  if (heroTag) heroTag.textContent = `Chef's Match for ${occasionConfig.title}`;
  if (heroTitle) heroTitle.textContent = heroPick.name;
  if (heroReason) heroReason.textContent = heroPick.reason;

  if (wishMessageText) {
    wishMessageText.textContent = occasionConfig.closingWish(enteredName);
  }
}

// ==============================================================================
// STEP 5: THE STARLIGHT PARTY HALL — MUSIC CURATOR & PROJECTION SUITE
// ==============================================================================

// Multilingual song catalogue categorized by Language & Occasion
const MUSIC_DATABASE = {
  french: [
    { title: "La Vie En Rose — Édith Piaf (Acoustic Jazz)", occasion: "date" },
    { title: "Comptine d'un autre été — Yann Tiersen (Piano)", occasion: "solo" },
    { title: "Quelqu'un m'a dit — Carla Bruni (Chanson)", occasion: "date" },
    { title: "Champs-Élysées — Zaz (Upbeat Swing)", occasion: "birthday" },
    { title: "Dernière Danse — Indila (Acoustic Strings)", occasion: "anniversary" },
    { title: "La Seine — Vanessa Paradis (Joyful Pop)", occasion: "friends" },
    { title: "Sous le Ciel de Paris — Accordion Ensemble", occasion: "family" }
  ],
  english: [
    { title: "Until I Found You — Stephen Sanchez (Vintage Ballad)", occasion: "date" },
    { title: "Fly Me to the Moon — Frank Sinatra (Jazz Quartet)", occasion: "anniversary" },
    { title: "Golden Hour — JVKE (Cinematic Starlight Piano)", occasion: "birthday" },
    { title: "Dancing Queen — Acoustic Cafe Version", occasion: "friends" },
    { title: "What a Wonderful World — Louis Armstrong", occasion: "family" },
    { title: "Photograph — Ed Sheeran (Acoustic Heartbeat)", occasion: "date" },
    { title: "Viva La Vida — Vitamin String Quartet", occasion: "birthday" }
  ],
  hindi: [
    { title: "Kesariya — Unplugged Acoustic Cello", occasion: "date" },
    { title: "Pehla Nasha — Piano & Violin Nocturne", occasion: "date" },
    { title: "Tum Se Hi — Coffeehouse Guitar & Vocals", occasion: "anniversary" },
    { title: "Ilahi — Acoustic Bohemian Roadtrip Vibe", occasion: "friends" },
    { title: "Gulaabi Aankhen — Retro Lo-Fi Jazz", occasion: "birthday" },
    { title: "Kabira — Warm Family Ensemble", occasion: "family" }
  ],
  kannada: [
    { title: "Belageddu — Sunrise Acoustic Mix", occasion: "friends" },
    { title: "Ninna Danigaagi — Gentle Cello & Flute", occasion: "date" },
    { title: "Singara Siriye — Lo-Fi Bamboo Melody", occasion: "anniversary" },
    { title: "Neene Neene — Starlight Piano Ballad", occasion: "date" },
    { title: "Geleya Geleya — Upbeat Celebration Beats", occasion: "birthday" },
    { title: "Huttidare Kannada — Instrumental Anthem", occasion: "family" }
  ],
  instrumental: [
    { title: "Gymnopédie No. 1 — Erik Satie (Harp & Rain)", occasion: "solo" },
    { title: "Canon in D — Pachelbel (Starlight Chimes)", occasion: "anniversary" },
    { title: "Clair de Lune — Debussy (Moonlit Grand Piano)", occasion: "date" },
    { title: "Midnight Lo-Fi Coffeehouse Beats", occasion: "friends" },
    { title: "Celebration Orchestral Fanfare & Strings", occasion: "birthday" }
  ]
};

// Curated sample starlight celebration images
const SAMPLE_DREAM_PHOTOS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", // Romantic candlelit dining
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80", // Birthday party sparkler
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80", // Celebration feast
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"  // Best friends laughing
];
let currentSampleIndex = 0;

function setupPartyHallEngine() {
  const langSelect = document.getElementById('musicLanguage');
  const trackSelect = document.getElementById('musicTrackSelect');
  const hallOccasionSelect = document.getElementById('hallOccasionSelect');
  const currentTrackNameEl = document.getElementById('audioCurrentTrackName');
  const currentLangEl = document.getElementById('audioCurrentLang');

  const photoFileInput = document.getElementById('projectorPhotoInput');
  const loadSampleBtn = document.getElementById('loadSamplePhotoBtn');
  const captionInput = document.getElementById('projectionCaptionInput');

  const projectorImg = document.getElementById('projectorImageDisplay');
  const projectorCaption = document.getElementById('projectorCaptionText');
  const projectorBadge = document.getElementById('projectorOccasionBadge');

  // Populate Tracks based on Language & Occasion
  function populateTracks() {
    if (!langSelect || !trackSelect) return;
    const selectedLang = langSelect.value;
    const selectedOccasion = hallOccasionSelect ? hallOccasionSelect.value : 'date';

    const tracksList = MUSIC_DATABASE[selectedLang] || MUSIC_DATABASE.french;
    trackSelect.innerHTML = '';

    tracksList.forEach((track, index) => {
      const opt = document.createElement('option');
      opt.value = track.title;
      opt.textContent = track.title;
      if (track.occasion === selectedOccasion) {
        opt.selected = true;
      }
      trackSelect.appendChild(opt);
    });

    updateAudioDisplay();
  }

  function updateAudioDisplay() {
    if (!trackSelect || !currentTrackNameEl) return;
    const chosenTrack = trackSelect.value || "La Vie En Rose (French Acoustic Jazz)";
    const langName = langSelect ? langSelect.options[langSelect.selectedIndex].text : "French";
    const occasionName = hallOccasionSelect ? hallOccasionSelect.options[hallOccasionSelect.selectedIndex].text : "Celebration";

    currentTrackNameEl.textContent = chosenTrack;
    if (currentLangEl) {
      currentLangEl.textContent = `Language: ${langName} • Curated for ${occasionName.split(' ')[1] || 'Party'}`;
    }
  }

  if (langSelect) langSelect.addEventListener('change', populateTracks);
  if (hallOccasionSelect) {
    hallOccasionSelect.addEventListener('change', () => {
      populateTracks();
      if (projectorBadge) {
        projectorBadge.textContent = hallOccasionSelect.value.toUpperCase();
      }
    });
  }
  if (trackSelect) trackSelect.addEventListener('change', updateAudioDisplay);

  populateTracks();

  // Photo Upload via FileReader (Projects user's real uploaded photo!)
  if (photoFileInput) {
    photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          if (projectorImg) {
            projectorImg.src = evt.target.result;
            projectorImg.style.transform = 'scale(1.05)';
            setTimeout(() => { projectorImg.style.transform = 'scale(1)'; }, 500);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Sample photo button
  if (loadSampleBtn) {
    loadSampleBtn.addEventListener('click', () => {
      currentSampleIndex = (currentSampleIndex + 1) % SAMPLE_DREAM_PHOTOS.length;
      if (projectorImg) {
        projectorImg.src = SAMPLE_DREAM_PHOTOS[currentSampleIndex];
      }
    });
  }

  // Live Caption Input
  if (captionInput && projectorCaption) {
    captionInput.addEventListener('input', () => {
      projectorCaption.textContent = captionInput.value.trim() || "Happy Celebration at La Céleste Café! ✨";
    });
  }

  // Hall Booking Form Submit
  const hallForm = document.getElementById('hall-reservation-form');
  const hallHostName = document.getElementById('hallHostName');
  const hallPhone = document.getElementById('hallPhone');
  const hallSubmitBtn = document.getElementById('hallSubmitBtn');
  const hallSuccessBanner = document.getElementById('hall-success-banner');
  const hallSuccessTitle = document.getElementById('hall-success-title');
  const hallSuccessMsg = document.getElementById('hall-success-msg');
  const hallSuccessSnippet = document.getElementById('hall-success-snippet');

  if (hallForm) {
    hallForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!hallHostName.value.trim()) {
        hallHostName.classList.add('invalid');
        const err = document.getElementById('hall-name-error');
        if (err) err.classList.add('visible');
        isValid = false;
      } else {
        hallHostName.classList.remove('invalid');
        const err = document.getElementById('hall-name-error');
        if (err) err.classList.remove('visible');
      }

      if (!hallPhone.value.trim() || hallPhone.value.trim().length < 8) {
        hallPhone.classList.add('invalid');
        const err = document.getElementById('hall-phone-error');
        if (err) err.classList.add('visible');
        isValid = false;
      } else {
        hallPhone.classList.remove('invalid');
        const err = document.getElementById('hall-phone-error');
        if (err) err.classList.remove('visible');
      }

      if (isValid) {
        hallSubmitBtn.disabled = true;
        const origText = hallSubmitBtn.innerHTML;
        hallSubmitBtn.innerHTML = '<span>Activating The Starlight Party Hall &amp; Projector... ✨</span>';

        setTimeout(() => {
          const host = hallHostName.value.trim();
          const track = trackSelect.value;
          const lang = langSelect.options[langSelect.selectedIndex].text;

          if (hallSuccessTitle) {
            hallSuccessTitle.textContent = `Congratulations, ${host}! The Starlight Party Hall is Reserved! 🌟`;
          }
          if (hallSuccessMsg) {
            hallSuccessMsg.textContent = `Your private party hall reservation is confirmed! The cinema projector is configured with your caption & photo. Your soundtrack: "${track}" (${lang}) will play upon arrival.`;
          }
          if (hallSuccessSnippet) {
            hallSuccessSnippet.textContent = `"✨ May your celebration under the starlight glass dome be filled with golden laughter, delicious bakery treats, and unforgettable memories!"`;
          }

          hallSuccessBanner.classList.add('active');
          hallSubmitBtn.disabled = false;
          hallSubmitBtn.innerHTML = origText;
          hallSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 900);
      }
    });

    [hallHostName, hallPhone].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          const err = input.parentElement.querySelector('.error-msg');
          if (err) err.classList.remove('visible');
        });
      }
    });
  }
}

// ==============================================================================
// STEP 6: DOM EVENT LISTENERS & SETUP
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {

  // Fetch the live weather immediately on page load!
  fetchLiveBengaluruWeather();

  // Initialize The Starlight Party Hall & Projector
  setupPartyHallEngine();

  // Occasion Chip Selection in Companion Section
  const occasionChips = document.querySelectorAll('.occasion-chip');
  occasionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      occasionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentSelectedOccasion = chip.getAttribute('data-occasion');
      updateCompanionUI();
    });
  });

  // Name Input typing listener
  const companionNameInput = document.getElementById('companion-name');
  if (companionNameInput) {
    companionNameInput.addEventListener('input', () => {
      updateCompanionUI();
      const orderNameField = document.getElementById('orderFullName');
      if (orderNameField && !orderNameField.value) {
        orderNameField.value = companionNameInput.value;
      }
    });
  }

  // Mobile navigation hamburger toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });

    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // Sticky header shadow on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Menu Category Filtering
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');
      menuCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ============================================================================
  // STEP 7: LA CÉLESTE CAFÉ OPERATING HOURS CHECKER
  // Timings: 9:30 AM – 11:30 PM, Open all 7 days of the week!
  // ============================================================================
  function checkCelesteHours() {
    const statusTextEl = document.getElementById('live-status');
    const indicatorEl = document.getElementById('celeste-live-indicator');
    const now = new Date();
    const currentHourDecimal = now.getHours() + now.getMinutes() / 60;

    const isOpen = currentHourDecimal >= 9.5 && currentHourDecimal < 23.5;

    if (statusTextEl) {
      if (isOpen) {
        statusTextEl.textContent = 'Open Today: 9:30 AM – 11:30 PM';
        if (indicatorEl) {
          indicatorEl.style.backgroundColor = '#34d399';
          indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 211, 153, 0.3)';
        }
      } else {
        statusTextEl.textContent = 'Closed Now • Re-opens tomorrow at 9:30 AM';
        if (indicatorEl) {
          indicatorEl.style.backgroundColor = '#f87171';
          indicatorEl.style.boxShadow = '0 0 0 3px rgba(248, 113, 113, 0.3)';
        }
      }
    }
  }

  checkCelesteHours();

  // ============================================================================
  // STEP 8: TABLE RESERVATION FORM HANDLING
  // ============================================================================
  const orderForm = document.getElementById('celeste-order-form');
  const orderName = document.getElementById('orderFullName');
  const orderPhone = document.getElementById('orderPhone');
  const orderOccasion = document.getElementById('orderOccasion');
  const orderSubmitBtn = document.getElementById('order-submit-btn');
  const successBanner = document.getElementById('order-success-banner');
  const successHeadline = document.getElementById('success-headline');
  const successBody = document.getElementById('success-body-message');
  const successWishSnippet = document.getElementById('success-wish-snippet');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!orderName.value.trim()) {
        orderName.classList.add('invalid');
        const err = document.getElementById('order-name-error');
        if (err) err.classList.add('visible');
        isValid = false;
      } else {
        orderName.classList.remove('invalid');
        const err = document.getElementById('order-name-error');
        if (err) err.classList.remove('visible');
      }

      if (!orderPhone.value.trim() || orderPhone.value.trim().length < 8) {
        orderPhone.classList.add('invalid');
        const err = document.getElementById('order-phone-error');
        if (err) err.classList.add('visible');
        isValid = false;
      } else {
        orderPhone.classList.remove('invalid');
        const err = document.getElementById('order-phone-error');
        if (err) err.classList.remove('visible');
      }

      if (isValid) {
        orderSubmitBtn.disabled = true;
        const originalBtnText = orderSubmitBtn.innerHTML;
        orderSubmitBtn.innerHTML = '<span>Reserving Your Starlit Table... ✨</span>';

        setTimeout(() => {
          const guestName = orderName.value.trim();
          const selectedOccasionKey = orderOccasion.value;
          const occasionInfo = OCCASION_DATA[selectedOccasionKey] || OCCASION_DATA.date;

          if (successHeadline) {
            successHeadline.textContent = `Thank you, ${guestName}! (${occasionInfo.title})! 💖`;
          }
          if (successBody) {
            successBody.textContent = `Your table at La Céleste Café conservatory is confirmed! A confirmation WhatsApp message has been dispatched to ${orderPhone.value}.`;
          }
          if (successWishSnippet) {
            successWishSnippet.textContent = occasionInfo.closingWish(guestName);
          }

          successBanner.classList.add('active');
          orderSubmitBtn.disabled = false;
          orderSubmitBtn.innerHTML = originalBtnText;

          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 900);
      }
    });

    [orderName, orderPhone].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          const err = input.parentElement.querySelector('.error-msg');
          if (err) err.classList.remove('visible');
        });
      }
    });
  }
});
