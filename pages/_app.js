import "semantic-ui-css/semantic.min.css";
import "./style.css";
import { useAppStore } from "../lib/useFirebase";
import { use, useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  const listenAuth = useAppStore((state) => state.listenAuth);
  const listenDrivers = useAppStore((state) => state.listenDrivers);

  useEffect(() => {
    // start listening when app mounts
    const unsubscribeAuth = listenAuth();
    const unsubscribeDrivers = listenDrivers();

    // cleanup when app unmounts
    return () => {
      unsubscribeAuth();
      unsubscribeDrivers();
    };
  }, [listenAuth, listenDrivers]);
  return <Component {...pageProps} />;
}
