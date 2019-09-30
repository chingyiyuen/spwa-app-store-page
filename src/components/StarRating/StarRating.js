import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MESSAGES } from "../../constants";

const getStars = ({ rating }) => {
  let fullStarCount = (rating * 10) % 2 === 0 ? rating : rating - 0.5;
  let halfStarCount = (rating - fullStarCount) / 0.5;
  let hollowStarCount = 5 - fullStarCount - halfStarCount;
  let stars = [];
  for (let i = 0; i < 5; i++) {
    let iconClass = ["fas", "star"];
    if (fullStarCount) {
      fullStarCount--;
    } else if (halfStarCount) {
      iconClass = ["fas", "star-half-alt"];
      halfStarCount--;
    } else if (hollowStarCount) {
      iconClass = ["far", "star"];
      hollowStarCount--;
    }
    stars.push(
      <FontAwesomeIcon key={i} className="starRating-star" icon={iconClass} />
    );
  }
  return stars;
};

const StarRating = ({ rating }) => {
  return (
    <div className="starRating">
      {rating !== undefined ? (
        rating !== -1 ? (
          getStars({ rating })
        ) : (
          <div className="starRating-message-noData">{MESSAGES.NO_RATING}</div>
        )
      ) : (
        <div className="starRating-message-noData">{MESSAGES.LOADING_RATING}</div>
      )}
    </div>
  );
};

export default StarRating;
