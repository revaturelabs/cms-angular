import { browser, logging } from 'protractor';
import { ReportsPage } from './reports.po';
import { async } from '@angular/core/testing';
import { ModuleCreatePage } from './modulecreation.po';
import { AppPage } from './contentcreation.po';
import { SearchPage } from './contentsearch.po';
import { ModuleIndexPage } from './moduleindex.po';

describe('workspace-project App', () => {
    let reportsPage           : ReportsPage;
    let moduleCreate          : ModuleCreatePage;
    let createContent         : AppPage;
    let findContent           : SearchPage;
    let moduleIndex           : ModuleIndexPage;
    let title                 : string[] = [];
    let url                   : string[] = [];
    let selectedSubjects      : string[];
    let description           : string[] = [];
    

    beforeAll(async () => {
        reportsPage = new ReportsPage();
        moduleCreate = new ModuleCreatePage();
        createContent = new AppPage();
        findContent = new SearchPage();
        moduleIndex = new ModuleIndexPage();

        reportsPage.navigateTo();
        reportsPage.clickFilterButton();
        browser.sleep(1000);
        let number = 0;
        await reportsPage.getDifModules().getText().then(function (text){
            number = +text;
        });
        reportsPage.addOriginalValuesArrays(number);

        await reportsPage.getAvgResources().getText().then(function (text){
            number = +text;
        });
        reportsPage.addOriginalValuesArrays(number);

        await reportsPage.getCodeExamples().getText().then(function (text){
            number = +text;
        });
        reportsPage.addOriginalValuesArrays(number);

        await reportsPage.getLectureNotes().getText().then(function (text){
            number = +text;
        });
        reportsPage.addOriginalValuesArrays(number);

        await reportsPage.getPowerpoints().getText().then(function (text){
            number = +text;
        });
        reportsPage.addOriginalValuesArrays(number);

       

    });

    it('should navigate to module creation', () =>{
        moduleCreate.navigateTo();

        this.selectedSubjects = Math.random().toString(36).substring(7);

        moduleCreate.inputSubject(this.selectedSubjects);
        expect(moduleCreate.getSubjectValue()).toEqual(this.selectedSubjects);
        
        moduleCreate.clickSubmitButton();
        moduleCreate.acceptAlert();
    });

    it('should navigate back to reportsPage and click refresh button',async () => {
        reportsPage.navigateTo();

        reportsPage.clickFilterButton();

        let number = 0;
        await reportsPage.getDifModules().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getAvgResources().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getCodeExamples().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getLectureNotes().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getPowerpoints().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        expect(reportsPage.getNewValuesArray()[0]).toEqual(reportsPage.getOriginalValuesArray()[0] + 1);
        reportsPage.resetNewValuesArray();
    });

    it('should navigate to content creation and add new content', async () =>{

        await createContent.navigateTo();
        //randomized the input for title, url (in format of: http://www.__random_string___.com ), and description for 3 times
        for (let i = 0; i < 3; i++) {
            title.push(Math.random().toString(36).substring(7));
            url.push("http://www." + Math.random().toString(36).substring(7) + ".com");
            description.push(Math.random().toString(36).substring(7));
        }

        for (let i = 0; i < 3; i++) {
            //input 3 different titles for each creation with different types
            createContent.inputTitle(title[i]);
            expect(createContent.getTitleValue()).toEqual(title[i]);
            //input 3 different urls for each creation with different types
            createContent.inputUrl(url[i]);
            expect(createContent.getUrlValue()).toEqual(url[i]);
            //since we created two modules in the begining and we want to grab the one in the first index, which is index 0
            createContent.enterSelectedSubjects([this.selectedSubjects[0]]);
            //input 3 different desciptions for each creation with different types
            createContent.inputDescription(description[i]);
            expect(createContent.getDescriptionValue()).toEqual(description[i]);
            //click on the corresponding Radio button with the index. 
            //index 0 = Code ; index 1 = Document ; index 2 = PowerPoints
            createContent.clickRadio(i);
            browser.sleep(1000);
            //click the submit button to submit the content. should show alert of "Successfully sent content"
            createContent.clickSubmitButton();
            createContent.acceptAlert();
        }
    });

    it('should navigate back to reports page',async () =>{
       await reportsPage.navigateTo();

        reportsPage.clickFilterButton();

        let number = 0;
        await reportsPage.getDifModules().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getAvgResources().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getCodeExamples().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getLectureNotes().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        await reportsPage.getPowerpoints().getText().then(function (text){
            number = +text;
        });
        reportsPage.addNewValuesArray(number);

        //check code examples new size0
        expect(reportsPage.getNewValuesArray()[2]).toEqual(reportsPage.getOriginalValuesArray()[2] + 1);
        //check lecture notes new size
        expect(reportsPage.getNewValuesArray()[3]).toEqual(reportsPage.getOriginalValuesArray()[3] + 1);
        //check powerpoints new size
        expect(reportsPage.getNewValuesArray()[4]).toEqual(reportsPage.getOriginalValuesArray()[4] + 1);
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