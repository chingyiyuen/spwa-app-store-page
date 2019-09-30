import React, { Suspense, lazy } from 'react';

const StarRating = lazy(() => import('../StarRating/StarRating'));

const AppItem = ({ data, rating, isRoundedImage }) => {
  const { rank, title, imageUrl, category } = data;
  return (
    <div className="appItem">
      <div className="appItem-rank">
        <span>{rank}</span>
      </div>
      <div className="appItem-image-wrapper">
        <img className={`appItem-image${isRoundedImage ? '--rounded' : ''}`} src={imageUrl} alt="" />
      </div>
      <div className="appItem-info">
        <div className="appItem-title">{title}</div>
        <div className="appItem-category">{category}</div>
        <div className="appItem-rating">
          <Suspense>
            <StarRating rating={rating} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AppItem;
