# Sales Tracking SaaS Frontend

This project is a SaaS frontend built for workspace-based sales performance tracking.  
The goal is not just collecting data, but turning sales, refunds, and target data into clear daily and weekly decisions.

## What Problem It Solves

- Teams lose alignment when sales data is spread across different tools.
- Manual reporting delays trend detection and reaction time.
- It is hard to track progress to weekly targets, net sales, and refund impact in one place.

This frontend reduces those issues by consolidating backend API data into a single operational view.

## Architecture Overview

- **Framework:** Next.js (App Router) + TypeScript
- **State & Data:** React Query-based API hook structure
- **Auth:** JWT-based authentication flows (login/register/session)
- **Domain modules:** `auth`, `workspaces`, `sales`, `refunds`, `targets`, `analytics`
- **UI flows:** Mission Control, Daily Entry, Weekly Summary, Workbench

## Main Screens and Flows

- **Landing:** Product narrative focused on problem, solution, and value
- **Mission Control:** Aggregate performance and trend visibility
- **Daily Entry:** Daily sales/refund input workflows
- **Weekly Summary:** Weekly overview and comparative metrics
- **Workbench:** Operational tracking workspace

## How to Run Locally

### 1) Install

```bash
npm install
```

### 2) Environment Variables

Copy the example file and define your backend API base URL:

```bash
cp .env.local.example .env.local
```

Then verify the value:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 3) Start Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Running with Backend

This repository contains the frontend only.  
For full workflow coverage, run the backend service as well. Once Docker + PostgreSQL + Prisma migrate steps are completed on backend side, the UI works with all API flows.

## Future Improvements

- Increase unit and E2E test coverage
- Add CI/CD pipeline and automated quality gates
- Introduce role-based authorization layers
- Integrate error monitoring and performance observability
