import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const username = 'customer@practicesoftwaretesting.com';
const password = 'welcome01';

type Fixtures = {
    loggedInPage: Page
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(username, password);
        await use(page);
    },
});

export { expect };