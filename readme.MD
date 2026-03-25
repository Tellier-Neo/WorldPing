# WorldPing 🌍

> A lightweight Node.js background service that delivers scheduled desktop notifications for financial markets, world news, and more — straight to your Windows taskbar.

<br>

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Electron Ready](https://img.shields.io/badge/Tray-Ready-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-Custom%20Open%20Source-blue?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square&logo=windows&logoColor=white)

---

## What is WorldPing?

WorldPing is a minimal Node.js service that runs silently in the background and pushes **Windows desktop notifications** at regular intervals with data that matters to you — financial markets, world news, weather, and cybersecurity alerts.

No browser. No dashboard to open. No manual refresh.
Just run it once and let it ping you when something happens.

---

## How it works

```
┌─────────────────────────────────────────────────────┐
│                    WorldPing                        │
│                                                     │
│  ┌──────────┐   ┌──────────┐   ┌─────────────────┐ │
│  │ Finance  │   │  News    │   │  (coming soon)  │ │
│  │yahoo-fin.│   │ BBC RSS  │   │  Weather/Cyber  │ │
│  └────┬─────┘   └────┬─────┘   └────────┬────────┘ │
│       └──────────────┴──────────────────┘           │
│                       │                             │
│              gatherAllData()                        │
│                       │                             │
│              displayAllData()                       │
│                       │                             │
│         Windows Desktop Notification                │
└─────────────────────────────────────────────────────┘

Repeats every hour automatically via setInterval()
```

On startup, WorldPing immediately fetches all data sources and sends notifications. It then repeats the cycle every hour automatically. A GUID system prevents the same news article from being pushed twice.

---

## Features — v1.0.0

### 📈 Financial Markets
Real-time prices fetched via `yahoo-finance2` in a single API call:

| Asset | Ticker |
|---|---|
| Brent Crude Oil | `BZ=F` |
| Bitcoin | `BTC-USD` |
| Ethereum | `ETH-USD` |
| CAC 40 | `^FCHI` |
| NASDAQ Composite | `^IXIC` |
| Gold (XAU/USD) | `GC=F` |

### 🌍 World News
- Latest breaking news from **BBC World** via RSS feed
- Duplicate detection via GUID — the same article is never pushed twice
- Notifications include headline and publication date

---

## Roadmap

| Feature | Status |
|---|---|
| Financial markets (6 assets) | ✅ v1.0.0 |
| BBC World News (RSS) | ✅ v1.0.0 |
| Weather alerts (Open-Meteo) | 🔜 v1.1.0 |
| Cybersecurity alerts (CISA + The Hacker News) | 🔜 v1.1.0 |
| System tray icon (start / stop / quit) | 🔜 v1.2.0 |
| Configurable intervals | 🔜 v1.2.0 |
| Config file (tickers, city, RSS urls) | 🔜 v1.2.0 |

---

## Requirements

- [Node.js](https://nodejs.org/) v18 or higher
- Windows 10 / 11
- An active internet connection

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Tellier-Neo/worldping.git
cd worldping

# Install dependencies
npm install
```

---

## Usage

```bash
# Start the service
node index.js
```

WorldPing will immediately fetch all data and send your first notifications.
It will then refresh automatically every hour.

To stop the service, press `Ctrl+C` in the terminal.

---

## Dependencies

| Package | Purpose |
|---|---|
| [`yahoo-finance2`](https://github.com/gadicc/node-yahoo-finance2) | Financial market prices |
| [`rss-parser`](https://github.com/rbren/rss-parser) | RSS feed parsing (news) |
| [`node-notifier`](https://github.com/mikaelbr/node-notifier) | Windows desktop notifications |

---

## Project Structure

```
worldping/
├── index.js          # Main entry point — orchestration & intervals
├── worldping.ico     # Notification icon
├── package.json
└── README.md
```

---

## License

Copyright (c) 2026 **[Tellier-Neo](https://github.com/Tellier-Neo)**

Permission is hereby granted to any person obtaining a copy of this software to use, modify, and redistribute it **free of charge**, subject to the following conditions:

- **Attribution required** — Any redistribution or derivative work, in source or binary form, must visibly credit the original author:
  > *Based on [WorldPing](https://github.com/Tellier-Neo/worldping) by [Tellier-Neo](https://github.com/Tellier-Neo)*
- **Non-commercial** — This software and any derivative may not be sold or included in a paid product without explicit written permission from the original author.
- **This license notice** must be included in all copies or substantial portions of the software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
THE AUTHOR SHALL NOT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY ARISING FROM THE USE OF THIS SOFTWARE.