# Grow Guides - Medical Tourism & Commodity Trading

A comprehensive website offering medical tourism and commodity trading services with integrated email notification system.

## Features

- **Medical Tourism Services**: Complete medical tourism consultation and planning
- **Commodity Trading**: Expert commodity trading guidance and platform access
- **Email Notifications**: Automatic email alerts for form submissions
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Form Handling**: Instant form submission with user feedback

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

1. **Create a Gmail App Password**:
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification
   - Create an App Password for "Mail"
   - Copy the generated 16-character password

2. **Update Environment Variables**:
   - Open the `.env` file
   - Replace `your-email@gmail.com` with your actual Gmail address
   - Replace `your-app-password` with the app password you generated

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3000
```

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The website will be available at `http://localhost:3000`

## How It Works

### Form Submissions

When users submit forms on either the Medical Tourism or Commodity Trading pages:

1. **Frontend**: JavaScript captures form data and sends it to the backend
2. **Backend**: Express server processes the submission and sends an email
3. **Email**: You receive a formatted email with all the inquiry details
4. **User Feedback**: Users see a success/error notification

### Email Format

Each email includes:
- **Contact Information**: Name, email, phone
- **Query Details**: User's specific requirements
- **Source**: Which page the inquiry came from
- **Timestamp**: When the inquiry was submitted

## File Structure

```
GrowGuide/
├── server.js              # Express server with email functionality
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (email config)
├── js/
│   ├── form-handler.js    # Frontend form submission logic
│   └── navbar.js          # Navigation functionality
├── medical-tourism.html   # Medical tourism page with form
├── finance.html           # Commodity trading page with form
└── ... (other HTML/CSS files)
```

## API Endpoints

- `POST /api/medical-tourism` - Handles medical tourism form submissions
- `POST /api/commodity-trading` - Handles commodity trading form submissions

## Troubleshooting

### Email Not Sending

1. **Check Gmail Settings**:
   - Ensure 2-Step Verification is enabled
   - Verify the app password is correct
   - Check if "Less secure app access" is disabled

2. **Check Environment Variables**:
   - Verify `.env` file exists and has correct values
   - Restart the server after changing `.env`

3. **Check Console Logs**:
   - Look for error messages in the terminal
   - Check browser console for frontend errors

### Form Not Working

1. **Check Server Status**:
   - Ensure server is running on port 3000
   - Verify no other service is using the port

2. **Check JavaScript**:
   - Open browser developer tools
   - Look for JavaScript errors in console

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main Gmail password
- Consider implementing rate limiting for production use
- Add CSRF protection for enhanced security

## Production Deployment

For production deployment:

1. **Environment Variables**: Set proper environment variables on your hosting platform
2. **HTTPS**: Use HTTPS for secure form submissions
3. **Rate Limiting**: Implement rate limiting to prevent spam
4. **Email Service**: Consider using a dedicated email service like SendGrid or AWS SES
5. **Domain**: Update form action URLs to match your domain

## Support

For technical support or questions about the email functionality, please check the troubleshooting section above or review the server logs for specific error messages.
