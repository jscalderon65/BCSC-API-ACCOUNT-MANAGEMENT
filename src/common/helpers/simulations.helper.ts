import { TransactionStatusDocument } from '@utils/schemas/process/transaction-status.schema';

export const getRandomStatus = (
  statuses: TransactionStatusDocument[],
): TransactionStatusDocument => {
  const random = Math.random();

  if (random < 0.8) {
    return statuses.find((status) => status.code === 'COMPLETED');
  } else if (random < 0.9) {
    return statuses.find((status) => status.code === 'FAILED');
  } else {
    return statuses.find((status) => status.code === 'CANCELLED');
  }
};
