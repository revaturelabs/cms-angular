import { browser, by, element, ElementFinder } from 'protractor';

export class ReportsTimeGraphPage {
    
    private lineChart: ElementFinder;

    constructor() {
        this.lineChart = this.getChart();
    }

    navigateTo() {
        return browser.get(browser.baseUrl + "reports") as Promise<any>;
    }

    /**
    * Returns the current URL in the browser
    */
    getCurrentURL() {
        return browser.getCurrentUrl();
    }

    /**
    returns chart element
    */
    private getChart() {

        return element(by.id('lineChart'));
    }

    /**
    returns data represented by chart
    */
    getChartData() {

        if (this.lineChart)
            return this.lineChart.getAttribute('ng-reflect-results');
        else
            return null;
    }
}