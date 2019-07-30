import {
    browser,
    by,
    element,
    ElementFinder,
    protractor
} from 'protractor';

export class PopulateModulePage {
    private title: ElementFinder;

    constructor() {
        this.title = this.getTitleInput();
    }

    navigateTo() {
        return browser.get(browser.baseUrl+"module-creator") as Promise < any > ;
    }

    /**
     * Returns the current URL in the browser
     */
    getCurrentURL() {
        return browser.getCurrentUrl();
    }

    /**
     * Returns the title element in the DOM
     */
    private getTitleInput() {
        return element(by.css('[name="subject"]'));
    }

    /**
     * Sends the given input string to the title element in the DOM
     * @param input: string
     */
    inputTitle(input: string) {
        this.title.sendKeys(input);
    }

    /**
     * Returns the current value of the title element in the DOM
     */
    getTitleValue() {
        return this.title.getAttribute('value');
    }

    private getSubmitButton() {
        return element(by.id("submitButton"));
    }

    clickSubmitButton() {
        this.getSubmitButton().click();
    }

    pressEnter() {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    acceptAlert() {

        browser.wait(() => element(by.css('.toast-message')).isPresent(), 5000, "Alert is not getting present :(");

        if (element(by.css('.toast-message')).isPresent())
            element(by.css('.toast-message')).click();
    }

    refresh() {
        return browser.refresh();
    }
}