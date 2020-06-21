
export const http = require('http');

export const request = (options, resolve, reject) => {
    const req = http.request(options, function(res){
        res.on("data", (data) => {
            resolve([res, data.toString()]);
        })
    });
    req.on("error", (e) => {
        reject(e);
    });
    req.end();
}