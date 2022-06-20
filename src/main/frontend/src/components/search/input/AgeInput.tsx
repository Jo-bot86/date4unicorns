import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";

interface Props {
  age: {
    minAge: string | undefined;
    maxAge: string | undefined;
    currentMinAge: string | undefined;
    currentMaxAge: string | undefined;
    setMinAge: React.Dispatch<React.SetStateAction<string | undefined>>;
    setMaxAge: React.Dispatch<React.SetStateAction<string | undefined>>;
    setCurrentMinAge: React.Dispatch<React.SetStateAction<string | undefined>>;
    setCurrentMaxAge: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
}

export default function AgeInput(props: Props) {
  const {
    minAge,
    maxAge,
    currentMinAge,
    currentMaxAge,
    setMinAge,
    setMaxAge,
    setCurrentMinAge,
    setCurrentMaxAge,
  } = props.age;

  useEffect(() => {
    axios
      .get("/api/v1/search/max_age")
      .then((res) => {
        setMaxAge(res.data.toString());
        setCurrentMaxAge(res.data.toString());
      })
      .catch((e) => console.log(e));

    axios
      .get("/api/v1/search/min_age")
      .then((res) => {
        setMinAge(res.data.toString());
        setCurrentMinAge(res.data.toString());
      })
      .catch((e) => console.log(e));
  }, []);

  // if (!minAge || !maxAge) return <LoadingSpinner />;

  return (
    <>
      <div className="col-2">
        <output>min: {currentMinAge}</output>
        <input
          type="range"
          value={currentMinAge}
          step={1}
          min={minAge}
          max={currentMaxAge}
          className="form-range"
          id="age"
          onChange={(e) => setCurrentMinAge(e.currentTarget.value)}
        ></input>
      </div>
      <div className="col-2">
        <output>max: {currentMaxAge}</output>
        <input
          type="range"
          value={currentMaxAge}
          step={1}
          min={currentMinAge}
          max={maxAge}
          className="form-range"
          id="age"
          onChange={(e) => setCurrentMaxAge(e.currentTarget.value)}
        ></input>
      </div>
    </>
  );
}
