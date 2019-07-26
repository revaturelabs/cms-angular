import { browser, element, by } from 'protractor';

export class ReportsPage {
    

    constructor() {

    }

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
}