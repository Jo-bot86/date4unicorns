import React from "react";
import { useDataApi } from "../../hooks/useDataApi";
import Profile from "../../types/Profile";
import LoadingSpinner from "../LoadingSpinner";
import ProfileForm from "./ProfileForm";

export default function ProfileEdit() {
  const [fetchedProfile, setFetchedProfile] = useDataApi<Profile>();


  const convertDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  if (!fetchedProfile) return <LoadingSpinner />;


  console.log(fetchedProfile.gender)
  return (
    <ProfileForm
      nickname={fetchedProfile.nickname}
      birthdate={convertDate(new Date(fetchedProfile.birthdate))}
      hornlength={fetchedProfile.hornlength.toString()}
      gender={fetchedProfile.gender.toString()}
      attractedToGender={fetchedProfile.attractedToGender.toString()}
      description={fetchedProfile.description}
      isEdit={true}
    />
  );
}
