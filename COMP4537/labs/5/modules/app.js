// Code attribution: Copilot (https://copilot.microsoft.com/) was used to develop solutions presented in this assignment. This includes verifying that code met requirements, analyzing errors, checking/looking up syntax, and summarizing requirements.
'use strict';
const http = require('http');
const url = require('url');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const msg = require('../lang/messages/en/serverMsg');

const db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: 'password'
});

class Lab5Controller
{
    static connectToDatabase()
    {
        try
        {
            db.connect();
            db.query('CREATE DATABASE IF NOT EXISTS patientDB');
            db.query('USE patientDB');
            const setupSql = fs.readFileSync(path.join(__dirname, 'setup.sql')).toString();
            db.query(setupSql);
        }
        catch (err) { console.error(err); }
    }

    static executeQuery(_req, res, query)
    {
        // Check for restricted keywords
        if (/drop|delete/i.test(query))   
            return res.writeHead(405, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.notAllowed }));

        db.query(query, (error, result) => 
        {
            if (error)            
                res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: error.message }));            
            else            
                res.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.insertedData, result }));
        });
    }

    static getQuery(_req, res, query)
    {
        // Check for restricted keywords
        if (/drop|delete/i.test(query))
            return res.writeHead(405, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: msg.notAllowed }));

        db.query(query, (error, result) =>
        {
            if (error)
                res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: error.message }));
            else
                res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(result));
        });
    }
}

// Connect to the database
Lab5Controller.connectToDatabase();

// Create the server
const server = http.createServer((req, res) => 
{
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS')    
        return res.writeHead(200, { 'Content-Type': 'text/plain' }).end();    

    const parsedUrl = url.parse(req.url, true);
    const { query } = parsedUrl.query;

    if (!parsedUrl.pathname.startsWith('/api/v1/sql'))
            return res.writeHead(404, { 'Content-Type': 'text/html' }).end(`<h1>${msg.four04}</h1>`);

    if (req.method === 'POST')
    {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => 
        {
            const { query } = JSON.parse(body);
            Lab5Controller.executeQuery(req, res, query);
        });
    }
    else if (req.method === 'GET')    
        Lab5Controller.getQuery(req, res, query);    
    else    
        res.writeHead(405, { 'Content-Type': 'text/plain' }).end(msg.methodNotAllowed);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${ PORT }`));
