import { browser, logging } from 'protractor';
import { ReportsPage } from './reports.po';

describe('workspace-project App', () => {
    let reportsPage : ReportsPage;

    it('should contain content in Code Examples', () => {
        expect(reportsPage.getCodeExamples.toString() !== "");
    });

    it('should contain content in Lecture Notes', () => {
        expect(reportsPage.getLectureNotes.toString() !== "");
    });

    it('should contain content in Dif Modules', () => {
        expect(reportsPage.getDifModules.toString() !== "");
    });

    it('should contain content in Average Resources', () => {
        expect(reportsPage.getAvgResources.toString() !== "");
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });
});