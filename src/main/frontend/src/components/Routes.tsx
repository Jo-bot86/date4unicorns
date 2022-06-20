import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./login/Login";
import ProfileCreate from "./profiles/ProfileCreate";
import ProfileEdit from "./profiles/ProfileEdit";
import Registration from "./registration/Registration";
import Search from "./search/Search";
import { useAuthStoreContext } from "./Store";
import ProfileViewMember from "./profiles/ProfileViewMember";
import ProfileViewOwner from "./profiles/ProfileViewOwner";
import ProfileOwnerLiker from "./profiles/likes/ProfileOwnerLiker";
import ProfileMemberLiker from "./profiles/likes/ProfileMemberLiker";

export default function Routes() {
  const { authStore, dispatch } = useAuthStoreContext();
  if (sessionStorage.getItem("loggedIn") && !authStore.isLoggedIn) dispatch({ type: "LOGGED_IN" });
  return (
    <Switch>
      {authStore.isLoggedIn && (
        <>
          <Route path="/profile/new" element={<ProfileCreate />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />

          <Route path="/profile/liker/:nickname" element={<ProfileMemberLiker />} />
          <Route path="/profile/liker" element={<ProfileOwnerLiker />} />
          <Route path="/profile/:nickname" element={<ProfileViewMember />} />
          <Route path="/profile" element={<ProfileViewOwner />} />
          <Route path="/search" element={<Search />} />
        </>
      )}

      <Route path="/signup" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logut" element={<Home />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
}
