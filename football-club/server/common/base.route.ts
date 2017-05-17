import { NextFunction, Request, Response } from 'express';

export class BaseRoute {

    protected title: string;

    private scripts: string[];

    public constructor() {
        this.title = "Footbal Club";
        this.scripts = [];
    }

    public addScript(src: string): BaseRoute {
        let script: string = this.scripts.find((s) => s === src);
        if (!script)
            this.scripts.push(src);
        return this;
    }

    public render(req: Request, res: Response, view: string, options?: Object) {
        //add constants
        res.locals.baseUrl = "/";

        //add scripts
        res.locals.scripts = this.scripts;

        //add title
        res.locals.title = this.title;

        //render view
        res.render(view, options);
    }

    public sendFile(req: Request, res: Response, filePath: string, options?: Object) {

        //render view
        res.sendFile(filePath, options);
    }
}
