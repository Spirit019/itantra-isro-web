# Design System

<!-- impeccable:design-schema 1 -->

## World & Atmosphere

- **Theme:** ISRO Aerospace & Defense Tactical Mission Control Telemetry HUD.
- **Physical Scene:** An active mission control console and field emergency tactical unit operating under low-light or outdoor glare conditions in disaster-struck zones (Himalayan passes, coastal cyclones).
- **Core Aesthetic:** Deep matte obsidian void with high-contrast mission-critical telemetry readouts in satcom cyan (`#00E5FF`), radar emerald (`#10B981`), telemetry amber (`#F59E0B`), and priority SOS vermilion (`#EF4444`).

## Palette & Colors

| Role | Color Value | Description |
| :--- | :--- | :--- |
| Background Void | `#060911` | Ultra-deep matte obsidian ground |
| Surface Panels | `#0C121E` | Tactical console container background |
| Surface Cards | `#0E1626` | Telemetry HUD card surface |
| Borders | `#1E293B` / `#25334D` | 1px precision micro-borders |
| Accent: Satcom Cyan | `#00E5FF` / `#06B6D4` | Primary active states, RF spectrum, LoRa radio |
| Accent: Radar Emerald | `#10B981` | Delivered packets, CRC verification, TTS playback |
| Accent: Telemetry Amber | `#F59E0B` | Hardware tiering, radio frequency parameters |
| Accent: Tactical Vermilion | `#EF4444` | Level 0 SOS emergency preemption mode |
| Text Primary | `#F8FAFC` | Bright high-contrast tactical readout text |
| Text Secondary | `#94A3B8` | Technical labels and subtitle commentary |

## Typography

- **Headings & Badges:** Monospace / Technical Sans (`font-mono`, `tracking-wider`, uppercase telemetry labels).
- **Body & Captions:** High-legibility UI Sans (`-apple-system`, `BlinkMacSystemFont`, `Inter`, `sans-serif`) with strict `ch` measure for readouts.
- **Hex Inspector & Data Readouts:** Fixed-width tabular monospace (`font-mono`, `text-xs`).

## Elevation & Depth

- Zero drop-shadows with colored halos.
- Crisp 1px micro-borders (`border-slate-800` / `border-cyan-500/30`) with soft 12px panel edge diffusion.
- Tactical active glows (`box-shadow: 0 0 20px rgba(0, 229, 255, 0.25)`).

## Motion & Micro-Interactions

- **Waveform Analyzer:** 12 dynamic FFT bars animating in real time off Web Audio API analyzer.
- **Radio Flight Indicator:** Pulsing RF waves with sub-millisecond Time-on-Air (ToA) packet flight timer.
- **Emergency SOS Flash:** Rhythmic 1.0s vermilion border pulse and siren frequency sweep ($600 \leftrightarrow 1200\text{ Hz}$).
- **Acoustic Feedback:** Web Audio synthesizer chirps on button clicks, squelch bursts on transmission, and tone fallbacks on speech synthesis.
