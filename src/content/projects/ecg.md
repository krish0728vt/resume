---
title: ECG Heart Monitor
short: ECG monitor
order: 11
status: Completed
discipline: Analog · Biomedical
cats: [analog]
summary: A breadboarded analog ECG front-end that pulls a clean heartbeat out of tiny electrode signals, validated on my own heart.
stack: [Instrumentation amplifier, Active filters, 60 Hz notch, Analog Discovery 2]
cover: images/ecg/ecg-trace-1.jpg
gallery:
  - { src: images/ecg/ecg-trace-1.jpg, caption: "My heartbeat: 49.6 mV p-p at the IA (C1), 3.68 V p-p after the filters (C2)" }
  - { src: images/ecg/ecg-trace-2.jpg, caption: "Second capture: 33.5 mV p-p in, 2.97 V p-p out" }
  - { src: images/ecg/ecg-spectrum.jpg, caption: "Spectrum, 0–100 Hz, before and after the 60 Hz notch" }
  - { src: images/ecg/ia-schematic.jpg, caption: "Instrumentation amplifier with 180 kΩ safety resistors" }
  - { src: images/ecg/electrode-input.jpg, caption: "Electrode jack and IA input on the breadboard" }
---

## Overview

A complete analog ECG chain, built over three labs in ECE 3074 (AC Circuit Analysis). It starts at electrodes on the body and ends with a clean, amplified waveform on the oscilloscope. An instrumentation amplifier feeds band-pass and low-pass filters and a precision 60 Hz notch, which pull out the heart signal and reject noise and mains interference. I validated it on myself.

## Signal chain

- **Instrumentation amplifier.** A three-op-amp stage with high differential gain and very low common-mode gain.
- **Band-pass and low-pass filters.** Active RC stages isolate the ECG band and cut high-frequency noise.
- **Active notch.** A precision 60 Hz notch, tuned for deep attenuation at the mains frequency.
- **Electrode safety.** A 3.5 mm electrode harness, coupled into the IA and ground through 180 kΩ series resistors.

## Results

- On my own heartbeat, a 49.6 mV peak-to-peak signal at the IA output became 3.68 V peak-to-peak after the filter chain, with clear P-QRS-T complexes.
- The 0–100 Hz spectrum shows the heart-rate fundamental and its harmonics. The 60 Hz spike is visibly smaller after the notch.
- Everything was measured on an Analog Discovery 2: Bode plots, scope traces and spectra.

## What I learned

The hardest part was tolerance. Small changes in resistor and capacitor values shift the notch away from 60 Hz, so it had to be tuned by measurement. Stray wiring mistakes and shorted nodes made a multi-stage breadboard misbehave in confusing ways, and finding them was most of the debugging. Seeing the instrumentation amp, the filters and the notch line up into a working heart monitor made the circuit theory feel real.
