---
title: ARC — Autonomous Robotic Companion
short: ARC
order: 1
status: In development
discipline: Robotics · Embedded · AI
cats: [robotics, embedded]
summary: A small tracked desk robot that listens, talks back and recognises faces, running every model locally on a Raspberry Pi 5 instead of the cloud.
stack: [M5Stack CoreS3, Raspberry Pi 5, Ollama, Faster-Whisper, Kokoro TTS, TFLite Micro, CadQuery]
model: arc.glb
figure: ARC v0.3.2 robot assembly, generated from the CadQuery source. Exploded along the build script's own offsets.
showcase: true
parts:
  - { match: "^M5Stack CoreS3", name: "M5Stack CoreS3", desc: "Face, touchscreen, mic, speaker, camera" }
  - { match: "^M5Stack M138", name: "M5Stack M138", desc: "Dual motor driver with encoder inputs" }
  - { match: "^M5Stack Bottom3", name: "M5Stack Bottom3", desc: "Battery base, pogo charging contacts" }
  - { match: "^shell$", name: "Shell", desc: "Lift-off upper body, prints without supports" }
  - { match: "^bezel$", name: "Bezel", desc: "Screen surround, captured by the shell" }
  - { match: "^chassis$", name: "Chassis", desc: "Tub carrying the drivetrain and stack" }
  - { match: "track chain$", name: "Track chain", desc: "Rigid printed links on filament pins" }
  - { match: "Pololu", name: "Pololu #5122", desc: "380:1 micro gearmotor with encoder" }
  - { match: "drive sprocket$", name: "Drive sprocket", desc: "Printed, on a printed axle" }
  - { match: "eccentric bushing", name: "Eccentric tensioner", desc: "±3 mm track tension, set from outside", callout: false }
---

## Overview

ARC is a compact, box-shaped companion robot with real tank tracks. An M5Stack CoreS3 forms its face: touchscreen, microphone, speaker and camera. The heavy lifting happens next to it rather than inside it. A Raspberry Pi 5 on the desk runs speech recognition, a local language model and a neural voice, so nothing the robot hears or sees leaves the room.

The project is built in small, tested milestones. Each one has to work on the real hardware before the next begins.

## What works today

- **Hands-free conversation.** An on-chip "Hey Jarvis" wake word runs on the CoreS3 with TensorFlow Lite Micro, alongside tap-to-talk and tap-to-stop.
- **A fully local voice pipeline on the Pi 5.** Faster-Whisper transcribes, Ollama answers and Kokoro speaks in a British "Daniel" voice. Replies stream back in pieces, so the first words play in about 4.5 seconds.
- **Tools the model can call** for local time anywhere, weather forecasts and live web search, with a fast path that answers simple questions without the model.
- **Vision on the Pi.** The CoreS3 camera captures a frame and the Pi runs local face detection, with an indicator and no uploads.
- **Motor bench test.** Both Pololu gearmotors run on the bench through the M5Stack M138 driver, with encoder feedback. A fail-closed safety controller (arming, E-stop, watchdog, loss of command) is written and tested in software.
- **A browser dashboard** served from the Pi over HTTPS for settings and status.

## Mechanical design

The body is parametric CadQuery code, and every dimension lives in one parameter file with a note on its source. Version 0.3.2 is designed to be entirely 3D-printed, with nothing else to buy for the structure:

- A lift-off shell over a chassis tub, split so that neither part has a bridged edge
- A track made of rigid printed links joined by 1.75 mm filament pins
- Printed axles running in printed bores
- An eccentric idler tensioner with ±3 mm of travel
- Plungers for the power and reset buttons
- A docking cradle for the magnetic pogo-contact charger

A check script runs interference, clearance, mass and docking-sweep tests on the assembly, and the build exports five ready-to-slice print plates.

## Next

Driving the robot in its chassis, then autonomous return to the charging dock, then camera questions about objects and scenes. Motion stays locked out in firmware until the physical power cutoff and safety tests pass.
