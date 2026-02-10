'use server';

import { getLiveStock, ERPStockStatus } from '@/lib/solver-erp';

/**
 * Server Action to fetch live stock from Solver ERP.
 * This runs on the server to keep API keys and internal ERP URLs secure.
 */
export async function getLiveStockAction(productId: string): Promise<ERPStockStatus> {
    try {
        // In a real-world scenario, you might add authorization checks here
        const status = await getLiveStock(productId);
        return status;
    } catch (error) {
        console.error(`Failed to fetch live stock for product ${productId}:`, error);
        throw new Error('ERP_SYNC_FAILED');
    }
}
