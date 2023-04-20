import express from "express";

const router = express.Router();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-FfcRXsFwL47zxPCPfdZiRYIy",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

router.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });
    console.log(response.data.choices[0].text);
    res.status(200).send({
      bot: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

export default router;
