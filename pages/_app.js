import "semantic-ui-css/semantic.min.css";
import "./style.css";
import "../store"; // <<< import before calling useRedux or Provider
import { Provider } from "hooks-for-redux";
import { getAuth } from "../lib/useFirebase";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  getAuth();
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
