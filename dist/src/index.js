"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailService_1 = require("./emailService");
const mockProviderA_1 = require("./providers/mockProviderA");
const mockProviderB_1 = require("./providers/mockProviderB");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const emailService = new emailService_1.EmailService([
    new mockProviderA_1.MockProviderA(),
    new mockProviderB_1.MockProviderB()
]);
app.post('/send-email', async (req, res) => {
    const { id, to, subject, body } = req.body;
    if (!id || !to || !subject || !body) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try {
        await emailService.sendEmail({ id, to, subject, body });
        res.json({ message: 'Email processed' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
