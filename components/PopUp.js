import React, { useState } from "react";
import { Popup, Icon } from "semantic-ui-react";

export default function PopUp({ init, success, fail, data }) {
  const [copy, setCopy] = useState(`${init}`);

  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      function() {
        setCopy(`${success}`);
      },
      function() {
        setCopy(`${fail}`);
      }
    );
  }
  const onUnmount = () => {
    setCopy(`${init}`);
  };

  return (
    <Popup
      content={copy}
      inverted
      position="top center"
      on="hover"
      onUnmount={onUnmount}
      trigger={
        <Icon
          link
          onClick={() => updateClipboard(`${data}`)}
          circular
          size="small"
          name="copy"
          style={{ float: "right" }}
        />
      }
    />
  );
}
