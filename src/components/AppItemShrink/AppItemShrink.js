import React from "react";

const AppItemShrink = ({ data }) => {
  const { title, imageUrl, category } = data;
  return (
    <div className="appItemShrink">
      <img className="appItemShrink-image" src={imageUrl} alt="" />
      <div className="appItemShrink-title">{title}</div>
      <div className="appItemShrink-category">{category}</div>
    </div>
  );
};

export default AppItemShrink;
