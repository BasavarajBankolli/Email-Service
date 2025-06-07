import { Email, EmailProvider } from '../types/types';

export class MockProviderB implements EmailProvider {
  async send(email: Email): Promise<void> {
    if (Math.random() < 0.3) throw new Error('MockProviderB failed');
    console.log(`MockProviderB sent email to ${email.to}`);
  }
}
