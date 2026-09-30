import path from 'path';
import fs from 'fs';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type LoginCase = {
    name: string;
    email: string;
    password: string;
    expectedResult: string;
};

const jsonPath = path.join(process.cwd(), 'test-data', 'login.json');

const jsonText = fs.readFileSync(jsonPath, 'utf8');

const loginCases = JSON.parse(jsonText) as LoginCase[];

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