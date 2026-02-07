# EmailJS Setup Guide - Contact Form

This guide will help you set up EmailJS so your contact form sends real emails to your inbox.

## What is EmailJS?

EmailJS allows you to send emails directly from your website without a backend server. It's perfect for contact forms!

**Free Tier Benefits:**
- ✅ 200 emails/month (plenty for a portfolio)
- ✅ No credit card required
- ✅ No backend code needed
- ✅ Works with any email provider

---

## Step 1: Create EmailJS Account

1. Go to **[https://www.emailjs.com](https://www.emailjs.com)**
2. Click **"Sign Up"** in the top right
3. Choose **"Sign up with Google"** (easiest) or use email
4. Verify your email if needed
5. You'll be redirected to the dashboard

---

## Step 2: Add Email Service

This connects your Gmail account so EmailJS can send emails on your behalf.

### Navigation Path:
```
EmailJS Dashboard
  → Left Sidebar: "Email Services"
    → Click "Add New Service" button
```

### Detailed Steps:

1. **Click "Email Services"** in the left sidebar
2. **Click "Add New Service"** button
3. **Select "Gmail"** (since you use drminamagedwil@gmail.com)
4. **Click "Connect Account"**
5. **Select your Google account** (drminamagedwil@gmail.com)
6. **Allow EmailJS permissions** (it needs to send emails on your behalf)
7. **Give it a name:** "Portfolio Contact Form" (or any name you like)
8. **Click "Create Service"**
9. **IMPORTANT: Copy the Service ID** 
   - It looks like: `service_abc1234`
   - You'll see it displayed after creation
   - Save it somewhere - you'll need it in Step 5

### Troubleshooting:

**"Gmail not showing in list"**
- Make sure you're logged into your Google account
- Try using an incognito window if you have multiple Google accounts

**"Connection failed"**
- Check your internet connection
- Make sure you're using the correct Google account
- Try disconnecting and reconnecting

---

## Step 3: Create Email Template

This is the format of the email you'll receive when someone fills out the contact form.

### Navigation Path:
```
EmailJS Dashboard
  → Left Sidebar: "Email Templates"
    → Click "Create New Template" button
```

### Detailed Steps:

1. **Click "Email Templates"** in the left sidebar
2. **Click "Create New Template"** button
3. You'll see a template editor with two tabs:
   - **Settings** (default tab)
   - **Content** (where you'll design the email)

### Template Settings Tab:

1. **Template Name:** `contact_form_portfolio` (or any name)
2. Leave other settings as default

### Template Content Tab:

Click the **"Content"** tab and fill in:

**To Email (who receives the form):**
```
drminamagedwil@gmail.com
```

**From Name:**
```
{{from_name}}
```

**From Email:**
```
Portfolio Contact Form <noreply@emailjs.com>
```

**Reply To:**
```
{{reply_to}}
```

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Message Body (Content):**
```
You have received a new message from your portfolio website!

From: {{from_name}}
Email: {{reply_to}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. **Click "Save"** in the top right
5. **IMPORTANT: Copy the Template ID**
   - It looks like: `template_xyz5678`
   - You'll see it in the template list
   - Save it somewhere - you'll need it in Step 5

### Understanding Template Variables:

- `{{from_name}}` - The name the user enters in the form
- `{{reply_to}}` - The user's email address
- `{{subject}}` - The subject line from the form
- `{{message}}` - The message content

These match the field names in your Contact.jsx file!

---

## Step 4: Get Your Public Key

This is your API key that allows your website to use EmailJS.

### Navigation Path:
```
EmailJS Dashboard
  → Left Sidebar: "Account"
    → Tab: "General"
```

### Detailed Steps:

1. **Click "Account"** in the left sidebar
2. Make sure you're on the **"General"** tab
3. Scroll down to the **"API Keys"** section
4. **Find "Public Key"** 
   - It looks like: `AbCdEf123456GhIj`
   - It's a long alphanumeric string
5. **Click the copy icon** next to it
6. **IMPORTANT: Save this key** - you'll need it in Step 5

**Note:** Keep this key safe but know that it's called "public" because it's safe to use in frontend code (unlike a private API key).

---

## Step 5: Update Your Config File

Now let's add your EmailJS credentials to the config file.

### Steps:

1. **Open VS Code**
2. **Open file:** `src/config/emailjs.js`
3. **Replace the placeholder values** with your actual IDs:

```javascript
export const emailjsConfig = {
  serviceId: 'service_abc1234',     // Replace with YOUR Service ID from Step 2
  templateId: 'template_xyz5678',   // Replace with YOUR Template ID from Step 3
  publicKey: 'AbCdEf123456GhIj',    // Replace with YOUR Public Key from Step 4
};
```

4. **Save the file** (Ctrl+S or Cmd+S)

### Example:

If your credentials are:
- Service ID: `service_m8n3p9x`
- Template ID: `template_k4j7h2s`
- Public Key: `Xyz987WqR654LmN`

Your file should look like:

```javascript
export const emailjsConfig = {
  serviceId: 'service_m8n3p9x',
  templateId: 'template_k4j7h2s',
  publicKey: 'Xyz987WqR654LmN',
};
```

**IMPORTANT:** 
- Keep the quotes around the values
- Don't include any extra spaces
- Make sure there are commas after each line except the last one

---

## Step 6: Test the Contact Form

Let's make sure everything works!

### Start Development Server:

1. Open terminal in VS Code (Ctrl+` or View → Terminal)
2. Run:
   ```bash
   npm run dev
   ```
3. Open your browser to the URL shown (usually `http://localhost:5173`)

### Test Sending an Email:

1. **Scroll to the Contact section** at the bottom of the page
2. **Fill out the form:**
   - Name: `Test User`
   - Email: `test@example.com` (or your personal email)
   - Subject: `Testing Contact Form`
   - Message: `This is a test message from my portfolio contact form!`
3. **Click "Send Message"**
4. **Watch for the status:**
   - Button should change to "Sending..."
   - After a few seconds, you should see a green success message
   - If there's an error, you'll see a red error message

### Check Your Email:

1. **Open Gmail** and go to drminamagedwil@gmail.com
2. **Check your inbox** (it usually arrives in 10-30 seconds)
3. **Look for an email with subject:** "New Contact Form Message from Test User"
4. **Open the email** and verify it contains the test message

### If Email Doesn't Arrive:

1. **Check Spam/Junk folder** - first emails sometimes go there
2. **Check browser console** (F12 → Console tab) for errors
3. **Verify IDs in emailjs.js** - make sure they match exactly
4. **Wait 1-2 minutes** - sometimes there's a delay
5. **Try sending again** - first email can be slow

---

## Common Issues & Fixes

### Error: "Failed to send email"

**Possible Causes:**

1. **Wrong Service ID, Template ID, or Public Key**
   - Go back to EmailJS dashboard and double-check all IDs
   - Make sure you copied them exactly (no extra spaces)
   - Update `src/config/emailjs.js` with correct values

2. **Gmail Service Not Connected**
   - Go to EmailJS → Email Services
   - Make sure your Gmail is connected and active
   - Try disconnecting and reconnecting

3. **Template Variables Don't Match**
   - Make sure template uses: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`
   - These must match exactly (case-sensitive)

### Email Goes to Spam

**Solution:**
1. Open the email in Spam
2. Click "Not Spam" or "Move to Inbox"
3. Gmail will learn and future emails should go to inbox

**Long-term Fix:**
- Add `noreply@emailjs.com` to your Gmail contacts
- Mark emails as important

### "Sending..." Never Finishes

**Possible Causes:**

1. **No Internet Connection**
   - Check your network connection
   - Try refreshing the page

2. **EmailJS Service Down**
   - Go to https://status.emailjs.com
   - Check if there are any outages

3. **Browser Blocking Request**
   - Check browser console for CORS errors
   - Try a different browser
   - Disable browser extensions temporarily

### Rate Limit Exceeded

**Error:** "Too many requests"

**Solution:**
- EmailJS free tier: 200 emails/month
- You might be testing too frequently
- Wait a few minutes and try again
- If you need more emails, upgrade to a paid plan

---

## Monthly Limit Management

**Free Tier: 200 emails/month**

**Tips to Stay Under Limit:**

1. **Test sparingly** - Don't spam the form during testing
2. **Monitor usage** - Check EmailJS dashboard for email count
3. **Add CAPTCHA** (optional) - Prevents spam bots from filling your form
4. **Upgrade if needed** - Paid plans start at $7/month for 1,000 emails

**Check Your Usage:**
1. Go to EmailJS Dashboard
2. Click "Account" → "Usage"
3. See how many emails you've sent this month

---

## Security Notes

✅ **Safe to commit emailjs.js to GitHub** - Public key is designed for frontend use  
✅ **EmailJS validates your domain** - Prevents unauthorized use  
✅ **Rate limiting built-in** - Protects against abuse  
⚠️ **Never share your Private Key** (you only use Public Key in this setup)

---

## Next Steps

Once emails are working:

1. ✅ **Test with real contact info** - Send yourself a message
2. ✅ **Check mobile responsiveness** - Try filling form on phone
3. ✅ **Customize email template** - Make it match your brand
4. ✅ **Set up email notifications** - Get alerts on your phone when someone contacts you
5. ✅ **Add auto-reply** (optional) - Send confirmation email to the person who filled the form

---

## Support Resources

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS Support:** [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
- **Gmail Integration Guide:** [https://www.emailjs.com/docs/examples/gmail/](https://www.emailjs.com/docs/examples/gmail/)

---

## Summary Checklist

Before you can receive emails from your contact form, complete these steps:

- [ ] Sign up for EmailJS account
- [ ] Connect Gmail service and copy Service ID
- [ ] Create email template and copy Template ID
- [ ] Get Public Key from Account settings
- [ ] Update `src/config/emailjs.js` with all three IDs
- [ ] Test the form by sending a message
- [ ] Check your email inbox for the test message
- [ ] Mark EmailJS emails as "Not Spam" if needed

**Estimated Time:** 10-15 minutes

---

**Ready to go!** Follow these steps and your contact form will be sending real emails in no time. 🚀
