import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, projectBrief, budget } = req.body;

    if (!name || !email || !projectBrief) {
        return res.status(400).json({
            error: "Name, email, and project brief are required"
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: "New Project Inquiry",
            text: `
Name: ${name}
Email: ${email}
Budget: ${budget || "Not specified"}

Project Brief:
${projectBrief}
      `
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Email failed to send" });
    }
}
