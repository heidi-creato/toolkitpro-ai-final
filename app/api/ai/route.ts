import { NextRequest, NextResponse } from 'next/server';

// استخدام Pollinations.ai (مجاني ولا يحتاج API key)
export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json();
    
    let systemPrompt = '';
    if (type === 'hashtags') {
      systemPrompt = `You are a social media hashtag generator. Generate 10-15 relevant hashtags for the following topic. Return ONLY the hashtags separated by spaces. Make them trending and popular. Write in English. Topic: `;
    } else if (type === 'youtube') {
      systemPrompt = `You are a YouTube title generator. Generate 5 catchy, clickable YouTube video titles for the following topic. Each title should be under 70 characters. Return one title per line without numbering. Topic: `;
    } else {
      systemPrompt = `You are a helpful assistant. Provide a creative response to: `;
    }
    
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        model: 'openai',
        seed: -1,
        json: false
      })
    });
    
    const text = await response.text();
    return NextResponse.json({ success: true, result: text });
    
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json({ success: false, error: 'AI service temporarily unavailable' }, { status: 500 });
  }
}