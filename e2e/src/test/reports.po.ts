import { browser, element, by, protractor } from 'protractor';

export class ReportsPage {
    

    constructor() {

    }

    /**
     * navigates the browser to the reports page URL
     */
    navigateTo() {
        return browser.get(browser.baseUrl+"reports") as Promise<any>;
    }

    getCodeExamples() {
        return element(by.id("code_Ex"));
    }

    getLectureNotes() {
        return element(by.id("lect_Notes"));
    }

    getDifModules() {
        return element(by.id("dif_Mods"));
    }

    getAvgResources() {
        return element(by.id("avg_Res"));
    }

    /**
     * returns chart element
     */
    getChart() {
        return element(by.id('lineChart'));
    }

    /**
     * returns the open dropdown button
     */
    getDropdownButton() {
        return element(by.id('dropdownMenuButton'));
    }

    /**
     * returns the dropdown item which selects the past year view
     */
    getSelectPastYear() {
        return element(by.id('selectPastYear'));
    }

    /**
     * returns the dropdown item which selects the past six months view
     */
    getSelectPastSixMonths() {
        return element(by.id('selectPastSixMonths'));
    }

    /**
     * returns the dropdown item which selects the past month view
     */
    getSelectPastMonth() {
        return element(by.id('selectPastMonth'));
    }

    getSelectedViewLabel() {
        return element(by.id('selectedViewText'));
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

        if (this.getChart())
            return this.getChart().getAttribute('ng-reflect-results');
        else
            return null;
    }

    selectPastYearView() {
        this.getDropdownButton().click();
        this.getSelectPastYear().click();
    }

    selectPastSixMonthsView() {
        this.getDropdownButton().click();
        this.getSelectPastSixMonths().click();
    }

    selectPastMonthView() {
        this.getDropdownButton().click();
        this.getSelectPastMonth().click();
    }

    getSelectedViewText() {
        return this.getSelectedViewLabel().getText();
    }
    
    /**
     * Returns the url element in the DOM
     */
    private getSelectedSubjectsSelect() {
        return element(by.name('selectedSubjects'));
    }

    /**
     * Returns a list of available subjects (in the form of a comma-separated string)
     */
    getAvailableSubjects() {
        return this.getSelectedSubjectsSelect().getAttribute("ng-reflect-items");
    }

    /**
     * Sends the given input string to the url element in the DOM
     * @param input
     */
    enterSelectedSubject(input: string) {
        this.getSelectedSubjectsSelect().click();
        browser.actions().sendKeys(input).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    getCodeRadio() {
        return element(by.id('Code'));
    }

    clickCodeRadio() {
        browser.actions().mouseMove(this.getCodeRadio()).click().perform();
    }

    getDocumentRadio() {
        return element(by.id('Document'));
    }

    clickDocumentRadio() {
        browser.actions().mouseMove(this.getDocumentRadio()).click().perform();
    }

    getPowerpointRadio() {
        return element(by.id('Powerpoint'));
    }

    clickPowerpointRadio() {
        browser.actions().mouseMove(this.getPowerpointRadio()).click().perform();
    }

    getAllRadio() {
        return element(by.id('All'));
    }

    clickAllRadio() {
        browser.actions().mouseMove(this.getAllRadio()).click().perform();
    }

    getCheckedRadioValue() {
        if(element(by.css('[type="checked"]'))){
            return element(by.css(':checked')).getAttribute('id');
        } else {
            return '';
        }
    }

    getFilterButton() {
        return element(by.id('filterButton'));
    }

    clickFilterButton() {
        this.getFilterButton().click();
    }
}