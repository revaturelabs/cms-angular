
/**
 * Object used to filter out data 
 */
export class Filter {
    /** What to match Title with */
    title: string = "";
    /** What to match Format with */
    format: string = "";
    /** Which modules should not be filtered out */
    modules: number[] = [];

    /**
     * Create a new Filter with specified options
     * @param title What to check against Content's Title being filtered
     * @param format What to check against Content's Format being filtered
     * @param modules Which modules filtered Contents can link to
     */
    constructor(title: string, format: string, modules: number[]){
        if (null != title) this.title = title;
        if (null != format) this.format = format;
        if (null != modules) this.modules = modules;
    }

    /**
     * Get what title is allowed from filter
     */
    public getTitle(): string {
        return this.title;
    }
    /**
     * Get what format is allowed from filter
     */
    public getFormat(): string {
        return this.format;
    }
    /**
     * Get which modules are allowed from filter
     */
    public getModules(): number[] {
        return this.modules;
    }
    /**
     * Set what title is allowed from filter
     * @param title Allowed title in Content
     */
    public setTitle(title: string){
        this.title = title;
    }
    /**
     * Set what format is allowed from filter
     * @param format Allowed filter in Content
     */
    public setFormat(format: string){
        this.format = format;
    }
    /**
     * Set which modules are allowed from filter
     * @param modules Allowed link ids in Content
     */
    public setModules(modules: number[]){
        this.modules = modules;
    }

}