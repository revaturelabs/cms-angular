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

  beforeAll(() => {
    browser.waitForAngularEnabled(true);
    createContent = new AppPage();
    findContent = new SearchPage();
    moduleCreate = new ModuleCreatePage();
    moduleIndex = new ModuleIndexPage();
    selectedSubjects = [Math.random().toString(36).substring(7), Math.random().toString(36).substring(7)];
    moduleCreate.navigateTo();
    for (let i = 0; i < 2; i++) {
      moduleCreate.inputSubject(selectedSubjects[i]);
      expect(moduleCreate.getSubjectValue()).toEqual(selectedSubjects[i]);
      // browser.sleep(1000);
      moduleCreate.clickSubmitButton();
      moduleCreate.acceptAlert();
    }
    createContent.navigateTo();
    for (let i = 0; i < 3; i++) {
      title.push(Math.random().toString(36).substring(7));
      url.push("http://www." + Math.random().toString(36).substring(7) + ".com");
      description.push(Math.random().toString(36).substring(7));
    }
  });

  beforeEach(() => {
    // browser.manage().timeouts().implicitlyWait(3000);
  });

  it('should create a piece of content with a title, URL, subject tags, and description.', () => {
    for (let i = 0; i < 3; i++) {
      createContent.inputTitle(title[i]);
      expect(createContent.getTitleValue()).toEqual(title[i]);
      createContent.inputUrl(url[i]);
      expect(createContent.getUrlValue()).toEqual(url[i]);
      createContent.enterSelectedSubjects([selectedSubjects[0]]);
      createContent.inputDescription(description[i]);
      expect(createContent.getDescriptionValue()).toEqual(description[i]);
      createContent.clickRadio(i);
      // browser.sleep(1000);
      createContent.clickSubmitButton();
      createContent.acceptAlert();
    }
  });

  it('should search for all content.', () => {
    findContent.navigateTo();
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');
    // browser.sleep(500);
    findContent.clickSearchButton();
    browser.waitForAngular();
    
    for(let i = 2; i >= 0; i--) {
      expect(findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();
    }
  });

  it('should search for content by tag', () => {
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');
    findContent.enterSelectedSubjects([selectedSubjects[0]]);
    findContent.clickSearchButton();

    for(let i = 2; i >= 0; i--) {
      expect(findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();
    }
  });

  it('should search for content by type', () => {
    findContent.refresh();

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
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');

    for(let i = 0; i < 3; i++) {
      findContent.inputTitle(title[i])
      findContent.clickSearchButton();
      expect(await findContent.confirmSingleContent(title[i], url[i], description[i], selectedSubjects[1])).toBeTruthy();
    }
  });

  it('should delete modules and content', async () => {
    moduleIndex.navigateTo();
    for(let i = 0; i < 2; i++) {
      expect( await moduleIndex.getModuleBySubject(selectedSubjects[i])).toBeDefined();
      // await moduleIndex.clickModule(selectedSubjects[i]);
      // browser.sleep(5000);

      // For only the first module
      if(i == 0) {
        // await browser.getCurrentUrl().then(url => {
        //   console.log(url);
        // });
        await moduleIndex.deleteContentFromModule(title[0], url[0], description[0], selectedSubjects[0]);
        browser.sleep(1000);
        findContent.navigateTo();

        findContent.inputTitle(title[0]);
        findContent.clickAllRadio();
        findContent.clickSearchButton();
        findContent.confirmTagNotListed(selectedSubjects[0]);
        moduleIndex.navigateTo();
      }

      await moduleIndex.deleteModule(selectedSubjects[i]);
    }

    findContent.navigateTo();

    findContent.clickFlaggedRadio();
    findContent.clickSearchButton();

    for(let i = 0; i < 3; i++) {
      expect(findContent.confirmContentExists(title[i], url[i], description[i])).toBeTruthy();

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
