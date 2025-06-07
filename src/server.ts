import express from 'express';
import { EmailService } from './emailService';
import { MockProviderA } from './providers/mockProviderA';
import { MockProviderB } from './providers/mockProviderB';

const app = express();
const PORT = 3000;

app.use(express.json());

const emailService = new EmailService([
  new MockProviderA(),
  new MockProviderB()
]);

app.post('/send-email', async (req, res): Promise<void> => {
  const { id, to, subject, body } = req.body;

  if (!id || !to || !subject || !body) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    await emailService.sendEmail({ id, to, subject, body });
    res.json({ message: 'Email processed' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
