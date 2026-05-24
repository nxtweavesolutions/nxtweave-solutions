// src/firebase.js  —  NxtWeave Solutions (complete final)
import { initializeApp }                        from "firebase/app";
import { getAuth }                              from "firebase/auth";
import { getFirestore, collection, addDoc,
         getDocs, doc, updateDoc, deleteDoc,
         query, orderBy, where, limit,
         serverTimestamp, onSnapshot }          from "firebase/firestore";
import { getAnalytics, isSupported }            from "firebase/analytics";

// ─── Firebase config ──────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCSM1CrLSkIBr7pzWcC9BOebOZ-ATj_iKQ",
  authDomain:        "nxtweave-solutions.firebaseapp.com",
  projectId:         "nxtweave-solutions",
  storageBucket:     "nxtweave-solutions.firebasestorage.app",
  messagingSenderId: "877004157706",
  appId:             "1:877004157706:web:953409af8701c64dda00f3",
};

// ─── Initialize ───────────────────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const auth = getAuth(app);

// ─── Firestore ────────────────────────────────────────────────────────────────
export const db = getFirestore(app);

// ─── Analytics (only in browser, not SSR) ────────────────────────────────────
export let analytics = null;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
}).catch(() => {});

// ─── Collection references ────────────────────────────────────────────────────
// Use these everywhere instead of hardcoding collection names
export const COLLECTIONS = {
  contacts:     "contacts",     // contact / hero form submissions
  queries:      "queries",      // popup & service modal submissions
  subscribers:  "subscribers",  // newsletter (future use)
};

// ─── Helper: Save contact form ────────────────────────────────────────────────
// Usage: await saveContact({ name, phone, email, service, message, source })
export async function saveContact(data) {
  try {
    const ref = await addDoc(collection(db, COLLECTIONS.contacts), {
      ...data,
      status:    data.status    || "pending",
      source:    data.source    || "unknown",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      read:      false,
    });
    return { success: true, id: ref.id };
  } catch (err) {
    console.error("[Firebase] saveContact error:", err);
    return { success: false, error: err.message };
  }
}

// ─── Helper: Save popup / service modal query ─────────────────────────────────
// Usage: await saveQuery({ name, phone, email, message, service, source })
export async function saveQuery(data) {
  try {
    const ref = await addDoc(collection(db, COLLECTIONS.queries), {
      ...data,
      status:    data.status || "pending",
      createdAt: serverTimestamp(),
      read:      false,
    });
    return { success: true, id: ref.id };
  } catch (err) {
    console.error("[Firebase] saveQuery error:", err);
    return { success: false, error: err.message };
  }
}

// ─── Helper: Get all contacts (admin dashboard) ───────────────────────────────
// Usage: const { data } = await getContacts();
export async function getContacts({ limitCount = 100, statusFilter = null } = {}) {
  try {
    let q;
    if (statusFilter) {
      q = query(
        collection(db, COLLECTIONS.contacts),
        where("status", "==", statusFilter),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, COLLECTIONS.contacts),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );
    }
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { success: true, data };
  } catch (err) {
    console.error("[Firebase] getContacts error:", err);
    return { success: false, data: [], error: err.message };
  }
}

// ─── Helper: Get all queries (admin dashboard) ────────────────────────────────
export async function getQueries({ limitCount = 100 } = {}) {
  try {
    const q = query(
      collection(db, COLLECTIONS.queries),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { success: true, data };
  } catch (err) {
    console.error("[Firebase] getQueries error:", err);
    return { success: false, data: [], error: err.message };
  }
}

// ─── Helper: Update contact status ───────────────────────────────────────────
// Usage: await updateContactStatus(id, "resolved")
export async function updateContactStatus(id, status) {
  try {
    await updateDoc(doc(db, COLLECTIONS.contacts, id), {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("[Firebase] updateContactStatus error:", err);
    return { success: false, error: err.message };
  }
}

// ─── Helper: Update query status ─────────────────────────────────────────────
export async function updateQueryStatus(id, status) {
  try {
    await updateDoc(doc(db, COLLECTIONS.queries, id), {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("[Firebase] updateQueryStatus error:", err);
    return { success: false, error: err.message };
  }
}

// ─── Helper: Mark as read ─────────────────────────────────────────────────────
export async function markAsRead(collectionName, id) {
  try {
    await updateDoc(doc(db, collectionName, id), {
      read:      true,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("[Firebase] markAsRead error:", err);
    return { success: false, error: err.message };
  }
}

// ─── Helper: Delete entry ─────────────────────────────────────────────────────
export async function deleteEntry(collectionName, id) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return { success: true };
  } catch (err) {
    console.error("[Firebase] deleteEntry error:", err);
    return { success: false, error: err.message };
  }
}

// ─── Helper: Real-time listener for contacts ──────────────────────────────────
// Usage:
//   const unsub = listenContacts((data) => setContacts(data));
//   return () => unsub(); // cleanup in useEffect
export function listenContacts(callback, limitCount = 100) {
  const q = query(
    collection(db, COLLECTIONS.contacts),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  }, (err) => {
    console.error("[Firebase] listenContacts error:", err);
  });
}

// ─── Helper: Real-time listener for queries ───────────────────────────────────
export function listenQueries(callback, limitCount = 100) {
  const q = query(
    collection(db, COLLECTIONS.queries),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  }, (err) => {
    console.error("[Firebase] listenQueries error:", err);
  });
}

// ─── Helper: Get unread count ─────────────────────────────────────────────────
// Usage: const { count } = await getUnreadCount();
export async function getUnreadCount() {
  try {
    const [cSnap, qSnap] = await Promise.all([
      getDocs(query(
        collection(db, COLLECTIONS.contacts),
        where("read", "==", false)
      )),
      getDocs(query(
        collection(db, COLLECTIONS.queries),
        where("read", "==", false)
      )),
    ]);
    return { success: true, count: cSnap.size + qSnap.size };
  } catch (err) {
    console.error("[Firebase] getUnreadCount error:", err);
    return { success: false, count: 0 };
  }
}

// ─── Re-export Firestore utils (so pages don't need to import firebase/firestore)
export {
  collection, addDoc, getDocs, doc,
  updateDoc, deleteDoc, query, orderBy,
  where, limit, serverTimestamp, onSnapshot,
};