import { browser, by, element, ElementFinder } from 'protractor';

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
         this.selectedSubjects = this.getSelectedSubjectsInput();
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
     * @param input
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
     * @param input
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
     * Returns the url element in the DOM
     */
    private getSelectedSubjectsInput() {
      return element(by.css('[name="subject"]'));
    }

    /**
     * Sends the given input string to the url element in the DOM
     * @param input
     */
    inputSelectedSubjects(input: string) {
        this.selectedSubjects.sendKeys(input);
    }

    /**
     * Returns the current value of the url element in the DOM
     */
    getSelectedSubjectsValue() { 
        return this.selectedSubjects.getAttribute('value');
    }

    /**
     * Returns the format radio button element in the DOM
     */
    private getCodeRadio(){
        return element(by.css('[id="radio-2"]'));
    }

    /**
     * Clicks the admin radio button element in the DOM
     */
    clickCodeRadio(){
        this.codeRadio.click();
    }

    /**
     * Returns the document radio button element in the DOM
     */
    private getDocumentRadio(){
      return element(by.css('[id="radio-2"]'));
    }

    /**
     * Clicks the document radio button element in the DOM
     */
    clickDocumentRadio(){
        this.documentRadio.click();
    }

    /**
     * Returns the checked radio element if one a radio element is checked
     */
    getCheckedRadioValue(){
        if(element(by.css('[type="checked"]'))){
            return element(by.css(':checked')).getAttribute('value');
        }
        else {
            return '';
        }
    }

    private getSubmitButton(){
      // return element(by.xpath('/html/body/app-component/div/app-create-user/form/button'));
      return element(by.css('[type="button"]'));
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

    refresh(){
      return browser.refresh();
    }
}
