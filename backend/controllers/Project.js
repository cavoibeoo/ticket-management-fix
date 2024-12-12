const Project = require("../model/Project");

exports.create = async (req, res) => {
    try {
        if (Project.findOne({ name: req.body?.name })) {
            return res
                .status(400)
                .json({ message: `Project with name "${req.body?.name}" already exists` });
        }
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
        return error;
    }
};
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate("members").exec();

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.getByAdminId = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.find({ admin: id });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.getAll = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.addMember = async (req, res) => {
    const { projectId } = req.params;

    console.log(req.body);

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Add the new member's ID to the 'members' array
        project.members.push(req.body.memberid);

        // Save the updated project
        const updatedProject = await project.save();
        const populated = await updatedProject.populate("members");

        res.status(200).json(populated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteMember = async (req, res) => {
    const { projectId, memberId } = req.params;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Check if the member exists in the 'members' array
        const memberIndex = project.members.indexOf(memberId);

        if (memberIndex === -1) {
            return res.status(404).json({ error: "Member not found in project" });
        }

        // Remove the member's ID from the 'members' array
        project.members.splice(memberIndex, 1);

        // Save the updated project
        const updatedProject = await project.save();
        const populated = await updatedProject.populate("members");
        res.status(200).json(populated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Project.findByIdAndDelete(id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
