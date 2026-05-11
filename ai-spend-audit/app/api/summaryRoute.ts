import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { auditData } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // Fast and cost-effective for this task
      max_tokens: 200,
      messages: [{ 
        role: "user", 
        content: `Analyze this AI tool spend data: ${JSON.stringify(auditData)}. 
                  Write a ~100-word summary for a startup founder. 
                  Highlight the biggest waste and one specific switch they should make. 
                  Keep the tone professional, urgent, yet helpful.` 
      }],
    });

    // Extract the text content safely
    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ summary: text });

  } catch (error) {
    // Requirement 76: Handle API failures gracefully with a fallback
    return NextResponse.json({ 
      summary: "Based on your current stack, you have significant opportunities to optimize your AI spend by right-sizing your team seats and switching to credit-based billing for high-usage tools." 
    });
  }
}