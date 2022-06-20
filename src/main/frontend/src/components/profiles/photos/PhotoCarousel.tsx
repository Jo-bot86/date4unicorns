import axios from "axios";
import React, { useEffect, useState } from "react";
import { Photo } from "../../../types/Photo";
import Profile from "../../../types/Profile";
import LoadingSpinner from "../../LoadingSpinner";

interface Props {
  profile: Profile;
}
export default function PhotoCarousel(props: Props) {
  const [photos, setPhotos] = useState<Photo[]>();
  const { profile } = props;

  useEffect(() => {
    axios
      .get(`/api/v1/profile/${profile.nickname}/photos`)
      .then((res) => setPhotos(res.data))
      .catch((err) => console.log(err));
  }, [profile.nickname]);

  if (!photos) return <LoadingSpinner />;


  return (
    <div id="photoCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div
              key={index}
              className={index === 0 ? "carousel-item active" : "carousel-item"}
            >
              <img
                src={`/images/${photo.name}.jpg`}
                className="d-block w-100 rounded mx-start d-block"
                alt={photo.name}
                style={{ width: "100%" }}
              />
            </div>
          ))
        ) : (
          <div
            
            className= "carousel-item active" 
          >
            <img
              src={`/images/placeholder.png`}
              className="d-block w-100 rounded mx-start d-block"
              alt="photo placeholder"
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#photoCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#photoCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}