import React from "react";
import { useDataApi } from "../../hooks/useDataApi";
import Profile from "../../types/Profile";
import LoadingSpinner from "../LoadingSpinner";
import ProfileView from "./ProfileView";

export default function ProfileViewOwner() {
  const [fetchedProfile, setFetchedProfile] = useDataApi<Profile>();

  if (!fetchedProfile) return <LoadingSpinner />;

  return <ProfileView profile={fetchedProfile} isOwner={true} />;
}
