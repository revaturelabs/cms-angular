import { ModuleCreatePage } from './modulecreation.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let moduleCreate           : ModuleCreatePage;
  let subject                 : string;

  beforeAll(() => {
    moduleCreate = new ModuleCreatePage();
    subject = Math.random().toString(36).substring(7);
    moduleCreate.navigateTo();
  });

  beforeEach(() => {
    browser.manage().timeouts().implicitlyWait(5000);
  });

  it('should accept subject input', () => {
    moduleCreate.inputSubject(subject);
    expect(moduleCreate.getSubjectValue()).toEqual(subject);
  });

  it('should click submit button', () => {
    browser.sleep(1000);
    moduleCreate.clickSubmitButton();
    moduleCreate.acceptAlert();
  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
