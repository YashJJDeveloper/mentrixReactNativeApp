const {
    USERS,
    launchFresh,
    choosePasswordLogin,
    submitPassword,
    loginAs,
    waitForPostLoginScreen,
    expectLoginError,
} = require('./helpers');

const LOGIN_ERRORS = {
    invalidCredentials: 'Invalid email or password',
    noInstituteAssigned: 'No institute has been assigned to this user. Please contact your administrator.',
};

function expectScreenToBeOneOf(screen, expectedScreens) {
    if (!expectedScreens.includes(screen)) {
        throw new Error(
            `Expected one of ${expectedScreens.join(', ')}, but received ${screen}`,
        );
    }
}

describe('Login Flow', () => {
    beforeEach(async () => {
        await launchFresh();

    });

    afterAll(async () => {
        try {
            await device.enableSynchronization();
        } catch (e) { }
    });

    it.only('TC01 - should show the login page layout', async () => {
        await expect(element(by.id('loginScreen'))).toBeVisible();
        await expect(element(by.id('loginEmailInput'))).toBeVisible();
        await expect(element(by.id('themeToggleButton'))).toBeVisible();
    });



    it('TC02 - should show login header icons', async () => {
        await expect(element(by.id('themeToggleButton'))).toBeVisible();
    });

    it('TC03 - should show password input and continue button for password login', async () => {
        await choosePasswordLogin(USERS.oneInstituteOneRole.email);

        await expect(element(by.id('loginPasswordInput'))).toBeVisible();
        await expect(element(by.id('loginContinueButton'))).toBeVisible();
    });

    it('TC04 - should support typing and scrolling on login screen', async () => {
        await element(by.id('loginEmailInput')).tap();
        await element(by.id('loginEmailInput')).replaceText('typing@scos.com');
        await element(by.id('loginScreen')).swipe('up', 'fast', 0.5);
        await element(by.id('loginScreen')).swipe('down', 'fast', 0.5);

        await expect(element(by.id('loginScreen'))).toBeVisible();
    });

    it('TC05 - should keep login screen visible in portrait and landscape', async () => {
        await device.setOrientation('landscape');
        await expect(element(by.id('loginScreen'))).toBeVisible();
        await device.setOrientation('portrait');
        await expect(element(by.id('loginScreen'))).toBeVisible();
    });

    it('TC06 - should show validation for empty password', async () => {
        await choosePasswordLogin(USERS.oneInstituteOneRole.email);
        await element(by.id('loginContinueButton')).tap();

        await expectLoginError('Please enter password');
    });

    it('TC07 - should clear login error after editing password input', async () => {
        await choosePasswordLogin(USERS.wrongPassword.email);
        await submitPassword(USERS.wrongPassword.password);
        await expectLoginError(LOGIN_ERRORS.invalidCredentials);

        await element(by.id('loginPasswordInput')).tap();
        await element(by.id('loginPasswordInput')).replaceText(USERS.oneInstituteOneRole.password);
        await waitFor(element(by.id('loginErrorText'))).not.toBeVisible().withTimeout(5000);
    });

    it('TC08 - should show loader during login request', async () => {
        await choosePasswordLogin(USERS.oneInstituteOneRole.email);
        await element(by.id('loginPasswordInput')).tap();
        await element(by.id('loginPasswordInput')).replaceText(USERS.oneInstituteOneRole.password);
        await element(by.id('loginContinueButton')).tap();

        await waitFor(element(by.id('loader'))).toBeVisible().withTimeout(3000);
    });

    it('TC09 - should show an error for a valid user with no assigned institutes', async () => {
        await loginAs(USERS.noInstitute);

        await expectLoginError(LOGIN_ERRORS.noInstituteAssigned);
    });

    it('TC10 - should login a valid user with one institute and one role', async () => {
        await loginAs(USERS.oneInstituteOneRole);

        const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });
        expectScreenToBeOneOf(screen, ['InstituteList', 'Dashboard']);
    });

    it('TC11 - should login a valid user with one institute and multiple roles', async () => {
        await loginAs(USERS.oneInstituteTwoRoles);

        const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });
        expectScreenToBeOneOf(screen, ['InstituteList']);
    });

    it('TC12 - should login a valid user with multiple institutes and one role', async () => {
        await loginAs(USERS.manyInstitutesOneRole);

        const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });
        expectScreenToBeOneOf(screen, ['InstituteList']);
    });

    it('TC13 - should login a valid user with multiple institutes and multiple roles', async () => {
        await loginAs(USERS.manyInstitutesManyRoles);

        const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });
        expectScreenToBeOneOf(screen, ['InstituteList']);
    });

    it('TC14 - should show an error for a valid email with the wrong password', async () => {
        await loginAs(USERS.wrongPassword);

        await expectLoginError(LOGIN_ERRORS.invalidCredentials);
    });

    it('TC15 - should show an error for an unknown user', async () => {
        await loginAs(USERS.unknownUser);

        await expectLoginError(LOGIN_ERRORS.invalidCredentials);
    });

    it('TC16 - should keep logged-in session state after app restart', async () => {
        await loginAs(USERS.oneInstituteOneRole);
        await waitForPostLoginScreen({ keepSynchronizationDisabled: true });

        await device.terminateApp();
        await device.launchApp({ newInstance: false });

        const screen = await waitForPostLoginScreen({ keepSynchronizationDisabled: true });
        expectScreenToBeOneOf(screen, ['InstituteList', 'Dashboard', 'NoInstitute']);
    });

});
