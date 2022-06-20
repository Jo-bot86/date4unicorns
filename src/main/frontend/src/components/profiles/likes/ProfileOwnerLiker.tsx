import axios from "axios";
import React, { useEffect, useState } from "react";
import Profile from "../../../types/Profile";
import LoadingSpinner from "../../LoadingSpinner";
import ProfileLiker from "./ProfileLiker";

export default function ProfileOwnerLiker() {
  const [likerList, setLikerList] = useState<Profile[]>();
  useEffect(() => {
    axios
      .get(`/api/v1/profile/liker`)
      .then((res) => setLikerList(res.data))
      .catch((e) => console.log(e));
  }, []);

  if (!likerList) return <LoadingSpinner />;
  return <ProfileLiker likerList={likerList}/>
}
