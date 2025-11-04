import React from "react";
import LazyLoad from "react-lazyload";

const LazyImage = ({ src, alt, className }) => (
  <LazyLoad>
    <img src={src} alt={alt} className={className} />
  </LazyLoad>
);

export default LazyImage;
