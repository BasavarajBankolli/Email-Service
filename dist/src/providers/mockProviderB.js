"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProviderB = void 0;
class MockProviderB {
    async send(email) {
        if (Math.random() < 0.3)
            throw new Error('MockProviderB failed');
        console.log(`MockProviderB sent email to ${email.to}`);
    }
}
exports.MockProviderB = MockProviderB;
