import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../../../types/Profile";
import LoadingSpinner from "../../LoadingSpinner";
import ProfileLiker from "./ProfileLiker";

export default function ProfileMemberLiker() {
  const { nickname } = useParams();

  const [likerList, setLikerList] = useState<Profile[]>();
  useEffect(() => {
    axios
      .get(`/api/v1/profile/liker/${nickname}`)
      .then((res) => setLikerList(res.data))
      .catch((e) => console.log(e));
  }, [nickname]);
    
    if (!likerList) return <LoadingSpinner />
    
  return <ProfileLiker likerList={likerList} />;
}
