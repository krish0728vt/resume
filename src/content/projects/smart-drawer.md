---
title: Smart Drawer Camera Alert
short: Smart drawer
order: 5
discipline: PCB · IoT · Power
cats: [pcb, embedded]
summary: A battery-powered camera board that wakes when a drawer opens, takes a photo and sends an alert.
stack: [ESP32-S3-WROOM-1, OV2640, BQ24075, TPS63001, KiCad]
model: smart-drawer.glb
figure: Smart Drawer board, from the KiCad STEP export. ESP32-S3 module and battery connector on the underside.
showcase: true
parts:
  - { match: "^ESP32-S3-WROOM", name: "ESP32-S3-WROOM-1", desc: "N16R8 module, Wi-Fi, camera interface" }
  - { match: "^FH12-24S", name: "Hirose FH12, 24-pin", desc: "OV2640 camera FPC connector" }
  - { match: "^RGT0016C", name: "BQ24075", desc: "Li-ion charger with power path" }
  - { match: "^DRC0010J", name: "TPS63001", desc: "3.3 V buck-boost regulator" }
  - { match: "^USB_C", name: "USB-C receptacle", desc: "Charge input" }
  - { match: "^S2B-PH", name: "JST PH, 2-pin", desc: "Battery connector" }
  - { match: "^PinHeader_1x02", name: "2-pin header", desc: "Magnetic reed switch input" }
  - { match: "^B3U", name: "Omron B3U", desc: "Boot and reset buttons" }
  - { match: "PCB$", name: "Main PCB", desc: "57.15 × 52.70 mm" }
  - { match: "^(C_|R_|L_|LED_|D_|Fuse|SOT|DDC)", name: "Passives, LEDs, protection", desc: "0805 parts, fuse, diode", callout: false }
---

## Overview

A small, battery-powered monitoring board for a drawer or cabinet. A magnetic reed switch notices the drawer opening, the ESP32-S3 wakes, the OV2640 camera takes a picture, and an alert goes out over Wi-Fi.

## Design

- **Compute and camera.** An ESP32-S3-WROOM-1-N16R8 module (16 MB flash, 8 MB PSRAM for image buffers) with the OV2640 on a 24-pin FPC connector.
- **Power tree.** USB-C charges a Li-ion cell through a BQ24075 charger with power-path management. A TPS63001 buck-boost holds the 3.3 V rail across the whole battery range.
- **Sensing and controls.** A reed-switch input, boot and reset buttons, plus status and flash LEDs.
- **Layout.** Antenna keep-out at the board edge, and the module and battery connector on the underside, so the board stays compact enough to fit an enclosure.

## Outcome

The project sharpened my embedded PCB design: power-tree planning, battery charging, camera integration and layout for a connected, battery-powered device.
