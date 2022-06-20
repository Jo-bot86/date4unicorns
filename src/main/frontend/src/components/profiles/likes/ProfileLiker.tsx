import axios from "axios";
import React, { useEffect, useState } from "react";
import Profile from "../../../types/Profile";
import LoadingSpinner from "../../LoadingSpinner";
import ProfileList from "../ProfileList";

interface Props{
  likerList: Profile[]
}

export default function ProfileLiker(props: Props) {

  const { likerList } = props;
  
  return <ProfileList profileList={likerList} />;
}
