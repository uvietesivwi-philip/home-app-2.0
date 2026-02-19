import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { logger } from 'firebase-functions';

initializeApp();

export const onServiceRequestCreated = onDocumentCreated('requests/{requestId}', async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const request = snapshot.data();
  logger.info('New service request created', { requestId: event.params.requestId, type: request.type });

  await getFirestore().collection('requestAudit').add({
    requestId: event.params.requestId,
    userId: request.userId,
    status: 'pending',
    createdAt: new Date().toISOString()
  });
});
