/* eslint-disable no-console */
/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const OpenAi = require('openai');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const client = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY, // 使用环境变量加载 API 密钥
  baseURL: 'https://api.chatanywhere.tech/v1',
});


export default async function (req, res) {
  const { message } = req.body;
  console.log(message);
  const imageRes = await client.images.generate({
    prompt: message,
    n: 1,
    size: '1024x1024',
  });
  console.log(imageRes);
  res.status(200).json({
    code: 0,
    msg: '生成成功',
    data: imageRes.data[0].url,
  });

  res.end();
}