/** Filter class for filtering on reports page */
export class Filter {
    
    /** String variable for title */
    title: string = "";
    /** String variable for format */
    format: string[] = [];
    /** Number array variable for modules */
    modules: number[] = [];
    /** Number array variable for modules */
    curricula: number[] = [];

    /**
     * Constructor that takes title, format, modules and curricula for filtering
     * @param title 
     * @param format 
     * @param modules 
     * @param curricula
     */
    constructor(title: string, format: string[], modules: number[], curricula: number[]){
        if (null != title) this.title = title;
        if (null != format) this.format = format;
        if (null != modules) this.modules = modules;
        if (null != curricula) this.curricula = curricula;
    }

    /** Getter method to get title */
    public getTitle(): string {
        return this.title;
    }
    /** Getter method to get format */
    public getFormat(): string[] {
        return this.format;
    }
    /** Getter method to get array of Modules */
    public getModules(): number[] {
        return this.modules;
    }
    /** Getter method to get array of Modules */
    public getCurricula(): number[] {
        return this.curricula;
    }
    /** Setter method to set title */
    public setTitle(title: string){
        this.title = title;
    }
    /** Setter method to set format */
    public setFormat(format: string[]){
        this.format = format;
    }
    /** Setter method to set modules */
    public setModules(modules: number[]){
        this.modules = modules;
    }
    /** Setter method to set curricula */
    public setCurricula(curricula: number[]){
        this.curricula = curricula;
    }
}