const {
  USERS,
  launchFresh,
  choosePasswordLogin,
  submitPassword,
  loginAs,
  waitForPostLoginScreen,
  selectFirstInstitute,
  selectFirstRole,
  expectDashboard,
  logoutFromHeader,
} = require('./helpers');

// Logs in and ensures the user reaches the dashboard
async function loginToDashboard() {
  await loginAs(USERS.oneInstituteTwoRoles);

  // Handle institute/role selection if required
  const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });

  if (screen === 'InstituteList') {
    await selectFirstInstitute();
    await selectFirstRole();
  }

  await expectDashboard();
}

// Same login flow but toggles theme before login
async function loginToDashboardWithThemeToggle() {
  await element(by.id('themeToggleButton')).tap();

  await choosePasswordLogin(USERS.oneInstituteTwoRoles.email);
  await submitPassword(USERS.oneInstituteTwoRoles.password);

  const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });

  if (screen === 'InstituteList') {
    await selectFirstInstitute();
    await selectFirstRole();
  }

  await expectDashboard();
}

describe('Dashboard Flow', () => {

  // Start every test with a fresh app state
  beforeEach(async () => {
    await launchFresh();
    await device.disableSynchronization();
  });

  // Re-enable Detox synchronization after suite execution
  afterAll(async () => {
    await device.enableSynchronization();
  });

  it('TC01 - should load the dashboard', async () => {
    await loginToDashboard();

    await expect(element(by.id('dashboardScreen'))).toBeVisible();
    await expect(element(by.id('dashboardTitle'))).toBeVisible();
  });

  it('TC02 - should show the dashboard header', async () => {
    await loginToDashboard();

    await expect(element(by.id('dashboardTitle'))).toBeVisible();
    await expect(element(by.text('Welcome to MentrixOS'))).toBeVisible();
  });

  it('TC03 - should show selected user and role context', async () => {
    await loginToDashboard();

    await expect(element(by.id('dashboardUserName'))).toBeVisible();
    await expect(element(by.id('dashboardRoleText'))).toBeVisible();
  });

  it('TC04 - should render all dashboard cards', async () => {
    await loginToDashboard();

    await expect(element(by.id('dashboardCard-0'))).toBeVisible();
    await expect(element(by.id('dashboardCard-1'))).toBeVisible();
    await expect(element(by.id('dashboardCard-2'))).toBeVisible();
    await expect(element(by.id('dashboardCard-3'))).toBeVisible();
  });

  it('TC05 - should show dashboard card content', async () => {
    await loginToDashboard();

    await expect(element(by.text('Active Institutes'))).toBeVisible();
    await expect(element(by.text('Total Users'))).toBeVisible();
  });

  it('TC06 - should allow logout from the dashboard header', async () => {
    await loginToDashboard();

    await logoutFromHeader();

    // User should return to login screen after logout
    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  it('TC07 - should keep user logged out after app restart', async () => {
    await loginToDashboard();

    await logoutFromHeader();

    // Restart app and verify session is cleared
    await device.terminateApp();
    await device.launchApp({ newInstance: false });

    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  it('TC08 - should restore a logged-in dashboard session after React Native reload', async () => {
    await loginToDashboard();

    // Simulate RN reload
    await device.reloadReactNative();

    const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });

    if (screen === 'InstituteList') {
      await selectFirstInstitute();
      await selectFirstRole();
    }

    await expectDashboard();
  });

  it('TC09 - should expose dashboard header actions', async () => {
    await loginToDashboard();

    await expect(element(by.id('headerMenuButton'))).toBeVisible();
    await expect(element(by.id('headerAvatarButton'))).toBeVisible();
  });

  it('TC10 - should restore a logged-in session before logout', async () => {
    await loginToDashboard();

    // Relaunch app without clearing state
    await device.terminateApp();
    await device.launchApp({ newInstance: false });

    const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });

    if (screen === 'InstituteList') {
      await selectFirstInstitute();
      await selectFirstRole();
    }

    await expectDashboard();
  });

  it('TC11 - should keep dashboard UI stable after scrolling', async () => {
    await loginToDashboard();

    // Verify scroll does not break layout
    await element(by.id('dashboardScreen')).swipe('up', 'fast', 0.5);
    await expect(element(by.id('dashboardScreen'))).toBeVisible();

    await element(by.id('dashboardScreen')).swipe('down', 'fast', 0.5);
    await expect(element(by.id('dashboardTitle'))).toBeVisible();
  });

  it('TC12 - should keep dashboard visible after tapping menu action', async () => {
    await loginToDashboard();

    await element(by.id('headerMenuButton')).tap();

    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  it('TC13 - should still reach dashboard after toggling dark mode before login', async () => {
    await loginToDashboardWithThemeToggle();

    await expect(element(by.id('dashboardScreen'))).toBeVisible();

    // Ensure session survives RN reload
    await device.reloadReactNative();
    await expectDashboard();
  });

  it('TC14 - should keep logout persistent after app reload', async () => {
    await loginToDashboard();

    await logoutFromHeader();

    // Reload app and confirm user stays logged out
    await device.reloadReactNative();

    await waitFor(element(by.id('loginScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });
});