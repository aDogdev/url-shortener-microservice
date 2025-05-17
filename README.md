# 🔗 URL Shortener Microservice

A full-stack JavaScript application that converts long URLs into short, easy-to-share links. Developed for the [freeCodeCamp Back End Development and APIs Certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/).

## 🚀 Features

- Converts long URLs to short numeric codes
- Validates URL format and DNS records
- Persistent URL storage (in-memory)
- Automatic redirects using short codes
- Error handling for invalid URLs

## 🛠 Technologies

- Node.js/Express.js
- DNS validation with `dns` core module
- REST API architecture
- CORS middleware

## 🧠 Endpoints

```http
POST /api/shorturl   # Create short URL
GET /api/shorturl/1  # Redirect to original URL
```
