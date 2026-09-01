// Web Audio API and Speech Synthesis Engine for iTantra Demo with Multilingual Fallbacks

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  }

  initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a radio chirp / squelch sound
  playRadioChirp(frequency = 880, duration = 0.08) {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio chirp failed:', e);
    }
  }

  // Play tactical FSK packet transmission burst sound
  playPacketBurst(durationMs = 250) {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const duration = durationMs / 1000;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(2400, this.audioCtx.currentTime + duration * 0.5);
      osc.frequency.linearRampToValueAtTime(1800, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Packet burst sound error:', e);
    }
  }

  // Play Emergency Siren Sound
  playEmergencySiren() {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      const now = this.audioCtx.currentTime;

      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.3);
      osc.frequency.linearRampToValueAtTime(600, now + 0.6);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.9);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch (e) {
      console.warn('Siren sound error:', e);
    }
  }

  // Speak text in native Indian language using SpeechSynthesis API with Formant Fallback
  speakText(text, langCode = 'hi-IN', rate = 1.0, pitch = 1.0) {
    return new Promise((resolve) => {
      let hasFinished = false;

      const finish = () => {
        if (!hasFinished) {
          hasFinished = true;
          resolve();
        }
      };

      // Safety timeout: Never hang the UI for more than 4 seconds
      setTimeout(finish, 4000);

      if (!this.synth) {
        this.playFormantSpeechFallback(text, finish);
        return;
      }

      try {
        this.synth.cancel(); // Stop any pending speech

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;

        const langMap = {
          'hi': 'hi-IN',
          'ta': 'ta-IN',
          'te': 'te-IN',
          'bn': 'bn-IN',
          'mr': 'mr-IN',
          'gu': 'gu-IN',
          'kn': 'kn-IN',
          'ml': 'ml-IN',
          'or': 'or-IN',
          'en': 'en-IN',
        };

        const targetLang = langMap[langCode] || langCode || 'hi-IN';
        utterance.lang = targetLang;

        // Find best matching voice for the target language
        const voices = this.synth.getVoices();
        const matchedVoice = voices.find(
          v => v.lang.toLowerCase().replace('_', '-').startsWith(targetLang.toLowerCase().split('-')[0]) ||
               v.lang.toLowerCase() === targetLang.toLowerCase()
        );

        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onend = () => {
          finish();
        };

        utterance.onerror = (err) => {
          console.warn('SpeechSynthesis error, falling back to acoustic formant synth:', err);
          this.playFormantSpeechFallback(text, finish);
        };

        this.synth.speak(utterance);
      } catch (e) {
        console.warn('SpeechSynthesis exception:', e);
        this.playFormantSpeechFallback(text, finish);
      }
    });
  }

  // Acoustic Formant Vocoder Fallback in Web Audio API
  playFormantSpeechFallback(text, callback) {
    try {
      this.initAudioContext();
      if (!this.audioCtx) {
        if (callback) callback();
        return;
      }

      const duration = Math.min(2.5, Math.max(1.0, text.length * 0.06));
      const now = this.audioCtx.currentTime;

      // Create carrier oscillator
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + duration * 0.5);
      osc.frequency.exponentialRampToValueAtTime(120, now + duration);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(1600, now + duration * 0.3);
      filter.frequency.linearRampToValueAtTime(1000, now + duration * 0.7);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);

      setTimeout(() => {
        if (callback) callback();
      }, duration * 1000);
    } catch (e) {
      if (callback) callback();
    }
  }

  stopSpeech() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
  }
}

export const audioEngine = new AudioEngine();
