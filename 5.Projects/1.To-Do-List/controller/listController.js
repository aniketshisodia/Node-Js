const List = require('../Model/List');

exports.creatTask = async (req, res) => {
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