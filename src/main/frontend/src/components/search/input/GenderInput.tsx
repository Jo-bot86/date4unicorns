import React, { useState } from "react";

interface Props {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
}

export default function GenderInput(props: Props) {
  const { gender, setGender } = props;
  return (
    <div className="col-2">
      <select
        className="form-select"
        id="age"
        aria-label="select gender"
        value={gender}
        onChange={(e) =>
          e.currentTarget.value !== "-- gender --"
            ? setGender(e.currentTarget.value)
            : setGender("")
        }
      >
        <option>-- gender --</option>
        <option value="0">female</option>
        <option value="1">male</option>
        <option value="2">diverse</option>
      </select>
    </div>
  );
}
