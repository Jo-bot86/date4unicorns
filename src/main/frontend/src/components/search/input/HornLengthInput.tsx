import axios from "axios";
import React, { useEffect } from "react";

interface Props {
  hornlength: {
    minHornLength: string | undefined;
    maxHornLength: string | undefined;
    currentMinHornLength: string | undefined;
    currentMaxHornLength: string | undefined;
    setMinHornLength: React.Dispatch<React.SetStateAction<string | undefined>>;
    setMaxHornLength: React.Dispatch<React.SetStateAction<string | undefined>>;
    setCurrentMinHornLength: React.Dispatch<
      React.SetStateAction<string | undefined>
    >;
    setCurrentMaxHornLength: React.Dispatch<
      React.SetStateAction<string | undefined>
    >;
  };
}
export default function HornLengthInput(props: Props) {
  const {
    minHornLength,
    maxHornLength,
    currentMinHornLength,
    currentMaxHornLength,
    setMinHornLength,
    setMaxHornLength,
    setCurrentMinHornLength,
    setCurrentMaxHornLength
  } = props.hornlength;

  useEffect(() => {
    axios
      .get("/api/v1/search/max_hornlength")
      .then((res) => {
        setMaxHornLength(res.data.toString());
        setCurrentMaxHornLength(res.data.toString());
      })
      .catch((e) => console.log(e));

    axios
      .get("/api/v1/search/min_age")
      .then((res) => {
        setMinHornLength(res.data.toString());
        setCurrentMinHornLength(res.data.toString());
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="col-2">
        <output>min: {currentMinHornLength}</output>
        <input
          type="range"
          value={currentMinHornLength}
          step={1}
          min={minHornLength}
          max={currentMaxHornLength}
          className="form-range"
          id="horn-length"
          onChange={(e) => setCurrentMinHornLength(e.currentTarget.value)}
        ></input>
      </div>
      <div className="col-2">
        <output>max: {currentMaxHornLength}</output>
        <input
          type="range"
          value={currentMaxHornLength}
          step={1}
          min={currentMinHornLength}
          max={maxHornLength}
          className="form-range"
          id="age"
          onChange={(e) => setCurrentMaxHornLength(e.currentTarget.value)}
        ></input>
      </div>
    </>
  );
}
