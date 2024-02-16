const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title> Enter Your Message : </title></head>');
        res.write('<body><form method="POST" action = "/message"><input type="text" name = "message"><button type="Submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        });

        return req.on('end', () => {
            const barsedBody = Buffer.concat(body).toString();
            console.log(barsedBody);
            const message = barsedBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> Node.JS </title></head>');
    res.write('<h1><body>Hi, Welcome To Node.JS Server !</body></h1>');
    res.write('</html>');
    res.end();
}


module.exports.requestHandler = requestHandler;