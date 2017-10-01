import {Injectable} from "@angular/core";
import {Http, Response, ResponseOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";

import { Task } from '../model/task';

@Injectable()
export class TaskService {

    private taskUrl: string = "http://localhost:3000/tasks";
    private sortTaskUrl: string = "http://localhost:3000/tasks?_sort=parentId,id&_order=desc";

    constructor(private http: Http) {}

    // TODO-radenie úloh a podúloh
    // get json from url, if something is wrong error throwed
    getTasks(): Observable<Task[]> {
        return this.http.get(this.sortTaskUrl)
            .map((response:Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error - getTasks()'));
    }

    // post json from url, if something is wrong error throwed
    createTask(body: Object): Observable<Task[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': ''});
        let options = new ResponseOptions({ headers: headers });

        return this.http.post(this.taskUrl, body, options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error - createTask()'));
    }

    // put json from url, if something is wrong error throwed
    updateTask (body: Object): Observable<Task[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new ResponseOptions({ headers: headers });

        return this.http.put(`${this.taskUrl}/${body['id']}`, body, options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error - updateTask()'));
    }

    // delete json from url, if something is wrong error throwed
    deleteTask (id:string): Observable<Task[]> {
        return this.http.delete(`${this.taskUrl}/${id}`)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error - deleteTask()'));
    }

}