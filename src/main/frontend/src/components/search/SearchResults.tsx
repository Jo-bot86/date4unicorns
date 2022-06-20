import React from "react";
import Profile from "../../types/Profile";
import LoadingSpinner from "../LoadingSpinner";
import ProfileList from "../profiles/ProfileList";
import ProfilePreview from "../profiles/ProfilePreview";

interface Props {
  searchResults: Profile[];
}
export default function SearchResults(props: Props) {
  const { searchResults } = props;

  if (!searchResults) return <LoadingSpinner />;

  return (
    <ProfileList profileList={searchResults} />
  );
}
