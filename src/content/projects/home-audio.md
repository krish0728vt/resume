---
title: Home Audio System
short: Home audio
order: 12
status: Completed
discipline: Analog · Audio · Embedded
cats: [analog, embedded]
summary: A three-band graphic equaliser, a discrete class-D amplifier and a live OLED spectrogram, built on breadboards and tested from input jack to speaker.
stack: [RC band-pass filters, Class-D PWM, MOSFETs, LTspice, Arduino, OLED, Analog Discovery 2]
cover: images/home-audio/final-circuit.jpg
gallery:
  - { src: images/home-audio/final-circuit.jpg, caption: "Final circuit: equaliser, amplifier and OLED spectrogram" }
  - { src: images/home-audio/block-diagram.jpg, caption: "System block diagram" }
  - { src: images/home-audio/eq-ltspice.jpg, caption: "Equaliser, all bands boosted (LTspice)" }
  - { src: images/home-audio/eq-measured.jpg, caption: "Equaliser, all bands boosted (measured)" }
  - { src: images/home-audio/pwm-comparators.jpg, caption: "Comparator PWM outputs with dead time" }
  - { src: images/home-audio/rlc-bode.jpg, caption: "RLC output filter, measured Bode plot" }
  - { src: images/home-audio/thd.jpg, caption: "Amplifier output spectrum for THD" }
  - { src: images/home-audio/oled-spectrogram.jpg, caption: "OLED spectrogram running" }
  - { src: images/home-audio/system-test.jpg, caption: "End-to-end listening test" }
---

## Overview

A complete home audio chain, designed and built with my lab partner Kip Chemweno and presented in December 2024. Sound comes in through a jack, a three-band graphic equaliser shapes it, a class-D amplifier drives the output, and an Arduino-driven OLED shows the live strength of each band. Each subsystem is modular, so it could be tested on its own and upgraded without disturbing the rest.

## Graphic equaliser

- Separate two-stage RC band-pass filters for bass (60–500 Hz), mid (500 Hz–3 kHz) and treble (3–6 kHz), each with its own gain potentiometer.
- Simulated in LTspice, then measured on the breadboard. The measured response with all bands boosted closely tracks the simulation.

## Class-D amplifier

- **Modulator.** An integrator and comparators turn the audio into pulse-width-modulated drive signals.
- **Switching stage.** An NMOS/PMOS output stage with deliberate dead time, so the two transistors never conduct at once (no shoot-through).
- **Output filter.** An RLC low-pass filter, with a hand-wound toroid inductor, recovers the audio from the PWM. Its Bode plot was measured on the Analog Discovery 2.
- **Verification.** Spectrum analysis of the output confirmed low harmonic distortion.

## OLED spectrogram

The Arduino samples the three bands and draws them as live bars on the OLED. I used the serial monitor to calibrate the thresholds, so the bar heights follow the equaliser settings.

## Problems solved

- Noise from the Arduino side, reduced with physical filtering, averaging and thresholds
- Shoot-through in the switching stage, fixed by adding dead time
- Ripple at the amplifier output, reduced by recalibrating the RLC filter

## Outcome

Integrated tests with music and test signals confirmed that the equaliser, amplifier and display all work together. Next steps would be more equaliser bands, a more detailed spectrogram and digital signal processing for a cleaner output.
