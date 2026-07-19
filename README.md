# MyGPT

A full-stack AI chat app built with the MERN stack, powered by the OpenAI API. It keeps your chats organized in threads, formats replies properly (markdown + code highlighting), and even types out the latest response like a real chat.

## Features

- Persistent chat threads — create, view, and delete conversations
- Chat replies powered by OpenAI's Chat Completion API
- Proper markdown rendering and syntax highlighting for code in responses
- Typing effect for the latest reply from GPT
- Sidebar showing your full chat history
- Loading indicator while a response is being generated

## Tech Stack

- **Frontend:** React, Vite, React Context API, react-markdown, rehype-highlight, react-spinners
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **AI:** OpenAI API (Chat Completion endpoint)

## Project Structure

```
├── backend/
│   ├── models/        # Thread & Message schemas
│   ├── routes/        # /thread and /chat routes
│   ├── utils/openai.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # Sidebar, Navbar, Chat, ChatInput
│   │   ├── context/     # MyContext for global state
│   │   └── App.jsx
```

## Data Models

**Thread** — threadId, title, messages, createdAt, updatedAt

**Message** — content, role (user or assistant), timestamp

## API Routes

| Method | Route              | What it does                           |
|--------|--------------------|------------------------------------------|
| GET    | /thread            | Get all thread titles for the sidebar     |
| GET    | /thread/:threadId  | Get all messages in a thread              |
| DELETE | /thread/:threadId  | Delete a thread                           |
| POST   | /chat              | Send a message (creates a thread if new)  |

## Getting Started

1. Clone the repo.
2. Create a `.env` file in the backend with:
   ```
   OPENAI_API_KEY=your_key_here
   MONGO_URI=your_mongodb_connection_string
   ```
3. Install dependencies in both `backend/` and `frontend/`:
   ```bash
   npm install
   ```
4. Start the backend:
   ```bash
   node server.js
   ```
5. Start the frontend:
   ```bash
   npm run dev
   ```

## How It Works

When you send a prompt, it's held in local state along with a temporary thread ID. The backend checks whether that thread already exists — if not, it creates one — then saves your message and gets a response from OpenAI. On the frontend, messages are pulled from state and styled differently depending on whether they came from you or the assistant. The most recent GPT reply gets typed out word by word instead of appearing all at once. The sidebar pulls every saved thread so you can jump between old chats or start a new one.
