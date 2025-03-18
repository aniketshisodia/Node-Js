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
                <div class="task" id="task-${task._id}">
                    <h2>${task.name || "No Name"}</h2>
                    <p><strong>Description:</strong> ${task.description || "No Description"}</p>
                    <p><strong>Timeline:</strong> ${task.timeline ? new Date(task.timeline).toLocaleDateString() : "No Date"}</p>
                     <button class="edit-btn" onclick="editTask('${task._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
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
                        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
                        color: #333;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .container {
                        background: #ffffff;
                        padding: 2.5rem;
                        border-radius: 16px;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 800px;
                        margin: 2rem;
                    }
                    h1 {
                        font-size: 2.5rem;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 2rem;
                        text-align: center;
                    }
                    .task {
                        background: #ffffff;
                        padding: 1.5rem;
                        border-radius: 12px;
                        margin-bottom: 1.5rem;
                        border-left: 6px solid #3498db;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        position: relative;
                    }
                    .task:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 8px 16px rgba(52, 152, 219, 0.3);
                    }
                    .task h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: #2c3e50;
                        margin: 0 0 0.75rem 0;
                    }
                    .task p {
                        font-size: 1rem;
                        color: #666;
                        margin: 0.5rem 0;
                    }
                    .task p strong {
                        color: #2c3e50;
                    }
                    .no-tasks {
                        text-align: center;
                        color: #666;
                        font-style: italic;
                        font-size: 1.25rem;
                    }
                    .task-container {
                        display: grid;
                        gap: 1.5rem;
                    }
                    .delete-btn {
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        position: absolute;
                        top: 1.5rem;
                        right: 1.5rem;
                        transition: background 0.3s ease;
                    }
                    .delete-btn:hover {
                        background: #c0392b;
                    }
                        
                    .edit-btn {
                        background: #fff123;
                        color: black;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        position: absolute;
                        top: -1rem;
                        right: 2rem;
                        transition: background 0.3s ease;
                    }
                    .edit-btn:hover {
                        background: #fff237;
                    }
                </style>
<script>
async function editTask(taskId) {
    const newTitle = prompt("Enter new task title:", "" + document.getElementById("title-" + taskId).innerText);
    const newDesc = prompt("Enter new task description:", "" + document.getElementById("desc-" + taskId).innerText);
    const newTimeline = prompt("Enter new task date (YYYY-MM-DD):", "" + document.getElementById("timeline-" + taskId).innerText);

    if (newTitle !== null && newDesc !== null && newTimeline !== null) {
        try {
            const response = await fetch("/api/list/update-task/" + taskId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newTitle,
                    description: newDesc,
                    timeline: new Date(newTimeline).toISOString()
                })
            });

            if (response.ok) {
                alert("Task updated successfully!");

                // ✅ Update UI
                document.getElementById("title-" + taskId).innerText = newTitle;
                document.getElementById("desc-" + taskId).innerText = newDesc;
                document.getElementById("timeline-" + taskId).innerText = new Date(newTimeline).toLocaleDateString();
            } else {
                alert("Failed to update the task.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating the task.");
        }
    }
}

async function deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        try {
            const response = await fetch('/api/list/delete-task/' + taskId, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                alert("Task deleted successfully!");

                // ✅ Remove the deleted task from UI (Optional)
                const taskElement = document.getElementById('task-' + taskId);
                if (taskElement) taskElement.remove();
            } else {
                alert("Failed to delete the task.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while deleting the task.");
        }
    }
}

</script >
            </head >
    <body>
        <div class="container">
            <h1>Task List</h1>
            <div class="task-container">
                ${tasks.length > 0 ? tasksHTML : '<p class="no-tasks">No tasks found.</p>'}
            </div>
        </div>
    </body>
            </html >
    `);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send(`
    < !DOCTYPE html >
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Error</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
                    <style>
                        body {
                            font - family: 'Poppins', sans-serif;
                        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
                        color: #333;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                        .container {
                            background: #ffffff;
                        padding: 2.5rem;
                        border-radius: 16px;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 600px;
                        text-align: center;
                    }
                        h1 {
                            font - size: 2.5rem;
                        font-weight: 600;
                        color: #e74c3c;
                        margin-bottom: 1.5rem;
                    }
                        p {
                            font - size: 1.25rem;
                        color: #666;
                    }
                    </style>
            </head>
            <body>
                <div class="container">
                    <h1>Error</h1>
                    <p style="color: #e74c3c;">Error loading tasks. Please try again later.</p>
                </div>
            </body>
        </html>
`);
    }
};


exports.deleteTask = async (req, res) => {
    try {
        console.log("Received ID:", req.params.id);

        const taskID = req.params.id.trim(); // Trim spaces

        const deleteTask = await List.findByIdAndDelete(taskID);

        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" }); // ✅ Respond to client
    } catch (error) {
        console.error("Error in deleteTask:", error);
        res.status(500).json({ message: "Error in deleting task" });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const taskID = req.params.id.trim();
        const { name, description, timeline } = req.body;

        const updatedTask = await List.findByIdAndUpdate(
            taskID,
            { name, description, timeline },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task" });
    }
};
