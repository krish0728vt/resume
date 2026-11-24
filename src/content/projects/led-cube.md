---
title: RGB LED Magic Cube
short: LED cube
order: 4
status: Completed
discipline: PCB · Embedded · BLE · 3D printing
cats: [pcb, embedded]
summary: A glowing cube of 150 addressable LEDs on six custom PCB faces, controlled over Bluetooth from a web dashboard.
stack: [WS2812B, ESP32, EasyEDA, BLE, Web Bluetooth, 3D printing]
model: led-cube.glb
figure: Six LED face PCBs, from the EasyEDA STEP export, assembled into the cube. Each face holds 25 WS2812B LEDs.
cover: images/led-cube/cube-lit.jpg
showcase: true
parts:
  - { match: "^Face 1", name: "Face PCB × 6", desc: "50 × 50 mm, 5 × 5 WS2812B each" }
  - { match: "^Face", name: "WS2812B LEDs", desc: "150 in one data chain from GPIO4", callout: false }
gallery:
  - { src: images/led-cube/cube-lit.jpg, caption: "Finished cube running a rainbow animation" }
  - { src: images/led-cube/cube-angle.jpg, caption: "Three faces lit" }
  - { src: images/led-cube/cube-hand.jpg, caption: "Hand for scale" }
  - { src: images/led-cube/cube-blue.jpg, caption: "Single-colour mode" }
  - { src: images/led-cube/frame.jpg, caption: "Modular 3D-printed cube frame" }
  - { src: images/led-cube/base.jpg, caption: "Base enclosure with power switch" }
  - { src: images/led-cube/ble-dashboard.jpg, caption: "Web Bluetooth control dashboard" }
---

## Overview

Six 50 × 50 mm PCB faces, each carrying a 5 × 5 grid of WS2812B LEDs, make up a cube of 150 individually addressable pixels. One ESP32 hidden in the base drives the whole thing, and a web dashboard controls it over Bluetooth Low Energy. It is assembled and tested.

## Hardware

- **One data chain.** The data line leaves ESP32 GPIO4 and runs through all six faces in turn (Face 1 DOUT to Face 2 DIN, and so on), so the firmware treats the cube as a single 150-LED strip.
- **Power done properly.** A bottom power board brings an external regulated 5 V to every face. The ESP32 only carries the data signal, never the LED current. All grounds are tied together, there is a bulk capacitor on the power board, and 0402 decoupling capacitors sit next to the LEDs on each face.
- **Panelised for cost.** The face is panelised 3 × 2, so one manufactured panel gives all six faces for a complete cube.
- **Two assembly options.** SMD pads on the back of each face (+5 V, GND, DIN, DOUT) take either connectors or direct mod wires. The printed frame carries the mechanical load, so plain wires are enough.

## Enclosure

A 3D-printed base holds the ESP32, the power board, the power input and the wiring. A separate modular frame holds the six faces square and hides everything inside.

## Software

The firmware runs face-by-face transitions, full-cube effects, rainbows, fades, sparkles and moving patterns. The web dashboard connects over Web Bluetooth and controls power, brightness, speed and effect, with a live status readout and reconnect.

## Outcome

The cube is assembled and tested, with all six faces lit and animating, and the BLE controller connected.
