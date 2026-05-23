import React, { useState, useEffect } from "react";
import { FaStar,FaStarHalfAlt  } from "react-icons/fa"; // Using react-icons for web icons
import { AiOutlineStar } from "react-icons/ai"; // Using react-icons for web icons

const StarRating = ({ rating, size }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  useEffect(() => {
    setSelectedRating(rating);
  }, [rating]);

  const handleRate = (newRating) => {
    setSelectedRating(newRating);
    // onRate(newRating); 
  };

  const renderStar = (starNumber) => {
    const starIcon = starNumber <= selectedRating ? <FaStar size={size} color="#FAB73B"/> : (starNumber-selectedRating)<1 ? <FaStarHalfAlt size={size} color="#FAB73B"/> : <AiOutlineStar size={size} color="#FAB73B" />;

    return (
      <button
        key={starNumber}
        style={{ margin: "6px 2px", backgroundColor: "transparent", border: "none" }}
        onClick={() => handleRate(starNumber)}
      >
        {starIcon}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((starNumber) => renderStar(starNumber))}
    </div>
  );
};

export default StarRating;
