import { TarotCard } from '@/types/tarot';

const IMG_BASE = 'https://www.sacred-texts.com/tarot/pkt/img';

export const tarotCards: TarotCard[] = [
  {
    id: 0,
    name: "愚者",
    meaning_up: "新开始、冒险精神、纯真无邪、自由自在、潜力无限。代表踏上一段新的旅程，保持开放的心态迎接未知。",
    meaning_rev: "鲁莽行事、缺乏计划、愚蠢决定、过度冒险。提醒需要更加谨慎，避免因冲动而犯错。",
    image_url: `${IMG_BASE}/ar00.jpg`
  },
  {
    id: 1,
    name: "魔术师",
    meaning_up: "创造力、意志力、技能、资源整合、新机会。代表拥有实现目标所需的一切资源，是行动和创造的象征。",
    meaning_rev: "欺骗、操纵、才能浪费、缺乏方向。警示可能存在欺骗行为，或未能善用自己的天赋。",
    image_url: `${IMG_BASE}/ar01.jpg`
  },
  {
    id: 2,
    name: "女祭司",
    meaning_up: "直觉、神秘、潜意识、内在智慧、隐藏的知识。代表倾听内心声音，探索精神世界的深度。",
    meaning_rev: "秘密揭露、脱离直觉、表面化、隐藏的动机。提示需要重新连接内在智慧。",
    image_url: `${IMG_BASE}/ar02.jpg`
  },
  {
    id: 3,
    name: "女皇",
    meaning_up: "丰饶、母性、创造力、自然、感官享受。代表孕育和滋养，是大地母亲的化身，象征生命力和创造力。",
    meaning_rev: "创意阻塞、依赖他人、过度保护、忽视自我。提醒需要关注自我滋养和独立成长。",
    image_url: `${IMG_BASE}/ar03.jpg`
  },
  {
    id: 4,
    name: "皇帝",
    meaning_up: "权威、结构、领导力、稳定、父性。代表秩序和规则，是建立稳固基础和掌控局势的象征。",
    meaning_rev: "专制、僵化、控制欲、缺乏纪律。警示过度控制或权威的滥用，需要寻找平衡。",
    image_url: `${IMG_BASE}/ar04.jpg`
  },
  {
    id: 5,
    name: "教皇",
    meaning_up: "传统、精神指引、教育、信仰、仪式。代表寻求智慧和指导，遵循既定的道路和价值观。",
    meaning_rev: "打破传统、叛逆、非常规方法、挑战权威。提示可能需要走出舒适区，寻找自己的道路。",
    image_url: `${IMG_BASE}/ar05.jpg`
  },
  {
    id: 6,
    name: "恋人",
    meaning_up: "爱情、和谐、选择、价值观统一、人际关系。代表重要的选择和深刻的情感连接。",
    meaning_rev: "不和谐、失衡、价值观冲突、错误选择。警示关系中的问题或需要重新评估选择。",
    image_url: `${IMG_BASE}/ar06.jpg`
  },
  {
    id: 7,
    name: "战车",
    meaning_up: "胜利、意志力、决心、控制、克服障碍。代表通过坚定的意志和努力取得成功。",
    meaning_rev: "失控、缺乏方向、攻击性、挫折。提醒需要重新找回方向和内在平衡。",
    image_url: `${IMG_BASE}/ar07.jpg`
  },
  {
    id: 8,
    name: "力量",
    meaning_up: "内在力量、勇气、耐心、自我控制、温柔的力量。代表以柔克刚，用爱和耐心克服困难。",
    meaning_rev: "自我怀疑、软弱、缺乏自信、滥用力量。提示需要重新连接内在的力量源泉。",
    image_url: `${IMG_BASE}/ar08.jpg`
  },
  {
    id: 9,
    name: "隐士",
    meaning_up: "内省、独处、寻求真理、智慧、精神指引。代表暂时远离喧嚣，寻找内在的光芒。",
    meaning_rev: "孤独、隔离、退缩、拒绝帮助。提醒不要过度封闭自己，适时寻求他人支持。",
    image_url: `${IMG_BASE}/ar09.jpg`
  },
  {
    id: 10,
    name: "命运之轮",
    meaning_up: "命运、转折点、机遇、循环、好运。代表命运的轮转，新的机会即将到来。",
    meaning_rev: "厄运、抗拒改变、失控、外力干扰。提示需要接受变化，适应命运的安排。",
    image_url: `${IMG_BASE}/ar10.jpg`
  },
  {
    id: 11,
    name: "正义",
    meaning_up: "公正、真相、因果、法律、平衡。代表公正的裁决，因果报应，需要做出公平的决定。",
    meaning_rev: "不公正、不诚实、逃避责任、偏见。警示需要面对真相，承担应有的责任。",
    image_url: `${IMG_BASE}/ar11.jpg`
  },
  {
    id: 12,
    name: "倒吊人",
    meaning_up: "牺牲、等待、新视角、放手、顺从。代表暂停和反思，通过改变视角获得新的理解。",
    meaning_rev: "拖延、抵抗、无谓牺牲、僵局。提示需要打破停滞，采取行动。",
    image_url: `${IMG_BASE}/ar12.jpg`
  },
  {
    id: 13,
    name: "死神",
    meaning_up: "结束、转变、重生、放下过去、新开始。代表旧事物的终结，为新生命腾出空间。",
    meaning_rev: "抗拒改变、停滞、恐惧、无法放手。提醒需要接受必要的结束和转变。",
    image_url: `${IMG_BASE}/ar13.jpg`
  },
  {
    id: 14,
    name: "节制",
    meaning_up: "平衡、节制、耐心、和谐、适度。代表在生活中找到平衡点，融合对立面。",
    meaning_rev: "失衡、过度、缺乏耐心、冲突。提示需要重新找回生活的平衡。",
    image_url: `${IMG_BASE}/ar14.jpg`
  },
  {
    id: 15,
    name: "恶魔",
    meaning_up: "束缚、欲望、物质主义、诱惑、阴影自我。代表被不健康的依恋或习惯所困。",
    meaning_rev: "解脱、打破束缚、面对阴影、自由。提示有机会打破限制，重获自由。",
    image_url: `${IMG_BASE}/ar15.jpg`
  },
  {
    id: 16,
    name: "塔",
    meaning_up: "突变、毁灭、觉醒、真相揭露、重建。代表旧结构的崩塌，为新的建设扫清道路。",
    meaning_rev: "避免灾难、恐惧改变、延迟崩塌、内在转变。提醒改变是不可避免的。",
    image_url: `${IMG_BASE}/ar16.jpg`
  },
  {
    id: 17,
    name: "星星",
    meaning_up: "希望、灵感、宁静、治愈、信念。代表黑暗后的光明，宇宙的祝福和指引。",
    meaning_rev: "绝望、失去信心、断开连接、缺乏灵感。提示需要重新找回希望和信念。",
    image_url: `${IMG_BASE}/ar17.jpg`
  },
  {
    id: 18,
    name: "月亮",
    meaning_up: "幻象、直觉、潜意识、恐惧、迷惑。代表事物并非表面看起来那样，需要倾听直觉。",
    meaning_rev: "释放恐惧、真相显现、克服困惑、内在探索。提示迷雾即将散去。",
    image_url: `${IMG_BASE}/ar18.jpg`
  },
  {
    id: 19,
    name: "太阳",
    meaning_up: "成功、快乐、活力、积极、光明。代表一切顺利，充满希望和喜悦的时刻。",
    meaning_rev: "暂时的挫折、过度乐观、延迟的成功、内在小孩。提醒保持积极但务实。",
    image_url: `${IMG_BASE}/ar19.jpg`
  },
  {
    id: 20,
    name: "审判",
    meaning_up: "觉醒、重生、召唤、反思、赦免。代表灵魂的觉醒，接受更高层次的召唤。",
    meaning_rev: "自我怀疑、拒绝召唤、过度批判、无法原谅。提示需要原谅自己和他人。",
    image_url: `${IMG_BASE}/ar20.jpg`
  },
  {
    id: 21,
    name: "世界",
    meaning_up: "完成、成就、整合、圆满、旅程结束。代表一个周期的完成，目标的实现。",
    meaning_rev: "未完成、缺乏闭合、延迟成功、寻求结束。提示需要完成未竟之事。",
    image_url: `${IMG_BASE}/ar21.jpg`
  },
  {
    id: 22,
    name: "权杖一",
    meaning_up: "新机会、灵感、潜力、创造力、热情。代表新的开始和无限的可能性。",
    meaning_rev: "延迟、缺乏方向、创意受阻、错失机会。提示需要重新点燃内心的火焰。",
    image_url: `${IMG_BASE}/wa01.jpg`
  },
  {
    id: 23,
    name: "权杖二",
    meaning_up: "计划、决定、进展、探索、未来愿景。代表站在选择的路口，规划未来。",
    meaning_rev: "恐惧未知、缺乏计划、糟糕的计划、意外。提示需要更周全的准备。",
    image_url: `${IMG_BASE}/wa02.jpg`
  },
  {
    id: 24,
    name: "权杖三",
    meaning_up: "扩展、远见、进展、海外机会、等待成果。代表努力开始显现成果，展望更广阔的未来。",
    meaning_rev: "障碍、延迟、缺乏远见、挫折。提醒需要耐心等待或调整策略。",
    image_url: `${IMG_BASE}/wa03.jpg`
  },
  {
    id: 25,
    name: "权杖四",
    meaning_up: "庆祝、和谐、家庭、稳定、里程碑。代表阶段性的成功和喜悦的聚会。",
    meaning_rev: "缺乏支持、过渡期、不稳定、家庭冲突。提示需要重新建立稳定的基础。",
    image_url: `${IMG_BASE}/wa04.jpg`
  },
  {
    id: 26,
    name: "权杖五",
    meaning_up: "竞争、冲突、挑战、多样性、斗争。代表需要面对竞争和不同意见。",
    meaning_rev: "避免冲突、尊重差异、内部冲突、紧张局势缓解。提示寻找共识。",
    image_url: `${IMG_BASE}/wa05.jpg`
  },
  {
    id: 27,
    name: "权杖六",
    meaning_up: "胜利、成功、公众认可、自信、成就。代表努力得到回报，获得他人的赞赏。",
    meaning_rev: "自负、缺乏认可、跌落、自我怀疑。提醒保持谦逊，真正的成功来自内在。",
    image_url: `${IMG_BASE}/wa06.jpg`
  },
  {
    id: 28,
    name: "权杖七",
    meaning_up: "防御、坚持立场、挑战、竞争、勇气。代表需要坚守自己的立场和信念。",
    meaning_rev: "放弃、不堪重负、屈服、防御过当。提示需要选择值得战斗的事情。",
    image_url: `${IMG_BASE}/wa07.jpg`
  },
  {
    id: 29,
    name: "权杖八",
    meaning_up: "快速行动、运动、迅速进展、旅行、消息。代表事情快速发展，需要把握时机。",
    meaning_rev: "延迟、挫折、等待、仓促行事。提醒耐心等待或避免冲动。",
    image_url: `${IMG_BASE}/wa08.jpg`
  },
  {
    id: 30,
    name: "权杖九",
    meaning_up: "坚韧、坚持、最后的考验、警惕、韧性。代表虽然疲惫但即将成功，不要放弃。",
    meaning_rev: "精疲力竭、固执、偏执、放弃。提示需要休息和恢复，然后继续前进。",
    image_url: `${IMG_BASE}/wa09.jpg`
  },
  {
    id: 31,
    name: "权杖十",
    meaning_up: "负担、责任、压力、奋斗、最终成功。代表承担过多，需要学会分担。",
    meaning_rev: "卸下重担、委托他人、崩溃、避免责任。提示需要学会放手和委托。",
    image_url: `${IMG_BASE}/wa10.jpg`
  },
  {
    id: 32,
    name: "权杖侍从",
    meaning_up: "探索、热情、发现、自由精神、新消息。代表充满好奇和热情的开始。",
    meaning_rev: "缺乏方向、幼稚、拖延、坏消息。提示需要更专注和成熟的态度。",
    image_url: `${IMG_BASE}/wapa.jpg`
  },
  {
    id: 33,
    name: "权杖骑士",
    meaning_up: "行动、冒险、激情、冲动、追求。代表充满能量和热情地追求目标。",
    meaning_rev: "鲁莽、延迟、挫折、缺乏耐心。提醒需要更多的计划和耐心。",
    image_url: `${IMG_BASE}/wakn.jpg`
  },
  {
    id: 34,
    name: "权杖王后",
    meaning_up: "自信、独立、社交、有魅力、决心。代表充满活力和自信的女性能量。",
    meaning_rev: "自私、嫉妒、专横、不安全感。提示需要平衡自信与谦逊。",
    image_url: `${IMG_BASE}/waqu.jpg`
  },
  {
    id: 35,
    name: "权杖国王",
    meaning_up: "领导力、远见、企业家、荣誉、魅力。代表具有远见和行动力的领导者。",
    meaning_rev: "专制、冲动、傲慢、期望过高。提醒需要更多的耐心和谦逊。",
    image_url: `${IMG_BASE}/waki.jpg`
  },
  {
    id: 36,
    name: "圣杯一",
    meaning_up: "新感情、爱、直觉、创造力、精神连接。代表情感的新开始和心灵的开放。",
    meaning_rev: "情感阻塞、空虚、压抑感情、缺乏创造力。提示需要打开心扉。",
    image_url: `${IMG_BASE}/cu01.jpg`
  },
  {
    id: 37,
    name: "圣杯二",
    meaning_up: "伙伴关系、联合、连接、吸引、平衡。代表两个人之间的和谐关系。",
    meaning_rev: "失衡、分离、紧张关系、缺乏信任。提示需要修复关系中的裂痕。",
    image_url: `${IMG_BASE}/cu02.jpg`
  },
  {
    id: 38,
    name: "圣杯三",
    meaning_up: "庆祝、友谊、社区、快乐、社交。代表与朋友分享喜悦和成功。",
    meaning_rev: "过度放纵、流言蜚语、孤立、疏远。提醒保持健康的社交边界。",
    image_url: `${IMG_BASE}/cu03.jpg`
  },
  {
    id: 39,
    name: "圣杯四",
    meaning_up: "冥想、沉思、冷漠、重新评估。代表对现状不满，需要新的视角。",
    meaning_rev: "觉醒、新的机会、感激、行动。提示注意身边被忽视的机会。",
    image_url: `${IMG_BASE}/cu04.jpg`
  },
  {
    id: 40,
    name: "圣杯五",
    meaning_up: "失落、悲伤、遗憾、哀悼、关注失去。代表沉浸在过去的损失中。",
    meaning_rev: "接受、前进、原谅、新的希望。提示是时候放下过去，向前看。",
    image_url: `${IMG_BASE}/cu05.jpg`
  },
  {
    id: 41,
    name: "圣杯六",
    meaning_up: "怀旧、童年回忆、天真、重聚、善良。代表回顾过去，重温美好时光。",
    meaning_rev: "活在过去、不成熟、脱离现实、放手。提醒不要过度沉溺于回忆。",
    image_url: `${IMG_BASE}/cu06.jpg`
  },
  {
    id: 42,
    name: "圣杯七",
    meaning_up: "幻想、选择、愿望思维、想象、迷惑。代表面临多种选择，需要辨别真伪。",
    meaning_rev: "清晰、选择、现实、逃避。提示需要做出明确的选择，面对现实。",
    image_url: `${IMG_BASE}/cu07.jpg`
  },
  {
    id: 43,
    name: "圣杯八",
    meaning_up: "放弃、离开、寻找更深意义、失望、转变。代表离开不再服务自己的事物。",
    meaning_rev: "恐惧改变、停滞、逃避责任、流浪。提示需要勇敢面对转变。",
    image_url: `${IMG_BASE}/cu08.jpg`
  },
  {
    id: 44,
    name: "圣杯九",
    meaning_up: "满足、愿望实现、快乐、感恩、奢侈。代表情感上的满足和心愿达成。",
    meaning_rev: "不满、贪婪、物质主义、愿望未实现。提醒真正的幸福来自内心。",
    image_url: `${IMG_BASE}/cu09.jpg`
  },
  {
    id: 45,
    name: "圣杯十",
    meaning_up: "和谐、家庭、幸福、对齐、长期成功。代表情感生活的圆满和家庭幸福。",
    meaning_rev: "家庭冲突、价值观不合、破碎、不和谐。提示需要修复家庭关系。",
    image_url: `${IMG_BASE}/cu10.jpg`
  },
  {
    id: 46,
    name: "圣杯侍从",
    meaning_up: "创意机会、直觉消息、好奇心、可能性。代表情感上的新消息和创意灵感。",
    meaning_rev: "创造力阻塞、情感不成熟、失望、不切实际。提示需要更务实的态度。",
    image_url: `${IMG_BASE}/cupa.jpg`
  },
  {
    id: 47,
    name: "圣杯骑士",
    meaning_up: "浪漫、魅力、想象力、追求梦想、追随心灵。代表追求情感和梦想的浪漫使者。",
    meaning_rev: "不切实际、嫉妒、喜怒无常、失望。提醒需要平衡梦想与现实。",
    image_url: `${IMG_BASE}/cukn.jpg`
  },
  {
    id: 48,
    name: "圣杯王后",
    meaning_up: "同情、关怀、情感智慧、直觉、滋养。代表情感成熟和直觉敏锐的女性。",
    meaning_rev: "情感依赖、不安全感、给予过多、脱离直觉。提示需要建立健康的边界。",
    image_url: `${IMG_BASE}/cuqu.jpg`
  },
  {
    id: 49,
    name: "圣杯国王",
    meaning_up: "情感平衡、同情、外交、平静、智慧。代表情感成熟和内在平静的领导者。",
    meaning_rev: "情感操纵、喜怒无常、冷漠、压抑情感。提醒需要健康地表达情感。",
    image_url: `${IMG_BASE}/cuki.jpg`
  },
  {
    id: 50,
    name: "宝剑一",
    meaning_up: "突破、清晰、新想法、真相、力量。代表思维清晰，新的理解和突破。",
    meaning_rev: "混乱、缺乏清晰、残酷的真相、阻碍。提示需要理清思绪。",
    image_url: `${IMG_BASE}/swac.jpg`
  },
  {
    id: 51,
    name: "宝剑二",
    meaning_up: "艰难选择、僵局、否认、屏蔽情感。代表需要做出决定但犹豫不决。",
    meaning_rev: "信息过载、混乱、情感释放、做出决定。提示是时候面对真相并做出选择。",
    image_url: `${IMG_BASE}/sw02.jpg`
  },
  {
    id: 52,
    name: "宝剑三",
    meaning_up: "心碎、悲伤、痛苦、分离、失落。代表情感上的痛苦和悲伤。",
    meaning_rev: "恢复、原谅、前进、释放痛苦。提示痛苦正在愈合，可以向前看了。",
    image_url: `${IMG_BASE}/sw03.jpg`
  },
  {
    id: 53,
    name: "宝剑四",
    meaning_up: "休息、恢复、沉思、休战、静养。代表需要暂停和休息以恢复精力。",
    meaning_rev: "疲劳、倦怠、缺乏进展、不安。提醒休息是必要的，不要过度劳累。",
    image_url: `${IMG_BASE}/sw04.jpg`
  },
  {
    id: 54,
    name: "宝剑五",
    meaning_up: "冲突、紧张、失败、背叛、胜之不武。代表以牺牲他人为代价的胜利。",
    meaning_rev: "和解、前进、原谅、放下。提示是时候放下争斗，寻求和平。",
    image_url: `${IMG_BASE}/sw05.jpg`
  },
  {
    id: 55,
    name: "宝剑六",
    meaning_up: "过渡、改变、离开困境、平静水域。代表从困难走向更好的处境。",
    meaning_rev: "被困、抵抗改变、未完成的过渡、怀旧。提示需要完成转变的过程。",
    image_url: `${IMG_BASE}/sw06.jpg`
  },
  {
    id: 56,
    name: "宝剑七",
    meaning_up: "欺骗、策略、偷偷摸摸、背叛、机智。代表使用策略或隐藏真实意图。",
    meaning_rev: "忏悔、秘密揭露、良心、面对真相。提示需要诚实面对自己和他人。",
    image_url: `${IMG_BASE}/sw07.jpg`
  },
  {
    id: 57,
    name: "宝剑八",
    meaning_up: "自我设限、受害者心态、感觉被困、无助。代表被自己的思维所困。",
    meaning_rev: "自我解放、新视角、赋权、释放。提示你有能力改变现状。",
    image_url: `${IMG_BASE}/sw08.jpg`
  },
  {
    id: 58,
    name: "宝剑九",
    meaning_up: "焦虑、恐惧、噩梦、担忧、绝望。代表被恐惧和担忧所困扰。",
    meaning_rev: "内心平静、释放担忧、希望、面对恐惧。提示恐惧往往比现实更可怕。",
    image_url: `${IMG_BASE}/sw09.jpg`
  },
  {
    id: 59,
    name: "宝剑十",
    meaning_up: "痛苦的结束、背叛、崩溃、不可避免的结局。代表已经触底，情况只会好转。",
    meaning_rev: "恢复、重生、抵抗结束、避免灾难。提示最坏的已经过去。",
    image_url: `${IMG_BASE}/sw10.jpg`
  },
  {
    id: 60,
    name: "宝剑侍从",
    meaning_up: "好奇、机敏、新想法、渴望知识、消息。代表思维活跃，渴望学习和交流。",
    meaning_rev: "八卦、狡猾、缺乏计划、沟通问题。提示需要更谨慎地使用言语。",
    image_url: `${IMG_BASE}/swpa.jpg`
  },
  {
    id: 61,
    name: "宝剑骑士",
    meaning_up: "雄心、行动导向、快速思维、追求真理。代表追求目标时充满动力和决心。",
    meaning_rev: "冲动、鲁莽、缺乏方向、残忍。提醒需要更多的耐心和同理心。",
    image_url: `${IMG_BASE}/swkn.jpg`
  },
  {
    id: 62,
    name: "宝剑王后",
    meaning_up: "独立、清晰思维、直接、公正、智慧。代表思维敏锐，善于分析的女性。",
    meaning_rev: "冷酷、过度批判、偏见、情感压抑。提示需要在理性与情感间找到平衡。",
    image_url: `${IMG_BASE}/swqu.jpg`
  },
  {
    id: 63,
    name: "宝剑国王",
    meaning_up: "智慧、权威、真相、高标准、清晰思维。代表公正无私，智慧卓越的领导者。",
    meaning_rev: "操纵、残酷、专制、缺乏同情心。提醒需要更多的慈悲和弹性。",
    image_url: `${IMG_BASE}/swki.jpg`
  },
  {
    id: 64,
    name: "钱币一",
    meaning_up: "新财务机会、繁荣、富足、安全、新开始。代表物质世界的新机遇。",
    meaning_rev: "错失机会、缺乏规划、财务损失、贪婪。提示需要抓住眼前的机会。",
    image_url: `${IMG_BASE}/peac.jpg`
  },
  {
    id: 65,
    name: "钱币二",
    meaning_up: "平衡、适应、时间管理、优先级、灵活性。代表在多个责任间保持平衡。",
    meaning_rev: "失去平衡、混乱、财务压力、过度承诺。提示需要简化生活。",
    image_url: `${IMG_BASE}/pe02.jpg`
  },
  {
    id: 66,
    name: "钱币三",
    meaning_up: "团队合作、协作、学习、实施、技能。代表通过合作实现目标。",
    meaning_rev: "缺乏团队合作、单打独斗、技能不足、冲突。提示需要寻求帮助或提升技能。",
    image_url: `${IMG_BASE}/pe03.jpg`
  },
  {
    id: 67,
    name: "钱币四",
    meaning_up: "安全、保守、储蓄、控制、占有欲。代表对物质安全的渴望和控制。",
    meaning_rev: "慷慨、过度消费、不安全感、放手。提示需要更开放地对待资源。",
    image_url: `${IMG_BASE}/pe04.jpg`
  },
  {
    id: 68,
    name: "钱币五",
    meaning_up: "困难、贫穷、孤立、担忧、健康问题。代表物质或精神上的匮乏感。",
    meaning_rev: "恢复、精神富足、接受帮助、改善。提示帮助就在身边，不要害怕接受。",
    image_url: `${IMG_BASE}/pe05.jpg`
  },
  {
    id: 69,
    name: "钱币六",
    meaning_up: "慷慨、施与受、分享、繁荣、慈善。代表资源的流动和慷慨给予。",
    meaning_rev: "债务、自私、单向付出、条件性给予。提示需要平衡给予和接受。",
    image_url: `${IMG_BASE}/pe06.jpg`
  },
  {
    id: 70,
    name: "钱币七",
    meaning_up: "长期愿景、坚持、投资、奖励、耐心。代表努力工作后等待收获。",
    meaning_rev: "缺乏长期愿景、有限成功、不耐烦、糟糕的投资。提示需要重新评估方向。",
    image_url: `${IMG_BASE}/pe07.jpg`
  },
  {
    id: 71,
    name: "钱币八",
    meaning_up: "学徒、勤奋、技能发展、细节、努力。代表专注于提升技能和精益求精。",
    meaning_rev: "缺乏专注、完美主义、缺乏动力、低质量。提示需要重新投入工作。",
    image_url: `${IMG_BASE}/pe08.jpg`
  },
  {
    id: 72,
    name: "钱币九",
    meaning_up: "富足、独立、奢华、自给自足、成就。代表通过努力获得的物质和精神富足。",
    meaning_rev: "过度工作、自我价值问题、财务损失、依赖。提示需要享受劳动成果。",
    image_url: `${IMG_BASE}/pe09.jpg`
  },
  {
    id: 73,
    name: "钱币十",
    meaning_up: "财富、遗产、家庭、长期成功、稳定。代表物质生活的圆满和家族传承。",
    meaning_rev: "家庭冲突、财务失败、孤独、缺乏长远规划。提示需要关注家庭和长期目标。",
    image_url: `${IMG_BASE}/pe10.jpg`
  },
  {
    id: 74,
    name: "钱币侍从",
    meaning_up: "机会、雄心、勤奋、新财务开始、学习。代表对物质目标的专注和学习。",
    meaning_rev: "缺乏进展、拖延、缺乏专注、财务问题。提示需要更认真地对待目标。",
    image_url: `${IMG_BASE}/pepa.jpg`
  },
  {
    id: 75,
    name: "钱币骑士",
    meaning_up: "效率、常规、保守、勤奋、可靠。代表稳步前进，脚踏实地的追求者。",
    meaning_rev: "自满、无聊、懒惰、缺乏远见。提醒需要更多的灵活性和动力。",
    image_url: `${IMG_BASE}/pekn.jpg`
  },
  {
    id: 76,
    name: "钱币王后",
    meaning_up: "务实、提供者、工作与家庭平衡、富足、滋养。代表务实且善于理财的女性。",
    meaning_rev: "工作与家庭失衡、财务问题、自我忽视、过度物质化。提示需要平衡各方面生活。",
    image_url: `${IMG_BASE}/pequ.jpg`
  },
  {
    id: 77,
    name: "钱币国王",
    meaning_up: "富足、商业、领导力、安全、纪律。代表财务成功和物质稳定的领导者。",
    meaning_rev: "贪婪、感官主义、财务失败、物质主义。提醒真正的富足不仅是物质。",
    image_url: `${IMG_BASE}/peki.jpg`
  }
];
