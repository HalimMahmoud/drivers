// store/appStore.js
import create from "zustand";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// ----------------------
// Firebase Init
// ----------------------
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export const db = getFirestore(app);

// ----------------------
// Zustand Store
// ----------------------
export const useAppStore = create((set, get) => ({
  // Auth state
  initializing: !getApps().length,
  user: null,
  error: null,

  // Driver state
  drivers: [],
  data: [],
  searchResult: [],
  loading: false,
  lastUpdate: null,

  // ----------------------
  // Auth Actions
  // ----------------------
  listenAuth: () => {
    return onAuthStateChanged(auth, (user) => {
      // console.log("Auth state changed:", user);
      set({ user, error: null });
    });
  },

  login: async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      set({ error: null });
    } catch (error) {
      set({ error });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, error: null });
    } catch (error) {
      set({ error });
    }
  },

  // ----------------------
  // Driver Actions
  // ----------------------
  listenDrivers: () => {
    set({ loading: true });
    const unsubscribe = onSnapshot(
      collection(db, "drivers"),
      (snapshot) => {
        const drivers = snapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        }));
        const sorted = [...drivers].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        set({
          drivers: sorted,
          data: sorted,
          searchResult: sorted,
          loading: false,
          lastUpdate: sorted.length
            ? Math.max(
                ...sorted.map((x) =>
                  x.updated
                    ? x.updated.seconds * 1000 + x.updated.nanoseconds / 1000
                    : 0
                )
              )
            : null,
        });
      },
      (error) => set({ error, loading: false })
    );

    return unsubscribe;
  },

  search: ({ name = "", number = "", plate = "" }) => {
    const { data } = get();
    set({
      searchResult: data.filter(
        (x) =>
          x.name.toLowerCase().includes(name.toLowerCase()) &&
          x.num.toLowerCase().includes(number.toLowerCase()) &&
          x.plate.toLowerCase().includes(plate.toLowerCase())
      ),
    });
  },

  updateDriver: async ({ key, ...data }) => {
    try {
      await setDoc(doc(db, "drivers", key), {
        ...data,
        updated: serverTimestamp(),
      });
    } catch (error) {
      set({ error });
    }
  },

  addDrivers: async (drivers) => {
    try {
      for (const driver of drivers) {
        await addDoc(collection(db, "drivers"), {
          ...driver,
          updated: serverTimestamp(),
        });
      }
    } catch (error) {
      set({ error });
    }
  },

  removeDriver: async (key) => {
    try {
      await deleteDoc(doc(db, "drivers", key));
    } catch (error) {
      set({ error });
    }
  },

  filterByProviders: ({ providerNames = [], blocked = [], pools = [] }) => {
    const { drivers } = get();
    const filtered = drivers.filter(
      (x) =>
        (providerNames.length === 0 ||
          providerNames.includes(x.providerName)) &&
        (blocked.includes("All")
          ? true
          : blocked.includes("Blocked")
          ? x.blocked
          : !x.blocked) &&
        (pools.length === 0
          ? true
          : pools.includes("Not-assigned")
          ? x.pool === ""
          : pools.includes(x.pool))
    );
    set({ data: filtered, searchResult: filtered });
  },

  resetFilters: () => {
    const { drivers } = get();
    const sorted = [...drivers].sort((a, b) => a.name.localeCompare(b.name));
    set({ data: sorted, searchResult: sorted });
  },

  updateDriverPool: async (driverId, newPool) => {
    try {
      const driverRef = doc(db, "drivers", driverId);
      await updateDoc(driverRef, {
        pool: newPool,
        updated: serverTimestamp(),
      });

      // update local state
      const updatedDrivers = get().drivers.map((d) =>
        d.id === driverId ? { ...d, pool: newPool } : d
      );
      set({
        drivers: updatedDrivers,
        data: updatedDrivers,
        searchResult: updatedDrivers,
      });
    } catch (error) {
      console.error("Error updating pool:", error);
    }
  },
}));
