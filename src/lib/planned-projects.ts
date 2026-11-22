import type { Project } from "@/lib/projects";

/**
 * Planned builds that are not live yet. They render as "Planned" cards under
 * their category (Hardware / IoT) and follow the same shape as every other
 * project. Once a build ships, move its entry into `localProjects` in
 * `src/lib/projects.ts` so the newsletter picks it up as a new project.
 *
 * Newest `createdAt` first — the projects page lists newest first, so a new
 * entry added at the top of a category appears at the front of its row.
 */
export const plannedProjects: Project[] = [
  // New hardware ideas — commented out until they are ready to show.
  /*
  {
    slug: "home-lab",
    title: "Home Lab",
    description:
      "A small rack for self-hosted services, backups and network testing.",
    category: "hardware",
    stacks: ["Proxmox", "Docker", "Networking"],
    status: "coming-soon",
    createdAt: "2026-11-10",
  },
  {
    slug: "pi-diy-tv",
    title: "Pi DIY TV",
    description:
      "A Raspberry Pi retro TV build in a printed case with a custom front end.",
    category: "hardware",
    stacks: ["Raspberry Pi", "Linux", "3D printing"],
    status: "coming-soon",
    createdAt: "2026-10-20",
  },
  {
    slug: "retro-handheld",
    title: "Retro Handheld",
    description:
      "A Raspberry Pi based handheld emulator with a printed shell and battery pack.",
    category: "hardware",
    stacks: ["Raspberry Pi", "RetroPie", "3D printing"],
    status: "coming-soon",
    createdAt: "2026-09-28",
  },
  */
  {
    slug: "desk-clock",
    title: "Desk Clock",
    description: "An ESP32 desk clock with an e-paper display and a printed case.",
    category: "hardware",
    stacks: ["ESP32", "C++", "3D printing"],
    status: "coming-soon",
    createdAt: "2026-05-12",
  },
  {
    slug: "macro-pad",
    title: "Macro Pad",
    description: "A 12-key macropad with a rotary encoder and hot-swap switches.",
    category: "hardware",
    stacks: ["RP2040", "KiCad", "QMK"],
    status: "coming-soon",
    createdAt: "2026-04-28",
  },
  {
    slug: "plant-waterer",
    title: "Plant Waterer",
    description: "An automatic watering rig that reads soil moisture before pumping.",
    category: "hardware",
    stacks: ["ESP32", "Sensors", "3D printing"],
    status: "coming-soon",
    createdAt: "2026-04-09",
  },
  {
    slug: "pi-nas",
    title: "Pi NAS",
    description: "A Raspberry Pi network drive in a printed case with two bays.",
    category: "hardware",
    stacks: ["Raspberry Pi", "SATA", "Linux"],
    status: "coming-soon",
    createdAt: "2026-03-22",
  },
  {
    slug: "bench-psu",
    title: "Bench PSU",
    description: "A variable bench power supply build with current limiting.",
    category: "hardware",
    stacks: ["KiCad", "Soldering", "Enclosure"],
    status: "coming-soon",
    createdAt: "2026-03-05",
  },
  {
    slug: "keypad-lock",
    title: "Keypad Lock",
    description: "An RFID and keypad door lock with a battery backup.",
    category: "hardware",
    stacks: ["Arduino", "RFID", "KiCad"],
    status: "coming-soon",
    createdAt: "2026-02-14",
  },
  // New IoT ideas — commented out until they are ready to show.
  /*
  {
    slug: "smart-letterbox",
    title: "Smart Letterbox",
    description:
      "A contact sensor and camera that let me know when the post has arrived.",
    category: "iot",
    stacks: ["ESP32", "Sensors", "Home Assistant"],
    status: "coming-soon",
    createdAt: "2026-11-05",
  },
  {
    slug: "water-tank-monitor",
    title: "Water Tank Monitor",
    description:
      "An ultrasonic sensor tracking the water level of an outdoor tank.",
    category: "iot",
    stacks: ["ESP32", "Ultrasonic sensor", "MQTT"],
    status: "coming-soon",
    createdAt: "2026-10-12",
  },
  {
    slug: "pet-feeder",
    title: "Pet Feeder",
    description:
      "A scheduled feeder that confirms each portion actually dropped into the bowl.",
    category: "iot",
    stacks: ["ESP32", "Servo", "Home Assistant"],
    status: "coming-soon",
    createdAt: "2026-09-20",
  },
  */
  {
    slug: "greenhouse-monitor",
    title: "Greenhouse Monitor",
    description: "Soil moisture and temperature readings published over MQTT.",
    category: "iot",
    stacks: ["ESP32", "MQTT", "Home Assistant"],
    status: "coming-soon",
    createdAt: "2026-05-06",
  },
  {
    slug: "bin-day-reminder",
    title: "Bin Day Reminder",
    description: "Checks the council calendar and pings me the night before.",
    category: "iot",
    stacks: ["ESP32", "Home Assistant", "Automation"],
    status: "coming-soon",
    createdAt: "2026-04-17",
  },
  {
    slug: "energy-meter",
    title: "Energy Meter",
    description: "A CT clamp meter streaming household power use to a dashboard.",
    category: "iot",
    stacks: ["ESP32", "MQTT", "Grafana"],
    status: "coming-soon",
    createdAt: "2026-03-30",
  },
  {
    slug: "air-quality-map",
    title: "Air Quality Map",
    description: "Sensor nodes reporting PM2.5 readings onto a local map.",
    category: "iot",
    stacks: ["ESP32", "Sensors", "Next.js"],
    status: "coming-soon",
    createdAt: "2026-03-11",
  },
  {
    slug: "garage-door",
    title: "Garage Door",
    description: "Opens the garage remotely and reports whether it is shut.",
    category: "iot",
    stacks: ["ESP32", "Home Assistant", "Relay"],
    status: "coming-soon",
    createdAt: "2026-02-23",
  },
  {
    slug: "beehive-scale",
    title: "Beehive Scale",
    description: "A load-cell scale that tracks hive weight across the season.",
    category: "iot",
    stacks: ["ESP32", "Load cell", "MQTT"],
    status: "coming-soon",
    createdAt: "2026-02-02",
  },
];
