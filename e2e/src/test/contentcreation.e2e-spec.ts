import { AppPage } from './contentcreation.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let createContent         : AppPage;
  let title                 : string;
  let url                   : string;
  let selectedSubjects      : string[];
  let description           : string;

  beforeAll(() => {
    createContent = new AppPage();
    title = Math.random().toString(36).substring(7);
    url = 'http://www.test.com';
    selectedSubjects = ["Java", "CSS"];
    description = "Test description."
    createContent.navigateTo();
  });

  beforeEach(() => {
    browser.manage().timeouts().implicitlyWait(5000);
  });

  it('should accept title input', () => {
    createContent.inputTitle(title);
    expect(createContent.getTitleValue()).toEqual(title);
  });

  it('should accept url input', () => {
    createContent.inputUrl(url);
    expect(createContent.getUrlValue()).toEqual(url);
  });

  // only enters values
  it('should accept selected subjects input', () => {
    createContent.enterSelectedSubjects(selectedSubjects);
    // browser.sleep(5000); // to manually check, uncomment.
  });

  it('should accept description input', () => {
    createContent.inputDescription(description);
    expect(createContent.getDescriptionValue()).toEqual(description);
  });

  it('should select Document radio button', () => {
    createContent.clickDocumentRadio();
    expect(createContent.getCheckedRadioValue()).toEqual('Document');
  });

  it('should select Code radio button', () => {
    createContent.clickCodeRadio();
    expect(createContent.getCheckedRadioValue()).toEqual('Code');
  });

  it('should click submit button', () => {
    browser.sleep(1000);
    createContent.clickSubmitButton();
    createContent.acceptAlert();
  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
