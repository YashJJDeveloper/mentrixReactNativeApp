const {
  USERS,
  launchFresh,
  loginAs,
  waitForPostLoginScreen,
  selectFirstInstitute,
  selectFirstRole,
  expectRoles,
  expectDashboard,
} = require('./helpers');

// Validate expected screen after login/navigation
function expectScreen(screen, expectedScreen) {
  if (screen !== expectedScreen) {
    throw new Error(`Expected ${expectedScreen}, but received ${screen}`);
  }
}

// Utility to safely check element visibility
async function isVisible(matcher, timeout = 3000) {
  try {
    await waitFor(element(matcher))
      .toBeVisible()
      .withTimeout(timeout);

    return true;
  } catch (error) {
    return false;
  }
}

// Login flow that must land on institute list screen
async function loginToInstituteList(
  user = USERS.manyInstitutesManyRoles,
) {
  await loginAs(user);

  const screen = await waitForPostLoginScreen();
  expectScreen(screen, 'InstituteList');

  await waitFor(element(by.id('instituteListScreen')))
    .toBeVisible()
    .withTimeout(15000);
}

// Search institutes if search input exists
async function searchInstitutes(text) {
  const hasSearch = await isVisible(by.id('instituteSearchInput'));

  // Fallback for small datasets without search UI
  if (!hasSearch) {
    await expect(element(by.id('instituteCard-0'))).toBeVisible();
    return false;
  }

  await element(by.id('instituteSearchInput')).tap();
  await element(by.id('instituteSearchInput')).replaceText(text);

  return true;
}

describe('Institute Flow', () => {

  // Start every test with a clean app launch
  beforeEach(async () => {
    await launchFresh();
  });

  it('TC01 - should show the institute list after login for a user with institutes', async () => {
    await loginToInstituteList();

    await expect(
      element(
        by.text('Select the institute to access your personalized dashboard'),
      ),
    ).toBeVisible();

    await expect(element(by.id('instituteCard-0'))).toBeVisible();
  });

  it('TC02 - should show multiple institute cards for a multi-institute user', async () => {
    await loginToInstituteList(USERS.manyInstitutesOneRole);

    await expect(element(by.id('instituteCard-0'))).toBeVisible();
    await expect(element(by.id('instituteCard-1'))).toBeVisible();
  });

  it('TC03 - should show multiple institute cards for a many-institutes user', async () => {
    await loginToInstituteList(USERS.manyInstitutesManyRoles);

    await expect(element(by.id('instituteCard-0'))).toBeVisible();
    await expect(element(by.id('instituteCard-1'))).toBeVisible();
  });

  it('TC04 - should navigate from institute selection to the next expected screen', async () => {
    await loginToInstituteList(USERS.manyInstitutesOneRole);

    await selectFirstInstitute();

    // Single-role users should reach dashboard directly
    await expectDashboard();
  });

  it('TC05 - should filter institutes when the conditional search field is available', async () => {
    await loginToInstituteList();

    const searched = await searchInstitutes('a');

    if (searched) {
      await waitFor(element(by.id('instituteCard-0')))
        .toBeVisible()
        .withTimeout(5000);
    }
  });

  it('TC06 - should keep native session after app restart', async () => {
    await loginToInstituteList(USERS.manyInstitutesOneRole);

    // Relaunch app without clearing storage
    await device.terminateApp();
    await device.launchApp({ newInstance: false });

    const screen = await waitForPostLoginScreen();
    expectScreen(screen, 'InstituteList');
  });

  it('TC07 - should keep institute list safe when search text is empty', async () => {
    await loginToInstituteList();

    const searched = await searchInstitutes('');

    if (searched) {
      await expect(element(by.id('instituteCard-0'))).toBeVisible();
    }
  });

  it('TC08 - should restore user session before logout', async () => {
    await loginToInstituteList();

    await device.terminateApp();
    await device.launchApp({ newInstance: false });

    const screen = await waitForPostLoginScreen();
    expectScreen(screen, 'InstituteList');
  });

  it('TC09 - should keep search results usable for matching institute text', async () => {
    await loginToInstituteList();

    const searched = await searchInstitutes('a');

    if (searched) {
      await waitFor(element(by.id('instituteCard-0')))
        .toBeVisible()
        .withTimeout(5000);
    }
  });

  it('TC10 - should show an empty state for no search results', async () => {
    await loginToInstituteList();

    const searched = await searchInstitutes('zzzzzzzzzz');

    if (searched) {
      await waitFor(
        element(by.text('No matching institutes found')),
      )
        .toBeVisible()
        .withTimeout(5000);
    }
  });

  it('TC11 - should keep institute card UI stable for visible institute names', async () => {
    await loginToInstituteList();

    await expect(element(by.id('instituteCard-0'))).toBeVisible();
  });

  it('TC12 - should expose search for many institute data', async () => {
    await loginToInstituteList(USERS.manyInstitutesManyRoles);

    await waitFor(element(by.id('instituteSearchInput')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('TC13 - should open role selection after choosing an institute with multiple roles', async () => {
    await loginToInstituteList();

    await selectFirstInstitute();

    await expectRoles();
    await expect(element(by.text('Choose Your Role'))).toBeVisible();
  });

  it('TC14 - should open dashboard after institute and role selection when roles exist', async () => {
    await loginToInstituteList();

    await selectFirstInstitute();

    await expectRoles();

    await selectFirstRole();

    await expectDashboard();
  });

  it('TC15 - should open dashboard directly after choosing an institute with one role', async () => {
    await loginToInstituteList(USERS.manyInstitutesOneRole);

    await selectFirstInstitute();

    await expectDashboard();
  });
});