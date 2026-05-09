# Detox Test Flow Guide

This folder contains Detox end-to-end tests for the MentrixOS React Native app.
Use this document to choose the right spec file, understand the expected app state,
and avoid testing behavior that belongs to another screen.

## Test Setup

All tests use shared helpers from `e2e/helpers.js`.

Seed users:

| User key | Email | Expected purpose |
| --- | --- | --- |
| `noInstitute` | `alex@scos.com` | Valid credentials, but login should stay on `LoginScreen` with a no-institute-assigned error. |
| `oneInstituteOneRole` | `raj@scos.com` | Valid login that may go straight to dashboard. |
| `oneInstituteTwoRoles` | `priya@scos.com` | Valid login, institute selection, then role selection. |
| `manyInstitutesOneRole` | `amit@scos.com` | Multiple institutes, selected institute can route directly to dashboard. |
| `manyInstitutesManyRoles` | `sneha@scos.com` | Multiple institutes and role-selection path. |
| `wrongPassword` | `raj@scos.com` with bad password | Invalid credential error. |
| `unknownUser` | `axdf@scos.com` | Invalid credential error. |

Important shared helpers:

- `launchFresh()` clears app state and waits for `loginScreen`.
- `loginAs(user)` enters email/password and submits login.
- `waitForPostLoginScreen()` returns one of `InstituteList`, `Dashboard`, or `NoInstitute`.
- `selectFirstInstitute()` taps `instituteCard-0`.
- `selectFirstRole()` taps `roleCard-0`.
- `expectRoles()` waits for `rolesScreen`.
- `expectDashboard()` waits for `dashboardScreen`.

## Screen-Owned Specs

These are the focused specs to run while developing one screen at a time.

| File | Screen owner | What it covers |
| --- | --- | --- |
| `login.e2e.js` | `LoginScreen` | Login layout, theme toggle, icons, password-mode controls, typing/scrolling, orientation smoke check, validation, loader, valid credential routing, invalid credential errors, no-institute-assigned error, and restart/session checks. |
| `institute.e2e.js` | `InstituteListScreen` | Institute list render, card visibility, conditional institute search, institute-to-roles navigation, and institute-to-dashboard navigation. |
| `roles.e2e.js` | `RolesScreen` | Role selection render, Change Institute navigation, and role-to-dashboard navigation. Covers TC27. |
| `dashboard.e2e.js` | `DashboardScreen` | Dashboard load/header/user-role context, summary cards and content, scroll stability, header actions, logout, logout persistence, session restore, and theme-toggle-to-dashboard smoke coverage. Covers the native equivalents of the web dashboard TC01-TC16 where applicable. |

Screen ownership rule:

- Keep institute tests about `InstituteListScreen`: list, search, and selecting institutes.
- Keep role tests about `RolesScreen`: role cards, Change Institute, selecting a role.
- Keep dashboard tests about `DashboardScreen`: dashboard content, dashboard scroll, dashboard header actions.
- Header logout is exercised only where the active screen intentionally exposes the header avatar interaction.

## Additional Regression Specs

The former `logical.e2e.js`, `ui.e2e.js`, and `ux.e2e.js` have been dissolved into the four screen-owned specs above.

| File | Test-case ownership |
| --- | --- |
| `performance-network-security.e2e.js` | TC43-TC70: performance smoke checks plus network/security TODOs. |
| `mobile-validation-recovery.e2e.js` | TC71-TC90: accessibility placeholders, mobile behavior, validation edge cases, recovery TODOs. |

Unsupported or infrastructure-dependent cases are documented under Automation Gaps instead of being left as runnable Jest todos.

## Current Test IDs

Use these stable selectors before adding new ones:

| Area | Test IDs |
| --- | --- |
| Login | `loginScreen`, `loginEmailInput`, `loginUsePasswordButton`, `loginPasswordInput`, `loginContinueButton`, `loginErrorText`, `themeToggleButton` |
| Institute list | `instituteListScreen`, `instituteCard-0`, `instituteSearchInput` |
| Roles | `rolesScreen`, `changeInstituteButton`, `roleCard-0` |
| Dashboard | `dashboardScreen`, `headerMenuButton`, `headerAvatarButton` |

## Conditional UI Notes

`InstituteListScreen` renders the search bar only when the API returns more than 5 institutes:

```ts
const showSearch = institutes.length > 5;
```

So `institute.e2e.js` must not assume `instituteSearchInput` always exists. The current test first checks whether the search field is visible; if it is not visible, the test verifies that the institute list is still usable.

`RolesScreen` automatically redirects to `DashboardScreen` when the selected institute has exactly one role. Use a multiple-role user when you need to assert `rolesScreen`.

`DashboardScreen` is reachable either directly after login for one-institute/one-role flows or through institute and role selection. Tests should wait for the actual post-login screen instead of assuming one fixed route for every seed user.

## Detox Assertion Gotcha

Detox overrides the global `expect`, so this is wrong for plain JavaScript values:

```js
expect(screen).toBe('InstituteList');
```

Use a normal helper instead:

```js
function expectScreen(screen, expectedScreen) {
  if (screen !== expectedScreen) {
    throw new Error(`Expected ${expectedScreen}, but received ${screen}`);
  }
}
```

Use Detox `expect` only for UI elements:

```js
await expect(element(by.id('dashboardScreen'))).toBeVisible();
```

## Run Commands

Build iOS once:

```bash
npm run detox:build:ios
```

Run one focused spec:

```bash
npx detox test e2e/login.e2e.js --configuration ios.sim.debug
npx detox test e2e/institute.e2e.js --configuration ios.sim.debug
npx detox test e2e/roles.e2e.js --configuration ios.sim.debug
npx detox test e2e/dashboard.e2e.js --configuration ios.sim.debug
```

Run remaining broad regression specs:

```bash
npx detox test e2e/performance-network-security.e2e.js --configuration ios.sim.debug
npx detox test e2e/mobile-validation-recovery.e2e.js --configuration ios.sim.debug
```

Run the full suite:

```bash
npm run detox:test:ios
```

## Automation Gaps

These cases are not kept as Jest todos because they are not executable with the current app/test infrastructure:

- Web dashboard direct URL checks are not native Detox flows unless deep links are implemented.
- Web `localStorage` checks are represented by native session restore/logout persistence tests instead.
- TC5 long institute names need mocked or seeded API data with long names.
- TC7 multiple screen-size typography should be verified by running on several simulators.
- TC10 browser-style resize below 768px is not applicable to native Detox.
- TC12 small screen below 400px should run on a small configured simulator.
- TC19 enter-key login needs `onSubmitEditing` support on the password input.
- TC21 button disabled-state coverage needs the button to remain visible while loading.
- TC22 back navigation depends on the selected post-login route and platform gesture behavior.
- TC34 selected institute persistence needs a stable persisted roles-screen assertion.
- TC37 partial API data requires mocked API fixtures.
- TC39 empty role list requires mocked API fixtures.
- TC40 multiple tabs session is web-only and not applicable to native Detox.
- TC42 has no provided scenario.
- Mock API fixtures for empty, partial, null, slow, huge, or crashing responses.
- Test-only storage hooks for expired token, fake token, and removed-token scenarios.
- Native deep-link route guards for direct route access tests.
- Simulator/network conditioning for offline, timeout, reconnect, and low-memory tests.
- Device matrix coverage for very small phones, tablets, and multiple orientations.

When adding a new flow, prefer a focused screen-owned spec first. Add it to a broad TC file only if it is part of an existing numbered regression case.
