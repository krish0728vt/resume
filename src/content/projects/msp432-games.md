---
title: Embedded Game Suite on MSP432
short: MSP432 games
order: 10
discipline: Embedded · Bare-metal C
cats: [embedded]
summary: Four arcade games on the MSP432 LaunchPad and BOOSTXL-EDUMKII, written in bare-metal C around a non-blocking main loop and hardware timers.
stack: [MSP432, BOOSTXL-EDUMKII, C, Code Composer Studio, Timers]
---

## Overview

Four games on one platform: the MSP432 LaunchPad with the BOOSTXL-EDUMKII BoosterPack. They share its joystick, buttons, LEDs, buzzer and 128 × 128 LCD. Everything is bare-metal C in Code Composer Studio, built on a non-blocking main loop with timer-driven events, so input, game logic and drawing never stall one another.

## Dinosaur Runner

A hardware take on the browser dinosaur game. Jump obstacles with a button or the joystick while the score climbs. Periodic timers spawn obstacles and ramp up the speed, with no blocking delays.

## Touhou-style bullet hell

Steer a square through patterned bullet waves fired by an enemy at the top of the screen. Helper functions generate the patterns, and player health, enemy health, score and high score are tracked like a compact arcade cabinet.

## Cookie Clicker

Tap the joystick button to earn cookies, then spend them on Cursors, Grandmas and Bakeries to raise cookies per second. The LCD shows totals, rate, buildings and upgrades. Stronger taps and random GOLD! events add depth, all inside a fast update loop.

## Reaction Time Tester

After a random delay an LED lights, and a hardware timer measures how long the button press takes. The LCD shows each trial and a running average, a showcase for precise timing and input handling.
