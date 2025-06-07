import { Email, EmailProvider } from './types/types';

export class EmailService {
  private providers: EmailProvider[];
  private sentEmails: Set<string> = new Set();
  private maxRetries = 3;
  private retryDelay = 100; // ms
  private rateLimit = 5; // max emails per 10 seconds
  private emailQueue: Email[] = [];
  private sentTimestamps: number[] = [];

  constructor(providers: EmailProvider[]) {
    this.providers = providers;
    setInterval(() => this.flushQueue(), 1000);  // call flashQueue method for each second
  }

  async sendEmail(email: Email) {
    if (this.sentEmails.has(email.id)) {
      console.log(`Duplicate email skipped: ${email.id}`);
      return;
    }

    this.emailQueue.push(email);
  }

  private flushQueue() {
    while (this.emailQueue.length > 0 && this.canSendNow()) {
      const email = this.emailQueue.shift();
      if (email) this.attemptSend(email);
    }
  }

  private canSendNow(): boolean {
    const now = Date.now();
    this.sentTimestamps = this.sentTimestamps.filter(ts => now - ts < 10000);
    return this.sentTimestamps.length < this.rateLimit;
  }

  private async attemptSend(email: Email) {
    for (let provider of this.providers) {
      let success = false;
      for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
        try {
          await provider.send(email);
          this.sentEmails.add(email.id);
          this.sentTimestamps.push(Date.now());
          console.log(`Email sent to ${email.to} using ${provider.constructor.name}`);
          success = true;
          break;
        } catch (err) {
          console.log(`Attempt ${attempt} failed: ${(err as Error).message}`);
          await this.delay(this.retryDelay * Math.pow(2, attempt));
        }
      }
      if (success) return;
    }
    console.log(`All providers failed for email: ${email.id}`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(res => setTimeout(res, ms));
  }
}
