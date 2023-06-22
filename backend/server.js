const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const app = express();
const cors = require('cors')
const port = 3001;

const configuration = new Configuration({
  apiKey: "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",
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(cors())

const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

app.post('/chatgpt', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.7
  });

    res.json({ text: completion.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});