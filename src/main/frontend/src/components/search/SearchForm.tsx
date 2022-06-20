import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import Profile from "../../types/Profile";
import AgeInput from "./input/AgeInput";
import AttractedtoGenderInput from "./input/AttractedtoGenderInput";
import GenderInput from "./input/GenderInput";
import HornLengthInput from "./input/HornLengthInput";

interface Props {
  setSearchResults: React.Dispatch<React.SetStateAction<Profile[]>>;
}
export default function SearchForm(props: Props) {
  const [minAge, setMinAge] = useState<string>();
  const [maxAge, setMaxAge] = useState<string>();
  const [currentMinAge, setCurrentMinAge] = useState<string>();
  const [currentMaxAge, setCurrentMaxAge] = useState<string>();
  const [minHornLength, setMinHornLength] = useState<string>();
  const [maxHornLength, setMaxHornLength] = useState<string>();
  const [currentMinHornLength, setCurrentMinHornLength] = useState<string>();
  const [currentMaxHornLength, setCurrentMaxHornLength] = useState<string>();
  const [gender, setGender] = useState<string>("");
  const [attractedToGender, setAttractedToGender] = useState<string>("");

  const { setSearchResults } = props;

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .get("/api/v1/search", {
        params: {
          minAge: currentMinAge,
          maxAge: currentMaxAge,
          minHornLength: currentMinHornLength,
          maxHornLength: currentMaxHornLength,
          gender,
          attractedToGender,
        },
      })
      .then((res) => setSearchResults(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <form className="container" onSubmit={handleOnSubmit}>
      <div className="row mt-2">
        <div className="col text-start">
          <h4>Searching for Unicorns...</h4>
        </div>
        <div className="col text-end">
          <button className="btn btn-warning">Search</button>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <label htmlFor="age" className="col-form-label">
            Age
          </label>
        </div>
        <div className="col-2"></div>
        <div className="col-2">
          <label htmlFor="hornlength" className="col-form-label">
            Horn length
          </label>
        </div>
        <div className="col-2"></div>
        <div className="col-2">
          <label htmlFor="gender" className="col-form-label">
            Gender
          </label>
        </div>
        <div className="col-2">
          <label htmlFor="attracted-to-gender" className="col-form-label">
            Attracted to
          </label>
        </div>
      </div>
      <div className="row">
        <AgeInput
          age={{
            minAge,
            maxAge,
            setMinAge,
            setMaxAge,
            currentMinAge,
            currentMaxAge,
            setCurrentMinAge,
            setCurrentMaxAge,
          }}
        />
        <HornLengthInput
          hornlength={{
            minHornLength,
            maxHornLength,
            currentMinHornLength,
            currentMaxHornLength,
            setMinHornLength,
            setMaxHornLength,
            setCurrentMinHornLength,
            setCurrentMaxHornLength,
          }}
        />
        <GenderInput gender={gender} setGender={setGender} />
        <AttractedtoGenderInput
          attractedToGender={attractedToGender}
          setAttractedToGender={setAttractedToGender}
        />
      </div>
    </form>
  );
}
