import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import Card from "../card";
import "./styles.scss";
import { Cubic } from "gsap/gsap-core";

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

  const parentWidth = IMAGE_WIDTH * (VISIBLE_IMAGES + 1);

  const itemArray = useRef([]);

  function sortArray(array, isNext) {
    if (isNext) {
      const [first, ...rest] = [...array];
      itemArray.current = [...rest, first];
    } else {
      let data = [...array];
      data.unshift(data.splice(array.length - 1, 1)[0]);
      itemArray.current = data;
    }
  }

  function startAnim(array, isNext = true) {
    if (array.length >= 4) {
      array.forEach((item, index) => {
        const card = item.querySelector(".card");
        let xTranslateFrom = IMAGE_WIDTH / 2 + IMAGE_WIDTH * index;
        let xTranslateTo = IMAGE_WIDTH / 2 + IMAGE_WIDTH * (index - 1);

        if (index === 0) {
          if (isNext) {
            gsap.fromTo(
              item,
              0.5,
              { x: xTranslateFrom, y: 0, zIndex: 10, opacity: 0.7 },
              {
                x: xTranslateFrom,
                y: 0,
                opacity: 0,
                zIndex: 9,
                delay: 0.03,
                ease: Cubic.easeInOut,
                onComplete: sortArray(array, isNext),
              }
            );
          } else {
            gsap.fromTo(
              item,
              0.5,
              { x: 150, y: 0 },
              {
                x: 450,
                y: 0,
                ease: Cubic.easeInOut,
                onComplete: sortArray(array, isNext),
              }
            );
            gsap.fromTo(
              card,
              0.5,
              {
                opacity: 0.7,
                scale: 0.7,
                rotate: -6,
              },
              { opacity: 1, scale: 1, rotate: 0, ease: Cubic.easeInOut }
            );
          }
        }
        if (index === 1) {
          if (isNext) {
            gsap.fromTo(
              item,
              0.5,
              { x: xTranslateFrom, y: 0 },
              {
                x: xTranslateTo,
                y: 0,
                ease: Cubic.easeInOut,
              }
            );
            gsap.fromTo(
              card,
              0.5,
              { opacity: 1, scale: 1, rotate: 0 },
              {
                opacity: 0.7,
                scale: 0.7,
                rotate: -6,
                ease: Cubic.easeInOut,
              }
            );
          } else {
            gsap.fromTo(
              item,
              0.5,
              { x: 450, y: 0 },
              {
                x: 750,
                y: 0,
                ease: Cubic.easeInOut,
              }
            );
            gsap.fromTo(
              card,
              0.5,
              { opacity: 1, scale: 1, rotate: 0 },
              {
                opacity: 0.7,
                scale: 0.7,
                rotate: 6,
                ease: Cubic.easeInOut,
              }
            );
          }
        }
        if (index === 2) {
          if (isNext) {
            gsap.fromTo(
              item,
              0.5,
              { x: xTranslateFrom, y: 0 },
              {
                x: xTranslateTo,
                y: 0,
                ease: Cubic.easeInOut,
              }
            );
            gsap.fromTo(
              card,
              0.5,
              { opacity: 0.7, scale: 0.7, rotate: 6 },
              {
                opacity: 1,
                scale: 1,
                rotate: 0,
                ease: Cubic.easeInOut,
              }
            );
          } else {
            gsap.fromTo(
              item,
              0.5,
              { x: 750, y: 0, opacity: 0.7 },
              {
                x: 750,
                y: 0,
                opacity: 0,
                ease: Cubic.easeInOut,
              }
            );
          }
        }
        if (index === 3) {
          if (isNext) {
            gsap.fromTo(
              item,
              0.5,
              { x: xTranslateFrom, y: 0, zIndex: 9, opacity: 0 },
              {
                x: xTranslateTo,
                y: 0,
                zIndex: 10,
                opacity: 1,
                ease: Cubic.easeInOut,
              }
            );
            gsap.fromTo(
              card,
              0.5,
              { opacity: 0.7, scale: 0.7, rotate: 6 },
              {
                opacity: 0.7,
                scale: 0.7,
                rotate: 6,
                ease: Cubic.easeInOut,
              }
            );
          }
        }

        if (index === array.length - 1) {
          if (!isNext) {
            gsap.fromTo(
              item,
              0.5,
              { x: 150, y: 0, zIndex: 9, opacity: 0 },
              {
                x: 150,
                y: 0,
                zIndex: 10,
                opacity: 1,
                ease: Cubic.easeInOut,
              }
            );
            gsap.fromTo(
              card,
              0.5,
              { opacity: 0.7, scale: 0.7, rotate: -6 },
              {
                opacity: 0.7,
                scale: 0.7,
                rotate: -6,
                ease: Cubic.easeInOut,
              }
            );
          }
        }
      });
    }
  }

  useEffect(() => {
    itemArray.current = [...carouselRef.current.children];

    [...carouselRef.current.children].forEach((item, index) => {
      const card = item.querySelector(".card");

      let rotate = 0;
      if (index === 0) {
        rotate = -6;
      }
      if (index === 2) {
        rotate = 6;
      }
      gsap.set(item, {
        x: index < 3 ? index * 300 + 150 : 2 * 300 + 150,
        opacity: index >= 3 ? 0 : 1,
        zIndex: index >= 3 ? 9 : 10,
      });
      gsap.set(card, {
        scale: index === 1 ? 1 : 0.7,
        opacity: index === 1 ? 1 : 0.7,
        rotate,
      });
    });
  }, [carouselRef]);

  const next = () => {
    startAnim([...itemArray.current]);
  };

  const prev = () => {
    startAnim([...itemArray.current], false);
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
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            handleNext={next}
            handlePrev={prev}
          />
        ))}
      </div>

      <div
        className="btn-box"
        style={{
          width: parentWidth,
        }}
      >
        <button className="carousel-btn prev-btn" onClick={prev}>
          Prev
        </button>
        <button className="carousel-btn next-btn" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
