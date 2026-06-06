# AI-Discord-Utility-Bot

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-Web_Framework-black)
![Discord.js](https://img.shields.io/badge/Discord.js-Bot_Framework-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red)
![Gemini_AI](https://img.shields.io/badge/Gemini-AI-orange)

## Overview

AI Discord Utility Bot is a Node.js-based Discord bot that combines AI-powered assistance with URL shortening functionality. The bot uses Google's Gemini AI to answer user queries and allows users to generate shortened URLs directly through Discord commands.

Shortened URLs are stored in MongoDB and redirected to their original destinations using Express.js routing.

---

## Features

* AI-powered responses using Gemini AI
* URL shortening through Discord commands
* MongoDB database integration
* URL redirection to original destinations
* Discord server integration using Discord.js
* Environment variable configuration for secure credential management

---

## Tech Stack

* Node.js
* Express.js
* Discord.js
* MongoDB
* Mongoose
* Gemini API

---

## Project Workflow

1. User sends a Discord command.
2. Bot processes the request.
3. For AI queries, Gemini AI generates a response.
4. For URL shortening requests:

   * Original URL is stored in MongoDB.
   * A unique short code is generated.
   * Short URL is returned to the user.
5. When the short URL is opened, Express.js retrieves the original URL and redirects the user.

---

## Author

Kumkum Kamthan
