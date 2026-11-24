---
title: Wave Measurement Instrument
short: WMI
order: 2
status: Completed
discipline: Embedded · PCB · RF
cats: [embedded, pcb]
summary: A floating sensor that measures wave motion and radios it back to shore, built as my Major Design Experience project.
stack: [ESP32-S3 / AtomS3, IMU, LoRa 900 MHz, Raspberry Pi, Python GUI, KiCad]
model: wmi.glb
figure: MDE54F6 main board, from the KiCad STEP export. Isometric, hidden lines dashed.
dims: true
showcase: true
parts:
  - { match: "^ATOMS3", name: "M5Stack AtomS3", desc: "ESP32-S3 controller with onboard IMU" }
  - { match: "^E22-900T22S", name: "EBYTE E22-900T22S", desc: "LoRa 900 MHz telemetry module" }
  - { match: "^MAX17048", name: "MAX17048", desc: "Li-ion battery fuel gauge" }
  - { match: "^TPS63030", name: "TPS63030", desc: "Buck-boost converter" }
  - { match: "^IND_LQH3N", name: "Murata LQH3N", desc: "Power inductor" }
  - { match: "^OS102011", name: "OS102011MA1QN1", desc: "Slide power switch" }
  - { match: "^JST_PH", name: "JST PH, 2-pin", desc: "Battery connector" }
  - { match: "PCB$", name: "MDE54F6 PCB", desc: "104.75 × 79.30 mm, 1.5 mm FR-4" }
  - { match: "^(C_0603|C_1210)", name: "C 0603 / 1210", desc: "Ceramic capacitors", callout: false }
  - { match: "^(R_0603|SOT-23-5)", name: "R 0603, SOT-23-5", desc: "Resistors and regulator", callout: false }
---

## Overview

The Wave Measurement Instrument (WMI), also called WaveSense-USV, rides on a floating platform and records how it moves. From that motion it works out wave height and frequency. The system has three parts: a sealed sensing instrument on the water, a Raspberry Pi receiver on shore, and a computer that processes and plots the data.

## What I built

- **Sensing.** An M5Stack AtomS3 (ESP32-S3) samples its onboard IMU and packages the motion data.
- **Telemetry.** An EBYTE E22-900T22S LoRa module carries the data to the Raspberry Pi base station.
- **Power.** A TPS63030 buck-boost converter keeps the supply rail steady as the battery drains, a MAX17048 fuel gauge reports charge, and a slide switch and JST-PH battery connector complete the power path.
- **The board.** A custom 104.75 × 79.30 mm two-layer PCB, laid out in KiCad, with mounting holes for the enclosure.
- **Processing and GUI.** A Python workflow on the PC turns raw motion into heave and wave frequency and plots them live.

## Outcome

The project is complete: the system-level design, the board and the integration are finished. It brought together embedded sensing, RF links, power design, signal processing and packaging for a water-adjacent device. Validation against a reference wave measurement is a natural next step.
