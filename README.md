# Home App 2.0

Modern Firebase-powered family/caregiver platform with:

- Secure Firebase Authentication (email/password).
- Firestore-backed content discovery, saves, progress, and service requests.
- Admin-safe model where `content` is read-only from client apps.
- Hardened Firestore + Storage rules and explicit composite indexes.
- Optional Cloud Functions audit hook for newly created service requests.

## Stack

- **Frontend:** React + TypeScript + Vite
- **Backend services:** Firebase Auth, Firestore, Storage, Cloud Functions
- **Testing:** Vitest + Testing Library

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment values:

   ```bash
   cp .env.example .env
   ```

3. Run app:

   ```bash
   npm run dev
   ```

4. Build and test:

   ```bash
   npm run lint
   npm run test
   npm run build
   ```

## Firebase setup

- Set project in `.firebaserc`.
- Deploy rules/indexes:

  ```bash
  npm run firebase:deploy:rules
  ```

- Deploy hosting:

  ```bash
  npm run build
  npm run firebase:deploy:hosting
  ```

- Start emulators:

  ```bash
  npm run firebase:emulators
  ```

## Security highlights

- Owner-based document access for `users`, `savedContent`, `contentProgress`, and `requests`.
- No client writes to `content`.
- No deletes allowed on `requests` and `contentProgress` for auditability.
- Storage locked to authenticated users and admin-only content media uploads.

## Compliance + product recommendations

- Add age gating flow for child users and parental controls.
- Remove or hard-restrict legally sensitive service categories per app-store policies.
- Implement account deletion/export workflows for privacy compliance.
- Connect Crashlytics, Performance Monitoring, and Analytics before production release.
