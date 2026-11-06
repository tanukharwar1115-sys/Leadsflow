# Technowib LeadFlow AI

Multi-tenant AI real estate CRM (MERN).

- `backend/` — Node.js + Express + MongoDB (Mongoose) API
- `frontend/` — React + Vite + Tailwind SPA
- `docs/CHECKLIST.md` — development progress

## Local requirements
Node 22+, MongoDB 7 (local `mongod`).

## Run locally
```
cd backend  && cp .env.example .env && npm install && npm run dev   # :5000
cd frontend && npm install && npm run dev                           # :5173
```

## Backend structure (MVC + service layer)
```
backend/src/
  config/        env.js, db.js, logger.js
  constants/     roles.js, status.js          (ek concern = ek file)
  models/        User.js, Organization.js     (PascalCase, ek file = ek model)
  validators/    auth.validator.js            (zod schemas)
   controllers/   auth.controller.js           (req/res only; no business logic)
  services/      auth.service.js              (business logic, tenant scoping, DB calls)
  routes/        index.js (saare routers mount) + auth.routes.js, health.routes.js
  middleware/    validate.js, errorHandler.js, rateLimiters.js (authenticate/authorize aage)
   utils/         ApiError.js, password.js   (Express 5 forwards async errors automatically; no asyncHandler needed)
  app.js  server.js
backend/tests/   models/, integration/ (API tests), helpers/
```
**Flow:** `routes → middleware(authenticate, authorize, validate) → controller → service → model`

**Rules:** no DB/business logic in controllers; no req/res in services; models hold only schema,
indexes and small helpers; `organizationId` always comes from `req.user`, never from the request body.

## Frontend structure
```
frontend/src/
  api/           http.js (axios instance); services/ added in the data-layer task
  config/        navigation.js (sidebar = single source)
  context/       ToastProvider (+ toastContext.js)
  hooks/         useSidebar, useClickOutside, useHealth, useToast, useTableData
  layouts/       PublicLayout, AppLayout
  components/
    ui/          Button, Badge, Avatar, Card, Popover, PageHeader
    forms/       Field, Input, Select, Textarea, Checkbox, Switch, SearchInput
    feedback/    Modal, ConfirmDialog, Spinner, Skeleton, EmptyState, ErrorState, PlaceholderPage
    data/        DataTable, Pagination, Tabs, StatCard
    layout/      Sidebar, Topbar
  features/      per-module code (dashboard/mockData.js now; leads/, properties/ ... later)
  pages/         HomePage, NotFoundPage, app/* (one file per route; dev-only DesignSystemPage)
  routes/        index.jsx
```
**Rules:** pages compose components and hooks; components never fetch data; mock data lives only in
`features/*/mockData.js` and is labelled in the UI; colours come from `brand-*` tokens in `index.css`.
