import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

export class ModuleIndexPage {
    private modules                 : ElementArrayFinder;

    constructor() {
        this.modules = this.getModules();
    }

    navigateTo() {
        return browser.get(browser.baseUrl+"module-index") as Promise<any>;
    }

    /**
     * Returns the current URL in the browser.
     */
    getCurrentURL() {
        return browser.getCurrentUrl();
    }

    /**
     * Returns an ElementArrayFinder which represents the list of all modules in the DOM.
     */
    getModules(): ElementArrayFinder {
        return element.all(by.name("modules"));
    }

    /**
     * Returns the particular div which represents the module with a given index in the DOM.
     * 
     * @param index The index for the module
     */
    getModuleByIndex(index: number): ElementFinder {
        return this.modules.element(by.id('' + index));
    }

    /**
     * Returns the particular div which represents the module with a given index in the DOM.
     * This method is declared as async, as it needs to use await to open the promise
     * for the list of modules, in order to search for modules by name.
     * 
     * @param subject The name of the module
     */
    async getModuleBySubject(subject: string): Promise<ElementFinder> {

        let module: ElementFinder = undefined;
        let modules: ElementArrayFinder = this.getModules();
        await this.modules.count().then(async function(length) {
            console.log(length + " modules found.")
            for(let i = 0; i < length; i++) {

                let found: boolean = false;
                let row: ElementFinder = modules.get(i);

                // This complicated element search just grabs the first span of the child named module.
                // This is needed due to the structure of the divs in the html page.
                // The span that we are grabbing is the one which has the subject as the innerHTML
                await row.element(by.name("module")).getText().then(function(text: string) {
                    console.log("Found " + text + ", but looking for " + subject);
                    if(text === subject) {
                        found = true;
                        module = row;
                    }
                });

                if(found) {
                    console.log("Subject found!");
                    break;
                }
            }
        });

        expect(module.isPresent()).toBeTruthy();

        return module;
    }

    /**
     * Clicks on a given module to expand/collapse the contents. Allows for a number or ElementFinder
     * as input. If number, the input will be the module id to be clicked on. If ElementFinder, should
     * be the div that represents that desired module; wil click it.
     * 
     * @param module The index, name, or div which represents the desired module in the DOM
     */
    async clickModule(module: number | string | ElementFinder) {
        if(typeof module === 'number') {
            this.getModuleByIndex(module).element(by.name("module")).click();
        } else if(typeof module === 'string') {
            browser.sleep(500);
            await this.getModuleBySubject(module).then(function(subject) {
                subject.element(by.name("module")).click();
            });
        } else if(typeof module === 'object' && module instanceof ElementFinder) {
            module.element(by.name("module")).click();
        }
    }

    async getRowOfContent(title: string, url: string, description: string, module: string): Promise<ElementFinder> {
        let table: ElementFinder;

        console.log("Looking for title: " + title + ", url: " + url + ", description: " + description + " in module " + module);

        await this.clickModule(module);
        browser.sleep(3500);

        // This is here to access the class inside of the anonymous function.
        // TypeScript's 'this' keyword refers to the anonymous function when inside of one.
        // We still need access to the class, so we get another reference to the class to use inside
        let that = this;
        await this.getModuleBySubject(module).then(async function(subject: ElementFinder) {
            console.log("subject is: " + subject);
            
            table = that.getTable(subject);
        });

        console.log("table is: " + table);

        let row: ElementFinder;
        let rows: ElementArrayFinder = table.element(by.tagName("tbody")).all(by.tagName("tr"));
        await rows.count().then(async function(length) {
            console.log("Found " + length + " rows of content for the module.");
            for(let i = 0; i < length; i++) {
                let found: boolean[] = [false, false, false];

                row = rows.get(i);

                console.log("The row is: " + row);

                await row.element(by.name("title")).getText().then(function(text) {
                    if(text === title) {
                        console.log("Title found!");
                        found[0] = true;
                    }
                });

                await row.element(by.name("url")).element(by.tagName("a")).getText().then(function(text) {
                    if(text === url) {
                        console.log("url found!");
                        found[1] = true;
                    }
                });

                await row.element(by.name("description")).getText().then(function(text) {
                    if(text === description) {
                        console.log("description found!");
                        found[2] = true;
                    }
                });

                // Break out of the for loop if we have found the correct row
                if(!found.includes(false)) {
                    break;
                } else {
                    // Reset the row if it wasn't found. This is so that if the correct row is never found
                    // that the row variable will be undefined instead of the last row.
                    row = undefined;
                }
            }
        });

        expect(row).toBeDefined();


        return row;
    }

    async deleteModule(module: number | string | ElementFinder) {
        if(typeof module === 'number') {
            await this.getModuleByIndex(module).element(by.css('.fa-trash')).click();
        } else if(typeof module === 'string') {
            await this.getModuleBySubject(module).then(async function(subject) {
                // await browser.sleep(2750);
                await subject.element(by.css('.fa-trash')).click();
            });
        } else if(typeof module === 'object' && module instanceof ElementFinder) {
            await module.element(by.css('.fa-trash')).click();
        }

        //await browser.sleep(500);
        await element(by.id("deleteModuleButton")).click();
    }

    async deleteContentFromModule(title: string, url: string, description: string, module: string) {
        let row: ElementFinder = await this.getRowOfContent(title, url, description, module);

        expect(row).toBeDefined();
        expect(row instanceof ElementFinder).toBeTruthy();
        // expect(rowPr instanceof Promise).toBeTruthy();

        // await rowPr.then(function(row) {
        //     row.element(by.name("trash")).element(by.css(".fa-trash")).click();

        //     browser.sleep(500);
        //     element(by.id("deleteContentButton")).click();
        // });

        // browser.sleep(3000);
        await row.element(by.name("trash")).element(by.css(".fa-trash")).click();

        await browser.sleep(2000);
        await element(by.id("deleteContentButton")).click();
        await browser.sleep(2000);
        this.modules = this.getModules();
    }

    /**
     * Returns the table element for the list of contents inside a particular module in the DOM.
     * 
     * @param module The index or div which represents the module in the DOM that is the parent of the desired table
     */
    getTable(module: number | ElementFinder): ElementFinder {
        if(typeof module === 'number') {
            return this.getModuleByIndex(module).element(by.css('.table'));
        } else if(typeof module === 'object' && module instanceof ElementFinder) {
            return module.element(by.css('.table'));
        }
    }

    acceptAlert() {
        browser.wait(() => element(by.css('.toast-message')).isPresent(), 5000, "Alert is not getting present :(");
        
        if(element(by.css('.toast-message')).isPresent())
            element(by.css('.toast-message')).click();
      }

    refresh() {
        return browser.refresh();
    }
}
