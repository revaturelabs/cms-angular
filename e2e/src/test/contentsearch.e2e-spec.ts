import { SearchPage } from './contentsearch.po';
import { browser, logging } from 'protractor';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

describe('workspace-project App', () => {
  let findContent           : SearchPage;
  let title                 : string;
  let selectedSubjects      : string[];

  beforeAll(() => {
    findContent = new SearchPage();
    title = "CMS";
    selectedSubjects = ["Java"];
    findContent.navigateTo();
  });

  beforeEach(() => {
    browser.manage().timeouts().implicitlyWait(5000);
  });

  it('should accept title input', () => {
    findContent.inputTitle(title);
    expect(findContent.getTitleValue()).toEqual(title);
  });

  it('should accept selected subjects input', () => {
    findContent.enterSelectedSubjects(selectedSubjects);
  });

  it('should select Document radio button', () => {
    findContent.clickDocumentRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('Document');
  });

  it('should select Code radio button', () => {
    findContent.clickCodeRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('Code');
  });

  it('should select All radio button', () => {
    findContent.clickAllRadio();
    expect(findContent.getCheckedRadioValue()).toEqual('All');
  }); 

  it('should click submit button', () => {
    browser.sleep(1000);
    findContent.clickSearchButton();
  });

  it('should click trash can icon', () => {
    browser.sleep(10000);
    findContent.clickDeleteTag();
    browser.sleep(1000);
    findContent.clickDeleteTagConfirmButton();
  });

  it('should click add tags button', () =>{
    browser.sleep(1000);
    findContent.enterAddTag(selectedSubjects);
  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
