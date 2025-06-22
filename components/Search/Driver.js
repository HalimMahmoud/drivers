import React from "react";
import { Table, Icon, Label, List, Checkbox } from "semantic-ui-react";
import PopUp from "../PopUp";
import EditDriver from "../Edit/Modal";
import Pool from "../Pool";

export default function Driver({ x, isEditable, removeMethod }) {
  // const color = x => (x === "El Omada" ? "red" : "blue");
  function coloring(x) {
    switch (x) {
      case "El Omda":
        return "teal";
      case "Alalamia":
        return "violet";
      default:
        return "grey";
    }
  }
  return (
    <Table.Row>
      <Table.Cell
        width={10}
        style={{
          textTransform: "capitalize",
          paddingLeft: "27px",
          minHeight: "30px"
        }}
      >
        <List horizontal>
          <List.Item>{x.name}</List.Item>

          <List.Item>
            <Icon
              circular
              size="tiny"
              color={x.approveStatus === "Approved" ? "green" : "red"}
              name={x.approveStatus === "Approved" ? "check" : "delete"}
            />
          </List.Item>
          <List.Item>
            {x.blocked && (
              <Label color="red" size="mini">
                Blocked
              </Label>
            )}
          </List.Item>
        </List>

        <List horizontal floated="right">
          <List.Item>
            <Label
              color={coloring(x.providerName)}
              style={{ minWidth: "50px", textAlign: "center" }}
              size="mini"
            >
              {x.providerName}
            </Label>
          </List.Item>
          <List.Item>
            <Pool driver={x} />
          </List.Item>
          <List.Item
            floated="right"
            as="a"
            target="_blank"
            rel="noreferrer noopener"
            href={`https://fdm.elmenus.com/driver-profile/${x.id}/orders`}
          >
            <Icon circular size="small" name="linkify" />
          </List.Item>
        </List>
        {isEditable && (
          <Icon
            link
            onClick={() => removeMethod(x.key)}
            circular
            color="red"
            size="small"
            name="remove"
            style={{ float: "right" }}
          />
        )}
      </Table.Cell>
      <Table.Cell width={3} style={{ paddingLeft: "29px", minHeight: "30px" }}>
        <List horizontal>
          <List.Item>{x.num}</List.Item>
        </List>

        <List horizontal floated="right">
          <List.Item>
            <PopUp init="Copy" success="Copied!" fail="Failed!" data={x.num} />
          </List.Item>
        </List>
        {isEditable && <EditDriver driver={x.key} />}
      </Table.Cell>
      <Table.Cell width={3} style={{ paddingLeft: "29px", minHeight: "30px" }}>
        <List horizontal>
          <List.Item>{x.plate}</List.Item>
        </List>

        <List horizontal floated="right">
          <List.Item>
            <PopUp
              init="Copy"
              success="Copied!"
              fail="Failed!"
              data={x.plate}
            />
          </List.Item>
        </List>
      </Table.Cell>
    </Table.Row>
  );
}
