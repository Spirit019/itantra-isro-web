# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** ISRO Mission Directors, Disaster Relief & Tactical Command Centers (NDRF, State Disaster Response Forces, Coast Guard, Army Quick Reaction Teams).
- **Secondary:** Field Operatives & Rescue Units stationed in remote / infrastructure-blackout zones (Himalayan passes, deep sea, floodplains, dense forests) communicating through ultra-low-bitrate radio links (LoRa 865MHz, BLE 5.0 Coded PHY, VHF/UHF transceivers).

## Product Purpose

iTantra is an on-device multilingual Speech-to-Semantic-Token Neural Transceiver designed for Smart India Hackathon 2026 (SIH26173 - ISRO). It enables crystal-clear voice communication over zero-cellular, zero-internet radio links by compressing spoken Indian languages into 18-byte semantic tokens (2,666× bandwidth reduction down to 24 bps), and instantly synthesizing natural studio-grade voice on the receiving end in 369ms end-to-end latency.

## Positioning

Unlike traditional analog walkie-talkies (which suffer extreme static, zero cross-lingual translation, and distance drop-off) or digital audio codecs like Codec2/Opus (which sound robotic or require 6,000+ bps), iTantra transmits *semantic tokens at 24 bps* and uses on-device Neural AI (IndicConformer ASR + FastPitch/Vocos Neural TTS) to reconstruct natural speech locally in any desired Indian language (Hindi, Tamil, Bengali, Telugu, Marathi, English) with MOS 4.26/5.0 quality.

## Operating Context

- Field deployment in extreme disaster zones (floods, cloudbursts, landslides, cyclones) with zero infrastructure.
- Dual-node interactive simulator: Node Alpha (Transmitter / Field Unit) $\to$ Air Interface (LoRa 865MHz / BLE 5.0 / HC-12) $\to$ Node Bravo (Receiver / Command HQ).
- Real-time Web Audio API frequency analysis, 18-byte hex payload inspection, latency budgets, and Level 0 Emergency SOS preemption mode with NavIC GPS telemetry.

## Capabilities and Constraints

- **On-Device ASR:** AI4Bharat IndicConformer RNN-T (Sherpa-ONNX INT8, 13.44% avg WER).
- **Compression:** SCSU Unicode windowing + Indic-BPE tokenization (18 bytes per sentence = 24 bps).
- **Radio PHY:** SX1262 LoRa (865–867 MHz Indian ISM band), BLE 5.0 Long Range, 433 MHz serial.
- **On-Device TTS:** FastPitch + Vocos iSTFT vocoder neural voice synthesis (MOS 4.26/5.0).
- **Latency Target:** 369 ms total end-to-end delay (faster than human conversational turn-taking).
- **Zero-Internet Air-Gap:** Fully functional offline inside metal Faraday cages with zero external API calls.

## Brand Commitments

- **Name:** iTantra (इ-तन्त्र / ISRO Neural Transceiver)
- **Aesthetic Tone:** Aerospace & Defense Tactical Command Center, Mission Control HUD, precision telemetry, high-contrast mission-critical telemetry, dark obsidian glass with ISRO telemetry cyan, radar emerald, amber warning, and tactical red alert accents.

## Evidence on Hand

- Fully operational React + Tailwind CSS interactive transceiver demo app at `src/App.jsx`.
- Real Web Audio API acoustics, packet burst modulators, emergency sirens, and cross-lingual translation engine.
- Technical specs for LoRa SX1262, Time-on-Air (ToA) formulas, and SIH Judge Q&A rebuttal flashcards.

## Product Principles

1. **Extreme Compression with Zero Intelligibility Loss:** Transmit semantic meaning in 18 bytes (24 bps), synthesize natural speech locally.
2. **True Air-Gapped Autonomy:** 100% on-device AI; zero dependence on internet or cellular base stations.
3. **Cross-Lingual Tactical Unity:** Speak in Hindi or Marathi in the Himalayas; hear in Tamil or Bengali at Coastal Command in real time.
4. **Mission-Critical Priority Queuing:** Level 0 Emergency SOS preempts all routine radio queues with audible sirens and GPS coordinates.
5. **Radical Hardware Accessibility:** Scales from ₹0 zero-cost BLE phones to ₹600 HC-12 to ₹2,800 military-grade LoRa transceivers.

## Accessibility & Inclusion

- Multi-modal feedback (audible chirps, live bouncing audio visualizers, visual hex inspectors, high-contrast mission-critical color coding).
- Full cross-lingual support across 10 Indian regional languages with native Unicode script rendering.
