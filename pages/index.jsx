import { useState, useEffect } from "react";
import { useAppStore } from "../lib/useFirebase";
import Router from "next/router";
import Navbar from "../components/Navbar";
import Search from "../components/Search/Search";

import {
  Header,
  Loader,
  Container,
  Button,
  Icon,
  Grid,
  Checkbox,
} from "semantic-ui-react";

import Modal from "../components/Add/Modal";

import Counter from "../components/Counter";
import Filters from "../components/Filters/Filters";

export default function Home() {
  const { initializing, user } = useAppStore();
  const [isEditable, setIsEditable] = useState(false);
  const edit = () => {
    setIsEditable(!isEditable);
  };
  useEffect(() => {
    !initializing && user === null && Router.push("/login");
  }, [initializing, user]);

  if (initializing || !user) {
    return <Loader active />;
  } else {
    return (
      <>
        <Navbar />

        <Container>
          <Grid stackable>
            <Grid.Column width={14}>
              <Header as="h2" icon textAlign="center">
                <Icon name="motorcycle" />
              </Header>
              <Header as="h2" textAlign="center">
                Search by Name, Number, or Vehicle Number
              </Header>
              <Search edited={isEditable} />
            </Grid.Column>
            <Grid.Column width={2}>
              <Filters />
            </Grid.Column>
          </Grid>
          <Modal />
          <Button onClick={edit} primary>
            Edit
          </Button>
          <Counter />
        </Container>
      </>
    );
  }
}

// Home.getInitialProps = async ({ req }) => {
//   // const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   // const json = await res.json()
//   return { isLoggedIn: false };
// };
