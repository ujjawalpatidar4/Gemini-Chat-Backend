-- PostgreSQL schema for Gemini Chat Backend

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    otp VARCHAR(10),
    otp_expiry TIMESTAMP,
    subscription_tier VARCHAR(10) DEFAULT 'basic',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chatrooms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chatroom_id INTEGER REFERENCES chatrooms(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_gemini BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_user_mobile ON users(mobile);
CREATE INDEX idx_chatroom_user ON chatrooms(user_id);
CREATE INDEX idx_message_chatroom ON messages(chatroom_id);
