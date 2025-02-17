// Code attribution: Copilot (https://copilot.microsoft.com/) was used to develop solutions presented in this assignment. This includes verifying that code met requirements, analyzing errors, checking/looking up syntax, and summarizing requirements.
import { noData } from '../lang/messages/en/user.js';
class Database
{
    constructor()
    {
        this.insertDataBtn = document.getElementById('insertDataBtn');
        this.displayDataBtn = document.getElementById('displayDataBtn');
        this.submitQueryBtn = document.getElementById('submitQueryBtn');
        this.responseDiv = document.getElementById('response');
        this.sqlAPI = 'https://exo-engine.com/COMP4537/labs/5/api/v1/sql';
        // Setup the buttons.
        this.setupInsertButton();
        this.setupSubmitButton();
        this.setupDisplayDataButton();
    }

    setupInsertButton = () => this.insertDataBtn.addEventListener('click', () =>
    {
        const data = 
        {
            query: `INSERT INTO patient (name, DateOfBirth) VALUES 
                    ('Sara Brown', '1901-01-01'), 
                    ('John Smith', '1941-01-01'), 
                    ('Jack Ma', '1961-01-30'), 
                    ('Elon Musk', '1999-01-01')`
        };

        const options = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(this.sqlAPI, options)
            .then(response => response.json())
            .then(data => this.responseDiv.textContent = data.message)
            .catch(error => console.error('Error:', error));
    });

    setupSubmitButton = () => this.submitQueryBtn.addEventListener('click', () =>
    {
        const query = document.getElementById('sqlQuery').value.trim();
        const method = query.toLowerCase().startsWith('select') ? 'GET' : 'POST';
        const url = method === 'GET' ? `${ this.sqlAPI }?query=${ encodeURIComponent(query) }` : this.sqlAPI;
        const options =
        {
            method,
            headers: { 'Content-Type': 'application/json' }
        };

        if (method === 'POST')
            options.body = JSON.stringify({ query });

        fetch(url, options)
            .then(response => response.json())
            .then(data => method === 'GET' ? this.displayTable(data) : this.responseDiv.textContent = data.message)
            .catch(error => console.error('Error:', error));
    });

    setupDisplayDataButton = () => this.displayDataBtn.addEventListener('click', () =>
    {
        const options = 
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`${ this.sqlAPI }?query=SELECT * FROM patient`, options)
            .then(response => response.json())
            .then(data => this.displayTable(data))
            .catch(error => console.error('Error:', error));
    });

    displayTable(data)
    {
        if (!Array.isArray(data) || data.length === 0)
            return this.responseDiv.textContent = noData;

        const table = document.createElement('table');
        const thead = table.createTHead();
        const tbody = table.createTBody();
        const headerRow = thead.insertRow();

        // Create table headers
        Object.keys(data[0]).forEach(key =>
        {
            const tableHeader = document.createElement('th');
            tableHeader.textContent = key;
            headerRow.appendChild(tableHeader);
        });

        // Create table rows
        data.forEach(row =>
        {
            const tableRow = tbody.insertRow();
            Object.values(row).forEach(value => tableRow.insertCell().textContent = value);
        });

        // Clear previous content and display table
        this.responseDiv.innerHTML = '';
        this.responseDiv.appendChild(table);
    }
}

const database = new Database();
