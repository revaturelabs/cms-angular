import { browser, by, element, ElementFinder } from 'protractor';

export class ReportsTimeGraphPage {

    private lineChart: ElementFinder;
    private dropdown: ElementFinder;
    private selectPastYear: ElementFinder;
    private selectPastSixMonths: ElementFinder;
    private selectPastMonth: ElementFinder;
    private selectedViewLabel: ElementFinder;

    constructor() {

        this.lineChart = this.getChart();
        this.dropdown = this.getDropdownButton();
        this.selectPastYear = this.getSelectPastYear();
        this.selectPastSixMonths = this.getSelectPastSixMonths();
        this.selectPastMonth = this.getSelectPastMonth();
        this.selectedViewLabel = this.getSelectedViewLabel();
    }

    /**
     * returns chart element
     */
    private getChart() {

        return element(by.id('lineChart'));
    }

    /**
     * returns the open dropdown button
     */
    private getDropdownButton() {
        return element(by.id('dropdownMenuButton'));
    }

    /**
     * returns the dropdown item which selects the past year view
     */
    private getSelectPastYear() {
        return element(by.id('selectPastYear'));
    }

    /**
     * returns the dropdown item which selects the past six months view
     */
    private getSelectPastSixMonths() {
        return element(by.id('selectPastSixMonths'));
    }

    /**
     * returns the dropdown item which selects the past month view
     */
    private getSelectPastMonth() {
        return element(by.id('selectPastMonth'));
    }

    private getSelectedViewLabel() {
        return element(by.id('selectedViewText'));
    }

    /**
     * navigates the browser to the reports page URL
     */
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
     * returns data represented by chart
     */
    getChartData() {

        if (this.lineChart)
            return this.lineChart.getAttribute('ng-reflect-results');
        else
            return null;
    }

    selectPastYearView() {
        this.dropdown.click();
        this.selectPastYear.click();
    }

    selectPastSixMonthsView() {
        this.dropdown.click();
        this.selectPastSixMonths.click();
    }

    selectPastMonthView() {
        this.dropdown.click();
        this.selectPastMonth.click();
    }

    getSelectedViewText() {
        return this.selectedViewLabel.getText();
    }
}