---
title: Wave Measurement Instrument
short: WMI
order: 2
status: Completed
discipline: Embedded · PCB · RF
cats: [embedded, pcb]
summary: A compact, low-power instrument that rides on a small boat, measures how the waves move it, and radios heave and wave frequency to a shore station in near real time. My senior design project, sponsored by MITRE.
stack: [M5Stack AtomS3 (ESP32-S3), IMU at 100 Hz, LoRa 915 MHz, Raspberry Pi 5, Mahony AHRS, Kalman filter, FFT, KiCad]
model: wmi.glb
figure: MDE54F6 main board, from the KiCad STEP export. Isometric, hidden lines dashed.
dims: true
showcase: true
video:
  src: video/wmi-expo.mp4
  poster: images/wmi/pool-test.jpg
  caption: Pool test, live sensor-to-GUI
gallery:
  - { src: images/wmi/pool-test.jpg, caption: Pool test on the 1.5 m hull, with the live heave GUI }
  - { src: images/wmi/pcb.jpg, caption: Assembled board with the AtomS3 and E22 LoRa module }
  - { src: images/wmi/enclosure.jpg, caption: IP68 polycarbonate enclosure and mounting plate }
  - { src: images/wmi/hull.jpg, caption: 1.5 m modular test hull, printed in sections }
  - { src: images/wmi/frequency-vv.jpg, caption: Frequency estimator verification on simulated waves }
parts:
  - { match: "^ATOMS3", name: "M5Stack AtomS3", desc: "ESP32-S3 controller with onboard IMU" }
  - { match: "^E22-900T22S", name: "EBYTE E22-900T22S", desc: "LoRa 915 MHz telemetry module" }
  - { match: "^MAX17048", name: "MAX17048", desc: "LiPo fuel gauge over I²C" }
  - { match: "^TPS63030", name: "TPS63030", desc: "Buck-boost converter, 5 V rail" }
  - { match: "^IND_LQH3N", name: "Murata LQH3N", desc: "Power inductor" }
  - { match: "^OS102011", name: "OS102011MA1QN1", desc: "Slide power switch" }
  - { match: "^JST_PH", name: "JST PH, 2-pin", desc: "1-cell LiPo connector" }
  - { match: "PCB$", name: "MDE54F6 PCB", desc: "104.75 × 79.30 mm, 1.5 mm FR-4" }
  - { match: "^(C_0603|C_1210)", name: "C 0603 / 1210", desc: "Ceramic capacitors", callout: false }
  - { match: "^(R_0603|SOT-23-5)", name: "R 0603, AP2112K", desc: "Resistors and 3.3 V regulator", callout: false }
---

## Overview

Small unmanned surface vessels need to know what the sea is doing to operate safely, but traditional wave measurement systems are bulky, expensive and power-hungry. The Wave Measurement Instrument (WMI) is our answer: a low size, weight, power and cost package that sits on the boat, works out its heave (vertical motion) and the dominant wave frequency, and streams both to shore. It was built by team F26-09 at Virginia Tech, sponsored by MITRE.

## Design targets

- Heave and dominant frequency within ±10–15% of a reference.
- Stable 5 V and 3.3 V rails and at least 8 hours of operation.
- At least 100 m of radio range with 95% or better packet success.
- A sealed enclosure that survives temporary immersion.
- A near-real-time operator display with controls and CSV logging.

## How it works

- **Sensing.** An M5Stack AtomS3 (ESP32-S3) samples its gyroscope and accelerometer at 100 Hz.
- **Power.** A custom PCB takes a 1-cell LiPo through a slide switch. A TPS63030 buck-boost makes the 5 V rail, an AP2112K regulator makes 3.3 V, and a MAX17048 reports battery level over I²C.
- **Telemetry.** EBYTE E22-900T22S LoRa modules at 915 MHz link the boat and the shore. Each 132-byte frame carries a device ID, sequence counter, status flags, timestamp, ten IMU samples, battery level and a CRC.
- **Wave estimation.** On a Raspberry Pi 5, a Mahony AHRS corrects attitude, a Kalman filter turns acceleration into heave, and a Hann-windowed FFT finds the dominant frequency.
- **Packaging.** An RF-friendly IP68 polycarbonate enclosure, 4.5 × 3.5 × 2.2 in, on a modular mount. For testing we printed a 1.5 m modular hull in sections that fit a standard printer bed.

## Testing

Every subsystem was tested on its own first. The enclosure passed fit and sealing checks, both rails held steady, the LoRa link lost one packet over 200 m, and the estimators and GUI were validated on simulated data. The full system then ran sensor-to-GUI on the hull in a pool.

Against MITRE's reference across 21 wave-tank tests, the estimator came in at a mean absolute error of 6.35 cm for heave and 0.116 Hz for frequency. The whole system cost about $415, most of it the Raspberry Pi 5.

## What we fixed along the way

- **Unstable power rail.** The inductor sat too far from the switching loop. Moving it closer and tightening the power routing fixed it.
- **Shorted capacitors.** The 47 µF parts in 0603 caused shorts, so that one value moved to a 1210 package.
- **IMU drift.** A sensor offset skewed the estimates. Calibrating with M5Stack's procedure cut the drift sharply.

## Next steps

Fold the work into a larger ROS stack, compare it with BBN's newer Ornstein-Uhlenbeck estimator, and integrate the heave sensing into a full USV.
