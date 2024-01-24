const mongoose = require('mongoose');
const User = require('./userSchema');

const fileSchema = {
    filename: String,
    mimetype: String,
    size: Number,
    data: Buffer,
};

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    universityname: { type: String, required: true },
    author: {type: String, required: true },
    uploadDate: { type: Date, default: Date.now() },
    tags: { type: [String], default: [] },
    email: { type: String },
    files: [fileSchema],
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;