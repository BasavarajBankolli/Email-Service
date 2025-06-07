import { EmailService } from '../src/emailService';
import { MockProviderA } from '../src/providers/mockProviderA';
import { MockProviderB } from '../src/providers/mockProviderB';


const service = new EmailService([new MockProviderA(), new MockProviderB()]);

(async () => {
  await service.sendEmail({
    id: 'test-1',
    to: 'test@example.com',
    subject: 'Test',
    body: 'This is a test.',
  });

  // Attempt to resend same email
  await service.sendEmail({
    id: 'test-1',
    to: 'test@example.com',
    subject: 'Test Again',
    body: 'Should not send twice.',
  });
})();
