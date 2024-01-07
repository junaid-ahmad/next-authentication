import { createTransport } from "nodemailer";

type EmailType = {
  to: string;
  subject: string;
  body: string;
};
export async function sendMail({ to, subject, body }: EmailType) {
  const { SMTP_EMAIL, SMTP_GMAIL_PASSWORD, SMTP_USER, SMTP_PASSWORD } =
    process.env;

  //   const transport = createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: SMTP_EMAIL,
  //       pass: SMTP_GMAIL_PASSWORD,
  //     },
  //   });

  const transport = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();

    console.log(`Test result: ${testResult}`);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });

    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}
