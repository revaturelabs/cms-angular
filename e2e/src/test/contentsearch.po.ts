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

  async getNumOfRows(): Promise<number> {
    return element.all(by.tagName("tr")).count();
  }

  confirmTagNotListed(subject: string): void {
    let rows = element.all(by.tagName("tr"));

    expect(rows.count()).toEqual(2);
    expect(rows.get(1).element(by.name("links")).element(by.name(subject)).isPresent()).toBeFalsy();
  }

  /**
   * This helper method will iterate through the rows of the results page (Note: Row 0 is the header of the table).
   * It checks whether a particular content exists within the results. All 3 aspects of the content (title, url, 
   * and description) must appear on the same row for true to be returned. If the content does not exist, or the
   * parameters are only found on different rows then false will be returned.
   * 
   * @param title The title to look for
   * @param url The url to look for
   * @param description The description to look for
   */
  async confirmContentExists(title: string, url: string, description: string): Promise<boolean> {
    // This method utilizes aync and awaits to step through the rows synchronously. The ElementFinder
    // class utilizes promises, so the default behavior is asynchronous. This is great most of the time,
    // but in this case, we want to iterate through the rows step by step.

    // This array represents whether the 3 parameters have been found (in order)
    let found: boolean[] = [false, false, false];

    // We grab the rows
    let rows = element.all(by.tagName("tr"));

    // We open the promise and await for it to finish before continuing.
    // We do so on the row count, as opposed to the rows themselves.
    // This is because we want access to individual rows at a time, to grab specific
    // columns.
    await rows.count().then(async function(length) {

      // Search through every row, looking for given inputs
      // Default behavior is that new content is last, so we search from back to front
      for(let i = length - 1; i >= 1; i--) {
        // We reset the found array at every row to maintain that all parameters were found on the same row.
        // This setup could be refactored into a while loop, but since we need the index anyways, we just
        // use a for loop
        found = [false, false, false];

        // Each one of these blocks evaluates the text of the corresponding column in the row
        // If it matches the parameter, we have found what we are looking for.
        // Note that this also utilizies await to perform these steps synchronously.
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

        // If everything has been found, stop searching to save time
        // Ideally, we could just return true here, and return false outside
        // of the for loop, but we cannot return inside the promise that we
        // are waiting for.
        if(!found.includes(false)) {
          break;
        }
      }
    });

    // Instead we wait until after the promise is completed
    // Return false if any of the parameters was not found
    if(found.includes(false)) {
      return false;
    }
    // Return true if all 3 were found
    return true;
  }

  /**
   * This method is similar to confirmContentExists(), except we expect that there are only 2 rows
   * (The header as well as a single content row). Additionally, for utility, there is an
   * optional parameter to add a module to the located content.
   * 
   * @param title The title to look for
   * @param url The url to look for
   * @param description The description to look for
   * @param subject Optional subject/tag to add to the located content
   */
  async confirmSingleContent(title: string, url: string, description: string, subject?: string): Promise<boolean> {
    let found: boolean[] = [false, false, false];

    let rows = element.all(by.tagName("tr"));

    expect(rows.count()).toEqual(2);

    await rows.count().then(async function(length) {

      // Search through every row, looking for given inputs
      // Default behavior is that new content is last, so we search from back to front
      for(let i = length - 1; i >= 1; i--) {

        found = [false, false, false];

        await rows.get(i).element(by.name("title")).getText().then(async function(text: string) {
          if(text === title) {
            found[0] = true;

            // If a subject was included as a parameter
            if(subject) {
              // Click the plus button, and wait half a second for the popup to appear
              rows.get(i).element(by.css(".plusCenter")).click();
              // Note that this short wait is mandatory, as the website is not waiting on
              // any HTTP requests. This means that it will not wait by default, and
              // attempt to add a tag before the popup can be interacted with
              browser.sleep(500);

              let popup: ElementFinder = element(by.css('#addTagPopup'));
              let addSelectedTags: ElementFinder = popup.element(by.css('[name=addTags]'));
              let addSelectedTagsButton: ElementFinder = popup.element(by.css('.addATag'));
              addSelectedTags.click();
            
              browser.actions().sendKeys(subject).perform();
              browser.actions().sendKeys(protractor.Key.ENTER).perform();
              addSelectedTagsButton.click();
            }
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
    if(found.includes(false)) {
      return false;
    }
    // Return true if all 3 were found
    return true;
  }

  async deleteContent(title: string, url: string, description: string) {
    let rows = element.all(by.tagName("tr"));

    let found: boolean[] = [false, false, false];
    let row: ElementFinder = undefined;

    await rows.count().then(async function(length) {

      // Search through every row, looking for given inputs
      // Default behavior is that new content is last, so we search from back to front
      for(let i = length - 1; i >= 1; i--) {

        found = [false, false, false];

        row = rows.get(i);

        await row.element(by.name("title")).getText().then(async function(text: string) {
          if(text === title) {
            found[0] = true;
          }
        });

        await row.element(by.name("url")).getText().then(function(text: string) {
          if(text === url) {
            found[1] = true;
          }
        });

        await row.element(by.name("description")).getText().then(function(text: string) {
          if(text === description) {
            found[2] = true;
          }
        });

        // If everything has been found, stop searching
        if(!found.includes(false)) {
          break;
        }

        row = undefined;
      }
    });

    expect(row).toBeDefined();

    //await browser.sleep(1000);
    await row.element(by.name("trash")).element(by.css(".fa-trash")).click();
    await browser.sleep(2500);

    await element(by.id("deleteContentButton")).click();
  }
}
