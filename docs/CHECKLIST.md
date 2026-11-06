# Development Checklist

## Phase 1: Project setup and architecture
- [x] M1.1 Project folder, git repo, .gitignore, README, checklist
- [x] M1.2 Server skeleton (env validation, Mongo, logger, /api/health, error handler) — 5/5 tests pass, manually verified
- [x] M1.3 Client skeleton (Vite, Tailwind, Router, axios) — build + lint clean, dev server verified (not yet visually checked in a browser)
- [x] M1.4 Client-server integration (Vite proxy, health status page w/ loading+error states) — lint+build clean, /api/health via proxy verified with curl, CORS whitelist verified. Visual browser check pending (user)
- [x] M1.5 Frontend foundation: UI primitives (Button/Input/Card), AppLayout shell at /app (UI-only, unprotected until Phase 2), features/ dir — lint+build clean; not visually checked
- [x] M1.6 Dashboard UI foundation (priority change: UI before auth APIs): collapsible/responsive Sidebar, Topbar (search, notifications, profile — all mock/UI-only), Overview dashboard (stat cards, recent leads table, activity feed — MOCK data, labelled), 8 placeholder pages, lucide-react. Lint+build clean, SSR smoke render of all 9 routes OK. NOT verified in a real browser (responsive/interaction untested)
- [x] F0 Frontend foundation (frontend-first track): `brand` design tokens, 13 new primitives (Field/Select/Textarea/Checkbox/Switch/Modal/ConfirmDialog/DataTable/Pagination/Tabs/Skeleton/SearchInput/Toast), useTableData + useToast hooks, topbar search wired, Follow-ups + AI Qualification routes, dev-only /app/design-system showcase — lint+build clean, 25 browser interaction checks pass (Chrome, desktop/tablet/mobile), 0 console errors
- [x] F0.1 Frontend foundation 2: terminology (industry vocab) + mock AuthProvider + mock service layer (mockCollection, useResource, useMutation) + react-hook-form/zod. Lint+build clean, SSR smoke OK
- [x] F0.2 Visual polish: Inter font, dark sidebar w/ org card, gradient buttons/stat cards + sparklines, area chart + pipeline on dashboard, avatars, status dots, landing page. Lint+build clean; headless Chrome screenshots checked (desktop only; mobile/interaction not re-tested)

## Phase 2: Authentication and organization management
- [x] 2.1 (MVC layout: src/models/User.js, Organization.js) User + Organization Mongoose models, bcrypt password util, roles constants, tenant rule (super_admin no org / others require org), indexes — 28/28 tests pass (23 new model tests, per-file isolated test DBs)
- [x] 2.2 POST /api/auth/register: zod validate middleware, auth service/controller/route, slug generation, compensating rollback, signup rate limit — 42/42 tests pass (14 new integration), live-tested with curl (201/409/400). No tokens/session yet (2.3)
- [ ] 2.3 RefreshToken model (hashed, rotation, revocation) + login/logout/refresh with HTTP-only cookies + CSRF plan
- [ ] 2.4 authenticate middleware + /me
- [ ] 2.5 Frontend auth pages + ProtectedRoute
## Phase 3: Multi-tenant architecture and RBAC
## Phase 4: SaaS dashboard and UI
## Phase 5: Lead management CRM
## Phase 6: Property and agent management
## Phase 7: AI lead qualification
## Phase 8: AI conversations and voice integrations
## Phase 9: Automated follow-ups and appointments
## Phase 10: Analytics and reporting
## Phase 11: Subscription and billing
## Phase 12: Super Admin dashboard
## Phase 13: Security, testing and production deployment
