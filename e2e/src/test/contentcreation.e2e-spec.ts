import { AppPage } from './contentcreation.po';
import { ModuleCreatePage } from './modulecreation.po';
import { SearchPage } from './contentsearch.po';
import { browser, logging } from 'protractor';
import { ContentCreatorPageComponent } from 'src/app/components/content-creator-page/content-creator-page.component';

describe('workspace-project App', () => {
  let createContent         : AppPage;
  let title                 : string[] = [];
  let url                   : string[] = [];
  let selectedSubjects      : string[];
  let description           : string[] = [];
  let findContent           : SearchPage;
  let moduleCreate          : ModuleCreatePage;

  beforeAll(() => {
    createContent = new AppPage();
    findContent = new SearchPage();
    moduleCreate = new ModuleCreatePage();
    selectedSubjects = [Math.random().toString(36).substring(7), Math.random().toString(36).substring(7)];
    moduleCreate.navigateTo();
    for (let i = 0; i < 2; i++) {
      moduleCreate.inputSubject(selectedSubjects[i]);
      expect(moduleCreate.getSubjectValue()).toEqual(selectedSubjects[i]);
      browser.sleep(1000);
      moduleCreate.clickSubmitButton();
      moduleCreate.acceptAlert();
    }
    createContent.navigateTo();
    for (let i = 0; i < 3; i++) {
      title.push(Math.random().toString(36).substring(7));
      url.push(Math.random().toString(36).substring(7));
      description.push(Math.random().toString(36).substring(7));
    }
  });

  beforeEach(() => {
    browser.manage().timeouts().implicitlyWait(3000);
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
      browser.sleep(1000);
      createContent.clickSubmitButton();
      createContent.acceptAlert();
    }
  });

  it('should search for all content.', () => {
    findContent.navigateTo();
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');
    browser.sleep(1000);
    findContent.clickSearchButton();
    browser.waitForAngular();
    
  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
