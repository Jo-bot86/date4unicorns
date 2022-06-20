import React from "react";
import ProfileForm from "./ProfileForm";

export default function ProfileCreate() {
  return (
    <ProfileForm
      nickname={""}
      birthdate={""}
      hornlength={""}
      gender={""}
      attractedToGender={""}
      description={""}
      isEdit={false}
    />
  );
}
