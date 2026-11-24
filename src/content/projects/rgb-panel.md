---
title: 9 × 9 RGB LED Panel
short: RGB panel
order: 9
discipline: PCB · Power
cats: [pcb]
summary: A bright 81-pixel RGB panel that drives every LED's red, green and blue channels together through MOSFET stages, a study in high-current LED layout.
stack: [RGB 5050 LEDs, ESP32-C3 SuperMini, MOSFET drivers, KiCad]
model: rgb-panel.glb
figure: 9 × 9 panel, from the KiCad STEP export with the LEDs, controller, jack and MOSFETs placed from the footprints. 155 × 155 mm.
showcase: true
parts:
  - { match: "^RGB LED D\\d+$", name: "RGB LED 5050", desc: "Bright 5050 RGB, 9 × 9 grid on the front" }
  - { match: "^ESP32-C3", name: "ESP32-C3 SuperMini", desc: "Controller, on the back" }
  - { match: "^AO3400A", name: "AO3400A", desc: "Low-side MOSFETs, one per colour" }
  - { match: "^Barrel jack", name: "DC barrel jack", desc: "5 V high-current input" }
  - { match: "PCB$", name: "Panel PCB", desc: "155 × 155 mm" }
  - { match: "^R_0805", name: "R 0805", desc: "Current-limiting resistors, one per channel", callout: false }
  - { match: "^C_0805", name: "C 0805", desc: "Supply decoupling", callout: false }
---

## Overview

A custom panel of 81 non-addressable RGB 5050 LEDs in a 9 × 9 grid. Instead of addressing each pixel, the panel switches its red, green and blue channels globally through MOSFET stages under an ESP32-C3 SuperMini. That makes it a clean exercise in power and layout.

## Design

- **Global colour control.** Three low-side MOSFET channels switch the shared red, green and blue lines.
- **Current handling.** A 5 V high-current input and a current-limiting resistor for every LED channel, 243 in all, laid out in a repeating grid.
- **Layout.** LEDs on the front, with the controller and drivers on the back, wide power routing, and attention to thermal spread across the board.

## Outcome

Hands-on experience with LED power design, MOSFET switching, high-current PCB routing and display-style layout.
