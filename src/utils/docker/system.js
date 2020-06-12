export function ping(ajax, url, callback) {
    ajax({
        url: url,
        method: "GET",
        
    },callback);
}