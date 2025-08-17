# Vercel Deployment Guide

## Environment Variables Setup

To make the contact forms work on Vercel, you need to set up environment variables:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

## Gmail App Password Setup

For Gmail to work with nodemailer, you need to create an App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Enable 2-factor authentication if not already enabled
3. Go to Security > App passwords
4. Select "Mail" as the app
5. Generate the password
6. Use this generated password as your `EMAIL_PASS` environment variable

## Important Notes

- The `server.js` file is not used in Vercel deployment
- The API endpoints are now handled by serverless functions in the `/api` folder
- Make sure to redeploy after setting environment variables
- The forms will now work correctly on your Vercel-hosted site

## Testing

After deployment, test the forms on:
- Medical Tourism page: `/medical-tourism.html`
- Finance/Commodity Trading page: `/finance.html`
