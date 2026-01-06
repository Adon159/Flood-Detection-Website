const ReliefRequest = require("../models/ReliefRequest");

// Get requests assigned to logged-in volunteer
exports.getAssignedRequests = async (req, res) => {
  try {
    const requests = await ReliefRequest.find({
      assignedVolunteer: req.user.id
    }).populate("userId", "name phone address");

    // Rename populated field for clarity in response
    const payload = requests.map((r) => {
      const obj = r.toObject();
      obj.victim = obj.userId || null;
      delete obj.userId;
      return obj;
    });

    res.json(payload);
  } catch (err) {
    console.error("getAssignedRequests error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await ReliefRequest.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Authorization: only assigned volunteer can update status
    if (!request.assignedVolunteer || String(request.assignedVolunteer) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not allowed to update this request" });
    }

    request.status = status;
    await request.save();

    res.json({ message: "Delivery status updated", request });
  } catch (err) {
    console.error("updateDeliveryStatus error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};