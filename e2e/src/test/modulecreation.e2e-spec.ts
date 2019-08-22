import { ModuleCreatePage } from './modulecreation.po';
import { AppPage } from './contentcreation.po';
import { SearchPage } from './contentsearch.po';
import { browser, logging } from 'protractor';
import { ModuleIndexPage } from './moduleindex.po';

describe('workspace-project App', () => {
  let moduleCreate          : ModuleCreatePage;
  let selectedSubjects      : string[];
  let createContent         : AppPage;
  let title                 : string[] = [];
  let url                   : string[] = [];
  let description           : string[] = [];
  let findContent           : SearchPage;
  let moduleIndex           : ModuleIndexPage;

  //beforeAll will have the page ready to to test, in other words, the preparation
  //that we need to perform this test
  //in this case, we have to .....
  beforeAll(() => {

    //creating obejcts of pages that will involved in this test
    moduleCreate = new ModuleCreatePage();
    createContent = new AppPage();
    findContent = new SearchPage();
    moduleIndex = new ModuleIndexPage();

    //subjects is an array consisted with two random strings
    selectedSubjects = [Math.random().toString(36).substring(7), Math.random().toString(36).substring(7)];

    //naviagting to modulw creation page
    moduleCreate.navigateTo();

    //creating two modules from the module creator page
    for (let i = 0; i < 2; i++) {
      //this will accept 2 subject inputs/modules
      moduleCreate.inputSubject(selectedSubjects[i]);
      //make sure current value of the subject field in the DOM is equals to two modules created
      expect(moduleCreate.getSubjectValue()).toEqual(selectedSubjects[i]);
      //and then click the submit button
      browser.sleep(500);
      moduleCreate.clickSubmitButton();
      //and the alert will say: Successfully sent module
      moduleCreate.acceptAlert();
    }
  });

  beforeEach(() => {
    browser.manage().timeouts().implicitlyWait(1000);
  });

  it('should expand each modules in the Module Index page', () => {

    //this navigate to module index page
    moduleIndex.navigateTo();

    //and expand each modules and show contents for the apporiate modules and flags for the empty ones
    for(let i = 0; i < 2; i++) {
      //make sure that the module we created should be showed and we able to find it in the Module Index page
      expect(moduleIndex.getModuleBySubject(selectedSubjects[i])).toBeDefined();
      //if the module is found click on those modules to expand the table
      moduleIndex.clickModule(selectedSubjects[i]);
      //it should be able empty right now, and flagged
    }
    //the one with flag will have empty content, in this case two modules just created wil be flagged
  });

  //this will create three contents with different types with "Module1"
  it('should create contents with title, url, description, module and different types.', () => {
    
    //navigation to content creater page
    createContent.navigateTo();
    //randomized the input for title, url (in format of: http://www.__random_string___.com ), and description for 3 times
    for (let i = 0; i < 3; i++) {
      title.push(Math.random().toString(36).substring(7));
      url.push("http://www." + Math.random().toString(36).substring(7) + ".com");
      description.push(Math.random().toString(36).substring(7));
    }

    for (let i = 0; i < 3; i++) {
      //input 3 different titles for each creation with different types
      createContent.inputTitle(title[i]);
      expect(createContent.getTitleValue()).toEqual(title[i]);
      //input 3 different urls for each creation with different types
      createContent.inputUrl(url[i]);
      expect(createContent.getUrlValue()).toEqual(url[i]);
      //since we created two modules in the begining and we want to grab the one in the first index, which is index 0
      createContent.enterSelectedSubjects([selectedSubjects[0]]);
      //input 3 different desciptions for each creation with different types
      createContent.inputDescription(description[i]);
      expect(createContent.getDescriptionValue()).toEqual(description[i]);
      //click on the corresponding Radio button with the index. 
      //index 0 = Code ; index 1 = Document ; index 2 = PowerPoints
      createContent.clickRadio(i);
      browser.sleep(1000);
      //click the submit button to submit the content. should show alert of "Successfully sent content"
      createContent.clickSubmitButton();
      //showing alert Successfully sent every time you created the content
      createContent.acceptAlert();
    }

  });

  it('should go back to Module Index page again, and expends modules again, should have 3 content for "Module1"', () => {
    
    //this navigate back to module index page
    moduleIndex.navigateTo();
    //and expand each modules and show contents for the apporiate modules and flags for the empty ones
    for(let i = 0; i < 2; i++) {
      //the one with flag will have empty content
      //It will show 3 contents for the "Module1"
      expect(moduleIndex.getModuleBySubject(selectedSubjects[i])).toBeDefined();
      //click on the modules to expande; should click on the two we just created
      moduleIndex.clickModule(selectedSubjects[i]);
    }
  });

  it('should search for content by tag', () => {
    //navigate to the content finder page
    findContent.navigateTo();
    //this will click on the radio button, where it is 'All', which will return all types of content
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');

    //enterSekectedSubjects is a funtion that takes a string
    //In this case, it will be the first module we created
    findContent.enterSelectedSubjects([selectedSubjects[0]]);
    //click on the Search button
    findContent.clickSearchButton();

    for(let i = 2; i >= 0; i--) {
      //make sure that table is showed after clicking search button
      //in other words: there will be content with tag (module just created) appear in the table
      expect(findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();
    }
  });
  
  it('should search for content by name', async () => {
    //search by entering the title
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');

    //loop through all the title we created
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


  //clean up the mess... deleteing the modules and content that we created to complete the e2e test
  it('should go back to Module Index page again, and expends modules again, should have 3 content for "Module1" and "module2"', async () => {
    //navigate back to the module index page
    moduleIndex.navigateTo();
    for(let i = 0; i < 2; i++) {
      // Make sure that we are able to access specific rows of the page, by the name of the module
      expect( await moduleIndex.getModuleBySubject(selectedSubjects[i])).toBeDefined();

      if(i == 0) {
        //deleting first content from the first module we created
        await moduleIndex.deleteContentFromModule(title[0], url[0], description[0], selectedSubjects[0]);
        browser.sleep(2000);
        //go back to the content finder page
        findContent.navigateTo();

        //this is checking that first tag/module is removed from the content with that title
        findContent.inputTitle(title[0]);
        findContent.clickAllRadio();
        findContent.clickSearchButton();
        //make sure that in the module column, we have only one tag, which is not the first module we created
        findContent.confirmTagNotListed(selectedSubjects[0]);
        browser.sleep(2000);
        //and then naviage to the module index page
        moduleIndex.navigateTo();
        browser.sleep(500);
      }

      // Delete both module
      await moduleIndex.deleteModule(selectedSubjects[i]);
    }

    //go back to the content finder page
    findContent.navigateTo();
    
    //now we can search by the flagged, because modules we created are removed
    //so all the content should be flagged, if we created with these two modules
    for(let i = 0; i < 3; i++) {
      //so, click on the flagged radio and click search button
      findContent.clickFlaggedRadio();
      await browser.sleep(1000);
      findContent.clickSearchButton();

      //confirm that the content was listed
      expect(await findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();

      //then delete the content overall
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
