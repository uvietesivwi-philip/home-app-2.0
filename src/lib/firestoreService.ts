import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore';
import type { QueryConstraint } from 'firebase/firestore';
import { db } from './firebase';
import type { ContentItem, ContentProgress, ServiceRequest } from '../types/models';

const collectionRef = {
  content: collection(db, 'content'),
  progress: collection(db, 'contentProgress'),
  saves: collection(db, 'savedContent'),
  requests: collection(db, 'requests')
};

export async function getLatestResumeContent(userId: string) {
  const q = query(
    collectionRef.progress,
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc'),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const progress = snapshot.docs[0].data() as ContentProgress;
  const content = await getDoc(doc(db, 'content', progress.contentId));
  return content.exists() ? ({ id: content.id, ...content.data() } as ContentItem) : null;
}

export async function getSuggestedContent() {
  const q = query(collectionRef.content, orderBy('createdAt', 'desc'), limit(6));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }) as ContentItem);
}

export async function getContentByFilter(filters: {
  category: string;
  subcategory?: string;
  type?: string;
}) {
  const constraints: QueryConstraint[] = [where('category', '==', filters.category)];
  if (filters.subcategory) constraints.push(where('subcategory', '==', filters.subcategory));
  if (filters.type) constraints.push(where('type', '==', filters.type));

  const q = query(collectionRef.content, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }) as ContentItem);
}

export async function getContentById(contentId: string) {
  const result = await getDoc(doc(db, 'content', contentId));
  return result.exists() ? ({ id: result.id, ...result.data() } as ContentItem) : null;
}

export async function saveContent(userId: string, contentId: string) {
  await addDoc(collectionRef.saves, {
    userId,
    contentId,
    savedAt: serverTimestamp()
  });
}

export async function trackProgress(userId: string, contentId: string, progressSeconds: number) {
  const progressId = `${userId}_${contentId}`;
  await setDoc(doc(db, 'contentProgress', progressId), {
    userId,
    contentId,
    progressSeconds,
    updatedAt: serverTimestamp()
  });
}

export async function createServiceRequest(
  userId: string,
  payload: Pick<ServiceRequest, 'type' | 'notes'>
) {
  await addDoc(collectionRef.requests, {
    userId,
    type: payload.type,
    notes: payload.notes,
    status: 'pending',
    createdAt: serverTimestamp()
  });
}

export async function getUserSavedContent(userId: string) {
  const savedQuery = query(collectionRef.saves, where('userId', '==', userId));
  const savedDocs = await getDocs(savedQuery);
  const entries = await Promise.all(
    savedDocs.docs.map(async (item: (typeof savedDocs.docs)[number]) => {
      const saved = item.data() as { contentId: string };
      return getContentById(saved.contentId);
    })
  );

  return entries.filter((item): item is ContentItem => item !== null);
}
