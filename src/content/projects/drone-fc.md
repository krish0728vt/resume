---
title: Drone Flight Controller
short: Flight controller
order: 6
discipline: PCB · Robotics · Motor control
cats: [pcb, robotics, embedded]
summary: A 40 mm flight-controller board and 3D-printed frame for a tiny coreless-motor quadcopter, with the microcontroller, IMU, motor drivers and power in one layout.
stack: [Seeed XIAO ESP32-S3, ICM-42670-P IMU, MOSFET drivers, 1S LiPo, KiCad, 3D printing]
model: drone-fc.glb
figure: Flight controller on its printed frame, from the KiCad and frame STEP files. 40 × 40 mm board, IMU on the underside.
showcase: true
parts:
  - { match: "^113991054", name: "Seeed XIAO ESP32-S3", desc: "Flight computer" }
  - { match: "^LGA14", name: "ICM-42670-P", desc: "6-axis IMU, LGA-14" }
  - { match: "^SOT-23", name: "MOSFET × 4", desc: "Low-side motor drivers" }
  - { match: "^D_SOD-323", name: "Diode × 4", desc: "Flyback protection" }
  - { match: "^530470210", name: "Molex PicoBlade × 5", desc: "Four motors and the 1S LiPo" }
  - { match: "^CP_Elec", name: "Electrolytic capacitor", desc: "Bulk decoupling for motor surges" }
  - { match: "^JS102011", name: "Slide switch", desc: "Power" }
  - { match: "^WS2812B", name: "WS2812B-2020", desc: "Status LEDs" }
  - { match: "PCB$", name: "Main PCB", desc: "40 × 40 mm" }
  - { match: "^Frame$", name: "Frame", desc: "3D-printed X frame, 88 mm across, M2 mounts" }
  - { match: "^(C_|R_)", name: "Passives", desc: "0805 and 1206", callout: false }
---

## Overview

A custom flight controller for a small quadcopter driven by 6 × 15 mm coreless motors. The board combines the microcontroller, motion sensing, four motor drivers and power on 40 × 40 mm, and bolts through two M2 holes onto standoffs on a 3D-printed X frame. The frame carries a motor pod at the end of each arm and a battery bay underneath.

## Design

- **Flight computer.** A Seeed XIAO ESP32-S3 module runs the control loop.
- **Sensing.** A TDK ICM-42670-P 6-axis IMU (accelerometer and gyroscope) on the underside of the board.
- **Motor drive.** Four low-side MOSFET stages, each with a flyback diode, switch the coreless motors. PicoBlade connectors take the four motors and the 1S LiPo.
- **Power.** A 1S LiPo input, a slide switch, a bulk electrolytic capacitor to ride out motor surges, and solid ground planes under the drivers.
- **Status.** Two WS2812B-2020 LEDs.

## Outcome

The board brought together embedded control hardware, motor-driver design, IMU placement and compact layout, plus the electrical and mechanical trade-offs of something that has to fly.
