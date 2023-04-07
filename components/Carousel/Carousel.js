import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselItem,
  Label
} from "reactstrap";

export default function ImgCarousel({
  id,
  photos,
  url,
  owner,
  videoHeight,
  showTrash = false,
  deleteFiles
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [play, setPlay] = useState(true);
  const [muted, setMuted] = useState(true);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === photos.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? photos.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const videoPlay = (index) => {
    var btnPlay = document.getElementById(owner + "_" + index);
    btnPlay.play();
    setPlay(true);
  };

  const videoPause = (index) => {
    var btnPlay = document.getElementById(owner + "_" + index);
    btnPlay.pause();
    setPlay(false);
  };

  const videoSound = (index) => {
    var btnPlay = document.getElementById(owner + "_" + index);
    btnPlay.muted = !btnPlay.muted;
    setMuted(btnPlay.muted);
    // alert(btnPlay.duration/60);
  };

  const remove = (index) => {
    photos.splice(index, 1);
    const nextIndex = activeIndex === 0 ? photos.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
    deleteFiles(index);
  }


  const slides = photos.map((photo, idx) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={idx}
        activeIndex={activeIndex}
        style={{position: "relative"}}
      >
        {photo.type.includes("image") ? (
            <Image
              src={photo[url]}
              alt={""}
              height={"750"}
              width={"750"}
              quality={75}
              priority
              layout="intrinsic"
            />
        ) : (
          <div className="video-container">
            <video
              id={owner + "_" + id}
              className="center"
              autoPlay
              muted
              loop
              height={videoHeight}
              width={"100%"}
              onClick={() => videoPause(id)}
              style={{ backgroundColor: "black" }}
            >
              <source src={photo[url]} type="video/mp4" />
            </video>

            <div className="txt-cont">
              {!play && (
                <div className="txt-video">
                  <button id={"btnPlay_" + id} onClick={() => videoPlay(id)}>&#9658;</button>
                </div>
              )}

              <div className="btn-muted">
                <button id={"btnMuted_" + id} onClick={() => videoSound(id)}>
                  <i
                    className={
                      muted
                        ? "bi bi-volume-mute-fill"
                        : "bi bi-volume-down-fill"
                    }
                  ></i>
                </button>
              </div>
            </div>
          </div>
        )}
        {showTrash && 
          <Label
            id={"btnDelete_" + idx}
            href="#"
            className="btn btn-danger btn-circle"
            title="Eliminar"
            onClick={()=>remove(idx)}
            style={{ position: "absolute", color: "white", top: "10px", left:"90%", zIndex: "9999" }}
          >
            <i className="bi bi-trash"></i>
          </Label>
        }
      </CarouselItem>
    );
  });

  return (
    <Carousel
      id={`carousel_${id}`}
      className="carousel slide"
      activeIndex={activeIndex}
      interval={null}
      next={next}
      previous={previous}
    >
      {photos.length > 1 && (
        <CarouselIndicators
          items={photos}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
      )}
      {photos.length > 0 && slides}
      {photos.length > 1 && (
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
      )}
      {photos.length > 1 && (
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      )}
    </Carousel>
  );
}
