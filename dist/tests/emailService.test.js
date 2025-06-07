"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("../src/emailService");
const mockProviderA_1 = require("../src/providers/mockProviderA");
const mockProviderB_1 = require("../src/providers/mockProviderB");
const service = new emailService_1.EmailService([new mockProviderA_1.MockProviderA(), new mockProviderB_1.MockProviderB()]);
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
