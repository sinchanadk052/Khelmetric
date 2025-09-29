# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: Expo (SDK ~54), React Native 0.81, expo-router (~6), TypeScript, NativeWind (Tailwind), i18next + react-i18next, expo-localization.
- Entry: index.ts -> expo-router/entry. Routing is file-based under app/ with typedRoutes enabled (see app.json > experiments.typedRoutes = true).
- Layout and navigation:
  - app/_layout.tsx wraps the app with AuthProvider and a RootNavigator that guards routes.
  - Route groups: (auth) for unauthenticated screens and (app) for the main tabbed app. app/index.tsx redirects to /(app).
  - Tabs are defined in app/(app)/_layout.tsx, with titles sourced from i18n keys.
- Auth: src/context/AuthContext.tsx provides a simple, persisted (AsyncStorage) auth model with login, signup, skip (guest), and logout. Guard logic in app/_layout.tsx redirects unauthenticated users to /(auth)/login and prevents authenticated users from returning to auth routes.
  - Storage key: auth:user
- i18n: src/i18n/i18n.ts initializes i18next with react-i18next, integrates expo-localization for device language, and persists the chosen language in AsyncStorage. Languages: en, hi, ta. Exported helper setLanguage(lng) updates both i18n and storage.
  - Storage key: i18n:lang
- Styling: NativeWind/Tailwind configured via babel (nativewind/babel) and tailwind.config.js. Use className on React Native components.
- Platform config: app.json enables new architecture, includes expo-router and expo-localization plugins, and sets UI/icons/splash.
- Firebase: firebase/ contains placeholder bootstrap and config; not wired into the app yet.

Commands (npm-based)
The repository uses npm (package-lock.json present).
- Install dependencies:
  - npm install
- Start development (Metro bundler):
  - npm run start
- Run on a platform:
  - Android: npm run android
  - iOS: npm run ios
  - Web: npm run web
- Clear Metro cache (helpful if bundler gets stuck):
  - npx expo start -c
- Type check (no emit):
  - npx tsc -p tsconfig.json --noEmit

Linting and tests
- Linting:
  - npm run lint
  - npm run lint:fix
- Tests (Jest + ts-jest):
  - Run all: npm test
  - Watch mode: npm run test:watch
  - CI mode: npm run test:ci
  - Run a single test: npm test -- src/i18n/i18n.test.ts
  - Notes: Native modules used in tests are mocked under test-mocks/ via moduleNameMapper in jest.config.js. For component tests with React Native, prefer configuring jest-expo or adding appropriate transformers before introducing @testing-library/react-native matchers.

Architecture flow (big picture)
- App boot:
  1) expo-router/entry mounts routing.
  2) app/_layout.tsx wraps children with AuthProvider and initializes i18n (initI18n). While auth/i18n initialize, a loading indicator is shown.
  3) Once ready, RootNavigator inspects the first route segment to decide whether to redirect between (auth) and the main app.
- Navigation:
  - index route redirects to /(app).
  - Tabs and screen titles are driven by i18n via useTranslation in app/(app)/_layout.tsx.
- State/persistence:
  - Auth state and selected language persist via AsyncStorage keys noted above.

Notes for future changes
- If you add actual auth (e.g., Firebase, Auth0), integrate it inside AuthContext and keep redirect logic in app/_layout.tsx aligned with the chosen flow and routes.
- When adding new routes, keep typedRoutes in mind and organize them under app/ using expo-router’s conventions.
