---
title: Tiny Gamer — ATtiny85 Handheld
short: Tiny Gamer
order: 8
discipline: Embedded · PCB
cats: [embedded, pcb]
summary: A coin-cell handheld console with Tetris, Space Invaders, 2048 and Sokoban squeezed into 8 KB of flash and 512 bytes of RAM, in a two-part 3D-printed case.
stack: [ATtiny85, SSD1306 OLED, ATTinyCore, C/C++, EasyEDA Pro, OpenSCAD, 3D printing]
model: tiny-gamer.glb
figure: Tiny Gamer in its case. Board from the EasyEDA STEP export, case and caps from the OpenSCAD source. CR2032 holder and ATtiny85 on the underside.
showcase: true
parts:
  - { match: "^U1~", name: "ATtiny85", desc: "8 KB flash, 512 B SRAM, SOIC-8" }
  - { match: "^OLED~", name: "0.96\" OLED", desc: "SSD1306, I²C" }
  - { match: "^(UP|DOWN|LEFT|RIGHT|ACTION)~", name: "Tactile switch × 5", desc: "D-pad and action button" }
  - { match: "^B1~", name: "CR2032 holder", desc: "Coin-cell power" }
  - { match: "^POWER~", name: "Slide switch", desc: "Power" }
  - { match: "^RESET~", name: "Reset button", desc: "Side-mounted" }
  - { match: "^BUZZER~", name: "Buzzer", desc: "Sound effects" }
  - { match: "^Board", name: "Main PCB", desc: "38.1 × 53.3 mm" }
  - { match: "^Front shell$", name: "Front shell", desc: "Display window, buzzer grille, M2 heat-set inserts" }
  - { match: "^Back shell$", name: "Back shell", desc: "Counterbored M2 screws, engraved name" }
  - { match: "^D-pad cap$", name: "D-pad cap", desc: "One piece, rocks on a centre pivot pin" }
  - { match: "^Action cap$", name: "Action cap", desc: "Round, flanged" }
  - { match: "^Reset plunger$", name: "Reset plunger", desc: "Reaches the side reset switch", callout: false }
  - { match: "^(R|C)\\d+~", name: "Passives", desc: "0603 and 1206", callout: false }
---

## Overview

A palm-sized game console built around the ATtiny85, one of the most constrained microcontrollers you can buy: 8 KB of program memory and 512 bytes of RAM. A custom PCB brings together a 0.96-inch OLED, a five-button D-pad, a buzzer and a CR2032 coin cell.

## Games

Tetris, Space Invaders, 2048 and Sokoban, each with button controls, game logic and graphics drawn for a monochrome 128 × 64 screen. Fitting four games into the ATtiny85 meant optimising for memory at every step.

## Toolchain

Arduino IDE with ATTinyCore, programmed through an Arduino Uno acting as an ISP. The board was designed in EasyEDA Pro.

## Case

A two-part case designed in OpenSCAD around the board's 3D export, 42.9 × 58.1 × 17.1 mm. The front shell holds four M2 heat-set inserts, and M2 × 10 screws go in from the back through the board's corner holes, so nothing shows on the front. The front has a bevelled display window sized for the real 27 mm I²C OLED module, a buzzer grille and a slot with a thumb scoop for the power switch. The D-pad is a single + shaped cap that rocks on a centre pivot pin, so each arm presses only its own button and diagonals press two. There's also a round action cap and a reset plunger, and "Krish Shah" is engraved on the back. Every part prints without supports. Fit was checked against the board model with collision and clearance tests, including the path the board takes into the shell and all eight D-pad directions.

## Outcome

Playable games on a tiny embedded platform, and real practice in compact PCB design, memory optimisation, hardware debugging and input handling.
