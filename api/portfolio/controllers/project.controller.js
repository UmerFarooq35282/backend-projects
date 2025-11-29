const addProject = async (req, res) => {
    try {
        res.send("Add Project Controller FUNC");
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
}

const getAllProjects = async (req, res) => {
    try {
        res.send("logic for All projects fetching implement soon")
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
}

module.exports = { addProject , getAllProjects}