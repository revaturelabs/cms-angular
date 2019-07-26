import { browser, by, element, ElementFinder, protractor } from 'protractor';

export class AppPage {
    private title                : ElementFinder;
    private url                  : ElementFinder;
    private selectedSubjects     : ElementFinder;
    private description          : ElementFinder;
    private codeRadio            : ElementFinder;
    private documentRadio        : ElementFinder;

    constructor() {
         this.title = this.getTitleInput();
         this.url = this.getUrlInput();
         this.selectedSubjects = this.getSelectedSubjectsSelect();
         this.description = this.getDescriptionInput();
         this.codeRadio = this.getCodeRadio();
         this.documentRadio = this.getDocumentRadio();
    }

    navigateTo() {
      return browser.get(browser.baseUrl) as Promise<any>;
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
        return element(by.css('[name="title"]'));
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

    /**
     * Returns the url element in the DOM
     */
    private getUrlInput() {
      return element(by.css('[name="url"]'));
    }

    /**
     * Sends the given input string to the url element in the DOM
     * @param input
     */
    inputUrl(input: string) {
        this.url.sendKeys(input);
    }

    /**
     * Returns the current value of the url element in the DOM
     */
    getUrlValue() { 
        return this.url.getAttribute('value');
    }

    /**
     * Returns the description element in the DOM
     */
    private getDescriptionInput() {
      return element(by.css('[name="description"]'));
    }

    /**
     * Sends the given input string to the description element in the DOM
     * @param input: string
     */
    inputDescription(input: string) {
        this.description.sendKeys(input);
    }

    /**
     * Returns the current value of the description element in the DOM
     */
    getDescriptionValue() { 
        return this.description.getAttribute('value');
    }

    /**
     * Returns the "select relevant subjects..." element in the DOM
     */
    private getSelectedSubjectsSelect() {
      return element(by.css('[name="selectedSubjects"]'));
    }

    /**
     * Enters the given input string[] into the selectedSubjects element in the DOM
     * @param input: string[]
     */
    enterSelectedSubjects(inputs: string[]) {
        this.selectedSubjects.click();
        inputs.forEach( (input) => {
            browser.actions().sendKeys(input).perform();
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        });
    }

    /**
     * Returns the code radio button element in the DOM
     */
    private getCodeRadio(){
        return element(by.css('[id="Code"]'));
    }

    /**
     * Clicks the code radio button element in the DOM
     */
    clickCodeRadio(){
        browser.actions().mouseMove(this.codeRadio).click().perform();
    }

    /**
     * Returns the document radio button element in the DOM
     */
    private getDocumentRadio() {
      return element(by.id("Document"));
    }

    /**
     * Clicks the document radio button element in the DOM
     */
    clickDocumentRadio() {
        browser.actions().mouseMove(this.documentRadio).click().perform();
    }

    /**
     * Returns the checked radio element if a radio element is checked
     */
    getCheckedRadioValue(){
        if(element(by.css('[type="checked"]'))){
            return element(by.css(':checked')).getAttribute('id');
        }
        else {
            return '';
        }
    }

    private getSubmitButton(){
      // return element(by.xpath('/html/body/app-component/div/app-create-user/form/button'));
      return element(by.id("submitButton"));
    }

    clickSubmitButton(){
      this.getSubmitButton().click();
    }

    // getAlert(){
    //   return element(by.css('body > app-component > div > app-create-user > form > fieldset:nth-child(2) > div'));
    // }
    // getUserNameAlert(){
    //   return element(by.xpath('//*[@id="error-username"]'));
    // }

    acceptAlert() {
        let EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000, "Alert is not getting present :(");
        browser.switchTo().alert().accept();
    }

    refresh(){
      return browser.refresh();
    }
}
