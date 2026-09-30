import { test, expect } from '@playwright/test';

test('search for pliers', async ({ page }) => {
    //Open the link and double click the Search field
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole("textbox", { name: "Search" }).dblclick();

    //Fill the Search field and assert the value
    await page.getByRole("textbox", { name: "Search" }).fill('Pliers');
    await expect(page.locator('[data-test="search-query"]')).toHaveValue('Pliers');

    //Click the Search button to run the search
    await page.getByRole("button", { name: "Search" }).click();

    //Assert that there are 4 matches in search results
    let productTitle = page.locator('[data-test="product-name"]');
    await expect(productTitle).toHaveCount(4);
});

test('filter the catalog to hammers', async ({ page }) => {
    //Open the link and check the Hammer checkbox
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole("checkbox",{ name: "Hammer" }).check();

    //Assert that the checkbox is checked
    await expect(page.getByRole("checkbox",{ name: "Hammer" })).toBeChecked();

    //Assert that there are 7 matches
    let productTitle = page.locator('[data-test="product-name"]');
    await expect(productTitle).toHaveCount(7);

    //Uncheck the Hammer checkbox and assert that it is no longer checked
    await page.getByRole("checkbox",{ name: "Hammer" }).uncheck();
    await expect(page.getByRole("checkbox",{ name: "Hammer" })).not.toBeChecked();
});

test('sort products by name', async ({ page }) => {
    //Open the link and select the type of sorting
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="sort"]').selectOption('name,asc');

    //Assert that there are 9 products on the page
    let cardTitle = page.locator('[class="card-title"]');
    await expect(cardTitle).toHaveCount(9);

    //Assert that first title contains Adjustable Watch
    await expect(cardTitle.first()).toHaveText('Adjustable Wrench');

    //Assert that first product has correct CSS class
    await expect(cardTitle.first()).toHaveClass('card-title');

});

test('inspect a product and add two items to the cart', async ({ page }) => {
    //Open the link and and click on the product
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole("textbox", { name: "Search" }).fill('Combination Pliers');
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("link", { name: "Combination Pliers" }).click();

    //Assert that level one heading is visible
    await expect(page.locator('[data-test="product-name"]')).toHaveText('Combination Pliers');
    await expect(page.locator('[data-test="product-name"]')).toBeVisible();

    //Assert that quantity is 1 by default
    await expect(page.locator('[data-test="quantity"]')).toHaveValue('1');
    
    //Click on + and assert that the value changes
    await page.locator('[data-test="increase-quantity"]').click();
    await expect(page.locator('[data-test="quantity"]')).toHaveValue('2');

    //Add to cart
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByRole("alert", { name: "Product added to shopping cart." }));

    //Assert that shopping cart is visible and has a 2 label
    await expect(page.locator('[data-test="nav-cart"]')).toBeVisible();
    await expect(page.locator('[data-test="nav-cart"]')).toHaveText('2');

});