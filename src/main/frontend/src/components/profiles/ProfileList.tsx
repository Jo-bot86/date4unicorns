import React from "react";
import Profile from "../../types/Profile";
import ProfilePreview from "./ProfilePreview";

interface Props {
  profileList: Profile[];
}

export default function ProfileList(props: Props) {
  const { profileList } = props;
  return (
    <div className="container mt-3 mb-2">
      <div className="row">
        <p>{profileList.length} results</p>
        {profileList.map((profile, index) => (
          <ProfilePreview key={index} profile={profile} />
        ))}
      </div>
    </div>
  );
}
