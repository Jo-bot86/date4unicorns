import React, { useState } from "react";
import Profile from "../../types/Profile";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

export default function Search() {
  const [profileList, setProfileList] = useState<Profile[]>([])
  return (
    <>
      <SearchForm setSearchResults={setProfileList} />
      <SearchResults searchResults={ profileList} />
    </>
  );
}
