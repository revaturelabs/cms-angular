import { browser, by, element, ElementFinder, protractor } from 'protractor';

export class ModuleCreatePage {
    private subject: ElementFinder;

    constructor() {
        this.subject = this.getSubjectInput();
    }

    // Navigates site to module-creator location
    navigateTo() {
        return browser.get(browser.baseUrl + "module-creator") as Promise<any>;
    }

    /**
     * Returns the current URL in the browser
     */
    getCurrentURL() {
        return browser.getCurrentUrl();
    }

    /**
     * Returns the subject field in the DOM
     */
    private getSubjectInput() {
        return element(by.css('[name="subject"]'));
    }

    /**
     * Sends the given input string to the subject field in the DOM
     * @param input: string
     */
    inputSubject(input: string) {
        this.subject.sendKeys(input);
    }

    /**
     * Returns the current value of the subject field in the DOM
     */
    getSubjectValue() {
        return this.subject.getAttribute('value');
    }

    // Used to fetch submit button
    private getSubmitButton() {
        return element(by.id("submitButton"));
    }

    // Clicks submit button
    clickSubmitButton() {
        this.getSubmitButton().click();
    }

    // Accepts toaster alert by waiting for the alert to pop up and testing if it is present
    // , if so, clicks it
    acceptAlert() {

        browser.wait(() => element(by.css('.toast-message')).isPresent(), 5000, "Alert is not getting present :(");

        if (element(by.css('.toast-message')).isPresent())
            element(by.css('.toast-message')).click();
    }

    // Used to automatically refresh page upon being called
    refresh() {
        return browser.refresh();
    }
}
