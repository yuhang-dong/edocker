import {request} from './http'

export const ping = (baseUrl) => {
    return new Promise(function(resolve, reject){
        let urls = baseUrl.split(":");
        let options = {
            hostname: urls[0],
            port: urls[1],
            path: "/_ping",
            method: "GET"
        };
        request(options, resolve, reject);
    });
};

export const listContainers = (baseUrl) => {
    return new Promise(function(resolve, reject){
        let urls = baseUrl.split(":");
        let options = {
            hostname: urls[0],
            port: urls[1],
            path: "/containers/json?all=true",
            method: "GET"
        };
        request(options, resolve, reject);
    });
}