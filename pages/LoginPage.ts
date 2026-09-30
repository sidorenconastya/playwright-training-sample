import { type Locator, type Page } from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invalidaCredentialMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.invalidaCredentialMessage = page.getByText("Invalid email or password");
    }

    async open(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }

    async login(username: string, password: string): Promise<void> {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}