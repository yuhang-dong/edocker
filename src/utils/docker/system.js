export function ping(ajax, url, callback) {
    alert("!23");
    console.log(ajax)
    console.log(url)
    console.log(callback)
    ajax({
        url: url,
        method: "GET",
        
    },callback);
}