import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Photo } from "../../types/Photo";
import Profile from "../../types/Profile";
import LoadingSpinner from "../LoadingSpinner";
import ProfileViewMember from "./ProfileViewMember";

interface Props {
  profile: Profile;
}

export default function ProfilePreview(props: Props) {
  const { profile } = props;
  const [profilePhoto, setProfilePhoto] = useState<Photo>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/v1/photo/${profile.nickname}`)
      .then((res) => setProfilePhoto(res.data))
      .catch((e) => console.log(e));
  }, [profile.nickname]);



  if (!profilePhoto) return <LoadingSpinner />;

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12 mt-2">
      <div
        className="card"
        style={{ width: "18rem" }}
        onClick={() => navigate(`/profile/${profile.nickname}`)}
      >
        <img
          src={`/images/${profilePhoto.name}.jpg`}
          className="card-img-top"
          alt="profile photo"
        />
        <div className="card-body">
          <h5 className="card-title">{profile.nickname}</h5>
          <p className="card-text">
            <div>
              <>Birthdate: {new Date(profile.birthdate).toLocaleDateString("de-DE")}</>
            </div>
            <div>Hornlength: {profile.hornlength}</div>
          </p>
        </div>
      </div>
    </div>
  );
}
