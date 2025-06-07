"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProviderA = void 0;
class MockProviderA {
    async send(email) {
        if (Math.random() < 0.5)
            throw new Error('MockProviderA failed');
        console.log(`MockProviderA sent email to ${email.to}`);
    }
}
exports.MockProviderA = MockProviderA;
