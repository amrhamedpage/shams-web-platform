'use server';

import { initiatePayment, processPayment, PaymentMethod, PaymentSession } from '@/lib/payment';

/**
 * Server Action to initiate a payment session.
 */
export async function initiatePaymentAction(amount: number, method: PaymentMethod): Promise<PaymentSession> {
    try {
        return await initiatePayment(amount, method);
    } catch (error) {
        console.error('Payment initiation error:', error);
        throw new Error('PAYMENT_INITIATION_FAILED');
    }
}

/**
 * Server Action to process/verify a payment session.
 */
export async function processPaymentAction(sessionId: string): Promise<boolean> {
    try {
        return await processPayment(sessionId);
    } catch (error) {
        console.error('Payment processing error:', error);
        throw new Error('PAYMENT_PROCESSING_FAILED');
    }
}
