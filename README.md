# tuyendungJd

![GitHub stars](https://img.shields.io/github/stars/Ming3210/tuyendungJd?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/Ming3210/tuyendungJd?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/Ming3210/tuyendungJd?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/Ming3210/tuyendungJd?style=for-the-badge&logo=github) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Java (Gradle)](https://img.shields.io/badge/Java%20(Gradle)-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📑 Table of Contents
 <h1>Admin acc: admin@gmail.com</h1>
 <h1>Partner acc: em@gmail.com</h1>
 <h1>Partner acc: phuong@gmail.com</h1>
 <h1>Partner acc: phuc@gmail.com</h1>
 <h1>Pass: 123456</h1>
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Key Dependencies](#key-dependencies)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 📝 Description

tuyendungJd — a frontend web app built with Docker, Java (Gradle), React, Tailwind CSS, TypeScript, Vite.

## 🛠️ Tech Stack

- 🐳 **Docker**
- ☕ **Java (Gradle)**
- ⚛️ **React**
- 🌬️ **Tailwind CSS**
- 📘 **TypeScript**
- ⚡ **Vite**

**Notable libraries:** Framer Motion, Redux

## ⚡ Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/Ming3210/tuyendungJd.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

## 📦 Key Dependencies

```
@stomp/stompjs: ^7.3.0
framer-motion: ^12.38.0
nprogress: ^0.2.0
react: ^19.2.5
react-dom: ^19.2.5
sockjs-client: ^1.6.1
```

## 🚀 Available Scripts

- **dev** — `npm run dev`
- **build** — `npm run build`
- **preview** — `npm run preview`

## 📁 Project Structure

```
.
├── backend
│   ├── Dockerfile
│   ├── build.gradle
│   ├── gradle
│   │   └── wrapper
│   │       ├── gradle-wrapper.jar
│   │       └── gradle-wrapper.properties
│   ├── gradle.properties
│   ├── gradlew.bat
│   ├── settings.gradle
│   └── src
│       └── main
│           ├── java
│           │   └── com
│           │       └── ...
│           └── resources
│               ├── application.properties
│               ├── data.sql
│               └── data_master.sql
├── docker-compose.yml
└── frontend-react
    ├── Dockerfile
    ├── admin.html
    ├── index.html
    ├── nginx.conf
    ├── package.json
    ├── public
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src
    │   ├── AdminApp.tsx
    │   ├── App.tsx
    │   ├── admin
    │   │   └── layouts
    │   │       └── AdminLayout.tsx
    │   ├── admin.tsx
    │   ├── assets
    │   │   ├── 1.png
    │   │   ├── banner
    │   │   │   ├── banner_img.svg
    │   │   │   ├── decor1.svg
    │   │   │   ├── decor2.svg
    │   │   │   ├── decor3.svg
    │   │   │   └── decor4.svg
    │   │   ├── base.css
    │   │   ├── decor.svg
    │   │   ├── decorJob.svg
    │   │   ├── desktop.ini
    │   │   ├── enterprise_discovery_hero.png
    │   │   ├── error
    │   │   │   ├── 403.png
    │   │   │   └── 404.png
    │   │   ├── font
    │   │   │   └── font.css
    │   │   ├── hero.png
    │   │   ├── icons
    │   │   │   ├── Featured icon1.png
    │   │   │   ├── Featured icon2.png
    │   │   │   ├── Featured icon3.png
    │   │   │   ├── Featured icon4.png
    │   │   │   ├── building.png
    │   │   │   ├── calendar.png
    │   │   │   ├── document.png
    │   │   │   ├── facebook.png
    │   │   │   ├── icon 1.png
    │   │   │   ├── lock.png
    │   │   │   ├── note.png
    │   │   │   ├── personal-card.png
    │   │   │   ├── trash.png
    │   │   │   └── youtube.png
    │   │   ├── img
    │   │   │   ├── Logo2.png
    │   │   │   ├── VN.png
    │   │   │   ├── us.svg
    │   │   │   └── vn.svg
    │   │   ├── jobs.svg
    │   │   ├── logo.svg
    │   │   ├── main.css
    │   │   ├── rikkei.svg
    │   │   ├── rk
    │   │   │   ├── dc.svg
    │   │   │   └── rk.svg
    │   │   ├── typescript.svg
    │   │   └── vite.svg
    │   ├── components
    │   │   ├── Banner.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   ├── HotCandidate.tsx
    │   │   ├── HotEnterprise.tsx
    │   │   ├── HotJob.tsx
    │   │   ├── JobFilterSidebar.tsx
    │   │   ├── JobSearchBar.tsx
    │   │   ├── OutstandingNumbers.tsx
    │   │   ├── common
    │   │   │   ├── DisclaimerModal.tsx
    │   │   │   ├── PageLoader.tsx
    │   │   │   └── ScrollToTop.tsx
    │   │   ├── enterprise
    │   │   │   ├── RecruitmentPipelineModal.tsx
    │   │   │   └── RegisterEnterpriseModal.tsx
    │   │   ├── errors
    │   │   │   ├── Error403.tsx
    │   │   │   └── Error404.tsx
    │   │   └── jobs
    │   │       └── ApplyJobModal.tsx
    │   ├── hooks
    │   │   └── useWebSocket.tsx
    │   ├── index.css
    │   ├── layouts
    │   │   └── MainLayout.tsx
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── admin
    │   │   │   ├── AdminCertificates.tsx
    │   │   │   ├── AdminCvs.tsx
    │   │   │   ├── AdminEnterprises.tsx
    │   │   │   ├── AdminInterviews.tsx
    │   │   │   ├── AdminJobs.tsx
    │   │   │   ├── AdminLanguages.tsx
    │   │   │   └── AdminUsers.tsx
    │   │   ├── client
    │   │   │   ├── auth
    │   │   │   │   └── ...
    │   │   │   ├── candidates
    │   │   │   │   └── ...
    │   │   │   ├── enterprise
    │   │   │   │   └── ...
    │   │   │   ├── home
    │   │   │   │   └── ...
    │   │   │   ├── jobs
    │   │   │   │   └── ...
    │   │   │   ├── misc
    │   │   │   │   └── ...
    │   │   │   └── user
    │   │   │       └── ...
    │   │   └── enterprise
    │   │       ├── ApplicantsModal.tsx
    │   │       ├── EnterpriseDetail.tsx
    │   │       ├── EnterpriseInterviewManager.tsx
    │   │       ├── EnterpriseJobManager.tsx
    │   │       └── EnterpriseLayout.tsx
    │   ├── services
    │   │   └── api.ts
    │   ├── store
    │   │   ├── hooks.ts
    │   │   ├── slices
    │   │   │   ├── authSlice.ts
    │   │   │   ├── candidateSlice.ts
    │   │   │   ├── certificateTypeSlice.ts
    │   │   │   ├── cvLanguageSlice.ts
    │   │   │   ├── enterpriseSlice.ts
    │   │   │   ├── followSlice.ts
    │   │   │   ├── interviewBookingSlice.ts
    │   │   │   ├── jobSlice.ts
    │   │   │   ├── notificationSlice.ts
    │   │   │   ├── provinceSlice.ts
    │   │   │   ├── userSlice.ts
    │   │   │   └── vipSlice.ts
    │   │   └── store.ts
    │   ├── style.css
    │   └── utils
    │       └── fileUtils.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## 🛠️ Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

### Docker
1. `docker build -t my-app .`
2. `docker run -p 3000:3000 my-app`

## 🚢 Deployment

### Docker
```bash
docker build -t tuyendungjd .
docker run -p 3000:3000 tuyendungjd
```

### Docker Compose
```bash
docker compose up -d
```

> ⚙️ CI/CD is configured via GitHub Actions (see `.github/workflows/`).

## 👥 Contributing

Contributions are welcome! Here's the standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/Ming3210/tuyendungJd.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m 'feat: add some feature'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request

Please follow the existing code style and include tests for new behavior where applicable.

---
*This README was generated with ❤️ by [ReadmeBuddy](https://readmebuddy.com)*
