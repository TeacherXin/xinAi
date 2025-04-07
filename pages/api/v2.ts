// eslint-disable-next-line @typescript-eslint/no-require-imports
const OpenAi = require('openai');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const client = new OpenAi({
    apiKey: process.env.OPENAI_API_FREE_KEY, // 使用环境变量加载 API 密钥
    baseURL: 'https://api.chatanywhere.tech/v1',
});

const getV2 = async (message, res) => {
    try {
        const stream = await client.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
            stream: true,
        });
        const eventName = 'major';
        res.write(`event: ${eventName}\n`);
        res.write(`data: ${new Date().getTime()}\n\n`);

        for await (const part of stream) {
            // if (res.finished) break; // 检查客户端是否已断开连接
            const eventName = 'message';
            if (Object.keys(part.choices[0]?.delta || {}).length > 0) {
                console.log(part.choices[0].delta);
                res.write(`event: ${eventName}\n`);
                res.write(`data: ${JSON.stringify(part.choices[0].delta)}\n\n`);
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