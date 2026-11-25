export const about = {
  lead: 'I am a senior at Virginia Tech studying Computer Engineering, specialising in Controls, Robotics and Autonomy. I like building things that work in the real world: circuits, microcontrollers, CAD and software brought together into one finished device.',
  body: 'Most of my projects start as a PCB and end as a working machine, from a wave sensor for small boats and a Wi-Fi pan-tilt camera to a tracked robot that talks back. I care about the whole stack: the schematic and layout, the power design, the firmware, the enclosure, and the software that ties it together.'
};

export const spec = [
  ['Program', 'B.S. Computer Engineering'],
  ['University', 'Virginia Tech'],
  ['Specialisation', 'Controls, Robotics & Autonomy'],
  ['Currently', 'TA, ENGE 1215 · Soldering Trainer'],
  ['Building', 'ARC — Autonomous Robotic Companion'],
  ['Location', 'Blacksburg, VA']
];

export const experience = [
  {
    role: 'Teaching Assistant', org: 'ENGE 1215, Virginia Tech', place: 'Blacksburg, VA',
    dates: 'Aug 2026 – Dec 2026', current: true,
    points: [
      'Grade assignments and support students in ENGE 1215, the introductory engineering course.',
      'Guide teams through hands-on builds, debugging code, circuits and hardware alongside them.',
      'Explain programming and circuit concepts so students can solve problems on their own.'
    ]
  },
  {
    role: 'Soldering Trainer', org: 'Virginia Tech', place: 'Blacksburg, VA',
    dates: 'Aug 2026 – Dec 2026', current: true,
    points: [
      'Teach through-hole assembly and soldering technique to groups of four.',
      'Run intermediate surface-mount sessions with 1206 components.',
      'Give one-on-one advanced training in reflow soldering and miniature SMD parts down to 0201.'
    ]
  },
  {
    role: 'Engineering Intern', org: 'WaveLogix', place: 'Chicago, IL',
    dates: 'May 2026 – Aug 2026',
    points: [
      'Worked across embedded systems, PCB design, automation and hardware/software integration for electronics inventory and manufacturing.',
      'Developed and tested a Smart SMD Rack: Raspberry Pi, ESP32 rack controllers, BLE, barcode workflows, Python and addressable LED indicators.',
      'Designed modular NeoPixel PCB modules, including connector pinouts, power distribution and KiCad layout.',
      'Wrote and debugged ESP32 firmware for BLE command handling, LED and cart-light control, and multi-rack communication.',
      'Produced technical documentation, organised BOMs and kept test records for internal engineering.'
    ]
  },
  {
    role: 'Project Coordinator', org: 'Krishna Defence and Allied Industries Ltd', place: 'Mumbai',
    dates: 'Dec 2024 – Aug 2025',
    points: [
      'Led a collaboration with two engineering colleges, VJTI and VESIT, to develop a smart forklift for warehouse management.',
      'Coordinated cross-functional teams and gave technical direction across the project lifecycle.',
      'Integrated Ultra-Wideband (UWB) ranging and ArUco markers for precise indoor positioning and tracking.',
      'Turned academic research into a practical logistics-automation product.'
    ]
  },
  {
    role: 'Project Manager', org: 'Krishna Defence and Allied Industries Ltd', place: 'Mumbai',
    dates: 'May 2024 – Aug 2024',
    points: [
      'Developed snow tuggers, footwear attachments that spread a soldier’s weight so boots do not sink into snow.',
      'Optimised the design for performance and durability using extrusion and plastics manufacturing.',
      'Validated the design with the testing team in simulated field conditions.'
    ]
  },
  {
    role: 'Embedded Systems Engineer', org: 'Krishna Defence and Allied Industries Ltd', place: 'Mumbai',
    dates: 'May 2023 – Aug 2023',
    points: [
      'Co-developed a fan power circuit that runs from solar, AC or an 8-hour battery, prioritising solar.',
      'Helped manufacture the enclosure for the battery, circuit and an external safety fuse.',
      'Modelled the enclosure in SolidWorks.'
    ]
  },
  {
    role: 'Summer Trainee', org: 'Reliance Retail', place: 'Mumbai',
    dates: 'Jun 2022 – Aug 2023',
    points: [
      'Worked on TRUUTH, a home medication delivery service.',
      'Researched the market to define the target audience.',
      'Planned outreach to reach potential users.'
    ]
  },
  {
    role: 'Project Head', org: 'Automation Anywhere', place: 'Remote',
    dates: 'Apr 2022 – Jul 2023',
    points: [
      'Built automation bots that improve the clarity of scanned invoices and receipts.',
      'Led troubleshooting to clear project delays and improve performance.'
    ]
  },
  {
    role: 'Student Intern', org: 'White Gold Technologies LLP', place: 'Mumbai',
    dates: 'Mar 2021 – Aug 2021',
    points: [
      'Assembled the patented Robotic Milk Collection Unit.',
      'Helped design and build new circuits.'
    ]
  }
];

export const education = [
  {
    school: 'Virginia Polytechnic Institute and State University', place: 'Blacksburg, VA',
    degree: 'B.S. Computer Engineering', dates: 'Aug 2021 – Present',
    notes: ['Senior', 'Specialisation in Controls, Robotics and Autonomy']
  },
  {
    school: 'Jai Hind College', place: 'Mumbai',
    degree: 'Associate of Science, Electronics Technology', dates: 'Jul 2019 – Mar 2021',
    notes: ['Graduated with 90%']
  },
  {
    school: 'St. Mary’s School (ICSE)', place: 'Mumbai',
    degree: 'High School Diploma', dates: 'Jun 2009 – May 2019',
    notes: ['Graduated with 92%', 'Technical Drawing Application Merit']
  }
];

export const skills = [
  ['Electronics', 5], ['Embedded Systems', 5], ['Circuit Design', 5], ['PCB Design', 5],
  ['SolidWorks / CAD', 5], ['Robotics', 5], ['KiCad / EasyEDA', 4], ['ESP32 / Arduino', 4],
  ['Raspberry Pi', 4], ['C / C++', 4], ['Python', 4], ['MATLAB', 4],
  ['Hardware Debugging', 4], ['AI / Machine Learning', 3]
] as const;

export const toolchain = 'KiCad, EasyEDA, SolidWorks, OpenSCAD, CadQuery, LTspice, Analog Discovery 2, Code Composer Studio, Arduino IDE, Python, Flask, Nginx, Tailscale, Ollama, ESP32-S3, ESP32-C3, Raspberry Pi, MSP432, ATtiny85, BLE, LoRa.';

export const certs = [
  ['Digital Marketing', 'Google Garage'],
  ['Machine Learning', 'Google Garage'],
  ['SolidWorks', 'LinkedIn Learning']
];

export const contact = {
  email: 'krish0728@vt.edu',
  phone: '+1 804 994 1097',
  tel: '+18049941097',
  linkedin: 'https://www.linkedin.com/in/krish-shah-4622771a9/',
  linkedinLabel: 'in/krish-shah-4622771a9',
  github: 'https://github.com/krish0728vt',
  location: 'Blacksburg, VA'
};
