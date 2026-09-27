/**
 * Offline Sync Layer for PoseCare
 * Provides client-side IndexedDB persistence and automatic background queue synchronization.
 * Handles:
 *  - Offline Session Logs (reps, ROM, duration, form violations, consistency score)
 *  - Offline Daily Progress Increments
 *  - Offline Discomfort Reports
 *  - Cached Prescriptions & Daily Allowances
 */

const DB_NAME = 'PoseCareOfflineDB';
const DB_VERSION = 1;

const STORES = {
  SESSIONS_QUEUE: 'queued_sessions',
  PROGRESS_QUEUE: 'queued_progress',
  DISCOMFORT_QUEUE: 'queued_discomfort',
  CACHED_PRESCRIPTIONS: 'cached_prescriptions',
  CACHED_ROUTINES: 'cached_routines'
};

// Open or initialize IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORES.SESSIONS_QUEUE)) {
        db.createObjectStore(STORES.SESSIONS_QUEUE, { keyPath: 'localId', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.PROGRESS_QUEUE)) {
        db.createObjectStore(STORES.PROGRESS_QUEUE, { keyPath: 'localId', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.DISCOMFORT_QUEUE)) {
        db.createObjectStore(STORES.DISCOMFORT_QUEUE, { keyPath: 'localId', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORES.CACHED_PRESCRIPTIONS)) {
        db.createObjectStore(STORES.CACHED_PRESCRIPTIONS, { keyPath: 'patientId' });
      }
      if (!db.objectStoreNames.contains(STORES.CACHED_ROUTINES)) {
        db.createObjectStore(STORES.CACHED_ROUTINES, { keyPath: 'cacheKey' });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

/**
 * Generic helper to add an item to an object store
 */
async function addItem(storeName, item) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.add({ ...item, createdAt: Date.now() });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Generic helper to put (upsert) an item
 */
async function putItem(storeName, item) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(item);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Generic helper to get all items from an object store
 */
async function getAllItems(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Generic helper to delete an item by key
 */
async function deleteItem(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export const offlineSyncEngine = {
  /**
   * Queue a completed exercise session locally
   */
  async queueSession(sessionData) {
    return await addItem(STORES.SESSIONS_QUEUE, {
      ...sessionData,
      synced: false,
      timestamp: new Date().toISOString()
    });
  },

  /**
   * Queue daily incremental progress locally
   */
  async queueDailyProgress(progressData) {
    return await addItem(STORES.PROGRESS_QUEUE, {
      ...progressData,
      synced: false,
      timestamp: new Date().toISOString()
    });
  },

  /**
   * Queue discomfort report locally
   */
  async queueDiscomfortReport(reportData) {
    return await addItem(STORES.DISCOMFORT_QUEUE, {
      ...reportData,
      synced: false,
      timestamp: new Date().toISOString()
    });
  },

  /**
   * Cache active prescription for offline use
   */
  async cachePrescription(patientId, prescriptionData) {
    if (!patientId || !prescriptionData) return;
    return await putItem(STORES.CACHED_PRESCRIPTIONS, {
      patientId,
      data: prescriptionData,
      cachedAt: Date.now()
    });
  },

  /**
   * Retrieve cached prescription
   */
  async getCachedPrescription(patientId) {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORES.CACHED_PRESCRIPTIONS, 'readonly');
      const store = tx.objectStore(STORES.CACHED_PRESCRIPTIONS);
      const req = store.get(patientId);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => resolve(null);
    });
  },

  /**
   * Cache daily routine
   */
  async cacheDailyRoutine(patientId, dateStr, routineData) {
    if (!patientId || !routineData) return;
    const cacheKey = `${patientId}_${dateStr}`;
    return await putItem(STORES.CACHED_ROUTINES, {
      cacheKey,
      patientId,
      date: dateStr,
      data: routineData,
      cachedAt: Date.now()
    });
  },

  /**
   * Get cached daily routine
   */
  async getCachedDailyRoutine(patientId, dateStr) {
    const db = await openDB();
    const cacheKey = `${patientId}_${dateStr}`;
    return new Promise((resolve) => {
      const tx = db.transaction(STORES.CACHED_ROUTINES, 'readonly');
      const store = tx.objectStore(STORES.CACHED_ROUTINES);
      const req = store.get(cacheKey);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => resolve(null);
    });
  },

  /**
   * Check how many items are waiting to be synced
   */
  async getQueuedCount() {
    try {
      const [sessions, progress, discomfort] = await Promise.all([
        getAllItems(STORES.SESSIONS_QUEUE),
        getAllItems(STORES.PROGRESS_QUEUE),
        getAllItems(STORES.DISCOMFORT_QUEUE)
      ]);
      return {
        total: sessions.length + progress.length + discomfort.length,
        sessions: sessions.length,
        progress: progress.length,
        discomfort: discomfort.length
      };
    } catch {
      return { total: 0, sessions: 0, progress: 0, discomfort: 0 };
    }
  },

  /**
   * Synchronize all offline queued records to the backend
   */
  async syncQueuedData(apiUrl, getAuthToken) {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return { syncedCount: 0, remainingCount: (await this.getQueuedCount()).total };
    }

    const token = getAuthToken ? getAuthToken() : (sessionStorage.getItem('token') || localStorage.getItem('token') || '');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    let syncedCount = 0;

    // 1. Flush Daily Progress Queue
    try {
      const queuedProgress = await getAllItems(STORES.PROGRESS_QUEUE);
      for (const item of queuedProgress) {
        try {
          const res = await fetch(`${apiUrl}/api/daily-progress/increment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(item)
          });
          if (res.ok) {
            await deleteItem(STORES.PROGRESS_QUEUE, item.localId);
            syncedCount++;
          }
        } catch (err) {
          console.warn('Sync progress item failed, retaining in offline queue:', err);
          break; // Stop on network error to retry later
        }
      }
    } catch (err) {
      console.warn('Error reading progress queue:', err);
    }

    // 2. Flush Discomfort Reports Queue
    try {
      const queuedDiscomfort = await getAllItems(STORES.DISCOMFORT_QUEUE);
      for (const item of queuedDiscomfort) {
        try {
          const res = await fetch(`${apiUrl}/api/daily-progress/report-discomfort`, {
            method: 'POST',
            headers,
            body: JSON.stringify(item)
          });
          if (res.ok) {
            await deleteItem(STORES.DISCOMFORT_QUEUE, item.localId);
            syncedCount++;
          }
        } catch (err) {
          console.warn('Sync discomfort item failed, retaining in offline queue:', err);
          break;
        }
      }
    } catch (err) {
      console.warn('Error reading discomfort queue:', err);
    }

    // 3. Flush Sessions Queue
    try {
      const queuedSessions = await getAllItems(STORES.SESSIONS_QUEUE);
      for (const item of queuedSessions) {
        try {
          const { localId, synced, timestamp, ...payload } = item;
          const res = await fetch(`${apiUrl}/api/sessions`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            await deleteItem(STORES.SESSIONS_QUEUE, item.localId);
            syncedCount++;
          }
        } catch (err) {
          console.warn('Sync session item failed, retaining in offline queue:', err);
          break;
        }
      }
    } catch (err) {
      console.warn('Error reading sessions queue:', err);
    }

    const remaining = (await this.getQueuedCount()).total;
    return { syncedCount, remainingCount: remaining };
  }
};
