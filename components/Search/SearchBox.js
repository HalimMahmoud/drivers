import React, { useEffect, useState } from "react";
import { Table, Input } from "semantic-ui-react";
import useDebounce from "./Debounce";
import { useAppStore, useData } from "../../lib/useFirebase";

export default function SearchBox() {
  const init = { name: "", number: "", plate: "" };
  const { data, search, filterByProviders } = useAppStore();
  const [searchTerm, setSearchTerm] = useState(init);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    e.persist();
    setIsLoading(true);
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    search(searchTerm);
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setSearchTerm(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Table attached striped celled selectable style={{ width: "100%" }}>
      <Table.Header>
        <Table.Row color="red">
          <Table.HeaderCell width={10}>
            <Input
              fluid
              icon="search"
              name="name"
              placeholder="Name..."
              value={searchTerm.name}
              onChange={handleChange}
              loading={searchTerm.name.length !== 0 && isLoading}
            />
          </Table.HeaderCell>
          <Table.HeaderCell width={3}>
            <Input
              fluid
              icon="search"
              name="number"
              placeholder="Number..."
              value={searchTerm.number}
              onChange={handleChange}
              loading={searchTerm.number.length !== 0 && isLoading}
            />
          </Table.HeaderCell>
          <Table.HeaderCell width={3}>
            <Input
              fluid
              icon="search"
              name="plate"
              placeholder="Vehicle Number..."
              value={searchTerm.plate}
              onChange={handleChange}
              loading={searchTerm.plate.length !== 0 && isLoading}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );
}
