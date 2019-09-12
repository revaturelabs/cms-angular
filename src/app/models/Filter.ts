/** Filter class for filtering on reports page */
export class Filter {

    //If these properties are going to have getters and setters, then they should be private

    /** String variable for title */
    title: string = "";
    /** String variable for format */
    format: string = "";
    /** Number array variable for modules */
    modules: number[] = [];

    /**
     * Constructor that takes title, format, and modules for filtering
     * @param title 
     * @param format 
     * @param modules 
     */
    constructor(title: string, format: string, modules: number[]){
        if (null != title) this.title = title;
        if (null != format) this.format = format;
        if (null != modules) this.modules = modules;
    }

    /** Getter method to get title */
    public getTitle(): string {
        return this.title;
    }
    /** Getter method to get format */
    public getFormat(): string {
        return this.format;
    }
    /** Getter method to get array of Modules */
    public getModules(): number[] {
        return this.modules;
    }
    /** Setter method to set title */
    public setTitle(title: string){
        this.title = title;
    }
    /** Setter method to set format */
    public setFormat(format: string){
        this.format = format;
    }
    /** Setter method to set modules */
    public setModules(modules: number[]){
        this.modules = modules;
    }

}