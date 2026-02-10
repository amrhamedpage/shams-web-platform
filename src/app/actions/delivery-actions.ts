'use server';

import { getDeliveryEstimate, DeliveryEstimate } from '@/lib/reboost';

/**
 * Server Action to fetch delivery ETA from Reboost.
 */
export async function getDeliveryEstimateAction(productId: string): Promise<DeliveryEstimate> {
    try {
        const estimate = await getDeliveryEstimate(productId);
        return estimate;
    } catch (error) {
        console.error('Reboost delivery sync error:', error);
        throw new Error('DELIVERY_SYNC_FAILED');
    }
}
