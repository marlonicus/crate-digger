import React from "react";
import { Entity } from "aframe-react";
import CloseButton from "../close-button";
import SaveButton from "../save-button";

const RecordControls = ({ closeHandler, saveHandler }) => (
  <Entity>
    <CloseButton onClick={closeHandler} />
    <SaveButton onClick={saveHandler} />
  </Entity>
);

export default RecordControls;
