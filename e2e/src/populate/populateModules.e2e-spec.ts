import { browser, logging } from 'protractor';
import { PopulateModulePage } from './populateModules.po';

describe('workspace-project App', () => {
   let createModules: PopulateModulePage;
   let i: number;

   let availableSubjects: string[] = [
      "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "AJAX",
      "Java", "Spring", "REST", "JDBC", "Oracle", "RDB", "AWS"
   ];

   beforeAll(() => {
      createModules = new PopulateModulePage();
      createModules.navigateTo();
   });

   beforeEach(() => {
      browser.manage().timeouts().implicitlyWait(5000);
   });

   it('should populate with test modules', () => {
      for (i = 0; i < availableSubjects.length; i++) {
         createModules.inputTitle(availableSubjects[i]);
         expect(createModules.getTitleValue()).toEqual(availableSubjects[i]);

         // browser.sleep(1000); // to manually check, uncomment.

         createModules.clickSubmitButton();

         browser.sleep(2000);
         createModules.acceptAlert();
         browser.sleep(500);
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
