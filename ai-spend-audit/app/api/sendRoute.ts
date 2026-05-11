import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, totalSavings } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'Audit Tool <onboarding@resend.dev>', // Free tier uses this domain
      to: [email],
      subject: 'Your AI Spend Audit Results',
      html: `<h1>Your Audit is Ready!</h1>
             <p>You could save <strong>$${totalSavings}</strong> per year.</p>
             <p>A Credex specialist will reach out shortly to help you claim these savings.</p>`
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}