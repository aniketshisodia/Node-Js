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
                <style>
                    #taskContainer {
                        margin-top: 20px;
                    }
                    .task {
                        border: 1px solid #ccc;
                        padding: 10px;
                        margin-bottom: 10px;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <h1>Task List</h1>
                <div id="taskContainer">
                    ${tasks.length > 0 ? tasksHTML : "<p>No tasks found.</p>"}
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
            </head>
            <body>
                <h1>Error</h1>
                <p style="color: red;">Error loading tasks. Please try again later.</p>
            </body>
            </html>
        `);
    }

}