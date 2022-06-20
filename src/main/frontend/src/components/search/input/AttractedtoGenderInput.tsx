import React, { useState } from "react";

interface Props {
  attractedToGender: string;
  setAttractedToGender: React.Dispatch<React.SetStateAction<string>>;
}

export default function AttractedtoGenderInput(props: Props) {
  const { attractedToGender, setAttractedToGender } = props;
  return (
    <div className="col-2">
      <select
        className="form-select"
        id="attracted-to-gender"
        aria-label="select attracted to gender"
        value={attractedToGender}
        onChange={(e) =>
          e.currentTarget.value !== "-- attracted to --"
            ? setAttractedToGender(e.currentTarget.value)
            : setAttractedToGender("")
        }
      >
        <option>-- attracted to --</option>
        <option value="0">female</option>
        <option value="1">male</option>
        <option value="2">bi</option>
      </select>
    </div>
  );
}
