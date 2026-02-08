import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, projectBrief, budgetRange } = req.body;

    // Basic validation
    if (!name || !email || !projectBrief) {
        return res.status(400).json({
            error: "Name, email, and project brief are required"
        });
    }

    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: "New Project Inquiry",
            text: `
New message from your portfolio website:

Name: ${name}
Email: ${email}
Budget Range: ${budgetRange || "Not specified"}

Project Brief:
${projectBrief}
      `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({
            error: "Failed to send message"
        });
    }
}
