// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { google } from '@ai-sdk/google';
// import { generateText } from 'ai';

// export async function POST(req: Request) {
//     try {
//         const response = await generateText({
//             model: google('gemini-1.5-pro-latest'),
//             prompt: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
//             });

//         const result = response.text;
//         return new Response(result, { status: 200 });
//     } catch (error) {
//         console.error('Error suggesting messages:', error);
//         return new Response('Error suggesting messages', { status: 500 });
// }
// }







/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
    try {
            const response = await ai.models.generateContentStream({
                model: "gemini-2.0-flash",
                contents: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
                config: {
                    maxOutputTokens: 500, }
            });
        
            let result = "";
            for await (const chunk of response) {
                if (chunk.text) {
                    result += chunk.text;
                }
            }

            return new Response(result, { status: 200 });
            
    } catch (error) {
        console.error('Error suggesting messages:', error);
        
    }
}










// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { OpenAI } from "openai";
// import { NextResponse } from "next/server";

// //USE CASE

// //1. User will click on suggest-message
// //2. we will go to open ai with some prompts
// //3. we will show the response on frontend

// const openai = new OpenAI({     
//     apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = "edge";

// export async function POST(req: Request) {
//     try {
//     const prompt =
//         "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: prompt }],
//         max_tokens: 400,
//         stream: true,
//     });

//     const stream = new ReadableStream({
//         async start(controller) {
//         for await (const chunk of response) {
//             const { choices } = chunk;
//             if (choices && choices.length > 0) {
//             const text = choices[0].delta?.content || "";
//             controller.enqueue(text);
//             }
//         }
//         controller.close();
//         },
//     });

//     return new Response(stream, {
//         headers: { "Content-Type": "text/plain" },
//     });
//     } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       // OpenAI API error handling
//         const { name, status, headers, message } = error;
//         return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//         console.error("An unexpected error occurred:", error);
//         throw error;
//     }
//     }
// }