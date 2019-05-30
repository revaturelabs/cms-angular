import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let createContent         : AppPage;
  let title                 : string;
  let url                   : string;
  let selectedSubjects      : string;
  let description           : string;

  beforeAll(() => {
    createContent = new AppPage();
    title = Math.random().toString(36).substring(7);
    url = 'www.testy.test';
    selectedSubjects = "elmo";
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

  // it('should accept selected subjects input', () => {
  //   createContent.clickSelectedSubjects();
  //   browser.sleep(5000);
  // });

  it('should accept description input', () => {
    createContent.inputDescription(description);
    expect(createContent.getDescriptionValue()).toEqual(description);
  });

  it('should select Document radio button', () => {
    browser.sleep(2000);
    createContent.clickDocumentRadio();
    expect(createContent.getCheckedRadioValue()).toEqual('Document');
  });

  it('should select Code radio button', () => {
    createContent.clickCodeRadio();
    expect(createContent.getCheckedRadioValue()).toEqual('Code');
  });

  

  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
