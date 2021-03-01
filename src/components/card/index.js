import React from "react";
import "./styles.scss";

const Card = ({
  name,
  parentWidth,
  currentActiveItem,
  width,
  height,
  isNext,
  handleNext,
  isPrev,
  handlePrev,
  index,
}) => {
  return (
    <div
      className={`item ${isNext ? "is-next" : ""} ${isPrev ? "is-prev" : ""} ${
        index === currentActiveItem ? "active" : ""
      }`}
      style={{
        width,
        height: height + 100,
      }}
    >
      <p className={`card-text ${index === currentActiveItem ? "active" : ""}`}>
        {name}
      </p>
      <div
        className={"card"}
        style={{
          width,
          height,
        }}
      ></div>

      {isNext ? (
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      ) : null}
      {isPrev ? (
        <button className="next-btn" onClick={handlePrev}>
          Prev
        </button>
      ) : null}
    </div>
  );
};

export default Card;
