import { AppPage } from './contentcreation.po';
import { ModuleCreatePage } from './modulecreation.po';
import { ModuleIndexPage } from './moduleindex.po';
import { SearchPage } from './contentsearch.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let createContent         : AppPage;
  let title                 : string[] = [];
  let url                   : string[] = [];
  let selectedSubjects      : string[];
  let description           : string[] = [];
  let findContent           : SearchPage;
  let moduleCreate          : ModuleCreatePage;
  let moduleIndex           : ModuleIndexPage;

  /*
   * DISCLAIMER: Some of these tests utilize browser.sleep(), and some also use the await keyword.
   * Some of these are necessary, and some are not (or could be shorter). However, be careful with what is
   * modified, as some are needed only for certain platforms. For example, it might work on Windows without
   * the browser.sleep(), but a Linux computer might fail the tests without it. Much testing/tinkering is
   * needed to determine which ones are strictly necessary. As of now, there are likely some unneccesary ones,
   * but the tests pass. So the recommendation is to first attempt to reduce the time, and if the test still
   * passes, then try to remove the browser.sleep(). Also, make sure to test on different kinds of machines,
   * such as Windows, Linux, Mac, and even some faster and some slower machines.
   * 
   * Additional Note: The async keyword is listed before many function names. This is required in order to
   * use the await keyword. This await keyword was needed due to the above disclaimer, and in order to
   * enforce that statements occur synchronously. By default, protractor structures things as promises,
   * which are performed asynchronously. This would be fine if we had access to some methods in Protractor,
   * but unfortunately the ones we need only support AngularJS, and NOT Angular 2+. Due to this, we have
   * to open the promises with the then keyword, and make sure the statements are performed synchronously
   * by using the await keyword.
   */
  beforeAll(() => {
    // This line is already true by default, but this is explicitly here for safety.
    browser.waitForAngularEnabled(true);
    createContent = new AppPage();
    findContent = new SearchPage();
    moduleCreate = new ModuleCreatePage();
    moduleIndex = new ModuleIndexPage();
    /*
     * The testing plan is to create 2 modules (stored in selectedSubjects array), and 3 contents (one of each type).
     * Each content will be created with the first of the 2 modules. After switching to the content finder page,
     * the search functionality is heavily tested. Searching for all, searching by module, by type, and by name.
     * Then the test will move onto the module index page. It will expand the 1st module, remove the 1st content
     * from it, and go back to the content finder page to confirm that the module 1 tag is missing. Then the test
     * moves on to clean up what was created by deleting the modules. Going back to the content finder, it confirms
     * that the 3 contents are now flagged before finally deleting them and concluding the test.
     */

     // This Math.random() statement generates a 7 alphanumeric character string of text.
    selectedSubjects = [Math.random().toString(36).substring(7), Math.random().toString(36).substring(7)];

    // The 2 modules are generated
    moduleCreate.navigateTo();
    for (let i = 0; i < 2; i++) {
      moduleCreate.inputSubject(selectedSubjects[i]);
      expect(moduleCreate.getSubjectValue()).toEqual(selectedSubjects[i]);
      moduleCreate.clickSubmitButton();
      moduleCreate.acceptAlert();
    }

    // The title, url, and description for the 3 different contents are generated, to be actually
    // used later.
    createContent.navigateTo();
    for (let i = 0; i < 3; i++) {
      title.push(Math.random().toString(36).substring(7));
      url.push("http://www." + Math.random().toString(36).substring(7) + ".com");
      description.push(Math.random().toString(36).substring(7));
    }
  });

  it('should create a piece of content with a title, URL, subject tags, and description.', () => {

    // For each of the 3 different contents
    for (let i = 0; i < 3; i++) {
      // Enter the title and assert that the text is listed
      createContent.inputTitle(title[i]);
      expect(createContent.getTitleValue()).toEqual(title[i]);

      // Enter the url and assert that the text is listed.
      createContent.inputUrl(url[i]);
      expect(createContent.getUrlValue()).toEqual(url[i]);

      // Enter the first module
      createContent.enterSelectedSubjects([selectedSubjects[0]]);

      // Enter the description and assert that the text is listed
      createContent.inputDescription(description[i]);
      expect(createContent.getDescriptionValue()).toEqual(description[i]);

      // This is a method that uses an index to click on a radio button.
      // It goes in order of the radio buttons listed on the webpage
      createContent.clickRadio(i);
      createContent.clickSubmitButton();
      createContent.acceptAlert();
    }
  });

  it('should search for all content.', () => {
    // Switch to the content finder page to search for the previously created content
    findContent.navigateTo();

    // First click the radio button to search for all content and assert that the button
    // is actually checked
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');

    // Then click the search button
    findContent.clickSearchButton();
    browser.waitForAngular();
    
    // Uses a method that will confirm that the given content is in at least one of the rows
    // in the result.
    // This is done for each of the 3 contents.
    for(let i = 2; i >= 0; i--) {
      expect(findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();
    }
  });

  it('should search for content by tag', () => {
    // Now to search by the 1st module that was linked to the contents

    // Click the all radio button again
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');

    // Enter the 1st module and click the search button
    findContent.enterSelectedSubjects([selectedSubjects[0]]);
    findContent.clickSearchButton();

    // Uses same method as before to confirm that the given content was found
    for(let i = 2; i >= 0; i--) {
      expect(findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();
    }
  });

  it('should search for content by type', () => {

    // The page is refreshed to easily remove the tag that was previously added
    findContent.refresh();

    // Each type is searched, one at a time, and confirmed that the given content was found
    findContent.clickCodeRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('Code');
    findContent.clickSearchButton();
    expect(findContent.confirmContentExists(title[0], url[0], description[0])).toBeTruthy();

    findContent.clickDocumentRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('Document');
    findContent.clickSearchButton();
    expect(findContent.confirmContentExists(title[1], url[1], description[1])).toBeTruthy();

    findContent.clickPowerpointRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('Powerpoint');
    findContent.clickSearchButton();
    expect(findContent.confirmContentExists(title[2], url[2], description[2])).toBeTruthy();
  });

  it('should search for content by name', async () => {
    // Same searching process, except entering the title
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');

    for(let i = 0; i < 3; i++) {
      findContent.inputTitle(title[i])
      findContent.clickSearchButton();

      // This time we used a new method, that additionally confirms that there was only a single result found
      // in the search. If there is any amount other than 1 result, this method's internal expect will fail
      // The last parameter is an optional parameter to add another tag via the plus button to the single content
      // that was found
      expect(await findContent.confirmSingleContent(title[i], url[i], description[i], selectedSubjects[1])).toBeTruthy();
    }
  });

  it('should delete modules and content', async () => {
    // Now the test moves onto cleaning up the modules and content

    // Go to the module index page
    moduleIndex.navigateTo();
    for(let i = 0; i < 2; i++) {
      // Make sure that we are able to access specific rows of the page, by the name of the module
      expect( await moduleIndex.getModuleBySubject(selectedSubjects[i])).toBeDefined();

      // For only the first module we remove the 1st content from the module
      // This is just to test another feature that tags can be removed from this page.
      if(i == 0) {
        // This method finds a particular row of content inside of a given module, and removes it
        // from the module
        await moduleIndex.deleteContentFromModule(title[0], url[0], description[0], selectedSubjects[0]);
        browser.sleep(2000);

        // Move to the content finder page to confirm that the removed module is actually removed
        findContent.navigateTo();

        // Search the 1st content by name
        findContent.inputTitle(title[0]);
        findContent.clickAllRadio();
        findContent.clickSearchButton();

        // This method confirms that for a singular result, that a particular tag is not listed as a link
        findContent.confirmTagNotListed(selectedSubjects[0]);
        browser.sleep(2000);

        // Move back to the module index page to delete modules
        moduleIndex.navigateTo();
        browser.sleep(500);
      }

      // Delete the module
      await moduleIndex.deleteModule(selectedSubjects[i]);
    }

    // Go back to the content finder page
    findContent.navigateTo();
    
    // Search by flagged and make sure the content we created are now properly listed with flags
    for(let i = 0; i < 3; i++) {
      // Click the flagged radio button
      findContent.clickFlaggedRadio();
      await browser.sleep(1000);
      findContent.clickSearchButton();

      // Confirm that the content was listed
      expect(await findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();

      // Then delete the content overall
      await findContent.deleteContent(title[i], url[i], description[i]);
    }

  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
