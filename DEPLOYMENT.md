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

## Troubleshooting

If you're still getting 404 errors after deployment:

1. **Test the API endpoints directly**:
   - Visit `https://your-domain.vercel.app/api/test` in your browser
   - You should see a JSON response: `{"success":true,"message":"API is working!","timestamp":"..."}`
   - Visit `https://your-domain.vercel.app/api/contact` (should return "Method not allowed" for GET)

2. **Check Vercel deployment logs**:
   - Go to your Vercel dashboard
   - Click on your latest deployment
   - Check the "Functions" tab to see if the API functions are being built

3. **Verify file structure**:
   - Make sure the `/api` folder is in the root of your repository
   - Ensure the API files have the correct `.js` extension

4. **Force redeploy**:
   - In Vercel dashboard, go to your project
   - Click "Redeploy" to force a fresh deployment

5. **Alternative solution - Use Formspree**:
   If serverless functions still don't work, you can use Formspree:
   - Go to https://formspree.io/
   - Create a free account
   - Create a new form
   - Replace the form action with your Formspree endpoint
   - Example: `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`

6. **Check environment variables**:
   - Ensure `EMAIL_USER` and `EMAIL_PASS` are set correctly
   - Make sure there are no extra spaces or quotes in the values
