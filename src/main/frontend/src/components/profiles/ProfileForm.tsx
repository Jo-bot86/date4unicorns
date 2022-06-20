import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataApi } from "../../shared/DataApi";

interface Props {
  nickname: string;
  birthdate: string;
  hornlength: string;
  gender: string;
  attractedToGender: string;
  description: string;
  isEdit: boolean;
}

export default function ProfileForm(props: Props) {
  const [nickname, setNickname] = useState(props.nickname);
  const [birthdate, setBirthdate] = useState(props.birthdate);
  const [hornlength, setHornlength] = useState(props.hornlength);
  const [gender, setGender] = useState(props.gender);
  const [attractedToGender, setAttractedToGender] = useState(
    props.attractedToGender
  );
  const [description, setDescription] = useState(props.description);
  const [isEdit, setIsEdit] = useState(props.isEdit);

  const navigate = useNavigate();

  const createProfile = () => ({
    birthdate: new Date(),
    nickname: "",
    hornlength: "",
    gender: "",
    attractedToGender: "",
    description: "",
    
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProfile = createProfile();
    newProfile.nickname = nickname;
    newProfile.birthdate = new Date(birthdate);
    newProfile.hornlength = hornlength;
    newProfile.gender = gender;
    newProfile.attractedToGender = attractedToGender;
    newProfile.description = description;
    isEdit
      ? dataApi("PUT", "/api/v1/profile/edit", () => navigate("/profile"), newProfile)
      : dataApi("POST", "/api/v1/profile", () => navigate("/profile"), newProfile);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card mt-4" style={{ width: "40rem" }}>
        <div className="card-body">
          <h5 className="card-title">{isEdit ? "Edit" : "Create"} Profile</h5>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="nickname" className="form-label">
              {" "}
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="form-control"
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
              required
            />

            <label htmlFor="birthdate" className="form-label">
              {" "}
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              className="form-control"
              onChange={(e) => setBirthdate(e.currentTarget.value)}
              value={birthdate}
              required
            />

            <label htmlFor="hornlength" className="form-label">
              {" "}
              Hornlength
            </label>
            <input
              type="number"
              id="hornlength"
              className="form-control"
              onChange={(e) => setHornlength(e.target.value)}
              value={hornlength}
              required
              min={0}
            />

            <label htmlFor="gender" className="form-label">
              {" "}
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              value={`${gender}`}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">-- choose a gender --</option>
              <option value={"0"}>female</option>
              <option value="1">male</option>
              <option value="2">queer</option>
            </select>
            <label htmlFor="attracted-to-gender" className="form-label">
              {" "}
              Attracted to gender
            </label>
            <select
              className="form-select"
              id="attracted-to-gender"
              value={attractedToGender}
              onChange={(e) => setAttractedToGender(e.target.value)}
            >
              <option value="">-- choose attracted to gender --</option>
              <option value="0">female</option>
              <option value="1">male</option>
              <option value="2">bi</option>
            </select>
            <label htmlFor="description" className="form-label">
              {" "}
              Description
            </label>
            <textarea
              className="form-control"
              aria-label="Description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></textarea>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-warning btn-block">
                {isEdit ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
