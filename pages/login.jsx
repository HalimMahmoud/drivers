import { useState, useEffect } from "react";
import Router from "next/router";

import {
  Form,
  Segment,
  Grid,
  Header,
  Loader,
  Message,
  Button,
  Input,
} from "semantic-ui-react";
import { useAppStore } from "../lib/useFirebase";

export default function Login() {
  const [{ email, password }, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { initializing, user, error, login } = useAppStore();
  const handleChange = (e) => {
    setData({ email, password, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    login(email, password);
  };

  useEffect(() => {
    !initializing && user && Router.push("/");

    error && setLoading(false);
  }, [initializing, user, error]);

  if (initializing || user) {
    return <Loader active />;
  } else {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                value={email}
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
              />

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                color="teal"
                fluid
                size="large"
                // onClick={() => setLoading(true)}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>

          {error && <Message>{error.code}</Message>}
        </Grid.Column>
      </Grid>
    );
  }
}

// Login.getInitialProps = async ({ req }) => {
//   // const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   // const json = await res.json()
//   return { isLoggedIn: false };
// };
