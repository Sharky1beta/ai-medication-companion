const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// 从您的 RememberMe 项目中提取的 Key
const API_KEY = 'ark-7f491ba3-aab9-49e9-a0eb-dc9278fc8a47-d4bcf';
const MODEL_ID = 'doubao-seed-2-0-mini-260428';

app.post('/api/ai', async (req, res) => {
    try {
        const { messages } = req.body;
        
        console.log("正在调用豆包 API...");
        const response = await axios.post('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
            model: MODEL_ID,
            messages: messages,
            max_tokens: 200,
            temperature: 0.3 // 医疗场景降低随机性
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        
        res.json(response.data);
    } catch (err) {
        console.error("豆包调用失败:", err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'AI Error', details: err.message });
    }
});

app.listen(3000, () => {
    console.log('========================================');
    console.log('🚀 AI 代理服务已启动！');
    console.log('请在浏览器中打开: http://localhost:3000/demo.html');
    console.log('========================================');
});
