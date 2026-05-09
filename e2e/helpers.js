const VALID_PASSWORD = 'temp123';

const USERS = {
  noInstitute: { email: 'alex@scos.com', password: VALID_PASSWORD },
  oneInstituteOneRole: { email: 'raj@scos.com', password: VALID_PASSWORD },
  oneInstituteTwoRoles: { email: 'priya@scos.com', password: VALID_PASSWORD },
  manyInstitutesOneRole: { email: 'amit@scos.com', password: VALID_PASSWORD },
  manyInstitutesManyRoles: { email: 'sneha@scos.com', password: VALID_PASSWORD },
  wrongPassword: { email: 'raj@scos.com', password: '123455' },
  unknownUser: { email: 'axdf@scos.com', password: '123afaf' },
};

async function launchFresh() {
  await device.launchApp({
    newInstance: true,
    delete: true,
  });

  await device.disableSynchronization();

  await waitFor(element(by.id('loginScreen')))
    .toBeVisible()
    .withTimeout(10000);
}

async function reloadToLogin() {
  await device.disableSynchronization();

  await device.reloadReactNative();

  await waitFor(element(by.id('loginScreen')))
    .toBeVisible()
    .withTimeout(10000);
}

async function choosePasswordLogin(email) {
  await element(by.id('loginEmailInput')).tap();
  await element(by.id('loginEmailInput')).replaceText(email);
  await waitFor(element(by.id('loginUsePasswordButton')))
    .toBeVisible()
    .withTimeout(5000);
  await element(by.id('loginUsePasswordButton')).tap();
  await waitFor(element(by.id('loginPasswordInput')))
    .toBeVisible()
    .withTimeout(5000);
}

async function submitPassword(password) {
  await element(by.id('loginPasswordInput')).tap();
  await element(by.id('loginPasswordInput')).replaceText(password);
  await element(by.id('loginContinueButton')).tap();
}

async function loginAs(user) {
  await choosePasswordLogin(user.email);
  await submitPassword(user.password);
}

async function expectLoginError(expectedText) {
  await waitFor(element(by.id('loginErrorText'))).toBeVisible().withTimeout(15000);
  if (expectedText) {
    await expect(element(by.text(expectedText))).toBeVisible();
  }
}

async function waitForPostLoginScreen(options = {}) {
  const { keepSynchronizationDisabled = false } = options;

  await device.disableSynchronization();
  try {
    await waitFor(element(by.id('instituteListScreen'))).toBeVisible().withTimeout(60000);
    return 'InstituteList';
  } catch (error) {
    try {
      await waitFor(element(by.id('dashboardScreen'))).toBeVisible().withTimeout(10000);
      return 'Dashboard';
    } catch (dashboardError) {
      await waitFor(element(by.text('No institute assigned'))).toBeVisible().withTimeout(10000);
      return 'NoInstitute';
    }
  } finally {
    if (!keepSynchronizationDisabled) {
      await device.enableSynchronization();
    }
  }
}

async function waitForTransitionToSettle() {
  await new Promise(resolve => setTimeout(resolve, 1500));
}

async function tapWhenSettled(matcher, timeout = 10000) {
  await waitFor(element(matcher)).toBeVisible().withTimeout(timeout);

  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await waitForTransitionToSettle();
      await element(matcher).tap();
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function selectFirstInstitute() {
  await tapWhenSettled(by.id('instituteCard-0'));
}

async function selectFirstRole() {
  await tapWhenSettled(by.id('roleCard-0'));
}

async function expectDashboard() {
  await waitFor(element(by.id('dashboardScreen'))).toBeVisible().withTimeout(15000);
}

async function expectRoles() {
  await waitFor(element(by.id('rolesScreen'))).toBeVisible().withTimeout(15000);
}

async function logoutFromHeader() {
  await waitFor(element(by.id('headerAvatarButton'))).toBeVisible().withTimeout(10000);
  await element(by.id('headerAvatarButton')).tap();
  await waitFor(element(by.id('loginScreen'))).toBeVisible().withTimeout(10000);
}

module.exports = {
  USERS,
  launchFresh,
  reloadToLogin,
  choosePasswordLogin,
  submitPassword,
  loginAs,
  expectLoginError,
  waitForPostLoginScreen,
  selectFirstInstitute,
  selectFirstRole,
  expectDashboard,
  expectRoles,
  logoutFromHeader,
};
