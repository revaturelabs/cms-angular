import { browser, element, by, ElementFinder } from 'protractor';

export class ReportsPage {
    

    constructor() {

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