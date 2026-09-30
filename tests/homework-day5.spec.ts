import { test, expect } from '../fixtures';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

//Task 1
test('login with fixture', async ({ loggedInPage }) => {
    await expect(loggedInPage.getByRole('heading', { name: 'My Account' })).toBeVisible();
});

//Task 2
test.describe('catalog hooks', () => {
    test.beforeAll(() => {
        let dateNow = new Date(Date.now());
        console.log(`Test Suite started on ${dateNow.toDateString()} ${dateNow.toTimeString()}`);            
    });

    test.beforeEach(async ({ page }) => {
        let homePage = new HomePage(page);
        await homePage.open();
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('failure-screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: 'image/png'
            });
        }
    });

    test.afterAll(() => {
        let dateNow = new Date(Date.now());
        console.log(`Test Suite finished on ${dateNow.toDateString()} ${dateNow.toTimeString()}`);            
    });

    test('home page is loaded', async ({ page }) => {
        let homePage = new HomePage(page);
        await expect(homePage.productLink).toHaveCount(9);
    });
});

//Task 3
type LoginCase = {
    name: string;
    email: string;
    password: string;
    expectedResult: string;
};

const csvPath = path.join(process.cwd(), 'test-data', 'login-cases.csv');
const csvText = fs.readFileSync(csvPath, 'utf8');
const loginCases = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    delimiter:'\t',
}) as LoginCase[];

for (const data of loginCases) {
    test(`${data.name} use case`, async({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(data.email, data.password);
        if (data.expectedResult === 'pass') {
            await expect(page).toHaveURL(/.*\/account/);
        } if (data.expectedResult === 'fail') {
            await expect(loginPage.invalidaCredentialMessage).toBeVisible();
        }
    });
};
