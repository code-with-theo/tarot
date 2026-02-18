import { NextRequest, NextResponse } from 'next/server';

interface CardData {
  name: string;
  isReversed: boolean;
  meaning_up: string;
  meaning_rev: string;
}

interface RequestBody {
  cards: CardData[];
}

async function callOpenAI(cards: CardData[]): Promise<string> {
  const cardDescriptions = cards.map((card, index) => {
    const position = index === 0 ? '过去' : index === 1 ? '现在' : '未来';
    const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
    return `${position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${meaning}`;
  }).join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `你是一位融合心理学与神秘学的塔罗牌解读师。你的解读风格温和、富有洞察力，既尊重塔罗牌的神秘传统，又能从心理学角度给出建设性的建议。

解读原则：
1. 将三张牌作为一个整体故事来解读，而非孤立解释
2. 结合"过去-现在-未来"的时间线，揭示事物的发展脉络
3. 用温暖、富有同理心的语言，给予求问者启发和力量
4. 适当引用荣格心理学概念（如阴影、原型、集体潜意识等）
5. 结尾给出一个简短、积极的建议或祝福

回复格式：直接给出解读内容，不要有任何开场白或结束语，字数控制在200-300字。`
        },
        {
          role: 'user',
          content: `请为我解读以下三张塔罗牌：\n\n${cardDescriptions}`
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(cards: CardData[]): Promise<string> {
  const cardDescriptions = cards.map((card, index) => {
    const position = index === 0 ? '过去' : index === 1 ? '现在' : '未来';
    const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
    return `${position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${meaning}`;
  }).join('\n');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `你是一位融合心理学与神秘学的塔罗牌解读师。请为我解读以下三张塔罗牌：

${cardDescriptions}

解读原则：
1. 将三张牌作为一个整体故事来解读，而非孤立解释
2. 结合"过去-现在-未来"的时间线，揭示事物的发展脉络
3. 用温暖、富有同理心的语言，给予求问者启发和力量
4. 适当引用荣格心理学概念（如阴影、原型、集体潜意识等）
5. 结尾给出一个简短、积极的建议或祝福

请直接给出解读内容，不要有任何开场白或结束语，字数控制在200-300字。`
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 500,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

function getMockReading(cards: CardData[]): string {
  const cardNames = cards.map(c => `${c.name}(${c.isReversed ? '逆' : '正'})`).join('、');
  
  return `你抽到的三张牌是：${cardNames}。

从过去的位置来看，这张牌揭示了你内心深处的某种模式或经历，它正在影响着当下的你。这张牌的能量提醒你，过去的经历虽然塑造了现在的你，但不必被其所束缚。

在现在的位置，这张牌反映了你当前的状态和面临的挑战。它暗示着一个需要你关注的重要领域，也许是内在成长，也许是外在关系的调整。

未来的牌面展现了一种可能性，一个可以努力的方向。这不是命运的定数，而是基于当前轨迹的自然延伸。你有能力通过当下的选择来影响这个未来。

荣格曾说："未被意识到的内容会以命运的形式重现。"这三张牌共同诉说着一个关于转变与成长的故事。建议你保持开放的心态，信任自己的直觉，勇敢地迈出下一步。愿星光指引你的道路。✦`;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { cards } = body;

    if (!cards || cards.length !== 3) {
      return NextResponse.json(
        { error: '请提供三张塔罗牌' },
        { status: 400 }
      );
    }

    let reading: string;

    if (process.env.OPENAI_API_KEY) {
      reading = await callOpenAI(cards);
    } else if (process.env.GEMINI_API_KEY) {
      reading = await callGemini(cards);
    } else {
      reading = getMockReading(cards);
    }

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('Reading API error:', error);
    return NextResponse.json(
      { error: '解牌服务暂时不可用' },
      { status: 500 }
    );
  }
}
