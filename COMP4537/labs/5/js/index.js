class Database{
    constructor(){
        this.insertDataBtn = document.getElementById('insertDataBtn');
        this.displayDataBtn = document.getElementById('displayDataBtn');
        this.submitQueryBtn = document.getElementById('submitQueryBtn');
        this.responseDiv = document.getElementById('response');

        // Setup the buttons.
        this.setupInsertButton();
        this.setupSubmitButton();
        this.setupDisplayDataButton();
    }

    setupInsertButton(){
        const dataToInsert = document.getElementById("sqlQuery").value;
        this.insertDataBtn.addEventListener('click', () => {
            const data = {
                query: `INSERT INTO patient (name, age, gender, \`condition\`) VALUES ('John Doe', 30, 'Male', 'Healthy'), ('Jane Smith', 28, 'Female', 'Healthy')`
                // query: `${dataToInsert}`
            };
    
            fetch('https://exo-engine.com/COMP4537/labs/5/api/v1/sql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                this.responseDiv.textContent = data.message;
            })
            .catch(error => console.error('Error:', error));
        });
    }

    setupSubmitButton(){
        this.submitQueryBtn.addEventListener('click', () => {
            const query = document.getElementById('sqlQuery').value.trim();
            const method = query.toLowerCase().startsWith('select') ? 'GET' : 'POST';
            const url = method === 'GET' ? `https://exo-engine.com/COMP4537/labs/5/api/v1/sql?query=${encodeURIComponent(query)}` : 'https://exo-engine.com/COMP4537/labs/5/api/v1/sql';
            const options = {
                method,
                headers: { 'Content-Type': 'application/json' }
            };
            if (method === 'POST') {
                options.body = JSON.stringify({ query });
            }
    
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (method === 'GET') {
                    displayTable(data);
                } else {
                    responseDiv.textContent = JSON.stringify(data, null, 2);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
    setupDisplayDataButton(){
        this.displayDataBtn.addEventListener('click', () => {
            fetch('https://exo-engine.com/COMP4537/labs/5/api/v1/sql?query=SELECT%20*%20FROM%20patient', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                this.displayTable(data);
            })
            .catch(error => console.error('Error:', error));
        });
    }
    
    displayTable(data) {
        if (!Array.isArray(data) || data.length === 0) {
            this.responseDiv.textContent = 'No data available';
            return;
        }
        
        const table = document.createElement('table');
        const thead = table.createTHead();
        const tbody = table.createTBody();
        const headerRow = thead.insertRow();

        // Create table headers
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });

        // Create table rows
        data.forEach(row => {
            const tr = tbody.insertRow();
            Object.values(row).forEach(value => {
                const td = tr.insertCell();
                td.textContent = value;
            });
        });

        // Clear previous content and display table
        this.responseDiv.innerHTML = '';
        this.responseDiv.appendChild(table);
    }
    

}

const database = new Database();