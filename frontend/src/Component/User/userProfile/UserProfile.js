import React from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";
function UserProfile() {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  return (
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span class="font-weight-bold">{user.name}</span>
            <span class="text-black-50">{user.email}</span>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="first name"
                  defaultValue={user.name}
                />
              </div>
              <div class="col-md-6">
                <label class="labels">Email</label>
                <input
                  type="email"
                  class="form-control"
                  defaultValue={user.email}
                  placeholder="surname"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Mobile Number</label>
                <input
                  type="text"
                  class="form-control"
                  defaultValue={user.phone}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Old password</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter old password"
                  value=""
                />
              </div>
              <div class="col-md-12">
                <label class="labels">New Password</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter new password"
                  value=""
                />
              </div>
            </div>

            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button" type="button">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
