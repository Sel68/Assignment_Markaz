const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Allow CORS from your frontend (typically running on localhost:3000)
app.use(cors());
app.use(express.json());

// Set up Multer for file uploads (files stored temporarily in "uploads" folder)
const upload = multer({ dest: 'uploads/' });

// Create a Nodemailer test account (using Ethereal for demonstration)
let transporter;
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account: ' + err.message);
    return;
  }
  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure, // true for 465, false for other ports
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });
  console.log('Nodemailer test account created. Emails can be viewed using the provided URL in the console.');
});

// In-memory storage for assignments (for reminder demonstration)
const assignments = [];

/**
 * Endpoint 1: Upload Assignment and Send Email
 * Expects multipart/form-data POST with:
 * - file: assignment file
 * - teacherEmail: teacher's email address
 * - subject (optional): subject of the assignment/email
 */
app.post('/api/upload-assignment', upload.single('file'), (req, res) => {
  const teacherEmail = req.body.teacherEmail;
  const subject = req.body.subject || 'Assignment Submission';
  const file = req.file;

  if (!file || !teacherEmail) {
    return res.status(400).json({ error: 'File and teacher email are required.' });
  }

  const mailOptions = {
    from: 'PinkGeese@assignmentmarkaz.com',
    to: teacherEmail,
    subject,
    text: 'Please find the attached assignment submission.',
    attachments: [{
      filename: file.originalname,
      path: file.path,
    }],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending assignment email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    console.log('Assignment email sent:', nodemailer.getTestMessageUrl(info));
    res.json({ message: 'Assignment submitted and email sent', info: nodemailer.getTestMessageUrl(info) });
  });
});

/**
 * Endpoint 2: Add Assignment & Schedule Reminder
 * Expects JSON: { subject, dueDate (DD/MM/YY), platform, teacherEmail }
 * If the due date is within 2 minutes from now, a reminder email is scheduled after 10 seconds.
 */
app.post('/api/add-assignment', (req, res) => {
  const { subject, dueDate, platform, teacherEmail } = req.body;
  // Convert dueDate (DD/MM/YY) to a Date object
  const [day, month, year] = dueDate.split('/');
  const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
  const due = new Date(fullYear, parseInt(month) - 1, parseInt(day));
  const assignment = { subject, dueDate: due, platform, teacherEmail };
  assignments.push(assignment);

  // If the due date is less than 2 minutes from now, schedule a reminder after 10 seconds
  const now = new Date();
  const timeDiff = due.getTime() - now.getTime();
  if (timeDiff > 0 && timeDiff < 2 * 60 * 1000) {
    setTimeout(() => {
      if (transporter && teacherEmail) {
        const mailOptions = {
          from: 'PinkGeese@assignmentmarkaz.com',
          to: teacherEmail,
          subject: `Reminder: Assignment "${subject}" due soon`,
          text: `This is a reminder that the assignment "${subject}" is due on ${dueDate}.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending reminder email:', error);
          } else {
            console.log('Reminder email sent:', nodemailer.getTestMessageUrl(info));
          }
        });
      } else {
        console.log(`Reminder: Assignment "${subject}" is due soon!`);
      }
    }, 10000); // 10 seconds delay for demo
  }

  res.json({ message: 'Assignment added and reminder scheduled if applicable.' });
});

/**
 * Endpoint 3: Request Extension
 * Expects JSON: { reason, teacherEmail, subject }
 * Sends an actual extension request email.
 */
app.post('/api/request-extension', (req, res) => {
  const { reason, teacherEmail, subject } = req.body;
  if (!teacherEmail || !reason || !subject) {
    return res.status(400).json({ error: 'Teacher email, subject, and reason are required.' });
  }
  const mailOptions = {
    from: 'no-reply@assignmentmanager.com',
    to: teacherEmail,
    subject: `Subject: Request for extension`,
    text: `Dear Sir,\nI am writing to kindly request an extension for the upcoming assignment because ${reason}.\nI understand the importance of adhering to deadlines. However, given the circumstances, I would greatly appreciate some additional time to ensure quality of my work.\nPlease let me know if this would be possible. Thank you for your understanding and cooperation.\nBest regards,\nPinkGoose`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending extension request email:', error);
      return res.status(500).json({ error: 'Error sending extension email' });
    }
    console.log('Extension request email sent:', nodemailer.getTestMessageUrl(info));
    res.json({ message: 'Extension request email sent', info: nodemailer.getTestMessageUrl(info) });
  });
});

// Serve uploaded files (if needed) from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
