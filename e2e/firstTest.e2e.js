describe('Login Test', () => {
    beforeAll(async () => {
        await device.launchApp({
            newInstance: true,
            permissions: { notifications: 'YES' }
        });
    });

    it('should show login screen', async () => {
        await waitFor(element(by.id('loginScreen')))
            .toBeVisible()
            .withTimeout(5000);

        await expect(element(by.id('loginScreen'))).toBeVisible();
    });
});