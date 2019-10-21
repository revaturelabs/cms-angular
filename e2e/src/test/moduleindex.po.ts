import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
/*
 * Note: The async keyword that is explained in more detail in contentcreation.e2e-spec.ts
 * also causes that method to automatically return a Promise of the value.
 * It is smart enough to not accidentally double wrap the return, so it won't cause
 * a promise of a promise of a value.
 * 
 * This unfortunately creates an extra layer of complexity that we must deal with.
 * Protractor has some methods that support AngularJS, such as by.repeater()
 * which can asynchronously search for elements based on the contents. Unfortunately,
 * this does not have support for ngFor in Angular 2+. This means that in order to find a
 * particular row in the module index page (whether it be a particular module, or a content
 * inside a module), we must open the promise with the then keyword, search for the desired row,
 * and return a Promise of the ElementFinder. We additionally need to use the await keyword
 * in order to eforce that our logic is performed synchronously (instead of asynchronously by default).
 * And we are further required to use the async keyword in a lot of locations, which automatically
 * wrap our return values in promises.
 */
export class ModuleIndexPage {
    // A reference to all of the divs in the DOM with the name "modules"
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

        // We declare our variable that will track the desired module
        let module: ElementFinder = undefined;

        // We get another reference to this.modules, as while we are inside the
        // anonymous function, the this keyword refers to the function itself, instead of
        // the overall class
        let modules: ElementArrayFinder = this.getModules();
        await this.modules.count().then(async function(length) {
            for(let i = 0; i < length; i++) {

                let found: boolean = false;
                let row: ElementFinder = modules.get(i);

                // We grab the div named 'module' that is the particular row of the list of modules
                await row.element(by.name("module")).getText().then(function(text: string) {
                    if(text === subject) {
                        found = true;
                        module = row;
                    }
                });

                if(found) {
                    break;
                }
            }
        });

        // Make sure that the desired module was actually found
        expect(module.isPresent()).toBeTruthy();

        // Due to the async keyword, this will be wrapped into a promise
        return module;
    }

    /**
     * Clicks on a given module to expand/collapse the contents. Allows for a number, string, or ElementFinder
     * as input. If number, the input will be the module id to be clicked on. If string, the input will be the
     * module name. If ElementFinder, should be the div that represents that desired module; wil click it.
     * 
     * @param module The index, name, or div which represents the desired module in the DOM
     */
    async clickModule(module: number | string | ElementFinder) {
        // This is TypeScript's version of method overloading
        if(typeof module === 'number') {
            await this.getModuleByIndex(module).element(by.name("module")).click();
        } else if(typeof module === 'string') {
            browser.sleep(500);
            await this.getModuleBySubject(module).then(async function(subject) {
                await subject.element(by.name("module")).click();
            });
        } else if(typeof module === 'object' && module instanceof ElementFinder) {
            await module.element(by.name("module")).click();
        }
    }

    /**
     * Gets a particular row of content from a given module that has the given title, url, and
     * description. Represents the tr DOM element inside the tbody that is the desired content.
     * 
     * @param title The title to be searched for
     * @param url The url to be searched for
     * @param description The description to be searched for
     * @param module The name of the module to be searched for
     */
    async getRowOfContent(title: string, url: string, description: string, module: string): Promise<ElementFinder> {
        let table: ElementFinder;

        // Click the module to expand the table (which fetches it via HTTP request if needed)
        await this.clickModule(module);
        browser.sleep(3500);

        // This is here to access the class inside of the anonymous function.
        // TypeScript's 'this' keyword refers to the anonymous function when inside of one.
        // We still need access to the class, so we get another reference to the class to use inside
        let that = this;
        await this.getModuleBySubject(module).then(async function(subject: ElementFinder) {
            table = that.getTable(subject);
        });

        let row: ElementFinder;
        // Search tr DOM elements that are a child of the table element that is inside the tbody
        let rows: ElementArrayFinder = table.element(by.tagName("tbody")).all(by.tagName("tr"));

        // Open the promise with access to the number of rows
        await rows.count().then(async function(length) {
            for(let i = 0; i < length; i++) {
                let found: boolean[] = [false, false, false];

                // Get the row
                row = rows.get(i);

                // Search for title, url, and description
                await row.element(by.name("title")).getText().then(function(text) {
                    if(text === title) {
                        found[0] = true;
                    }
                });

                await row.element(by.name("url")).element(by.tagName("a")).getText().then(function(text) {
                    if(text === url) {
                        found[1] = true;
                    }
                });

                await row.element(by.name("description")).getText().then(function(text) {
                    if(text === description) {
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

        // Confirm that a row was found (this expectation will fail if the desired row is not found)
        expect(row).toBeDefined();

        // Will be wrapped in a promise
        return row;
    }

    /**
     * Deletes a module by clicking on the trash can icon for a specific row.
     * Overloaded to accept the index of the module, the name of the module, or a
     * ElementFinder, which is the reference to the DOM element for the desired module
     * to be deleted.
     * 
     * @param module The index, name, or DOM element of the module to be deleted
     */
    async deleteModule(module: number | string | ElementFinder) {
        // First click the trash can icon
        if(typeof module === 'number') {
            await this.getModuleByIndex(module).element(by.css('.fa-trash')).click();
        } else if(typeof module === 'string') {
            await this.getModuleBySubject(module).then(async function(subject) {
                await browser.sleep(1000);
                await subject.element(by.css('.fa-trash')).click();
            });
        } else if(typeof module === 'object' && module instanceof ElementFinder) {
            await module.element(by.css('.fa-trash')).click();
        }

        // Then click the confirm button
        await element(by.id("deleteModuleButton")).click();

        // Might not be needed, but refreshes the list of modules, as they are now changed.
        this.modules = this.getModules();
    }

    /**
     * Removes a particular content from a given module. Uses the title, url, and description to find the
     * particular content to remove.
     * 
     * @param title The title to be searched for
     * @param url The url to be searched for
     * @param description The description to be searched for
     * @param module The name of the module to be searched for
     */
    async deleteContentFromModule(title: string, url: string, description: string, module: string) {
        /*
         * The result of this method call is a little strange. Since getRowOfContent() is an
         * async method, it should be automatically wrapping the returned value in a Promise.
         * But after numerous checks, it has been determined that the returned value is NOT
         * a promise, and is instead just the underlying ElementFinder. This is convenient
         * as we do not need to unwrap the promise.
         */
        // Get the particular row from the table of the desired module
        let row: ElementFinder = await this.getRowOfContent(title, url, description, module);

        // These expectations confirm that the returned value is in fact NOT a promise.
        // Which is odd.
        expect(row).toBeDefined();
        expect(row instanceof ElementFinder).toBeTruthy();

        // Use that row to grab the specific trash can icon in that row, and click it.
        await row.element(by.name("trash")).element(by.css(".fa-trash")).click();

        // Wait for the popup, and then click the confirm button
        await browser.sleep(2000);
        await element(by.id("deleteContentButton")).click();

        // Wait for it to be processed, and refresh the list of modules
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
