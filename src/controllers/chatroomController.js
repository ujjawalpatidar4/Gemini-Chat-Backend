// Chatroom controller: create/list/get chatrooms, send message
import { createChatroom, getChatroomsByUser, getChatroomById } from '../models/chatroom.js';
import { createMessage, getMessagesByChatroom } from '../models/message.js';
import { client } from '../utils/redis.js';
import { sendGeminiMessage } from '../services/geminiService.js';

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const chatroom = await createChatroom(req.user.id, name);
    res.status(201).json({ chatroom });
  } catch (err) { next(err); }
};

export const list = async (req, res, next) => {
  try {
    const chatrooms = await getChatroomsByUser(req.user.id);
    await res.sendChatroomsToCache(chatrooms);
    res.json({ chatrooms, cached: false });
  } catch (err) { next(err); }
};

export const get = async (req, res, next) => {
  try {
    const chatroom = await getChatroomById(req.params.id);
    if (!chatroom || chatroom.user_id !== req.user.id) return res.status(404).json({ error: 'Chatroom not found' });
    const messages = await getMessagesByChatroom(chatroom.id);
    res.json({ chatroom, messages });
  } catch (err) { next(err); }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Message required' });
    const chatroom = await getChatroomById(req.params.id);
    if (!chatroom || chatroom.user_id !== req.user.id) return res.status(404).json({ error: 'Chatroom not found' });
    // Save user message
    await createMessage(chatroom.id, req.user.id, content, false);
    // Queue Gemini response
    const geminiResponse = await sendGeminiMessage(content);
    await createMessage(chatroom.id, req.user.id, geminiResponse, true);
    res.json({ user_message: content, gemini_response: geminiResponse });
  } catch (err) { next(err); }
};

