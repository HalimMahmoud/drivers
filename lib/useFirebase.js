import { firebase, db, auth } from "../lib/firebase";
import { useEffect } from "react";
import { useRedux } from "hooks-for-redux";
export const getAuth = () => {
  useEffect(() => {
    // listen for auth state changes
    onChange({ initializing: true, user: null, error: false });

    const unsubscribe = auth.onAuthStateChanged(user => {
      user
        ? onChange({ initializing: false, user })
        : onChange({ initializing: false, user: null });
    });
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);
};
const initAuth = {
  initializing: false,
  error: false,
  user: null
};
export const [useAuth, { onChange, login, logout }] = useRedux(
  "auth",
  initAuth,
  {
    onChange: (state, newState) => ({ ...state, ...newState }),
    login: (state, { username, password }) => {
      auth
        .signInWithEmailAndPassword(username, password)
        .then(function() {
          onChange({
            initializing: true,
            error: false
          });
        })
        .catch(error =>
          onChange({
            initializing: false,
            error
          })
        );
      return state;
    },
    logout: state => {
      auth
        .signOut()
        .then(function() {
          onChange({
            initializing: true,
            error: false
          });
        })
        .catch(function(error) {
          onChange({
            initializing: false,
            error
          });
        });

      return state;
    }
  }
);

export const getData = () => {
  useEffect(() => {
    setData({
      loading: true
    });
    const unsubscribe = db.collection("drivers").onSnapshot(
      snapshot => {
        const drivers = [];
        snapshot.forEach(doc => {
          drivers.push({ key: doc.id, ...doc.data() });
        });

        setData({
          loading: false,
          drivers: drivers.sort((a, b) => a.name.localeCompare(b.name)),
          data: drivers.sort((a, b) => a.name.localeCompare(b.name)),
          searchResult: drivers.sort((a, b) => a.name.localeCompare(b.name))
        });
        drivers !== 0 && setLastUpdate();
        ////// setLoading(false);
        /// setData(courses);
      },
      error => {
        console.log("fuck error");
        setData({
          error,
          loading: false
        });
      }
    );

    // returning the unsubscribe function will ensure that
    // we unsubscribe from document changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, []);
};

const initData = {
  error: false,
  loading: false,
  drivers: [],
  data: [],
  searchResult: [],
  lastUpdate: null
};
export const [
  useData,
  {
    setData,
    search,
    update,
    add,
    remove,
    filterByProviders,
    setLastUpdate,
    resetFilters
  }
] = useRedux("drivers", initData, {
  setData: (state, newState) => ({ ...state, ...newState }),
  search: (state, { name, number, plate }) => ({
    ...state,
    searchResult: state.data.filter(
      x =>
        x.name.toLowerCase().includes(name.toLowerCase()) &&
        x.num.toLowerCase().includes(number.toLowerCase()) &&
        x.plate.toLowerCase().includes(plate.toLowerCase())
    )
  }),
  update: (state, { key, ...data }) => {
    db.collection("drivers")
      .doc(key)
      .set({
        ...data,
        updated: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => ({ ...state, loading: true }))
      .catch(error => ({ ...state, loading: false, error }));

    return state;
  },
  add: (state, newDrivers) => {
    newDrivers.map(driver => {
      db.collection("drivers")
        .add({
          ...driver,

          updated: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => ({ ...state, loading: true }))
        .catch(error => ({ ...state, loading: false, error }));
    });

    return state;
  },
  remove: (state, key) => {
    db.collection("drivers")
      .doc(key)
      .delete()
      .then(() => ({ ...state, loading: true }))
      .catch(error => ({ ...state, loading: false, error }));
    return state;
  },

  filterByProviders: (state, { providerNames, blocked, pools }) => ({
    ...state,
    data: state.drivers.filter(
      x =>
        (providerNames.length === 0
          ? x
          : providerNames.includes(x.providerName)) &&
        (blocked.includes("All")
          ? x
          : blocked.includes("Blocked")
          ? x.blocked
          : !x.blocked) &&
        (pools.length === 0
          ? x
          : pools.includes("Not-assigned")
          ? x.pool === ""
          : pools.includes(x.pool))
    ),
    searchResult: state.drivers.filter(
      x =>
        (providerNames.length === 0
          ? x
          : providerNames.includes(x.providerName)) &&
        (blocked.includes("All")
          ? x
          : blocked.includes("Blocked")
          ? x.blocked
          : !x.blocked) &&
        (pools.length === 0
          ? x
          : pools.includes("Not-assigned")
          ? x.pool === ""
          : pools.includes(x.pool))
    )
  }),
  setLastUpdate: state => {
    const lastUpdateforDrivers =
      state.drivers.length !== 0
        ? Math.max.apply(
            Math,
            state.drivers.map(x =>
              x.updated.seconds !== null && x.updated.nanoseconds !== null
                ? x.updated.seconds * 1000 + x.updated.nanoseconds / 1000
                : 0
            )
          )
        : null;
    console.log(lastUpdateforDrivers);
    return {
      ...state,
      lastUpdate: lastUpdateforDrivers
    };
  },
  resetFilters: state => ({
    ...state,
    data: state.drivers.sort((a, b) => a.name.localeCompare(b.name)),
    searchResult: state.data.sort((a, b) => a.name.localeCompare(b.name))
  })
});
