import React from "react";
// import "./styles.css";

export default function ImageSlider({ product }) {
  const data = [];

  if (product?.images && product.images[0].src) {
    data.push({ image: product.images[0].src });
  }

  if (product?.images && product.images[1].src) {
    data.push({ image: product.images[1].src /*, text: "img2" */ });
  }

  if (product?.images && product.images[2].src) {
    data.push({ image: product.images[2].src /*, text: "img3" */ });
  }

  if (product?.images && product.images[3].src) {
    data.push({ image: product.images[3].src /*, text: "img4" */ });
  }
  return (
    <div>
      {/* <SliderImage
        data={data}
        // width={`${window.innerWidth>1400? "500px":"400px"}`}
        showDescription={true}
        direction="right"
      /> */}
    </div>
  );
}
