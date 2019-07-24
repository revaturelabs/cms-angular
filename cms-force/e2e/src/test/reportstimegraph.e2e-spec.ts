import { ReportsTimeGraphPage } from "./reportstimegraph.po";
import { browser, logging, by, By, element } from 'protractor';

describe('workspace-project App', () => {

    let reportsTimeGraph    : ReportsTimeGraphPage;

    beforeAll(() => {
        reportsTimeGraph = new ReportsTimeGraphPage();
        reportsTimeGraph.navigateTo();
    });

    beforeEach(() => {
        browser.manage().timeouts().implicitlyWait(5000);
    })

    it('should have time data', () => {
        browser.sleep(5000);
        expect(reportsTimeGraph.getChartData()).not.toBe(null);
    });

    it('should select dropdown selection: Past Year', () => {
        reportsTimeGraph.selectPastYearView();
        expect(reportsTimeGraph.getSelectedViewText()).toEqual('Selected View: Past Year');
    });

    it('should select dropdown selection: Past Six Months', () => {
        reportsTimeGraph.selectPastSixMonthsView();
        expect(reportsTimeGraph.getSelectedViewText()).toEqual('Selected View: Past Six Months');
    });

    it('should select dropdown selection: Past Month', () => {
        reportsTimeGraph.selectPastMonthView();
        expect(reportsTimeGraph.getSelectedViewText()).toEqual('Selected View: Past Month');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
})