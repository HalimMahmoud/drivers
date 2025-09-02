import React from "react";
import {
  Table,
  Segment,
  Loader,
  Header,
  Icon,
  Button,
} from "semantic-ui-react";
import Driver from "./Driver";
import { useData, remove, useAppStore } from "../../lib/useFirebase";
export default function SearchResult({ isEditable }) {
  const { error, loading, drivers, searchResult } = useAppStore();
  if (loading) <Loader active />;
  return (
    <div style={{ height: "404px", overflowX: "hidden" }}>
      {searchResult.length !== 0 ? (
        <Table attached striped selectable>
          <Table.Body>
            {searchResult.map((x, i) => (
              <Driver
                key={x.key}
                x={x}
                isEditable={isEditable}
                removeMethod={remove}
              />
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Segment placeholder style={{ height: "404px" }}>
          <Header icon>
            <Icon name="search" />
            We don't have any documents matching your query.
          </Header>
        </Segment>
      )}
    </div>
  );
}
