import { browser, logging } from 'protractor';
import { PopulateContentPage } from './populateContent.po';

describe('workspace-project App', () => {
   let createContent: PopulateContentPage;
   let title: string[] = [
      "CMS Force Front-End SPA Repository",
      "CMS Force Back-End Spring Boot Repository",
      "Java 8 JDK Documentation",
      "Angular 2.0+ Documentation",
      "Typescript Documentation"
   ];
   let url: string[] = [
      "https://github.com/revaturelabs/cms-angular",
      "https://github.com/revaturelabs/cms-content-service",
      "https://docs.oracle.com/javase/8/docs/api/",
      "https://angular.io/",
      "https://www.typescriptlang.org/docs/home.html"
   ];
   let selectedSubjects: string[][] = [
      ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "AJAX"],
      ["Java", "Spring", "REST", "JDBC", "Oracle", "RDB", "AWS"],
      ["Java", "JDBC"],
      ["Angular", "TypeScript", "HTML", "CSS", "AJAX"],
      ["TypeScript", "JavaScript"]
   ];
   let description: string[] = [
      "CMS Force Front-End Single-Page-Application Github Repository with Source Code.",
      "CMS Force Back-End Spring Boot Github Repository with Source Code.",
      "Documentation detailing all packages, classes, methods included with Java 8 JDK",
      "Documentation describing the use of Angular for versions 2.0 and newer.",
      "Documentation describing the use of Typescript."
   ];
   let formats: string[] = [
      "Code",
      "Code",
      "Document",
      "Document",
      "Document"
   ];
   let i: number;

   beforeAll(() => {
      createContent = new PopulateContentPage();
      createContent.navigateTo();
   });

   beforeEach(() => {
      browser.manage().timeouts().implicitlyWait(5000);
   });

   it('should populate with test data', () => {
      for (i = 0; i < title.length; i++) {
         createContent.inputTitle(title[i]);
         expect(createContent.getTitleValue()).toEqual(title[i]);

         createContent.inputUrl(url[i]);
         expect(createContent.getUrlValue()).toEqual(url[i]);

         createContent.enterSelectedSubjects(selectedSubjects[i]);
         // browser.sleep(1000); // to manually check, uncomment.

         createContent.inputDescription(description[i]);
         expect(createContent.getDescriptionValue()).toEqual(description[i]);

         if (formats[i] === "Document")
            createContent.clickDocumentRadio();
         else if (formats[i] === "Code")
            createContent.clickCodeRadio();
         expect(createContent.getCheckedRadioValue()).toEqual(formats[i]);

         createContent.clickSubmitButton();

         browser.sleep(2000);
         createContent.acceptAlert();
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
