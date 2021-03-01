import React, { useEffect, useState } from "react";
import { TweenLite } from "gsap/all";

import Card from "../card";
import "./styles.scss";

const data = [
  { name: "first card" },
  { name: "second card" },
  { name: "third card" },
  { name: "fourth card" },
  { name: "fifth card" },
  { name: "sixth card" },
  { name: "seventh card" },
];

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 200;
const VISIBLE_IMAGES = 3;

const Carousel = () => {
  const carouselRef = React.createRef();

  const itemsLength = data.length;
  const parentWidth = IMAGE_WIDTH * (VISIBLE_IMAGES + 1);

  const [currentActiveItem, setCurrentActiveItem] = useState(1);

  useEffect(() => {
    [...carouselRef.current.children].forEach((item, index) => {
      const card = item.querySelector(".card");

      if (currentActiveItem - 2 >= index) {
        TweenLite.to(card, {
          duration: 0.5,
          opacity: 0,
          zIndex: 9,
          rotate: -6,
        });
        TweenLite.to(item, {
          duration: 0.5,
          opacity: 0,
          zIndex: 9,
        });
      } else if (currentActiveItem + 2 <= index) {
        TweenLite.to(card, {
          duration: 0.5,
          opacity: 0,
          x: `${parentWidth / 2 + IMAGE_WIDTH / 2}px`,
          scale: 0.7,
          zIndex: 9,
          rotate: 6,
        });
        TweenLite.to(item, {
          duration: 0.5,
          opacity: 0,
          x: `${parentWidth / 2 + IMAGE_WIDTH / 2}px`,
          zIndex: 9,
        });
      } else {
        if (index === currentActiveItem - 1) {
          TweenLite.to(item, {
            duration: 0.5,
            x: `${IMAGE_WIDTH / 2}px`,
            zIndex: 10,
            opacity: 1,
          });

          TweenLite.to(card, {
            duration: 0.5,
            x: `-${IMAGE_WIDTH * 0.1}px`,
            rotate: -6,
            scale: 0.7,
            opacity: 0.5,
            zIndex: 10,
          });
        }
        if (index === currentActiveItem) {
          TweenLite.to(item, {
            duration: 0.5,
            x: `${parentWidth / 2 - IMAGE_WIDTH / 2}px`,
            zIndex: 10,
            opacity: 1,
          });
          TweenLite.to(card, {
            duration: 0.5,
            x: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 10,
          });
        }
        if (index === currentActiveItem + 1) {
          TweenLite.to(item, {
            duration: 0.5,
            x: `${parentWidth / 2 + IMAGE_WIDTH / 2}px`,
            zIndex: 10,
            opacity: 1,
          });
          TweenLite.to(card, {
            duration: 0.5,
            x: `${IMAGE_WIDTH * 0.1}px`,
            rotate: 6,
            scale: 0.7,
            opacity: 0.5,
            zIndex: 10,
          });
        }
      }
    });
  }, [carouselRef, currentActiveItem, parentWidth]);

  const next = () => {
    if (currentActiveItem < itemsLength - 1) {
      setCurrentActiveItem(currentActiveItem + 1);
    }
  };

  const prev = () => {
    if (currentActiveItem > 0) {
      setCurrentActiveItem(currentActiveItem - 1);
    }
  };

  return (
    <div className="carousel">
      <div
        className="carousel-box"
        ref={carouselRef}
        style={{
          width: parentWidth,
        }}
      >
        {data.map((carousel, index) => (
          <Card
            key={index}
            {...carousel}
            parentWidth={parentWidth}
            currentActiveItem={currentActiveItem}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            isNext={index === currentActiveItem + 1}
            isPrev={index === currentActiveItem - 1}
            handleNext={next}
            handlePrev={prev}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
