import React from "react";
import { FileSelectionContract } from "./file-selection.interface";

export function FileSelection(props: FileSelectionContract) {
  const onClearFileSelector = () => {
    // if (props.inputReference?.current) {
    //     props.inputReference.current.value = ''
    // }
  };

  const onFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      let file = event.target.files[0];
      if (file) {
        onClearFileSelector();
        props.onFileSelection(file);
      }
    }
  };

  return (
    <React.Fragment>
      <input
        type="file"
        hidden={true}
        ref={props.inputReference}
        accept="application/gzip, .zip"
        onChange={onFileSelection}
      />
    </React.Fragment>
  );
}
