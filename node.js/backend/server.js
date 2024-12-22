const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const emailjs = require("emailjs-com"); // Added for sending email
require("dotenv").config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/project", {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema and Model
const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema, "users");

// Admin Schema and Model
const AdminSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String },
});

const Admin = mongoose.model("Admin", AdminSchema, "admin");

// Application Schema and Model
const ApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollnumber: { type: String, required: true },
    fathername: { type: String, required: true },
    phone: { type: String, required: true },
    certificateType: { type: String, required: true },
    reason: { type: String, required: true },
    submittedDate: { type: Date, default: Date.now },
    status: { type: String, default: "Not Accepted" },
  },
  { timestamps: true }
);

const Application = mongoose.model(
  "Application",
  ApplicationSchema,
  "applications"
);

// Function to send email notification
// Function to send email notification to the applicant
const sendEmailNotification = async (user, application) => {
  try {
    const emailResponse = await emailjs.send(
      "service_sfl7z1n", // Your EmailJS Service ID
      "template_au1anzr", // Your EmailJS Template ID
      {
        user_name: user.name,                        // User's name (applicant)
        certificate_type: application.certificateType,  // The certificate type
        user_email: user.email,                      // The user's email (recipient)
        from_name: "Akshara",                        // From name (static value)
        from_email: "gouniaksharareddy@gmail.com",        // From email (static value)
        reply_to: user.email,                        // Reply-to email (dynamic, user’s email)
        // You can add other dynamic fields if needed
      },
      "nrZnmJFz0TgZbL35d" // Your EmailJS Public Key
    );
    console.log(`Email sent to ${user.name}:`, emailResponse.text);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


// Login Endpoint
app.post("/login", async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const user = await User.findOne({ user_id });
    if (user && user.password === password) {
      return res.json({
        role: "user",
        user_id: user.user_id,
        name: user.name,
        phone: user.phone,
        course: user.course,
        email: user.email,
        message: "Login successful",
      });
    }

    const admin = await Admin.findOne({ user_id });
    if (admin && admin.password === password) {
      return res.json({
        role: "admin",
        user_id: admin.user_id,
        name: admin.name,
        email: admin.email,
        message: "Login successful",
      });
    }

    res.status(400).json({ message: "Incorrect User ID or Password" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to Submit Application
app.post("/applications", async (req, res) => {
  const { name, rollnumber, fathername, phone, certificateType, reason } =
    req.body;

  try {
    const newApplication = new Application({
      name,
      rollnumber,
      fathername,
      phone,
      certificateType,
      reason,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error saving application" });
  }
});

// Fetch Applications
app.get("/applications", async (req, res) => {
  const { rollnumber, status } = req.query;

  try {
    const query = {};
    if (rollnumber) query.rollnumber = rollnumber;
    if (status) query.status = status;

    const applications = await Application.find(query);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

// Fetch Applications Count
app.get("/applications/counts", async (req, res) => {
  const { rollnumber } = req.query;

  if (!rollnumber) {
    return res.status(400).json({ message: "Roll number is required" });
  }

  try {
    const result = await Application.aggregate([
      { $match: { rollnumber } },
      {
        $group: {
          _id: { $toLower: "$status" },
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = {
      pending: result.find((item) => item._id === "pending")?.count || 0,
      completed: result.find((item) => item._id === "completed")?.count || 0,
    };

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching application counts" });
  }
});

// Validate User ID
app.get("/validate-user/:rollnumber", async (req, res) => {
  const { rollnumber } = req.params;

  try {
    const userExists = await User.findOne({ user_id: rollnumber });
    if (!userExists) {
      return res.status(404).json({
        exists: false,
        message: "User ID does not exist.",
      });
    }

    res.status(200).json({
      exists: true,
      message: "User ID is valid.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error validating user ID" });
  }
});

// Pending Applications
app.get("/applications/pending", async (req, res) => {
  try {
    const pendingApplications = await Application.find({
      status: { $regex: /^pending$/i },
    });
    res.status(200).json(pendingApplications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending tasks" });
  }
});

// Fetch Applications for Logged-In User with status filter
app.get("/applications/requests", async (req, res) => {
  const { status } = req.query; // Extract status from query params

  try {
    // Fetch applications based on the status query parameter
    const query = status ? { status } : {}; // If status is provided, filter by it
    const applications = await Application.find(query);

    // Send the response with filtered applications
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

// Update Application Status and Send Email Notification
// Update Application Status and Send Email Notification
app.put("/applications/requests/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the application by ID
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.status = status;
    await application.save();

    // Retrieve the user associated with this application
    const user = await User.findOne({ user_id: application.rollnumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If status is "completed", send the email notification
    if (status === "completed") {
      await sendEmailNotification(user, application); // Send email to the user
    }

    res.status(200).json({
      message: "Application marked as complete.",
      user: {
        name: user.name,
        email: user.email,
      },
      certificateType: application.certificateType,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Error updating application status" });
  }
});

// Complete Application by Rollnumber and Send Email Notification
app.put("/applications/:rollnumber/complete", async (req, res) => {
  const { rollnumber } = req.params;

  try {
    // Find the application by rollnumber
    const application = await Application.findOne({ rollnumber });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Retrieve the user details using rollnumber
    const user = await User.findOne({ user_id: rollnumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the application status to "completed"
    application.status = "completed";
    await application.save();

    // Send the email notification if the application status is completed
    await sendEmailNotification(user, application); // Send email

    // Send response to frontend including user data
    res.status(200).json({
      message: "Application marked as complete.",
      name: application.name,
      certificateType: application.certificateType,
      email: user.email,
    });
  } catch (error) {
    console.error("Error completing application:", error);
    res.status(500).json({ message: "Error completing application" });
  }
});


// Update Profile
app.put("/update-profile", async (req, res) => {
  const { user_id, name, phone, email, course } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id },
      { name, phone, email, course },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Fetch user details by roll number
app.get("/users/:rollnumber", async (req, res) => {
  const { rollnumber } = req.params;
  try {
    const user = await User.findOne({ user_id: rollnumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});
app.post("/forgot-password", async (req, res) => {
  const { user_id } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User ID not found" });
    }

    // Generate a reset link (without tokens)
    const resetLink = `http://localhost:3000/reset-password?user_id=${user_id}`;

    // Send the email using EmailJS
    await emailjs.send(
      "service_sfl7z1n", // EmailJS Service ID
      "template_q6zclcb", // EmailJS Template ID
      {
        user_email: user.email,
        user_name: user.name,
        reset_link: resetLink,
      },
      "nrZnmJFz0TgZbL35d" // EmailJS Public Key
    );

    res.status(200).json({
      message: `Password reset email sent successfully to ${user.email}.`,
    });
  } catch (error) {
    console.error("Error processing forgot-password request:", error);
    res.status(500).json({ message: "Failed to send password reset email" });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
