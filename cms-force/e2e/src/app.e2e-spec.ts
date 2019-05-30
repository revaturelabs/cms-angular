import { AppPage } from './app.po';
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
    url = 'www.testy.test';
    selectedSubjects = ["elmo"];
    description = "Test description."
    createContent.navigateTo();
  });

  beforeEach(() => {
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
  //   createContent.inputSelectedSubjects(selectedSubjects);
  //   expect(createContent.getTitleValue()).toEqual(title);
  // });

  it('should accept description input', () => {
    createContent.inputDescription(description);
    expect(createContent.getDescriptionValue()).toEqual(description);
  });

  it('should select Code radio button', () => {
    createContent.clickDocumentRadio();
    expect(createContent.getCheckedRadioValue()).toEqual('Document');
  });

  it('should select Document radio button', () => {
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
