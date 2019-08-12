import {
  browser,
  by,
  element,
  ElementFinder,
  protractor
} from 'protractor';

export class SearchPage {
  private title: ElementFinder;
  private codeRadio: ElementFinder;
  private documentRadio: ElementFinder;
  private allRadio: ElementFinder;
  private selectedSubjects: ElementFinder;
  private addTagsSelector: ElementFinder;
  private deleteTagsSelector: ElementFinder;
  private deleteTagConfirmButton: ElementFinder;

  constructor() {
    this.title = this.getTitleInput();
    this.codeRadio = this.getCodeRadio();
    this.documentRadio = this.getDocumentRadio();
    this.allRadio = this.getAllRadio();
    this.selectedSubjects = this.getSelectedSubjectsSelect();
    this.addTagsSelector = this.getAddTagsSelector();
    this.deleteTagsSelector = this.getDeleteTagsSelector();
    this.deleteTagConfirmButton = this.getDeleteTagConfirmButton();
  }

  navigateTo() {
    return browser.get(browser.baseUrl + "/finder") as Promise < any > ;
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
  private getSelectedSubjectsSelect() {
    return element(by.css('[name="selectedSubjects"]'));
  }

  /**
   * Returns the element for adding tags
   */
  private getAddTagsSelector() {
    return element(by.css('.plusCenter'));
  }

  enterAddTag(inputs: string[]) {
    this.addTagsSelector.click();
    browser.sleep(1000);
    let addSelectedTags: ElementFinder = element(by.css('[name=addTags]'));
    let addSelectedTagsButton: ElementFinder = element(by.css('.addATag'));
    addSelectedTags.click();
    inputs.forEach((input) => {
      browser.actions().sendKeys(input).perform();
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });
    addSelectedTagsButton.click();
  }


  /**
   * Returns the element for deleting tags
   */
  private getDeleteTagsSelector() {
    return element(by.css('.fa-trash'));
  }

  clickDeleteTag() {
    this.deleteTagsSelector.click();
  }

  private getDeleteTagConfirmButton() {
    return element(by.css('[name=confirmDeleteTag]'))
  }

  clickDeleteTagConfirmButton() {
    this.deleteTagConfirmButton.click();
  }

  /**
   * Sends the given input string to the url element in the DOM
   * @param input
   */
  enterSelectedSubjects(inputs: string[]) {
    this.selectedSubjects.click();
    inputs.forEach((input) => {
      browser.actions().sendKeys(input).perform();
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });
  }

  /**
   * Returns the format radio button element in the DOM
   */
  private getCodeRadio() {
    return element(by.css('[id="Code"]'));
  }

  /**
   * Clicks the admin radio button element in the DOM
   */
  clickCodeRadio() {
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
   * Returns the all radio button element in the DOM
   */
  private getAllRadio() {
    return element(by.id("All"));
  }

  /**
   * Clicks the all radio button element in the DOM
   */
  clickAllRadio() {
    browser.actions().mouseMove(this.allRadio).click().perform();
  }


  /**
   * Returns the checked radio element if one a radio element is checked
   */
  getCheckedRadioValue() {
    if (element(by.css('[type="checked"]'))) {
      return element(by.css(':checked')).getAttribute('id');
    } else {
      return '';
    }
  }

  private getFindContentButton() {
    return element(by.id("submitButton"));
  }

  clickSearchButton() {
    this.getFindContentButton().click();
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
