---
title: Tiny Gamer — ATtiny85 Handheld
short: Tiny Gamer
order: 8
discipline: Embedded · PCB
cats: [embedded, pcb]
summary: A coin-cell handheld console with Tetris, Space Invaders, 2048 and Sokoban squeezed into 8 KB of flash and 512 bytes of RAM.
stack: [ATtiny85, SSD1306 OLED, ATTinyCore, C/C++, EasyEDA Pro]
model: tiny-gamer.glb
figure: Tiny Gamer board, from the EasyEDA STEP export. CR2032 holder and ATtiny85 on the underside.
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
  - { match: "^(R|C)\\d+~", name: "Passives", desc: "0603 and 1206", callout: false }
---

## Overview

A palm-sized game console built around the ATtiny85, one of the most constrained microcontrollers you can buy: 8 KB of program memory and 512 bytes of RAM. A custom PCB brings together a 0.96-inch OLED, a five-button D-pad, a buzzer and a CR2032 coin cell.

## Games

Tetris, Space Invaders, 2048 and Sokoban, each with button controls, game logic and graphics drawn for a monochrome 128 × 64 screen. Fitting four games into the ATtiny85 meant optimising for memory at every step.

## Toolchain

Arduino IDE with ATTinyCore, programmed through an Arduino Uno acting as an ISP. The board was designed in EasyEDA Pro.

## Outcome

Playable games on a tiny embedded platform, and real practice in compact PCB design, memory optimisation, hardware debugging and input handling.
