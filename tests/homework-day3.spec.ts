import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

const username = 'customer@practicesoftwaretesting.com';
const password = 'welcome01';

test('adding item to cart', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let homePage = new HomePage(page);

    await loginPage.open();
    await loginPage.login(username, password);

    await homePage.open();
    await homePage.addItemToCart('Combination Pliers');

    await homePage.open();
    await homePage.addItemToCart('Bolt Cutters');

    await expect(homePage.cartButton).toHaveText('2');

});

test('removing item from cart', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let homePage = new HomePage(page);

    await loginPage.open();
    await loginPage.login(username, password);

    await homePage.open();
    await homePage.addItemToCart('Combination Pliers');

    await homePage.open();
    await homePage.addItemToCart('Pliers');

    await expect(homePage.cartButton).toHaveText('2');

    await homePage.removeItemFromCart();

    await expect(homePage.cartButton).toHaveText('1');

});