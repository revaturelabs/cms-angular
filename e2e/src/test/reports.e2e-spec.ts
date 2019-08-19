import { browser, logging } from 'protractor';
import { ReportsPage } from './reports.po';

describe('workspace-project App', () => {
    let reportsPage : ReportsPage;

    beforeAll(() => {
        reportsPage = new ReportsPage();
        reportsPage.navigateTo();
        browser.sleep(3000);
    });

    it('should contain content in Code Examples', () => {
        expect(reportsPage.getCodeExamples().getText()).not.toBe("");
    });

    it('should contain content in Lecture Notes', () => {
        expect(reportsPage.getLectureNotes().getText()).not.toBe("");
    });

    it('should contain content in Dif Modules', () => {
        expect(reportsPage.getDifModules().getText()).not.toBe("");
    });

    it('should contain content in Average Resources', () => {
        expect(reportsPage.getAvgResources().getText()).not.toBe("");
    });

    it('should have time data', () => {
        expect(reportsPage.getChartData()).not.toBe(null);
    });

    it('should select dropdown selection: Past Year', () => {
        reportsPage.selectPastYearView();
        expect(reportsPage.getSelectedViewText()).toEqual('Selected View: Past Year');
    });

    it('should select dropdown selection: Past Six Months', () => {
        reportsPage.selectPastSixMonthsView();
        expect(reportsPage.getSelectedViewText()).toEqual('Selected View: Past Six Months');
    });

    it('should select dropdown selection: Past Month', () => {
        reportsPage.selectPastMonthView();
        expect(reportsPage.getSelectedViewText()).toEqual('Selected View: Past Month');
    });

    it ('should accept selected subjects input', () => {
        reportsPage.getAvailableSubjects()
            .then((result) => {
                let subjects = result.split(',');
                reportsPage.enterSelectedSubject(subjects[0]);
            });
    });

    it('should select Document radio button', () => {
        reportsPage.clickDocumentRadio();
        expect(reportsPage.getCheckedRadioValue()).toEqual('Document');
    });

    it('should select Code radio button', () => {
        reportsPage.clickCodeRadio();
        expect(reportsPage.getCheckedRadioValue()).toEqual('Code');
    });

    it('should select Powerpoint radio button', () => {
        reportsPage.clickPowerpointRadio();
        expect(reportsPage.getCheckedRadioValue()).toEqual('Powerpoint');
    });

    it('should select All radio button', () => {
        reportsPage.clickAllRadio();
        expect(reportsPage.getCheckedRadioValue()).toEqual('All');
    });

    it('should get filtered data', () => {
        reportsPage.clickFilterButton();
        browser.sleep(3000);
        expect(reportsPage.getChartData()).not.toBe(null);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });
});