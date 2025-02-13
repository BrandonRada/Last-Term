// class Database{
//     constructor(){
//         const insertDataBtn = document.getElementById('insertDataBtn');
//         const submitQueryBtn = document.getElementById('submitQueryBtn');
//         const responseDiv = document.getElementById('response');
        
//         // Setup the buttons.
//         this.setupInsertButton();
//         this.setupSubmitButton();
//     }

//     setupInsertButton(){
//         insertDataBtn.addEventListener('click', () => {
//             const data = {
//                 query: `INSERT INTO patient (name, age, gender, condition) VALUES ('John Doe', 30, 'Male', 'Healthy'), ('Jane Smith', 28, 'Female', 'Healthy')`
//             };

//             fetch('https://exo-engine.com/COMP4537/labs/5/api/v1/sql', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 responseDiv.textContent = data.message;
//             })
//             .catch(error => console.error('Error:', error));
//         });
//     }

//     setupSubmitButton(){
//         submitQueryBtn.addEventListener('click', () => {
//             const query = document.getElementById('sqlQuery').value.trim();
//             const method = query.toLowerCase().startsWith('select') ? 'GET' : 'POST';
//             const url = method === 'GET' ? `https://exo-engine.com/COMP4537/labs/5/api/v1/sql?query=${encodeURIComponent(query)}` : 'https://exo-engine.com/COMP4537/labs/5/api/v1/sql';
//             const options = {
//                 method,
//                 headers: { 'Content-Type': 'application/json' }
//             };
//             if (method === 'POST') {
//                 options.body = JSON.stringify({ query });
//             }

//             fetch(url, options)
//             .then(response => response.json())
//             .then(data => {
//                 responseDiv.textContent = JSON.stringify(data, null, 2);
//             })
//             .catch(error => console.error('Error:', error));
//         });
//     }

// }

// const database = new Database();