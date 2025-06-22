import { auth, db } from "../lib/firebase";
import { useState, useEffect } from "react";

// export const useAuth = () => {
//   const [state, setState] = useState(() => {
//     const user = firebase.auth().currentUser;
//     return { initializing: !user, user };
//   });
//   function onChange(user) {
//     setState({ initializing: false, user });
//   }
//   useEffect(() => {
//     // listen for auth state changes
//     const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
//     // unsubscribe to the listener when unmounting
//     return () => unsubscribe();
//   }, []);
//   return state;
// };

export function useHandleUserData() {
  const [user, setUser] = useState();
  function userData() {
    auth.onAuthStateChanged(result => {
      if (result) {
        const { email, displayName, photoURL } = result;
        const profile = () =>
          photoURL === null
            ? "http://react.semantic-ui.com/images/avatar/small/elliot.jpg"
            : photoURL;

        const loggedInUser = {
          email,
          displayName,
          photoURL: profile()
        };
        setUser(loggedInUser);
        db.collection("users")
          .doc(result.uid)
          .set(loggedInUser)
          .then(result => console.log("succesful", result))
          .catch(err => console.log(err));
      } else {
        setUser(undefined);
      }
    });
  }

  useEffect(() => {
    userData();
  }, []);
  return user;
}

export function handleLogout() {
  auth.signOut();
}

export function signUp(data) {
  auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(({ user }) => {
      user
        .updateProfile({
          displayName: data.fullname,
          photoURL:
            "http://react.semantic-ui.com/images/avatar/small/elliot.jpg"
        })
        .then(function() {
          // Update successful.
          console.log("Update successful");
        })
        .catch(function(error) {
          // An error happened.
          console.log("An error happened at updating", error);
        });
    })
    .catch(error => {
      // // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });
}

export function signIn(data) {
  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
    });
}
