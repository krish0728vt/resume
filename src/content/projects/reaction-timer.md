---
title: F1 Reaction Timer
short: Reaction timer
order: 7
discipline: Embedded · PCB · Game design
cats: [embedded, pcb]
summary: Formula 1 start lights on a custom PCB. Five reds light up, go dark at a random moment, and the board times your reaction to the millisecond.
stack: [Arduino Nano Every, SSD1306 OLED, WS2812B, EEPROM, C++, KiCad]
model: reaction-timer.glb
figure: Reaction timer board, from the KiCad STEP export. 70 × 68 mm.
showcase: true
parts:
  - { match: "^Arduino Nano Every", name: "Arduino Nano Every", desc: "ATmega4809 controller" }
  - { match: "^DM-OLED096", name: "0.96\" OLED", desc: "SSD1306, 128 × 64, I²C" }
  - { match: "^LED_WS2812B", name: "WS2812B × 6", desc: "Five start lights and a status LED" }
  - { match: "^TS04", name: "Tactile switch × 3", desc: "React, up, down" }
  - { match: "^CP_Radial", name: "Electrolytic capacitor", desc: "LED supply bulk capacitor" }
  - { match: "PCB$", name: "Main PCB", desc: "70 × 68 mm" }
  - { match: "^(C_|R_)", name: "Passives", desc: "0805 decoupling and data resistor", callout: false }
---

## Overview

A pocket version of a Formula 1 race start. Five red lights come on one at a time, hold for a random moment, then go out. You hit the button as fast as you can, and the board measures the gap in milliseconds. Jump the start and it catches you.

## Hardware

- **Arduino Nano Every** on a custom 70 × 68 mm PCB.
- **Six WS2812B LEDs** on one data line: five start lights and a status LED that turns into a colour-coded rating after each run.
- **A 0.96-inch SSD1306 OLED** mirrors the start lights and shows the menus, results and charts.
- **Three tactile buttons**: react/select, up and down.

## Firmware

- **Race start.** The lights build at 700 ms intervals, then hold for a random 1 to 3.5 s before lights out. The button is checked throughout, so any early press triggers a **false start** screen.
- **Timing and rating.** The reaction time is measured with `millis()` from lights out. Each run is graded into bands from ALIEN (under 150 ms) through ELITE, GREAT, GOOD and AVERAGE to SLOW, with a matching colour on the status LED.
- **Leaderboard.** The top five times are kept in EEPROM, so they survive power cycles, with a "NEW BEST" badge and a reset option.
- **History.** A bar chart of the last five runs, with the best one filled in.
- **Polish.** A boot animation with an F1 car bitmap and an LED chaser, a menu with a highlight bar, and debounced, edge-triggered buttons.
