import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cartButton: Locator;
    readonly sortDropdown: Locator;
    readonly productLink: Locator;
    readonly price: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartButton = page.locator('[data-test="nav-cart"]');
        this.sortDropdown = page.locator('[data-test="sort"]');
        this.productLink = page.locator('[data-test="product-name"]');
        this.price = page.locator('[data-test="product-price"]');
        this.searchInput = page.getByRole("textbox", { name: "Search" });
        this.searchButton = page.getByRole("button", { name: "Search" });
        this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
        this.removeFromCartButton = page.locator('.btn.btn-danger');
    }

    async open(): Promise<void> {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }

    async addItemToCart(product: string): Promise<void> {
        await this.searchInput.fill(product);
        await this.searchButton.click();
        await this.productLink.getByText(product, { exact: true }).click();
        await this.addToCartButton.click();
    }

    async removeItemFromCart(): Promise<void> {
        await this.cartButton.click();
        await this.removeFromCartButton.first().click();
    }    

}


