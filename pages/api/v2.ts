/* eslint-disable no-console */
/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const OpenAi = require('openai');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const client = new OpenAi({
  apiKey: process.env.OPENAI_API_FREE_KEY, // 使用环境变量加载 API 密钥
  baseURL: 'https://api.chatanywhere.tech/v1',
});

let historyList = [];

const getV2 = async (message, res, model, sessionId) => {
  try {
    const stream = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '你是一个风趣幽默的中文助手' },
        ...historyList,
        { role: 'user', content: message },
      ],
      model: model || 'gpt-3.5-turbo',
      stream: true,
    });
    const eventName = 'major';
    res.write(`event: ${eventName}\n`);
    // eslint-disable-next-line max-len
    let session_id;
    if (!sessionId) { 
      session_id = `session_id_${  new Date().getTime()}`;
      historyList = [];
    }
    res.write(`data: ${JSON.stringify({id: new Date().getTime(), session_id})}\n\n`);

    let answer = '';
    for await (const part of stream) {
      // if (res.finished) break; // 检查客户端是否已断开连接
      const eventName = 'message';
      if (Object.keys(part.choices[0]?.delta || {}).length > 0) {
        console.log(part.choices[0].delta);
        answer += part.choices[0].delta?.content;
        res.write(`event: ${eventName}\n`);
        res.write(`data: ${JSON.stringify(part.choices[0].delta)}\n\n`);
      }
    }
    historyList.push(...[{
      role: 'user', content: message,
    }, {
      role: 'assistant', content: answer,
    }]);
    console.log(historyList);
    res.end(); // 结束连接
  } catch (error) {
    console.error('Error during OpenAI API call:', error);
    res.end(); // 结束连接
  }
};

export default async function (req, res) {
  const { message, model, sessionId } = JSON.parse(req.body || '{}');

  // 设置适当的头信息
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Accel-Buffering', 'no');
  res.setHeader('Cache-Control', 'no-cache, no-transform');

  getV2(message, res, model, sessionId);
}