import { profile } from "console";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataApi } from "../../hooks/useDataApi";
import Profile from "../../types/Profile";
import LikerList from "./likes/ProfileLiker";
import LoadingSpinner from "../LoadingSpinner";
import PhotoCarousel from "./photos/PhotoCarousel";

interface Props {
  profile: Profile;
  isOwner: boolean;
}

export default function ProfileView(props: Props) {
  const { profile, isOwner } = props;
  const navigate = useNavigate();
  const { nickname } = useParams();

  const convertGender = (genderCode: number): string => {
    return genderCode === 0 ? "female" : genderCode === 1 ? "male" : "diverse";
  };
  const convertAttractedToGender = (genderCode: number): string => {
    return genderCode === 0 ? "female" : genderCode === 1 ? "male" : "bi";
  };

  console.log(profile);
  return (
    <div className="container mt-4 mb-2">
      <div className="row mb-2">
        <div className="col-4"></div>
        <div className="col">
          <h1>Profile of {profile.nickname}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <PhotoCarousel profile={profile} />
          <h4 className="mt-1">{profile.nickname}</h4>
          <i
            className="fa-solid fa-heart"
            onClick={() =>  {nickname ? navigate(`/profile/liker/${nickname}`) : navigate("/profile/liker")} }
          >Liker</i>{" "}
        </div>
        <div className="col-8">
          <div className="card" style={{ width: "100%", maxWidth: "500px" }}>
            <div className="card-body">
              <h5 className="card-title">Birthday</h5>
              <p className="card-text">
                {new Date(profile.birthdate).toLocaleDateString("de-DE")}
              </p>
              <h5 className="card-title">Hornlength</h5>
              <p className="card-text">{profile.hornlength}</p>
              <h5 className="card-title">Gender</h5>
              <p className="card-text">{convertGender(profile.gender)}</p>
              <h5 className="card-title">Attracted to</h5>
              <p className="card-text">
                {convertAttractedToGender(profile.attractedToGender)}
              </p>
              <h5 className="card-title">Description</h5>
              <p className="card-text">{profile.description}</p>
              <h5 className="card-title">Last Seen</h5>
              <p className="card-text">
                {new Date(profile.lastseen).toLocaleDateString("de-DE")}
              </p>
              {isOwner && (
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/profile/edit")}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
