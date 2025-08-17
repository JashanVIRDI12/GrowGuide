export default function handler(req, res) {
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

    // For now, just log the data (you can replace this with email sending later)
    console.log('Form submission received:', {
      type: type || 'general',
      name,
      email,
      phone,
      query,
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
