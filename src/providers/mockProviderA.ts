import { Email, EmailProvider } from '../types/types';

export class MockProviderA implements EmailProvider {
  async send(email: Email): Promise<void> {
    if (Math.random() < 0.5) throw new Error('MockProviderA failed');
    console.log(`MockProviderA sent email to ${email.to}`);
  }
}
