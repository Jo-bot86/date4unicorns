import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../../types/Profile";
import LoadingSpinner from "../LoadingSpinner";
import ProfileView from "./ProfileView";

export default function ProfileViewMember() {
  const { nickname } = useParams();
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    axios
      .get(`/api/v1/profile/${nickname}`)
      .then((res) => setProfile(res.data))
      .catch((e) => console.log(e));
  }, [nickname]);

  if (!profile) return <LoadingSpinner />;

  return <ProfileView profile={profile} isOwner={false} />;
}
