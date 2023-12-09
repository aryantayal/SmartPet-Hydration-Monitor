export const server = "http://192.168.1.67:5000";
//10.150.226.66

fetch("https://ipinfo.io", function(response) {
            console.log(response.ip);
        }, "json")