import { NextRequest, NextResponse } from 'next/server';

interface Card {
  id: number;
  name: string;
  isReversed: boolean;
  meaning_up: string;
  meaning_rev: string;
  image_url: string;
}

interface RequestBody {
  cards: Card[];
  apiKey: string;
  provider: 'openai' | 'gemini';
}

async function getOpenAIReading(cards: Card[], apiKey: string): Promise<string> {
  const cardDescriptions = cards.map((card, index) => {
    const position = index === 0 ? '过去' : index === 1 ? '现在' : '未来';
    const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
    return `${position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${meaning}`;
  }).join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `你是一位专业的塔罗牌占卜师，擅长用温暖、神秘且富有洞察力的语言解读塔罗牌。你的解读应该：
1. 深入分析每张牌在对应位置的含义
2. 将三张牌联系起来，讲述一个连贯的故事
3. 给出实用且有启发性的建议
4. 语言要优美、神秘，但不要过于晦涩
5. 保持积极正面的态度，即使是不太好的牌也要给出建设性的解读
6. 回复使用中文，格式清晰，使用markdown格式`
        },
        {
          role: 'user',
          content: `请为我解读以下三张塔罗牌（三张牌无牌阵）：

${cardDescriptions}

请从过去、现在、未来三个维度进行解读，并给出整体建议。`
        }
      ],
      temperature: 0.8,
      max_tokens: 1500
    })
  });

  if (!response.ok) {
    throw new Error('OpenAI API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function getGeminiReading(cards: Card[], apiKey: string): Promise<string> {
  const cardDescriptions = cards.map((card, index) => {
    const position = index === 0 ? '过去' : index === 1 ? '现在' : '未来';
    const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
    return `${position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${meaning}`;
  }).join('\n');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `你是一位专业的塔罗牌占卜师，擅长用温暖、神秘且富有洞察力的语言解读塔罗牌。你的解读应该：
1. 深入分析每张牌在对应位置的含义
2. 将三张牌联系起来，讲述一个连贯的故事
3. 给出实用且有启发性的建议
4. 语言要优美、神秘，但不要过于晦涩
5. 保持积极正面的态度，即使是不太好的牌也要给出建设性的解读
6. 回复使用中文，格式清晰，使用markdown格式

请为我解读以下三张塔罗牌（三张牌无牌阵）：

${cardDescriptions}

请从过去、现在、未来三个维度进行解读，并给出整体建议。`
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1500
      }
    })
  });

  if (!response.ok) {
    throw new Error('Gemini API request failed');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { cards, apiKey, provider } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: '请先在设置中配置API密钥' },
        { status: 400 }
      );
    }

    let reading: string;

    if (provider === 'openai') {
      reading = await getOpenAIReading(cards, apiKey);
    } else {
      reading = await getGeminiReading(cards, apiKey);
    }

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('Reading error:', error);
    return NextResponse.json(
      { error: '解牌服务暂时不可用，请检查API密钥是否正确' },
      { status: 500 }
    );
  }
}
