/* ==========================================================================
   PRAJAKTA'S BIRTHDAY CELEBRATION - JAVASCRIPT ENGINE
   Dedicated with admiration to Beautiful Girl (Praju) 💖
   ========================================================================== */

(function () {
  'use strict';

  // --- AUDIO ENGINE (Web Audio API Synthesizer + Custom Audio Support) ---
  const AudioEngine = {
    ctx: null,
    isPlayingMelody: false,
    sfxEnabled: true,
    customAudio: null,
    melodyTimer: null,
    noteIndex: 0,

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    // Play a gentle bell/chime note
    playChime(freq, duration = 0.8, type = 'sine', gainVal = 0.15) {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainVal, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    },

    // Romantic celebratory chime flourish
    playCelebrationFanfare() {
      if (!this.sfxEnabled) return;
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playChime(freq, 1.2, 'triangle', 0.18);
        }, i * 90);
      });
    },

    // Candle blow sound
    playBlowSound() {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      // Gentle white noise puff
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      setTimeout(() => this.playChime(880, 0.7, 'sine', 0.1), 150);
    },

    // Balloon pop sound
    playPopSound() {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    },

    // Paper / envelope sound
    playPaperSound() {
      if (!this.sfxEnabled) return;
      this.playChime(440, 0.3, 'triangle', 0.08);
      setTimeout(() => this.playChime(660, 0.4, 'sine', 0.1), 80);
    },

    // Continuous romantic melody (Acoustic Chimes / Music Box synth)
    // Plays a sweet melody in G major / E minor
    startRomanticMelody() {
      if (this.customAudio && !this.customAudio.paused) return;
      this.init();
      this.isPlayingMelody = true;
      document.getElementById('music-icon').textContent = '🎶';

      const melody = [
        { f: 392.00, d: 0.35, pause: 400 }, // G4
        { f: 392.00, d: 0.35, pause: 300 }, // G4
        { f: 440.00, d: 0.60, pause: 500 }, // A4
        { f: 392.00, d: 0.60, pause: 500 }, // G4
        { f: 523.25, d: 0.60, pause: 500 }, // C5
        { f: 493.88, d: 1.00, pause: 900 }, // B4

        { f: 392.00, d: 0.35, pause: 400 }, // G4
        { f: 392.00, d: 0.35, pause: 300 }, // G4
        { f: 440.00, d: 0.60, pause: 500 }, // A4
        { f: 392.00, d: 0.60, pause: 500 }, // G4
        { f: 587.33, d: 0.60, pause: 500 }, // D5
        { f: 523.25, d: 1.00, pause: 900 }, // C5

        { f: 392.00, d: 0.35, pause: 400 }, // G4
        { f: 392.00, d: 0.35, pause: 300 }, // G4
        { f: 783.99, d: 0.60, pause: 500 }, // G5
        { f: 659.25, d: 0.60, pause: 500 }, // E5
        { f: 523.25, d: 0.60, pause: 500 }, // C5
        { f: 493.88, d: 0.60, pause: 500 }, // B4
        { f: 440.00, d: 0.90, pause: 800 }, // A4

        { f: 698.46, d: 0.35, pause: 400 }, // F5
        { f: 698.46, d: 0.35, pause: 300 }, // F5
        { f: 659.25, d: 0.60, pause: 500 }, // E5
        { f: 523.25, d: 0.60, pause: 500 }, // C5
        { f: 587.33, d: 0.60, pause: 500 }, // D5
        { f: 523.25, d: 1.40, pause: 1400 } // C5
      ];

      const playNext = () => {
        if (!this.isPlayingMelody) return;
        const note = melody[this.noteIndex];
        this.playChime(note.f, note.d, 'triangle', 0.12);
        this.noteIndex = (this.noteIndex + 1) % melody.length;
        this.melodyTimer = setTimeout(playNext, note.pause);
      };

      playNext();
    },

    stopAll() {
      this.isPlayingMelody = false;
      if (this.melodyTimer) {
        clearTimeout(this.melodyTimer);
        this.melodyTimer = null;
      }
      if (this.customAudio) {
        this.customAudio.pause();
      }
      document.getElementById('music-icon').textContent = '🎵';
      const disc = document.querySelector('.audio-disc');
      if (disc) disc.classList.remove('rotating');
    },

    playTrack(trackType) {
      this.stopAll();
      const disc = document.querySelector('.audio-disc');
      if (disc) disc.classList.add('rotating');
      document.getElementById('music-icon').textContent = '🎶';

      // Update active button styling
      document.querySelectorAll('.track-btn').forEach(btn => {
        if (btn.getAttribute('data-track') === trackType) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      const titleEl = document.getElementById('current-track-name');
      const artistEl = document.getElementById('current-track-artist');

      if (trackType === 'just_the_way') {
        if (!this.customAudio) this.customAudio = new Audio();
        this.customAudio.src = 'audio/just_the_way_you_are.mp3';
        this.customAudio.loop = true;
        this.customAudio.play().catch(e => console.log('Autoplay deferred', e));
        if (titleEl) titleEl.textContent = 'Just The Way You Are 🎵';
        if (artistEl) artistEl.textContent = 'Bruno Mars • Dedicated to Prajakta';
        showToast('Now Playing: Just The Way You Are 🎶');
      } else if (trackType === 'roses') {
        if (!this.customAudio) this.customAudio = new Audio();
        this.customAudio.src = 'audio/romantic_roses.mp3';
        this.customAudio.loop = true;
        this.customAudio.play().catch(e => console.log('Autoplay deferred', e));
        if (titleEl) titleEl.textContent = 'Romantic Roses 🌹';
        if (artistEl) artistEl.textContent = 'Hi Nanna Melody • Dedicated to Praju';
        showToast('Now Playing: Romantic Roses 🌹');
      } else if (trackType === 'chimes') {
        this.startRomanticMelody();
        if (titleEl) titleEl.textContent = 'Late-Night Chimes 💖';
        if (artistEl) artistEl.textContent = 'Music Box Ballad • Dedicated to Praju';
        showToast('Now Playing: Late-Night Chimes 💖');
      }
    },

    toggleMelody() {
      if ((this.customAudio && !this.customAudio.paused) || this.isPlayingMelody) {
        this.stopAll();
        showToast('Music Paused ⏸️');
      } else {
        this.playTrack('just_the_way');
      }
    },

    loadCustomFile(file) {
      if (!file) return;
      this.stopAll();

      const url = URL.createObjectURL(file);
      if (!this.customAudio) this.customAudio = new Audio();
      this.customAudio.src = url;
      this.customAudio.loop = true;
      this.customAudio.play().then(() => {
        document.getElementById('music-icon').textContent = '🎶';
        const disc = document.querySelector('.audio-disc');
        if (disc) disc.classList.add('rotating');
        document.getElementById('current-track-name').textContent = file.name.replace(/\.[^/.]+$/, "");
        document.getElementById('current-track-artist').textContent = 'Custom Track for Prajakta 💖';
        showToast(`Playing: ${file.name} 🎵`);
      }).catch(err => {
        console.error('Audio playback error', err);
      });
    }
  };

  // --- PARTICLE & CONFETTI CANVAS ENGINE ---
  const ParticleEngine = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    particles: [],
    ambientHearts: [],
    animationFrameId: null,

    init() {
      this.canvas = document.getElementById('particle-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.createAmbientHearts();
      this.loop();
    },

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    },

    createAmbientHearts() {
      this.ambientHearts = [];
      const count = 18;
      for (let i = 0; i < count; i++) {
        this.ambientHearts.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 14 + 10,
          speedY: -(Math.random() * 0.6 + 0.3),
          speedX: Math.sin(Math.random() * Math.PI) * 0.4,
          opacity: Math.random() * 0.4 + 0.15,
          hue: Math.random() > 0.4 ? 340 : 280, // Rose & lavender
          phase: Math.random() * Math.PI * 2
        });
      }
    },

    drawHeart(ctx, x, y, size, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.translate(x, y);
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // Top left curve
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // Bottom left curve
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
      // Bottom right curve
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // Top right curve
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },

    burstConfetti(originX, originY, count = 70) {
      const colors = ['#ff4d6d', '#ff758c', '#ffd166', '#c77dff', '#70e000', '#38bdf8', '#ffffff'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 4;
        this.particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          gravity: 0.16,
          opacity: 1,
          decay: Math.random() * 0.012 + 0.008,
          isHeart: Math.random() < 0.25
        });
      }
    },

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // 1. Ambient Floating Hearts
      for (let i = 0; i < this.ambientHearts.length; i++) {
        const h = this.ambientHearts[i];
        h.y += h.speedY;
        h.phase += 0.02;
        h.x += Math.sin(h.phase) * 0.5;

        if (h.y < -30) {
          h.y = this.height + 20;
          h.x = Math.random() * this.width;
        }

        const color = `hsl(${h.hue}, 85%, 68%)`;
        this.drawHeart(this.ctx, h.x, h.y, h.size, color, h.opacity);
      }

      // 2. Dynamic Burst Confetti Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        if (p.isHeart) {
          this.drawHeart(this.ctx, p.x, p.y, p.size * 1.5, p.color, p.opacity);
        } else {
          this.ctx.save();
          this.ctx.globalAlpha = p.opacity;
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          this.ctx.restore();
        }
      }

      this.animationFrameId = requestAnimationFrame(() => this.loop());
    }
  };

  // --- HELPER: TOAST NOTIFICATIONS ---
  function showToast(message, duration = 2800) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // --- 1. UNBOXING GATE EVENT ---
  function initUnboxingGate() {
    const gate = document.getElementById('surprise-gate');
    const giftBtn = document.getElementById('gift-box-btn');
    const mainContent = document.getElementById('main-content');

    if (!giftBtn || !gate) return;

    const unboxAction = () => {
      AudioEngine.init();
      AudioEngine.playCelebrationFanfare();

      const rect = giftBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      ParticleEngine.burstConfetti(centerX, centerY, 90);

      giftBtn.style.transform = 'scale(1.25) rotate(-5deg)';
      setTimeout(() => {
        giftBtn.style.transform = 'scale(0.8) rotate(5deg)';
      }, 150);

      setTimeout(() => {
        gate.classList.add('fade-out');
        mainContent.classList.remove('content-hidden');
        mainContent.classList.add('content-visible');
        showToast('Happy Birthday, Prajakta! Welcome Beautiful! 💖');
        // Start romantic song automatically
        AudioEngine.playTrack('just_the_way');
      }, 600);
    };

    giftBtn.addEventListener('click', unboxAction);
    giftBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        unboxAction();
      }
    });
  }

  // --- 2. INTERACTIVE CAKE & CANDLE BLOW ---
  function initCakeSection() {
    const candles = document.querySelectorAll('.candle');
    const blowBtn = document.getElementById('blow-candles-btn');
    const cutBtn = document.getElementById('cut-cake-btn');
    const relightBtn = document.getElementById('relight-btn');
    const statusMsg = document.getElementById('cake-status-msg');
    const cakeSlice = document.getElementById('cake-slice-cut');

    let extinguishedCount = 0;

    function extinguishCandle(candleEl) {
      const flame = candleEl.querySelector('.flame');
      const smoke = candleEl.querySelector('.smoke');
      if (flame && !flame.classList.contains('extinguished')) {
        flame.classList.add('extinguished');
        smoke.classList.add('active');
        AudioEngine.playBlowSound();

        const rect = flame.getBoundingClientRect();
        ParticleEngine.burstConfetti(rect.left + 5, rect.top, 25);

        extinguishedCount++;
        checkAllCandlesBlown();
      }
    }

    function checkAllCandlesBlown() {
      if (extinguishedCount >= candles.length) {
        statusMsg.innerHTML = '💖 <strong>Beautiful Girl\'s wish has been granted!</strong> Now let\'s cut the cake! 🍰';
        cutBtn.removeAttribute('disabled');
        AudioEngine.playCelebrationFanfare();

        const cakeRect = document.getElementById('cake-container').getBoundingClientRect();
        ParticleEngine.burstConfetti(cakeRect.left + cakeRect.width / 2, cakeRect.top + 30, 80);
      }
    }

    candles.forEach(c => {
      c.addEventListener('click', () => extinguishCandle(c));
    });

    if (blowBtn) {
      blowBtn.addEventListener('click', () => {
        candles.forEach((c, idx) => {
          setTimeout(() => extinguishCandle(c), idx * 180);
        });
      });
    }

    if (cutBtn) {
      cutBtn.addEventListener('click', () => {
        AudioEngine.playCelebrationFanfare();
        cakeSlice.classList.add('served');
        statusMsg.innerHTML = '🎉 <strong>A sweet slice of cake for Beautiful Girl (Praju)! 🍰💖</strong>';
        cutBtn.setAttribute('disabled', 'true');

        const cakeRect = document.getElementById('cake-container').getBoundingClientRect();
        ParticleEngine.burstConfetti(cakeRect.left + cakeRect.width / 2, cakeRect.top + 80, 100);
        showToast('Beautiful Girl enjoyed the first slice! 🍰💖');
      });
    }

    if (relightBtn) {
      relightBtn.addEventListener('click', () => {
        candles.forEach(c => {
          const flame = c.querySelector('.flame');
          const smoke = c.querySelector('.smoke');
          if (flame) flame.classList.remove('extinguished');
          if (smoke) smoke.classList.remove('active');
        });
        extinguishedCount = 0;
        cakeSlice.classList.remove('served');
        cutBtn.setAttribute('disabled', 'true');
        statusMsg.textContent = '💖 Click on the candles or press "Blow Out Candles" to make your wish!';
        AudioEngine.playChime(650, 0.4);
        showToast('Candles relit! Make another wish, Praju! 🕯️');
      });
    }
  }

  // --- 3. POLAROID GALLERY & PHOTO UPLOAD ---
  function initPolaroidGallery() {
    const photoInputs = document.querySelectorAll('.photo-input');
    const batchInput = document.getElementById('batch-photo-upload');
    const polaroidFrames = document.querySelectorAll('.polaroid-frame');
    const lightbox = document.getElementById('image-lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImgBox = document.getElementById('lightbox-img-container');
    const lightboxCaption = document.getElementById('lightbox-caption');

    function applyImageToWrapper(targetIndex, file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const wrapper = document.getElementById(`img-wrapper-${targetIndex}`);
        if (!wrapper) return;
        const placeholder = wrapper.querySelector('.polaroid-placeholder');
        const img = wrapper.querySelector('.uploaded-img');
        if (placeholder) placeholder.style.display = 'none';
        if (img) {
          img.src = e.target.result;
          img.classList.remove('hidden');
        }
        showToast(`Photo updated for Beautiful Girl! 📸`);
      };
      reader.readAsDataURL(file);
    }

    photoInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const target = e.target.getAttribute('data-target');
        if (e.target.files && e.target.files[0]) {
          applyImageToWrapper(target, e.target.files[0]);
        }
      });
    });

    if (batchInput) {
      batchInput.addEventListener('change', (e) => {
        if (!e.target.files) return;
        Array.from(e.target.files).forEach((file, idx) => {
          if (idx < 4) {
            applyImageToWrapper(idx + 1, file);
          }
        });
      });
    }

    // Lightbox modal view
    polaroidFrames.forEach(frame => {
      frame.addEventListener('click', (e) => {
        if (e.target.closest('.btn-change-photo') || e.target.tagName === 'INPUT') return;

        const img = frame.querySelector('.uploaded-img');
        const caption = frame.querySelector('.caption-text');
        const placeholder = frame.querySelector('.polaroid-placeholder');

        lightboxImgBox.innerHTML = '';
        if (img && !img.classList.contains('hidden') && img.src) {
          const newImg = document.createElement('img');
          newImg.src = img.src;
          newImg.alt = "Prajakta";
          lightboxImgBox.appendChild(newImg);
        } else if (placeholder) {
          const clone = placeholder.cloneNode(true);
          clone.style.height = '320px';
          lightboxImgBox.appendChild(clone);
        }

        if (caption && lightboxCaption) {
          lightboxCaption.textContent = caption.textContent;
        }

        lightbox.classList.remove('hidden');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
      });
    }

    if (lightbox) {
      lightbox.querySelector('.lightbox-backdrop')?.addEventListener('click', () => {
        lightbox.classList.add('hidden');
      });
    }
  }

  // --- 4. SECRET LETTER WAX SEAL ---
  function initSecretLetter() {
    const envelope = document.getElementById('secret-envelope');
    const seal = document.getElementById('wax-seal-btn');
    const hint = document.getElementById('envelope-hint');

    if (!seal || !envelope) return;

    function toggleLetter() {
      const isOpen = envelope.classList.toggle('open');
      AudioEngine.playPaperSound();

      const rect = seal.getBoundingClientRect();
      ParticleEngine.burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);

      if (isOpen) {
        hint.textContent = '💌 Click the wax seal to fold the letter back!';
        showToast('Secret Letter opened for Beautiful Girl 💖');
      } else {
        hint.textContent = '💌 Click on the Wax Seal to Open / Close the Letter!';
      }
    }

    seal.addEventListener('click', toggleLetter);
    seal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLetter();
      }
    });
  }

  // --- 5. SURPRISE TREAT BOX (FOR BEAUTIFUL GIRL) ---
  function initTreatBox() {
    const card = document.getElementById('surprise-treat-card');
    const nextBtn = document.getElementById('next-surprise-btn');
    const treatIcon = document.getElementById('treat-icon');
    const treatTitle = document.getElementById('treat-title');
    const treatBody = document.getElementById('treat-body');
    const treatTag = document.getElementById('treat-tag');
    const cardInner = card ? card.querySelector('.treat-card-inner') : null;
    const partyWaBtn = document.getElementById('party-whatsapp-btn');

    if (!card) return;

    const treats = [
      {
        icon: '🍸',
        tag: 'SURPRISE TREAT #1 🥂',
        title: 'Rooftop Starlight Dinner',
        body: 'Late-night rooftop cocktails & dinner under the stars on me — Beautiful Girl picks the place, I take care of everything else!',
        locationText: 'Rooftop Starlight Lounge 🍸'
      },
      {
        icon: '🌙',
        tag: 'SURPRISE TREAT #2 🚗',
        title: 'Midnight Escape Drive',
        body: "Midnight drive with Praju's favorite playlist on blast, cool night air, city lights, and absolutely zero curfew!",
        locationText: 'Midnight Highway Drive 🌙🚗'
      },
      {
        icon: '🌟',
        tag: 'SURPRISE TREAT #3 💖',
        title: 'The Golden Wish Pass',
        body: 'Whatever you wish for tonight, shall be granted without question or hesitation — guaranteed!',
        locationText: 'Wherever Praju Wishes 🌟👑'
      },
      {
        icon: '👑',
        tag: 'SURPRISE TREAT #4 👑',
        title: 'The Beautiful Girl Rule',
        body: '24 Hours where Beautiful Girl calls all the shots and commands whatever she wants — and I happily comply!',
        locationText: 'The VIP Throne Lounge 🍷'
      },
      {
        icon: '🍨',
        tag: 'SURPRISE TREAT #5 🌸',
        title: 'Sweet Cravings Spree',
        body: 'Unlimited gourmet desserts, artisan ice creams, and cozy café stops dedicated solely to keeping that dazzling smile on your face!',
        locationText: 'The Dessert & Ice Cream Haven 🍨🍰'
      }
    ];

    let currentIndex = -1;

    function updatePartyLocationLink(loc) {
      if (!partyWaBtn) return;
      const funnyMsg = `🚨 VIP PARTY ALERT:\nBeautiful Girl (Praju) has chosen her Birthday Party Coordinates!\n\n📍 Party Location: ${loc}\n\nProtocol: Bring gifts, good vibes & energy, or be denied entry to the cake! 🎂🥂\n\nSee you there! 💖`;
      partyWaBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(funnyMsg)}`;
    }

    if (partyWaBtn) {
      partyWaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        AudioEngine.playCelebrationFanfare();
        const rect = partyWaBtn.getBoundingClientRect();
        ParticleEngine.burstConfetti(rect.left + rect.width / 2, rect.top, 55);
      });
    }

    function unwrapSurprise() {
      currentIndex = (currentIndex + 1) % treats.length;
      const treat = treats[currentIndex];

      if (cardInner) {
        cardInner.classList.add('flipping');
        setTimeout(() => {
          if (treatIcon) treatIcon.textContent = treat.icon;
          if (treatTitle) treatTitle.textContent = treat.title;
          if (treatBody) treatBody.textContent = treat.body;
          if (treatTag) treatTag.textContent = treat.tag;
          updatePartyLocationLink(treat.locationText);
          cardInner.classList.remove('flipping');
        }, 180);
      } else {
        if (treatIcon) treatIcon.textContent = treat.icon;
        if (treatTitle) treatTitle.textContent = treat.title;
        if (treatBody) treatBody.textContent = treat.body;
        if (treatTag) treatTag.textContent = treat.tag;
        updatePartyLocationLink(treat.locationText);
      }

      AudioEngine.playCelebrationFanfare();

      const rect = card.getBoundingClientRect();
      ParticleEngine.burstConfetti(rect.left + rect.width / 2, rect.top + 50, 70);

      showToast(`🎁 Surprise Treat unlocked for Beautiful Girl!`);
    }

    card.addEventListener('click', (e) => {
      if (e.target.closest('.party-loc-simple-wrap') || e.target.closest('#party-whatsapp-btn')) return;
      unwrapSurprise();
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        unwrapSurprise();
      });
    }

    updatePartyLocationLink('Top-Secret Rooftop Lounge 🍸');
  }

  // --- 6. POP THE BALLOONS MINI-GAME ---
  function initBalloonGame() {
    const container = document.getElementById('balloon-container');
    const modal = document.getElementById('balloon-wish-modal');
    const modalClose = document.getElementById('modal-wish-close-btn');
    const modalTitle = document.getElementById('modal-wish-title');
    const modalText = document.getElementById('modal-wish-text');
    const modalEmoji = document.getElementById('modal-wish-emoji');

    if (!container) return;

    const balloonWishes = [
      { emoji: '🍸', title: 'Midnight Toast', msg: 'A surprise toast to Praju: effortless charm, sharp wit, and a presence that owns every room.' },
      { emoji: '👑', title: 'The Beautiful Girl Rule', msg: 'Tonight is your kingdom. Every order you give is final, Queen.' },
      { emoji: '💖', title: 'The Real Gift', msg: 'Being around you is the real gift. Happy Birthday, gorgeous.' },
      { emoji: '💖', title: 'Effortlessly Stunning', msg: 'You don\'t just turn heads, Prajakta — you stop time.' },
      { emoji: '🎁', title: 'Surprise Unlocked', msg: 'Consider this whole celebration a surprise gift from someone hopelessly captivated by you.' },
      { emoji: '🥂', title: 'Cheers to You', msg: 'To another year of Praju looking iconic and keeping me in trouble.' }
    ];

    const colors = [
      { bg: 'linear-gradient(135deg, #ff4d6d, #ff758c)', text: '#fff' },
      { bg: 'linear-gradient(135deg, #c77dff, #7b2cbf)', text: '#fff' },
      { bg: 'linear-gradient(135deg, #ffd166, #ffb703)', text: '#2d3748' },
      { bg: 'linear-gradient(135deg, #38bdf8, #0284c7)', text: '#fff' },
      { bg: 'linear-gradient(135deg, #fb7185, #f43f5e)', text: '#fff' }
    ];

    function createBalloon(id) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon-item';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * 85 + 5; // percentage
      const speed = Math.random() * 8 + 12; // seconds

      balloon.innerHTML = `
        <div class="balloon-body" style="background: ${color.bg}; color: ${color.text}">
          <span>Praju</span>
        </div>
        <div class="balloon-string"></div>
      `;

      balloon.style.left = `${startX}%`;
      balloon.style.animation = `floatUp ${speed}s linear infinite`;

      balloon.addEventListener('click', (e) => {
        AudioEngine.playPopSound();
        const rect = balloon.getBoundingClientRect();
        ParticleEngine.burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

        balloon.remove();

        const wish = balloonWishes[Math.floor(Math.random() * balloonWishes.length)];
        modalEmoji.textContent = wish.emoji;
        modalTitle.textContent = wish.title;
        modalText.textContent = wish.msg;
        modal.classList.remove('hidden');

        // Respawn replacement balloon after delay
        setTimeout(() => createBalloon(id), 3500);
      });

      container.appendChild(balloon);
    }

    // Add floatUp keyframe dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-240px) rotate(6deg); }
        100% { transform: translateY(-520px) rotate(-6deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    // Initial 6 balloons
    for (let i = 0; i < 6; i++) {
      setTimeout(() => createBalloon(i), i * 900);
    }

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
  }

  // --- 7. WISHES WALL SUBMISSION ---
  function initWishesWall() {
    const form = document.getElementById('wish-form');
    const container = document.getElementById('sticky-notes-container');
    const colors = ['note-pink', 'note-yellow', 'note-blue'];

    if (!form || !container) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderInput = document.getElementById('wish-sender');
      const messageInput = document.getElementById('wish-message');

      const sender = senderInput.value.trim();
      const message = messageInput.value.trim();

      if (!sender || !message) return;

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomTilt = (Math.random() * 6 - 3).toFixed(1);

      const note = document.createElement('div');
      note.className = `sticky-note ${randomColor}`;
      note.style.transform = `rotate(${randomTilt}deg)`;

      // Sanitize text
      const cleanMsg = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const cleanSender = sender.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      note.innerHTML = `
        <div class="pin">📍</div>
        <div class="note-text">"${cleanMsg}"</div>
        <div class="note-author">— ${cleanSender} 💖</div>
      `;

      container.prepend(note);
      form.reset();

      AudioEngine.playChime(784, 0.4);
      const rect = note.getBoundingClientRect();
      ParticleEngine.burstConfetti(rect.left + rect.width / 2, rect.top + 30, 45);

      showToast('Your birthday wish was pinned for Beautiful Girl! 📌');
    });
  }

  // --- 8. CONTROLS, MUSIC, THEME & SHARE ---
  function initControls() {
    // Music Toggle
    const musicBtn = document.getElementById('music-toggle-btn');
    const audioDrawer = document.getElementById('audio-drawer');
    const customAudioInput = document.getElementById('custom-audio-input');

    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        AudioEngine.toggleMelody();
        // Toggle audio options drawer
        audioDrawer?.classList.toggle('active');
      });
    }

    if (customAudioInput) {
      customAudioInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          AudioEngine.loadCustomFile(e.target.files[0]);
        }
      });
    }

    // Playlist Track Selector Buttons
    document.querySelectorAll('.track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('custom-file-upload') || btn.querySelector('input')) return;
        const track = btn.getAttribute('data-track');
        if (track) AudioEngine.playTrack(track);
      });
    });

    // SFX Toggle
    const sfxBtn = document.getElementById('sfx-toggle-btn');
    const sfxIcon = document.getElementById('sfx-icon');
    if (sfxBtn) {
      sfxBtn.addEventListener('click', () => {
        AudioEngine.sfxEnabled = !AudioEngine.sfxEnabled;
        sfxIcon.textContent = AudioEngine.sfxEnabled ? '🔊' : '🔇';
        showToast(AudioEngine.sfxEnabled ? 'Sound effects enabled 🔊' : 'Sound effects muted 🔇');
      });
    }

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isMidnight = document.body.classList.toggle('theme-midnight');
        themeIcon.textContent = isMidnight ? '☀️' : '🌙';
        showToast(isMidnight ? 'Starlight Midnight Theme 💖' : 'Rose Gold Theme 🌸');
        AudioEngine.playChime(700, 0.3);
      });
    }

    // Confetti Buttons
    const heroConfettiBtn = document.getElementById('hero-confetti-btn');
    if (heroConfettiBtn) {
      heroConfettiBtn.addEventListener('click', (e) => {
        AudioEngine.playCelebrationFanfare();
        ParticleEngine.burstConfetti(e.clientX, e.clientY, 80);
      });
    }

    const footerHeartBtn = document.getElementById('footer-heart-btn');
    if (footerHeartBtn) {
      footerHeartBtn.addEventListener('click', (e) => {
        AudioEngine.playCelebrationFanfare();
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight * 0.7;
            ParticleEngine.burstConfetti(x, y, 50);
          }, i * 150);
        }
        showToast('Shower of love for Beautiful Girl! 💖');
      });
    }

    // Share link
    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Celebration link copied! Share with Beautiful Girl 💌');
          }).catch(() => {
            showToast('Link ready to share: ' + window.location.href);
          });
        } else {
          showToast('Link ready to share: ' + window.location.href);
        }
        AudioEngine.playChime(800, 0.3);
      });
    }
  }

  // --- BOOTSTRAP ALL MODULES ---
  document.addEventListener('DOMContentLoaded', () => {
    ParticleEngine.init();
    initUnboxingGate();
    initCakeSection();
    initPolaroidGallery();
    initSecretLetter();
    initTreatBox();
    initBalloonGame();
    initWishesWall();
    initControls();
  });

})();
