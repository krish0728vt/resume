---
title: Embedded Game Suite on MSP432
short: MSP432 games
order: 10
status: Completed
discipline: Embedded · Bare-metal C
cats: [embedded]
summary: Six games on the MSP432 LaunchPad and BOOSTXL-EDUMKII, written in bare-metal C for ECE 2564 around non-blocking main loops, finite-state machines and hardware timers.
stack: [MSP432P401R, BOOSTXL-EDUMKII, C, Code Composer Studio, SPI LCD, UART, ADC14, Timer_A, Timer32]
cover: images/msp432/surfers-menu.jpg
gallery:
  - { src: images/msp432/surfers-menu.jpg, caption: ECE Surfers on the LaunchPad and BoosterPack }
  - { src: images/msp432/pixel-monarch-play.jpg, caption: Pixel Monarch, the kingdom and its eight regions }
  - { src: images/msp432/pixel-monarch-uart.jpg, caption: Pixel Monarch, yearly events over UART }
  - { src: images/msp432/pixel-monarch-end.jpg, caption: Pixel Monarch, game over }
  - { src: images/msp432/touhou-play.jpg, caption: Touhou, diagonal bullet pattern and health HUDs }
  - { src: images/msp432/touhou-win.jpg, caption: Touhou, win screen with score }
  - { src: images/msp432/cookie-title.jpg, caption: Cookie Clicker, title screen }
  - { src: images/msp432/cookie-gold.jpg, caption: Cookie Clicker, the GOLD! bonus event }
  - { src: images/msp432/reflex-test.jpg, caption: Reflex Measurer, waiting for the LED }
  - { src: images/msp432/rps-title.jpg, caption: Rock-Paper-Scissors, title screen }
---

## Overview

These are the games I've built on the MSP432 LaunchPad with the BOOSTXL-EDUMKII BoosterPack: its joystick, buttons, RGB LEDs, buzzer and 128 × 128 LCD. Everything is bare-metal C in Code Composer Studio. Each game is a finite-state machine with a show and a handle function per screen, a HAL layer that keeps the hardware apart from the game logic, and non-blocking timers so input, logic and drawing never stall one another.

## Pixel Monarch

Keep a kingdom alive. The LCD shows People, Treasury, the year and eight surrounding regions, green when held and red when lost. Each year brings a flood, famine, raid or calm period, and the player answers over UART: spend treasury, appeal to the people, or ignore it. Calm years let you rebuild a chosen region. Costs rise every five years, and the game ends when a resource hits zero or every region falls. The UART echoes input with backspace support, runs non-blocking, and cycles through four baud rates from 9600 to 57600 at the press of a button.

## Touhou

A bullet-hell duel. The joystick (read through ADC14) moves a blue player while a red enemy drifts randomly and cycles through four bullet patterns: a vertical sweep, horizontal lanes, full-screen diagonals and diagonal bursts from the sides. Both sides start at 25 HP and lose 5 per hit. A win scores by time and remaining health, and the top five scores are kept in sorted order. Timing runs off Timer32 at 48 MHz with software timers for movement, spawns and pattern cooldowns.

## Cookie Clicker

The idle game on a 128 × 128 screen. Tap the joystick for cookies, then buy and sell Cursors, Grandmas and Bakeries and their upgrades to raise cookies per second. Large numbers format as k, M, B, T and beyond. Beyond the spec I added the Bakery as a third building, two tap-strength upgrades, an RGB LED colour for each selected building, and a GOLD! event every 20 seconds worth 500 cookies if you tap in time. The buzzer plays a short Timer_A PWM note whenever an upgrade becomes affordable.

## Rock-Paper-Scissors

A configurable number of players and rounds, with choices entered over a UART terminal and the round and final winners shown on the LCD.

## ECE Surfers

A lane-dodging runner: move between lanes and jump obstacles while the levels get harder, with collision detection, scoring and a high-score table.

## Reflex Measurer

After a random delay an LED lights, and Timer_A in continuous mode measures the time to the button press, handling counter rollover. The LCD shows each trial and the results.
