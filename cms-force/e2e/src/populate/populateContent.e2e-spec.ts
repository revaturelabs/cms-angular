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

   for (i = 0; i < title.length; i++) {
      beforeAll(() => {
         createContent = new PopulateContentPage();
         createContent.navigateTo();
      });

      beforeEach(() => {
         browser.manage().timeouts().implicitlyWait(5000);
      });

      it('should accept title input', () => {
         createContent.inputTitle(title[i]);
         expect(createContent.getTitleValue()).toEqual(title[i]);
      });

      it('should accept url input', () => {
         createContent.inputUrl(url[i]);
         expect(createContent.getUrlValue()).toEqual(url[i]);
      });

      // only enters values
      it('should accept selected subjects input', () => {
         createContent.enterSelectedSubjects(selectedSubjects[i]);
         // browser.sleep(5000); // to manually check, uncomment.
      });

      it('should accept description input', () => {
         createContent.inputDescription(description[i]);
         expect(createContent.getDescriptionValue()).toEqual(description[i]);
      });

      it('should select format radio button', () => {
         if (formats[i] === "Document")
            createContent.clickDocumentRadio();
         else if (formats[i] === "Code")
            createContent.clickCodeRadio();
         expect(createContent.getCheckedRadioValue()).toEqual(formats[i]);
      });

      it('should click submit button', () => {
         browser.sleep(2000);
         createContent.clickSubmitButton();
      });

      it('should press enter', () => {
         browser.sleep(5000);
         createContent.pressEnter();
      });

      afterEach(async () => {
         // Assert that there are no errors emitted from the browser
         const logs = await browser.manage().logs().get(logging.Type.BROWSER);
         expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
         } as logging.Entry));
      });
   }
});
