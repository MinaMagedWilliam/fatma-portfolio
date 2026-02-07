// EmailJS Configuration
// Get these values from https://dashboard.emailjs.com/

export const emailjsConfig = {
  serviceId: 'service_bjvunau',     // e.g., 'service_abc123'
  templateId: 'template_rmxh8w4',   // e.g., 'template_xyz789'
  publicKey: 'JDlvyqpbKGtdA2D9o',     // e.g., 'AbCdEf123456'
};

// SETUP INSTRUCTIONS:
// 1. Go to https://emailjs.com and sign up (it's free)
// 2. Add Email Service:
//    - Dashboard → Email Services → Add New Service
//    - Choose Gmail (or your email provider)
//    - Connect your email: ahmedghareb208@gmail.com
//    - Copy the Service ID
// 3. Create Email Template:
//    - Dashboard → Email Templates → Create New Template
//    - Use this template content:
//
//    Subject: New Contact Form Message from {{from_name}}
//    
//    From: {{from_name}}
//    Email: {{reply_to}}
//    Subject: {{subject}}
//    
//    Message:
//    {{message}}
//
//    - Save and copy the Template ID
// 4. Get Public Key:
//    - Dashboard → Account → General
//    - Copy your Public Key (under API Keys)
// 5. Replace the values above with your actual IDs
