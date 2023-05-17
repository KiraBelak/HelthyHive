import axios from "axios";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = "text-davinci-002";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
};

export default async function handler(req, res) {
    const { method, body, query } = req;
    switch (method) {
        case "POST":
            console.log("body", body);
            const data = {
                prompt: body.prompt,
                max_tokens: body.maxTokens,
                n: body.n,
                stop: null,
                temperature: body.temperature,
                top_p: body.topP,
            }
            try {
                const response = await axios.post(
                    `https://api.openai.com/v1/engines/${model}/completions`,
                    data,
                    { headers }
                );
                console.log("response", response.data);
                res.status(200).json(response.data.choices[0].text);
            } catch (err) {
                res.status(400).json(err);
            }
            break;
        default:
            res.status(400).end("Method not allowed");
    }
}