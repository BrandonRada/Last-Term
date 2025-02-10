// Code attribution: Copilot (https://copilot.microsoft.com/) was used to develop solutions presented in this assignment. This includes verifying that code met requirements, analyzing errors, checking/looking up syntax, and summarizing requirements.
'use strict';
const http = require('http');
const url = require('url');
const msg = require('./lang/messages/en/responseMsg');

let dictionary = [];
let requestCount = 0;

class Lab4Controller
{
    static createDefinition(req, res)
    {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () =>
        {
            const { word, definition } = JSON.parse(body);
            if (!definition || definition.trim() === '')
                return res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.defUndefined }));

            if (!word || word.trim() === '')
                return res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.wordUndefined }));

            if (/\d/.test(word) || /\d/.test(definition))
                return res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.noNumbers }));

            if (dictionary.find(item => item.word === word))
                return res.writeHead(409, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.alreadyExists.replace('%1', word) }));

            dictionary.push({ word, definition });

            requestCount++;

            res.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.newEntry.replace('%1', word).replace('%2', definition), requestCount, totalEntries: dictionary.length, date: new Date() }));
        });
    }

    static getDefinition(req, res)
    {
        const queryObject = url.parse(req.url, true).query;
        const word = queryObject.word;
        const entry = dictionary.find(item => item.word === word);

        requestCount++;

        if (entry)
            res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ word: entry.word, definition: entry.definition, requestCount }));
        else
            res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.notFound.replace('%1', word), requestCount }));
    }

    static handleUnsupportedMethod = (req, res) => res.writeHead(405, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.methodNotAllowed.replace('%1', req.method) }));
}

const server = http.createServer((req, res) =>
{
    const parsedUrl = url.parse(req.url, true);
    console.log(`Received ${ req.method } request for ${ parsedUrl.pathname }`);

    if (!parsedUrl.pathname.startsWith('/api/definitions'))
        return res.writeHead(404, { 'Content-Type': 'text/html' }).end(`<h1>${msg.four04}</h1>`);

    if (req.method === 'POST')
        Lab4Controller.createDefinition(req, res);
    else if (req.method === 'GET')
        Lab4Controller.getDefinition(req, res);
    else
        Lab4Controller.handleUnsupportedMethod(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${ PORT }`));
