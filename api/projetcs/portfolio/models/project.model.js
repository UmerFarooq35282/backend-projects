const mongooge = require('mongoose')

const projectSchema = new mongooge.Schema({}, { timestamps: true })

const Project = mongooge.model("Project", projectSchema);

module.exports = { Project }