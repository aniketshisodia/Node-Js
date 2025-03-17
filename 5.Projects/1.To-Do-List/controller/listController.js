const List = require('../Model/List');
const path = require('path');

exports.createTask = async (req, res) => {
    try {
        const { name, description, timeline } = req.body;
        const newTask = await List.create({ name, description, timeline });
        console.log(newTask);
        res.status(201).json({
            status: 'success',
            data: {
                name: newTask.name
            }
        });
    }
    catch (err) {
        console.log('Error in createTask', err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}
exports.getTasks = async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await List.find();

        // Generate HTML for the tasks
        let tasksHTML = '';
        tasks.forEach((task) => {
            tasksHTML += `
                <div class="task">
                    <h2>${task.name || "No Name"}</h2>
                    <p><strong>Description:</strong> ${task.description || "No Description"}</p>
                    <p><strong>Timeline:</strong> ${task.timeline ? new Date(task.timeline).toLocaleDateString() : "No Date"
                }</p>
                </div>
            `;
        });

        // Send the HTML response
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Task List</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        background-color: #f4f4f9;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .container {
                        background: #fff;
                        padding: 2rem;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 600px;
                    }
                    h1 {
                        font-size: 2rem;
                        font-weight: 600;
                        color: #4a90e2;
                        margin-bottom: 1.5rem;
                        text-align: center;
                    }
                    .task {
                        background: #f9f9f9;
                        padding: 1rem;
                        border-radius: 8px;
                        margin-bottom: 1rem;
                        border-left: 4px solid #4a90e2;
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .task:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .task h2 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #333;
                        margin: 0 0 0.5rem 0;
                    }
                    .task p {
                        font-size: 0.9rem;
                        color: #666;
                        margin: 0.25rem 0;
                    }
                    .task p strong {
                        color: #333;
                    }
                    .no-tasks {
                        text-align: center;
                        color: #666;
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Task List</h1>
                    <div id="taskContainer">
                        ${tasks.length > 0 ? tasksHTML : '<p class="no-tasks">No tasks found.</p>'}
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Error</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        background-color: #f4f4f9;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .container {
                        background: #fff;
                        padding: 2rem;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 600px;
                        text-align: center;
                    }
                    h1 {
                        font-size: 2rem;
                        font-weight: 600;
                        color: #e74c3c;
                        margin-bottom: 1.5rem;
                    }
                    p {
                        font-size: 1rem;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Error</h1>
                    <p style="color: red;">Error loading tasks. Please try again later.</p>
                </div>
            </body>
            </html>
        `);
    }
};