"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
class EmailService {
    constructor(providers) {
        this.sentEmails = new Set();
        this.maxRetries = 3;
        this.retryDelay = 100; // ms
        this.rateLimit = 5; // max emails per 10 seconds
        this.emailQueue = [];
        this.sentTimestamps = [];
        this.providers = providers;
        setInterval(() => this.flushQueue(), 1000); // call flashQueue method for each second
    }
    async sendEmail(email) {
        if (this.sentEmails.has(email.id)) {
            console.log(`Duplicate email skipped: ${email.id}`);
            return;
        }
        this.emailQueue.push(email);
    }
    flushQueue() {
        while (this.emailQueue.length > 0 && this.canSendNow()) {
            const email = this.emailQueue.shift();
            if (email)
                this.attemptSend(email);
        }
    }
    canSendNow() {
        const now = Date.now();
        this.sentTimestamps = this.sentTimestamps.filter(ts => now - ts < 10000);
        return this.sentTimestamps.length < this.rateLimit;
    }
    async attemptSend(email) {
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
                }
                catch (err) {
                    console.log(`Attempt ${attempt} failed: ${err.message}`);
                    await this.delay(this.retryDelay * Math.pow(2, attempt));
                }
            }
            if (success)
                return;
        }
        console.log(`All providers failed for email: ${email.id}`);
    }
    delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}
exports.EmailService = EmailService;
