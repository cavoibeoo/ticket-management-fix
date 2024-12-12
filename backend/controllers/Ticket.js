const Ticket = require("../model/Ticket");

// create
exports.create = async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        await newTicket.save();
        await newTicket.populate("assignedTo");
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        const comments = await Comment.find({ ticket: id });
        ticket.comments = comments;
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.getByProjectId = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.find({ project: id }).populate("assignedTo");
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.getAll = async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.getByMemberId = async (req, res) => {
    try {
        const { id } = req.params;
        const tickets = await Ticket.find({ assignedTo: id });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Ticket.findByIdAndUpdate(id, req.body, { new: true }).populate(
            "assignedTo"
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Ticket.findByIdAndDelete(id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};
