/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.1.2.0 (NJsonSchema v9.2.0.0) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class Client {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(Http) http: Http, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    resource(): Observable<{ [key: string] : MyItem; } | null> {
        let url_ = this.baseUrl + "/resource";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processResource(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processResource(response_);
                } catch (e) {
                    return <Observable<{ [key: string] : MyItem; }>><any>Observable.throw(e);
                }
            } else
                return <Observable<{ [key: string] : MyItem; }>><any>Observable.throw(response_);
        });
    }

    protected processResource(response: Response): Observable<{ [key: string] : MyItem; } | null> {
        const status = response.status; 

        if (status === 200) {
            const _responseText = response.text();
            let result200: { [key: string] : MyItem; } | null = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200) {
                result200 = {};
                for (let key in resultData200) {
                    if (resultData200.hasOwnProperty(key))
                        result200[key] = resultData200[key] ? MyItem.fromJS(resultData200[key]) : {};
                }
            }
            return Observable.of(result200);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.text();
            return throwException("An unexpected server error occurred.", status, _responseText);
        }
        return Observable.of<{ [key: string] : MyItem; } | null>(<any>null);
    }
}

export class MyItem implements IMyItem {
    x?: number | undefined;

    constructor(data?: IMyItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.x = data["x"];
        }
    }

    static fromJS(data: any): MyItem {
        let result = new MyItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["x"] = this.x;
        return data; 
    }
}

export interface IMyItem {
    x?: number | undefined;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    result: any; 

    constructor(message: string, status: number, response: string, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.result = result;
    }
}

function throwException(message: string, status: number, response: string, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, null));
}

function blobToText(blob: Blob): Observable<string> {
    return new Observable<string>((observer: any) => { 
        let reader = new FileReader(); 
        reader.onload = function() { 
            observer.next(this.result);
            observer.complete();
        }
        reader.readAsText(blob); 
    });
}