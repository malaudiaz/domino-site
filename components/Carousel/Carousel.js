import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselItem,
} from "reactstrap";

export default function ImgCarousel({ post }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === post.photos.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? post.photos.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = post.photos.map((photo, idx) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={idx}
      >
        <Image 
          src={photo.path} 
          alt={""} 
          width={"600"} 
          height={"600"} 
          quality={50}
          priority
          layout='intrinsic'
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      id={"carousel-"+post.id}
      className="carousel slide"
      activeIndex={activeIndex}
      interval={null}
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={post.photos}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}
