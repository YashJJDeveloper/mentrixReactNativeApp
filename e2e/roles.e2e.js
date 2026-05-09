const {
  USERS,
  launchFresh,
  loginAs,
  waitForPostLoginScreen,
  selectFirstInstitute,
  selectFirstRole,
  expectRoles,
  expectDashboard,
  logoutFromHeader,
} = require('./helpers');

// ---------- HELPERS ---------- //

function expectScreen(screen, expectedScreen) {
  if (screen !== expectedScreen) {
    throw new Error(`Expected ${expectedScreen}, but received ${screen}`);
  }
}

async function loginToRoles() {
  await loginAs(USERS.oneInstituteTwoRoles);

  const screen = await waitForPostLoginScreen();

  expectScreen(screen, 'InstituteList');

  await selectFirstInstitute();
  await expectRoles();
}

// ---------- TEST SUITE ---------- //

describe('Roles Flow', () => {
  beforeEach(async () => {
    await launchFresh();
  });

  // TC01 - Roles screen loads properly
  it('TC01 - should show role selection after selecting an institute with multiple roles', async () => {
    await loginToRoles();

    await expect(element(by.id('rolesScreen'))).toBeVisible();
    await expect(element(by.text('Choose Your Role'))).toBeVisible();

    await expect(element(by.id('roleCard-0'))).toBeVisible();
    await expect(element(by.id('roleCard-1'))).toBeVisible();
  });

  // TC02 - Header visible
  it('TC02 - should display roles screen header', async () => {
    await loginToRoles();

    await expect(element(by.text('Choose Your Role'))).toBeVisible();
  });

  // TC03 - Role cards rendered
  it('TC03 - should render available role cards', async () => {
    await loginToRoles();

    await expect(element(by.id('roleCard-0'))).toBeVisible();
  });

  // TC04 - Role click → dashboard
  it('TC04 - should navigate to dashboard after selecting a role', async () => {
    await loginToRoles();

    await selectFirstRole();

    await expectDashboard();
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  // TC05 - Change institute navigation
  it('TC05 - should return to institute list when change institute is tapped', async () => {
    await loginToRoles();

    await element(by.id('changeInstituteButton')).tap();

    await waitFor(element(by.id('instituteListScreen')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id('instituteCard-0'))).toBeVisible();
  });

  // TC06 - Single role auto redirect
  it('TC06 - should auto redirect single-role user to dashboard', async () => {
    await loginAs(USERS.oneInstituteOneRole);

    const screen = await waitForPostLoginScreen();

    // If institute selection appears
    if (screen === 'InstituteList') {
      await selectFirstInstitute();
    }

    await expectDashboard();

    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  // TC07 - Direct roles access blocked
  it('TC07 - should block direct roles access without institute selection', async () => {
    await launchFresh();

    await expect(element(by.id('loginScreen'))).toBeVisible();

    await expect(element(by.id('rolesScreen'))).toBeNotVisible();
  });

  // TC08 - Selected institute visible
  it.only('TC08 - should show selected institute details on roles screen', async () => {
    await loginToRoles();

    await expect(element(by.id('selectedInstituteCard'))).toBeVisible();
  });

  // TC09 - Role cards clickable
  it('TC09 - should allow tapping role cards', async () => {
    await loginToRoles();

    await expect(element(by.id('roleCard-0'))).toBeVisible();

    await element(by.id('roleCard-0')).tap();

    await expectDashboard();
  });

  // TC10 - Refresh / reload behavior
  it('TC10 - should preserve valid navigation state after reload', async () => {
    await loginToRoles();

    await device.reloadReactNative();

    // App may preserve auth state
    await waitFor(element(by.id('rolesScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  // TC11 - Direct roles access should redirect properly
  it('TC11 - should not allow roles screen without authentication', async () => {
    await launchFresh();

    await expect(element(by.id('loginScreen'))).toBeVisible();
    await expect(element(by.id('rolesScreen'))).toBeNotVisible();
  });

  // TC12 - Multi-role user should see multiple roles
  it('TC12 - should display multiple role cards for multi-role user', async () => {
    await loginToRoles();

    await expect(element(by.id('roleCard-0'))).toBeVisible();
    await expect(element(by.id('roleCard-1'))).toBeVisible();
  });

  // TC13 - Role selection responsiveness
  it('TC13 - should respond immediately on role tap', async () => {
    await loginToRoles();

    await element(by.id('roleCard-0')).tap();

    await waitFor(element(by.id('dashboardScreen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  // TC14 - Logout from roles screen
  it('TC14 - should allow logout from the roles header', async () => {
    await loginToRoles();

    await logoutFromHeader();

    await expect(element(by.id('loginScreen'))).toBeVisible();
  });
});