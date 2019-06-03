export class Filter {
    title: string = "";
    format: string = "";
    modules: number[] = [];

    constructor(title: string, format: string, modules: number[]){
        if (null != title) this.title = title;
        if (null != format) this.format = format;
        if (null != modules) this.modules = modules;
    }

    public getTitle(): string {
        return this.title;
    }
    public getFormat(): string {
        return this.format;
    }
    public getModules(): number[] {
        return this.modules;
    }
    public setTitle(title: string){
        this.title = title;
    }
    public setFormat(format: string){
        this.format = format;
    }
    public setModules(modules: number[]){
        this.modules = modules;
    }

}