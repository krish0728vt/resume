---
title: IoT Pan-Tilt Camera
short: Pan-tilt camera
order: 3
status: Completed
discipline: IoT · Embedded · Networking · CAD
cats: [embedded, robotics]
summary: A Wi-Fi camera you can watch and steer from anywhere in a browser, with secure remote access, several viewers at once and no paid cloud services.
stack: [XIAO ESP32S3 Sense, Raspberry Pi 2, Python, C++, Nginx, Tailscale Funnel, OpenSCAD]
model: pan-tilt.glb
figure: V4 turret, generated from the parametric OpenSCAD source. Base, Uno tray, servos, bracket and camera cradle.
showcase: true
parts:
  - { match: "^XIAO", name: "XIAO ESP32S3 Sense", desc: "Camera, Wi-Fi, servo control" }
  - { match: "^Camera cradle", name: "Camera cradle", desc: "Press-fit onto the tilt servo spline" }
  - { match: "^Tilt servo", name: "SG90 servo, tilt", desc: "Trapped in the bracket window" }
  - { match: "^Pivot pin", name: "Pivot pin", desc: "Twist-lock passive pivot" }
  - { match: "^Rotating bracket", name: "Rotating bracket", desc: "Rides 0.25 mm above the deck" }
  - { match: "^Pan servo", name: "SG90 servo, pan", desc: "Hangs from the deck on its tabs" }
  - { match: "^Base$", name: "Base", desc: "63 × 75 × 40 mm, printed" }
  - { match: "^Arduino", name: "Arduino UNO R4", desc: "5 V supply for the servos" }
  - { match: "^Uno tray", name: "Uno tray", desc: "Hooks in at the front, two snap latches" }
---

## Overview

A compact robotic camera built around the Seeed Studio XIAO ESP32S3 Sense. It streams live video to any browser, from any network, to several people at once, and you can pan and tilt it from the same page. It works without paid cloud services, external APIs or router port forwarding.

## How it works

- **Camera firmware (C++).** The XIAO serves the control page on port 80 and a continuous MJPEG stream on port 81. It corrects the sensor orientation, and the page can be refreshed or reconnected without restarting the camera. HTTP endpoints set the pan and tilt angles.
- **A Raspberry Pi as the front door.** A Pi 2 on Ethernet runs Nginx as a reverse proxy with password authentication. Tailscale Funnel publishes it over HTTPS, so it is reachable from anywhere without opening ports.
- **A multi-viewer relay (Python).** The ESP32 can only feed one stream at a time; a second viewer used to stall the first. The Pi now holds one connection to the camera and fans the JPEG frames out to every browser, so viewers on different networks watch at the same time.
- **Motion.** Two SG90 micro servos form a two-axis turret, driven from the XIAO's D0 (pan) and D1 (tilt) with angle limits. An Arduino Uno in the base supplies the servos' 5 V on a shared ground. Control was prototyped first on the Uno with a Python keyboard controller over PySerial.

## Mechanical design

The turret is a parametric OpenSCAD model in three main printed parts: base, rotating bracket and camera cradle, plus a pivot pin and a tray for the Uno. The servos have no horns or screws, so every joint is a press fit or is trapped by geometry. The CAD was checked with full renders, mesh checks and a collision sweep across the whole pan and tilt range.

## Outcome

Complete and working on the hardware: remote HTTPS streaming, simultaneous viewers across networks, and pan and tilt from the browser.
