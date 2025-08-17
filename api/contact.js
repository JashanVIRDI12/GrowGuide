const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, query, type } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !query) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email environment variables not set');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured. Please contact administrator.' 
      });
    }

    // Email configuration
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Determine subject and styling based on form type
    const formType = type || 'general';
    let subject, color, title;
    
    if (formType === 'medical-tourism') {
      subject = 'New Medical Tourism Inquiry - Grow Guides';
      color = '#2675C6';
      title = 'Medical Tourism Inquiry';
    } else if (formType === 'commodity-trading') {
      subject = 'New Commodity Trading Inquiry - Grow Guides';
      color = '#37BC9B';
      title = 'Commodity Trading Inquiry';
    } else {
      subject = 'New Contact Form Inquiry - Grow Guides';
      color = '#6c757d';
      title = 'General Inquiry';
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px;">
            New ${title}
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
              <strong>Source:</strong> ${title} Page<br>
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', {
      type: formType,
      name,
      email,
      phone,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true, 
      message: 'Your inquiry has been submitted successfully. We will contact you soon!' 
    });

  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while submitting your inquiry. Please try again.' 
    });
  }
}
