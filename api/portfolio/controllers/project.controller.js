const addProject = async (req, res) => {
    try {
        res.send("Add Project Controller FUNC");
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
}

module.exports = { addProject }