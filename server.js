const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail app password
  }
});

// Medical Tourism Form Submission
app.post('/api/medical-tourism', async (req, res) => {
  try {
    const { name, email, phone, query } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !query) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your Gmail
      subject: 'New Medical Tourism Inquiry - Grow Guides',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2675C6; border-bottom: 2px solid #2675C6; padding-bottom: 10px;">
            New Medical Tourism Inquiry
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #212121; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #212121; margin-top: 0;">Query Details</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${query}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>Source:</strong> Medical Tourism Page<br>
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Your medical tourism inquiry has been submitted successfully. We will contact you soon!' 
    });

  } catch (error) {
    console.error('Medical Tourism Form Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while submitting your inquiry. Please try again.' 
    });
  }
});


// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/medical-tourism', (req, res) => {
  res.sendFile(path.join(__dirname, 'medical-tourism.html'));
});

// Redirect legacy services paths to medical tourism
app.get(['/services', '/services.html'], (req, res) => {
  res.redirect(301, '/medical-tourism');
});

// Routes for static pages

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view your website`);
});
