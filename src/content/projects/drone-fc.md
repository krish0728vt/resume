---
title: Drone Flight Controller
short: Flight controller
order: 6
discipline: PCB · Robotics · Motor control
cats: [pcb, robotics, embedded]
summary: A 40 mm flight-controller board for a tiny coreless-motor quadcopter, combining the microcontroller, IMU, motor drivers and power in one layout.
stack: [Seeed XIAO ESP32, 6-axis IMU, MOSFET drivers, KiCad, 3D printing]
model: drone-fc.glb
figure: Flight controller, from the KiCad STEP export. 40 × 40 mm, IMU on the underside.
showcase: true
parts:
  - { match: "^113991054", name: "Seeed XIAO ESP32", desc: "Flight computer" }
  - { match: "^LGA14", name: "6-axis IMU", desc: "LGA-14, accelerometer and gyro" }
  - { match: "^SOT-23", name: "MOSFET × 4", desc: "Low-side motor drivers" }
  - { match: "^D_SOD-323", name: "Diode × 4", desc: "Flyback protection" }
  - { match: "^530470210", name: "Molex PicoBlade", desc: "Motor and battery connectors" }
  - { match: "^CP_Elec", name: "Electrolytic capacitor", desc: "Bulk decoupling for motor surges" }
  - { match: "^JS102011", name: "Slide switch", desc: "Power" }
  - { match: "^WS2812B", name: "WS2812B-2020", desc: "Status LEDs" }
  - { match: "PCB$", name: "Main PCB", desc: "40 × 40 mm" }
  - { match: "^(C_|R_)", name: "Passives", desc: "0805 and 1206", callout: false }
---

## Overview

A custom flight controller for a small quadcopter driven by 6 × 15 mm coreless motors. The board combines the microcontroller, motion sensing, four motor drivers and power on a 40 × 40 mm board that mounts straight onto a 3D-printed frame.

## Design

- **Flight computer.** A Seeed XIAO ESP32 module runs the control loop.
- **Sensing.** A 6-axis IMU (accelerometer and gyroscope) on the underside of the board.
- **Motor drive.** Four low-side MOSFET stages, each with a flyback diode, switch the coreless motors. PicoBlade connectors take the motors and the battery.
- **Power.** A slide switch, a bulk electrolytic capacitor to ride out motor surges, and solid ground planes under the drivers.
- **Status.** Two WS2812B-2020 LEDs.

## Outcome

The board brought together embedded control hardware, motor-driver design, IMU placement and compact layout, plus the electrical and mechanical trade-offs of something that has to fly.
