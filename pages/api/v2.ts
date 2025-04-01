const OpenAi = require('openai');
require('dotenv').config();

const client = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY, // 使用环境变量加载 API 密钥
    baseURL: 'https://api.chatanywhere.tech/v1',
});

const getV2 = async (message, res) => {
    try {
        const stream = await client.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
            stream: true,
        });

        for await (const part of stream) {
            // if (res.finished) break; // 检查客户端是否已断开连接
            const eventName = 'message';
            console.log(part.choices[0].delta.content);
            if (part.choices[0].delta && part.choices[0].delta.content) {
              res.write(`event: ${eventName}\n`);
              res.write(`data: ${part.choices[0].delta.content}\n\n`);
            }
        }
        res.end(); // 结束连接
    } catch (error) {
        console.error('Error during OpenAI API call:', error);
        res.end(); // 结束连接
    }
};

export default async function (req, res) {
    const { message } = req.query;

    // 设置适当的头信息
    res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('Cache-Control', 'no-cache, no-transform');

    getV2(message, res);
}