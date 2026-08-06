import { NextRequest, NextResponse } from 'next/server';
//@ts-ignore
import nodemailer from 'nodemailer';
import { getPrisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'technoyadav1234@gmail.com';

    // Log the contact form submission server-side
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Recipient: ${recipientEmail}`);
    console.log(`From: ${name} (${email})`);
    console.log(`Company: ${company || 'N/A'}`);
    console.log(`Service: ${service || 'N/A'}`);
    console.log(`Budget: ${budget || 'N/A'}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    // Persist to PostgreSQL Neon DB via Prisma if database connection is available
    const prisma = getPrisma();
    let savedLead = null;
    let dbStatus = 'not_configured';
    let dbErrorMessage: string | null = null;

    if (prisma) {
      try {
        savedLead = await prisma.contactLead.create({
          data: {
            fullName: name,
            email,
            phone: company ? `Company: ${company}` : null,
            service: service || company || null,
            budget: budget || null,
            message,
          },
        });
        dbStatus = 'saved';
        console.log('Successfully saved ContactLead to Neon Prisma DB. ID:', savedLead.id);
      } catch (dbErr: any) {
        console.error('Failed to save contact lead to Prisma DB:', dbErr);
        dbStatus = 'error';
        dbErrorMessage = dbErr?.message || String(dbErr);
      }
    } else {
      console.warn('Prisma client not initialized. DATABASE_URL may be missing or invalid in environment variables.');
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"StudioAdsPro Contact" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New Project Inquiry from ${name} - StudioAdsPro`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #eee; rounded-radius: 8px;">
            <h2 style="color: #000; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;">
              New StudioAdsPro Inquiry
            </h2>
            <p style="font-size: 15px;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="font-size: 15px;"><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p style="font-size: 15px;"><strong>Service Interested In:</strong> ${service || 'Not provided'}</p>
            <p style="font-size: 15px;"><strong>Budget Range:</strong> ${budget || 'Not provided'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <h4 style="margin-bottom: 10px;">Message / Project Details:</h4>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${message}</div>
            <p style="margin-top: 30px; font-size: 12px; color: #888;">This inquiry was sent directly from the StudioAdsPro website contact form to ${recipientEmail}.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({
      success: true,
      message: dbStatus === 'saved'
        ? `Inquiry successfully saved to database and logged for ${recipientEmail}`
        : `Inquiry received! (${dbStatus === 'not_configured' ? 'DATABASE_URL not configured on server' : 'DB error: ' + dbErrorMessage})`,
      dbStatus,
      leadId: savedLead?.id || null,
      dbErrorMessage,
    });
  } catch (error: any) {
    console.error('Contact email submission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
