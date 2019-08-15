import {
  browser,
  by,
  element,
  ElementFinder,
  protractor
} from 'protractor';
import { ContentFinderPageComponent } from '../../../src/app/components/content-finder-page/content-finder-page.component';
import { link } from 'fs';

export class SearchPage {
  private title                 : ElementFinder;
  private codeRadio             : ElementFinder;
  private documentRadio         : ElementFinder;
  private powerpointRadio       : ElementFinder;
  private flaggedRadio          : ElementFinder;
  private allRadio              : ElementFinder;
  private selectedSubjects      : ElementFinder;
  private addTagsSelector       : ElementFinder;
  private deleteTagConfirmButton: ElementFinder;

  constructor() {
    this.title = this.getTitleInput();
    this.codeRadio = this.getCodeRadio();
    this.documentRadio = this.getDocumentRadio();
    this.powerpointRadio = this.getPowerpointRadio();
    this.flaggedRadio = this.getFlaggedRadio();
    this.allRadio = this.getAllRadio();
    this.selectedSubjects = this.getSelectedSubjectsSelect();
    this.addTagsSelector = this.getAddTagsSelector();
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
    this.title.clear();
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
  private getDeleteTagsSelector(contentId : number, linkId : number): ElementFinder {
    return element(by.id (ContentFinderPageComponent.generateLinkId (contentId, linkId)));
  }

  clickDeleteTag(contentId : number, linkId : number) {
    this.getDeleteTagsSelector(contentId, linkId).click();
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
   * Returns the powerpoint radio button element in the DOM
   */
  private getPowerpointRadio() {
    return element(by.css('[id="Powerpoint"]'));
  }

  /**
   * Clicks the powerpoint radio button element in the DOM
   */
  clickPowerpointRadio(){
    browser.actions().mouseMove(this.powerpointRadio).click().perform();
  }

  /**
   * Returns the flagged radio button element in the DOM
   */
  private getFlaggedRadio(){
    return element(by.css('[id="Flagged"]'));
  }

  /**
   * Clicks the flagged radio button element in the DOM
   */
  clickFlaggedRadio(){
    browser.actions().mouseMove(this.flaggedRadio).click().perform();
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

  clickRadio(index : number) {
    switch(index) {
      case 0:
        this.clickCodeRadio();
        break;
      case 1:
        this.clickDocumentRadio();
        break;
      case 2:
        this.clickPowerpointRadio();
        break;
      case 3:
        this.clickFlaggedRadio();
        break;
      default:
        this.clickAllRadio();
        break;
    }
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

  async confirmContentExists(title: string, url: string, description: string): Promise<boolean> {
    let found: boolean[] = [false, false, false];

    let rows = element.all(by.tagName("tr"));

    await rows.count().then(async function(length) {

      // Search through every row, looking for given inputs
      // Default behavior is that new content is last, so we search from back to front
      for(let i = length - 1; i >= 1; i--) {

        await rows.get(i).element(by.name("title")).getText().then(function(text: string) {
          if(text === title) {
            found[0] = true;
          }
        });

        await rows.get(i).element(by.name("url")).getText().then(function(text: string) {
          if(text === url) {
            found[1] = true;
          }
        });

        await rows.get(i).element(by.name("description")).getText().then(function(text: string) {
          if(text === description) {
            found[2] = true;
          }
        });

        // If everything has been found, stop searching
        if(!found.includes(false)) {
          break;
        }
      }
    });

    // Return false if any of the parameters was not found
    for(let i = 0; i < 3; i++) {
      if(!found[i]) {
        return false;
      }
    }

    // Return true if all 3 were found
    return true;
  }

  async confirmSingleContent(title: string, url: string, description: string, subject?: string): Promise<boolean> {
    let found: boolean[] = [false, false, false];

    let rows = element.all(by.tagName("tr"));

    expect(rows.count()).toEqual(2);

    await rows.count().then(async function(length) {

      // Search through every row, looking for given inputs
      // Default behavior is that new content is last, so we search from back to front
      for(let i = length - 1; i >= 1; i--) {

        await rows.get(i).element(by.name("title")).getText().then(async function(text: string) {
          if(text === title) {
            found[0] = true;

            rows.get(i).element(by.css(".plusCenter")).click();
            browser.sleep(500);

            let popup: ElementFinder = element(by.css('#addTagPopup'));
            let addSelectedTags: ElementFinder = popup.element(by.css('[name=addTags]'));
            let addSelectedTagsButton: ElementFinder = popup.element(by.css('.addATag'));
            addSelectedTags.click();
            
            browser.actions().sendKeys(subject).perform();
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            addSelectedTagsButton.click();
          }
        });

        await rows.get(i).element(by.name("url")).getText().then(function(text: string) {
          if(text === url) {
            found[1] = true;
          }
        });

        await rows.get(i).element(by.name("description")).getText().then(function(text: string) {
          if(text === description) {
            found[2] = true;
          }
        });

        // If everything has been found, stop searching
        if(!found.includes(false)) {
          break;
        }
      }
    });

    // Return false if any of the parameters was not found
    for(let i = 0; i < 3; i++) {
      if(!found[i]) {
        return false;
      }
    }

    // Return true if all 3 were found
    return true;
  }
}
