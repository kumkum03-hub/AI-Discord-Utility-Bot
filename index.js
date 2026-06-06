require("dotenv").config();

const  { Client, Events, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();
const PORT = 8002;
const {connectToMongoDb} = require("./connect");
const {nanoid} = require("nanoid");
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });
const URL = require("./Models/urlModel");


const { GoogleGenAI } = require("@google/genai");
//creating gemini client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


//mongodb connection
connectToMongoDb("mongodb://127.0.0.1:27017/botUrlDb").then(()=>{
    console.log("mongodb connected successfully");
})



client.on("messageCreate",async (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith("create")){
        const url = message.content.split("create ")[1];

        const shortId = nanoid(8);

        await URL.create({
            shortId : shortId,
            redirectUrl : url,
        })

        return message.reply({
            content : "Short Url is : " + "http://localhost:8002/url/" + shortId
        })
    }
    message.reply({
        content : "Hey from Bot!"
    });
    
    if(message.content.startsWith("debug")){

    try{

        const error = message.content.split("debug ")[1];

        await message.reply("Analyzing error...");

        const answer = await debugError(error);

        return message.channel.send(answer);

    } catch(err){

        console.log(err);

        return message.reply(
            "Something went wrong."
        );
    }
}
})


async function debugError(errorMessage){
    try{

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
            You are an expert Node.js developer.

            Analyze the following error:
            Reply in under 1000 characters.

            ${errorMessage}

            Provide:

            1. Root Cause
            2. Why it happened
            3. Fix
            4. Example Code
            `
        });

        return response.text;

    } catch(err){

    console.error(err);

    return err.message;
}
}
            






app.get("/url/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;

    const entry = await URL.findOne({
        shortId: shortId
    });

    res.redirect(entry.redirectUrl);
})


client.on("interactionCreate",(interaction)=>{
    console.log(interaction);
    interaction.reply("Pong!!");
})

client.login(process.env.DISCORD_TOKEN);

app.listen(PORT,()=>console.log(`Server stareted at : ${PORT}`))
