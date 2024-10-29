import {
  collection,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  DocumentData,
  getDoc,
  doc,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants/index'
import { Card } from '@models/card'

export async function getCards(
  pageParam?: QueryDocumentSnapshot<DocumentData> | null,
): Promise<{
  items: Card[]
  lastVisible: QueryDocumentSnapshot<DocumentData> | null
}> {
  const cardQuery = pageParam
    ? query(
        collection(store, COLLECTIONS.CARD),
        startAfter(pageParam),
        limit(10),
      )
    : query(collection(store, COLLECTIONS.CARD), limit(10))

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1] || null

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))

  return {
    id,
    ...(snapshot.data() as Card),
  }
}
