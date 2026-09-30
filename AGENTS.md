# AGENTS.md

Factive Boosted: a rebuild of Factive (ACTIV8 projects: Media Pool, AI Studio, Story) on a modern stack.

## Read first

- `docs/PROJECT_BRIEF.md`: scope, goals, what is out of scope.
- `docs/ARCHITECTURE.md`: system design. Section 13 covers the frontend, section 18 the build order.
- `docs/DESIGN.md`: design tokens (colors, type scale, spacing). The MUI theme is built from it.

## Layout

- pnpm workspaces monorepo. `apps/web` is the React frontend. `apps/api` (Nest.js) does not exist yet.
- Shared ESLint and Prettier config lives in the root. Node version is in `.nvmrc` (run `nvm use`).

## Commands (run from root)

```sh
pnpm install
pnpm dev            # web dev server; needs apps/web/.env (copy from .env.example)
pnpm lint           # ESLint, type-aware
pnpm format         # Prettier write; `format:check` in CI
pnpm typecheck
pnpm test           # Vitest
pnpm steiger        # FSD rules
pnpm knip           # unused files, exports, dependencies
pnpm build
pnpm storybook       # component catalog on :6006; `build-storybook` in CI
```

CI (`.github/workflows/ci.yml`) runs all of these. Every one must pass before a change is done.
Commits use Conventional Commits (commitlint). The pre-commit hook runs lint-staged.

## Frontend rules (`apps/web`)

- Stack: React 18, Vite, strict TypeScript, MUI, lucide-react icons, Redux Toolkit + RTK Query, React Router 7, React Final Form + Yup, Sentry, Vitest + RTL + MSW, Storybook.
- FSD layers: `app → pages → widgets → features → entities → shared`. Import only downward, and only through a slice's `index.ts`.
- Create a slice only when something uses it. No empty slices or placeholder folders.
- Segment names describe purpose (`model`, `ui`, `api`, `lib`, `config`), not type. Steiger rejects names like `store`.
- The only path alias is `@/` → `src/`.
- Styles go through MUI only: `sx`, `styled`, theme tokens. No CSS/SCSS files or CSS modules.
- UI kit lives in `shared/ui/<component>/`, one public `index.ts` each; import it as `@/shared/ui/button`. Browse it in Storybook.
- For controls, feedback and display (buttons, fields, alerts, tags, dialogs, toasts and so on) use `shared/ui`, not raw MUI. Use MUI directly for layout and text only: `Box`, `Stack`, `Container`, `Typography`, `Link`.
- The shared props API is `variant`, `color` (`primary | secondary | success | warning | danger | info | neutral`; `danger` maps to MUI `error`) and `size` (`sm | md | lg`), with types in `@/shared/ui/theme`.
- Icons come only from `lucide-react`. Render them with `<Icon icon={X} size="sm" />`; components take `startIcon`, `icon` and similar props as `LucideIcon` components, not elements. Don't add `@mui/icons-material`.
- Theme: `shared/ui/theme`. It holds the palette, typography, the custom `soft` variant for Button and Chip, and the lucide icons used inside MUI (Select, Alert, Chip).
- Forms: `Form*` fields from `@/shared/ui/form` bind shared fields to React Final Form.
- Toasts: call `useToast()` from `@/shared/ui/toast`. `ToastProvider` is mounted in `app/App.tsx`.
- Every new `shared/ui` component needs a `*.stories.tsx` covering its variants, sizes and states. Components with behavior also get a test.
- Spacing base is 8px. The design scale 4/8/12/16/24/32 maps to `spacing(0.5/1/1.5/2/3/4)`.
- Server data goes through RTK Query. `shared/api/baseApi` has no endpoints of its own. Add endpoints with `baseApi.injectEndpoints` inside the entity or feature they belong to.
- Redux slices hold client state only. Never copy server data into slices.
- Forms use React Final Form with `validateWithSchema(yupSchema)` from `@/shared/lib/form`.
- Env: read it via `@/shared/config` (`env`), never `import.meta.env` directly. `VITE_API_URL` is required. Sentry stays off when `VITE_SENTRY_DSN` is empty. When you add a variable, add it to `.env.example` and `src/vite-env.d.ts`.
- Auth is a stub for now: `entities/session` holds an `isAuthenticated` flag that `app/routing/ProtectedRoute` checks.
- No i18n. UI copy is in English.
- No business logic in `shared`.

## Tests

- Put tests next to the code as `*.test.ts(x)`. Setup and the MSW server live in `apps/web/test/`.
- MSW fails on unhandled requests. Mock the network with `server.use(http.get(...))`.
- Render MUI components with `renderWithTheme` from `apps/web/test/renderWithTheme.tsx`. Use `@testing-library/user-event` for interaction.
- Build the store in tests with `setupStore(preloadedState)` from `@/app/model/store`.

## Gotchas

- Import `RouterProvider` from `react-router`, not `react-router/dom`. The `/dom` entry loads a second router instance in tests, and the router context is lost.
- MSW 3 renamed `onUnhandledRequest` to `onUnhandledFrame`.
- TypeScript is capped at `~6.0` because typescript-eslint does not support 7. React Router is capped at 7 because v8 needs React 19.
- `steiger.config.js` is JS on purpose: the FSD plugin's types don't resolve under pnpm.
- `secondary` (#C8B3FD) is too light for text on white. The theme uses dark text for `text`, `outlined` and `soft` secondary buttons; keep that in mind for custom styles.
- knip treats `shared/ui/*/index.ts` as entries, so the kit's exported types are allowed to be unused. Elsewhere knip flags a slice `index.ts` that nothing imports. Consumers and tests import through the public API.
- Never commit secrets. `.env` is gitignored, and only `.env.example` is tracked.
