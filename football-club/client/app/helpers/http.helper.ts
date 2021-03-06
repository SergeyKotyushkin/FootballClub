import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class HttpHelper {

    public static extractArrayData(res: Response) {
        return res.json() || [];
    }

    public static extractObjectData(res: Response) {
        return res.json() || {};
    }

    public static extractAuthData(res: Response) {
        return res.json();
    }

    public static handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
