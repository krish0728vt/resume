# Krish Ankur Shah

<p align="center">
  <a href="#about-me">About</a> • 
  <a href="#work-experience">Experience</a> • 
  <a href="#education">Education</a> • 
  <a href="#projects">Projects</a> • 
  <a href="#skills">Skills</a> • 
  <a href="#certifications--online-courses">Certifications</a> • 
  <a href="#contact">Contact</a>
</p>

## Welcome to My Personal Webpage

Electrical Engineer | Robotics Enthusiast

## 👋 About Me

I am a Senior at Virginia Tech studying Electrical Engineering and seeking to explore options in Robotics, Artificial Intelligence, and Machine Learning. I have a keen interest in building and designing circuits.

## 💼 Work Experience

### Project Coordinator at Krishna Defence and Allied Industries Limited, Mumbai

December 2024 – August 2025  

- Led a collaboration between Krishna Defence and two engineering colleges (VJTI and VESIT) on a project to develop a smart forklift for warehouse management.
- Coordinated cross-functional teams and provided technical guidance throughout the project lifecycle.
- Focused on integrating UWB (Ultra-Wideband) technology and ArUco markers for precise indoor positioning and tracking within the warehouse.
- Helped align academic innovation with real-world industrial applications in logistics automation.

### Project Manager at Krishna Defence and Allied Industries Limited, Mumbai

May 2024 – August 2024  

- Contributed to the development of a product called snow tuggers, designed to assist soldiers in walking on snowy terrain.
- These attachments increase the surface area of a soldier’s footwear, preventing it from sinking into snow and improving mobility.
- Focused on optimizing the design for performance and durability using extrusion and plastics manufacturing techniques.
- Collaborated with the product testing team to validate the design in simulated field environments.

### Engineer Embedded Systems at Krishna Defence and Allied Industries Limited, Mumbai

May 2023 – August 2023  

- Collaborated in the development of a circuit that powers a fan with Solar/AC/8-hour battery, prioritizing green energy.
- Assisted in manufacturing the enclosure housing the battery, circuit, and an external fuse for safety.
- Contributed to the design of CAD files for the enclosure using SolidWorks.

### Summer Trainee at RELIANCE RETAIL, Mumbai

June 2022 – August 2023  

- Collaborated on the development of "TRUUTH", a home medication delivery solution.
- Conducted market research to identify the target audience.
- Planned outreach strategies to reach potential users.

### Project Head at Automation Anywhere, Virtual

April 2022 – July 2023  

- Developed bots to enhance clarity in scanned invoices and receipts.
- Led troubleshooting efforts to resolve project delays and streamline performance.

### Student Intern at White Gold Technologies LLP, Mumbai

March 2021 – August 2021  

- Assisted in assembling a patented product called Robotic Milk Collection Unit.
- Assisted the team in making new circuits.

## 🎓 Education

### Virginia Polytechnic Institute and State University, Blacksburg

B.S in Electrical Engineering  

August 2021 – Present  

- Senior studying Electrical Engineering  
- Specialization in Controls Robotics and Autonomy  

### Jai Hind College, Mumbai

Associate of Science in Electronics Technology  

July 2019 – March 2021  

- Graduated with 90%

### St. Mary's School (ISCE), Mumbai

High School Diploma  

June 2009 – May 2019  

- Graduated with 92%  
- Awarded Technical Drawing Application Merit  

## 🧪 Projects

- 🎮 Embedded Game Suite on MSP432 & BOOSTXL-EDUMKII  
- 🔬 ECG Heart Monitor System  
- 🎧 Home Audio System Project  
- 🚁 Pattern Flying Drone  
- 💡 LED Pattern Circuit  
- ☕ Heated Cup Holder  
- 🔥 Fire Alarm System Using IC555  
- 🚗 Obstacle Avoidance Car Using IC  

---

### 🎮 Embedded Game Suite on MSP432 & BOOSTXL-EDUMKII

*Four mini-games on MSP432 using joystick, LCD graphics, timers, and non-blocking state machines on bare-metal C.*

**Description:**

A collection of four embedded games built on the MSP432 LaunchPad with the BOOSTXL-EDUMKII BoosterPack. All games share the same hardware platform – joystick, buttons, LEDs, buzzer, and 128×128 LCD – and are implemented in C using Code Composer Studio with a non-blocking main loop and timer-based events.

**Dinosaur Runner Game:**  
A hardware version of the classic browser dinosaur runner. The player uses buttons or the joystick to jump over obstacles drawn on the LCD while the score increases over time. Obstacle spawning and speed are driven by periodic timers so the gameplay stays smooth and responsive without blocking delays.

**Touhou Bullet-Hell Game:**  
A top-down bullet-hell game where a player-controlled square dodges patterned bullet waves from an enemy at the top of the screen. The joystick controls movement, while helper functions generate different bullet patterns. Player and enemy health, score, and high scores are tracked to make it feel like a compact arcade game on a microcontroller.

**Cookie Clicker Idle Game:**  
A microcontroller port of Cookie Clicker where tapping the joystick button earns cookies that can be spent on buildings like Cursor, Grandma, and Bakery to increase cookies-per-second. The LCD layout shows total cookies, CPS, buildings, and upgrades. Navigation is handled with the joystick, and upgrades such as stronger taps and random GOLD! events add depth while running in a fast, non-blocking update loop.

**Reaction Time Tester:**  
A reaction-time game that measures how quickly the player responds to an LED cue. After a random delay, an LED turns on and a hardware timer measures the time until the button is pressed. The LCD displays the reaction time for each trial and the running average, highlighting precise timing and input handling on the same platform.

---

### 🔬 ECG Heart Monitor System

*A breadboarded analog ECG front-end using an instrumentation amplifier, active filters, and a 60 Hz notch, validated on real ECG signals.*

**Description:**

A complete analog ECG front-end built on a breadboard, starting from electrode signals on the body and ending with a clean, amplified ECG waveform on the oscilloscope. The system uses an instrumentation amplifier followed by active filters and a precision 60 Hz notch stage to extract the heart signal while suppressing noise and mains interference.

**Goals:**

- Design and build a safe, working ECG acquisition chain from discrete analog blocks.  
- Achieve high differential gain for small ECG signals while keeping common-mode noise very low.  
- Remove 60 Hz power-line interference without damaging important ECG frequency content.  
- Validate the final system using real ECG measurements from my own body.  

**Technologies Used:**

- Instrumentation Amplifier: Three-op-amp IA stage providing high differential gain with low common-mode gain.  
- Bandpass and Low-Pass Filters: Active RC filters to isolate the ECG band and remove high-frequency noise.  
- Active Notch Filter: Precision 60 Hz notch filter designed for deep attenuation at the mains frequency.  
- Analog Discovery 2: Used for Bode plots, oscilloscope viewing, and spectrum analysis of the ECG signal.  
- Disposable ECG Electrodes: Safely coupled to the circuit through large series resistors and shielded cabling.  

**Features:**

- High overall gain from microvolt-level electrode signals to a few volts peak-to-peak at the output.  
- Strong rejection of common-mode noise picked up equally on all electrodes.  
- Deep 60 Hz notch with minimal impact on nearby ECG frequency components.  
- Clear time-domain ECG waveform showing P-QRS-T complexes and a clean spectrum up to about 100 Hz.  

**Challenges:**

- Choosing and matching resistor and capacitor values tightly enough for the notch filter to sit exactly at 60 Hz.  
- Managing breadboard wiring and component tolerances across multiple stages without oscillation or instability.  
- Reducing motion artifacts and muscle noise during real ECG measurements.  

**Outcome:**

The final system produced a stable, high-quality ECG waveform with strong suppression of mains interference and other noise. Building the project step-by-step (instrumentation amplifier, filters, notch, and full chain) provided hands-on experience in biomedical front-end design, analog filtering, and practical measurement techniques for low-level physiological signals.

---

### 🎧 Home Audio System Project

*Graphic equalizer + class-D amplifier + OLED spectrogram combining analog filters, PWM, and real-time audio visualization.*

**Description:**

An integrated audio platform combining a graphic equalizer, class-D amplifier, and OLED spectrogram display. The system processes audio input, enhances user control over sound frequencies, and visualizes real-time signal levels.

**Goals:**

- Develop an end-to-end audio processing system with adjustable frequency bands and high-efficiency amplification.  
- Integrate real-time visualization via OLED for enhanced user experience.  
- Apply analog/digital circuit design, signal processing, and microcontroller programming in one unified platform.  

**Technologies Used:**

- Graphic Equalizer: 2-stage RC bandpass filters for bass (60–500 Hz), mid (600 Hz–3 kHz), and treble (3–6 kHz).  
- Class-D Amplifier: PWM modulator with triangle and comparator circuit; RLC low-pass output filter.  
- OLED Display: Arduino-driven spectrogram displaying intensity of each frequency band in real-time.  
- LTspice: Simulation of filters, amplifier stages, and waveform validation.  
- Analog Discovery 2: Hardware-level frequency and distortion testing.  

**Features:**

- Adjustable gain control for bass, mid, and treble using potentiometers.  
- High-efficiency class-D amplification using NMOS/PMOS switching and RLC filtering.  
- OLED spectrogram updates regularly, reflecting live frequency intensity data.  
- Intuitive hardware and UI design including welcome screen and dynamic bar graph rendering.  

**Challenges:**

- Signal noise from Arduino mitigated via averaging and thresholding techniques.  
- Initial PWM switching overlap fixed by adding dead-time between transistor transitions.  
- Ripple voltage at amplifier output reduced through RLC component recalibration.  

**Outcome:**

The system was successfully validated via oscilloscope and spectrum analysis tools, showing low harmonic distortion and accurate band separation. The project demonstrated efficient subsystem integration, engineering design maturity, and user-centric audio visualization. It provides a solid base for future extensions including Bluetooth streaming and advanced frequency analysis.

---

### 🚁 Pattern Flying Drone

*A drone programmed to fly a scripted pattern that spells out “ECE 2544” using GPS/IMU-based navigation.*

**Description:**

The Pattern Flying Drone is a project where a drone is programmed to fly in a specific pattern. Using flight programming, the drone was made to fly in the pattern spelling out "ECE 2544," representing the class number for which the project was undertaken.

**Goals:**

- Develop a drone capable of flying in a pre-defined pattern.  
- Enhance skills in programming and controlling drones.  
- Demonstrate the practical application of drones in creating specific flight paths.  

**Technologies Used:**

- Drone: Equipped with the necessary hardware for flight and control.  
- Flight Programming Language / FPL: Used to script the drone's flight pattern.  
- GPS and IMU Sensors: For precise navigation and stability during flight.  
- Remote Control System: For manual overrides and adjustments.  

**Features:**

- Pattern Flight: Programmed to fly in the pattern spelling "ECE 2544."  
- Autonomous Navigation: Follows the programmed flight path autonomously.  
- Precision Control: Utilizes GPS and IMU sensors for accurate navigation.  
- Customizable Patterns: The flight pattern can be modified for different applications.  

**Challenges:**

- Pattern Accuracy: Ensuring the drone accurately follows the pattern without deviations.  
- Sensor Integration: Integrating GPS and IMU sensors for stable and precise flight.  
- Code Optimization: Writing efficient code to control the drone's movements smoothly.  
- Environmental Factors: Managing external factors like wind and obstacles that could affect flight.  

**Outcome:**

The project successfully created a drone that could fly in the specific pattern of "ECE 2544." This demonstrated the ability to program drones for precise and complex flight paths, providing valuable experience in drone technology and flight programming.

---

### 💡 LED Pattern Circuit

*A simple Arduino-based LED sequence project to explore digital outputs, timing, and pattern design.*

**Description:**

The LED Pattern Circuit is a project designed to control LEDs to light up in a specific pattern using an Arduino. The circuit was built on a breadboard, and the Arduino was programmed to sequence the LEDs in the desired pattern.

**Goals:**

- Create a visually appealing LED pattern using simple components.  
- Enhance skills in circuit design and programming with Arduino.  
- Understand the basics of controlling multiple outputs in a sequential manner.  

**Technologies Used:**

- Arduino: The main controller for the LED sequence.  
- LEDs: For visual output, connected in a pattern on the breadboard.  
- Breadboard and Resistors: For quick prototyping and current limiting.  

**Features & Outcome:**

- Custom LED patterns and sequences.  
- Easy-to-modify breadboard layout for experimenting with different designs.  
- Served as an introductory platform for combining basic electronics with embedded programming.

---

### ☕ Heated Cup Holder

*An Arduino-controlled heated cup that maintains beverage temperature using a temperature sensor and copper coil.*

**Description (short):**

A practical project designed to keep beverages warm by wrapping a copper coil around a steel cup and controlling it with an Arduino and a temperature sensor.

- **Goal:** Maintain a drink at a comfortable temperature using simple, safe heating control.  
- **Tech:** Arduino, temperature sensor, copper heating coil, steel cup, low-voltage power supply.  
- **Outcome:** Working prototype that automatically heats when the cup cools below a threshold, giving hands-on experience with temperature regulation and basic control logic.

---

### 🔥 Fire Alarm System Using IC555

*A basic smoke/heat-triggered alarm using an IC555 timer and a thermistor, built as an early circuit design project.*

- **Goal:** Build a low-cost fire alarm that triggers a buzzer when smoke/heat crosses a set threshold.  
- **Tech:** IC555 timer, thermistor, buzzer, resistors/capacitors, simple DC power supply.  
- **Outcome:** Reliable prototype that responds to smoke/temperature changes and introduced me to practical timer circuits and sensor interfacing.

---

### 🚗 Obstacle Avoidance Car Using IC

*A small autonomous car that senses obstacles and changes direction using IC logic and ultrasonic sensors.*

- **Goal:** Develop a car that can detect obstacles, stop, and steer around them without manual control.  
- **Tech:** IC555-based timing/control logic, ultrasonic distance sensors, L293D motor driver, DC motors and chassis.  
- **Outcome:** Working obstacle-avoiding robot that strengthened my understanding of sensor integration, motor control, and basic autonomous behavior using simple ICs.

---

## ⚙️ Skills

- ★★★★★ Electronics  
- ★★★★★ Robotics  
- ★★★★★ Circuit Design  
- ★★★★★ Technical Drawing  
- ★★★★★ SolidWorks (CAD)  
- ★★★★★ Sheet Metal  
- ★★★★★ Laser Cutting  
- ★★★★☆ C++  
- ★★★☆☆ Artificial Intelligence  
- ★★★☆☆ Raspberry Pi  
- ★★★☆☆ Machine Learning  
- ★★★☆☆ Arduino  

## Certifications & Online Courses

- Digital Marketing – Google Garage  
- Machine Learning – Google Garage  
- SolidWorks Course – LinkedIn Learning  

## 📫 Contact

Email: krish0728@vt.edu  

Phone: +1 8049941097  

LinkedIn: https://www.linkedin.com/in/krishshah  

Location: Blacksburg, VA  

Krish Ankur Shah © 2025
