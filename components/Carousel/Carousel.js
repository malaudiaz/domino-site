import Image from "next/image";

export default function Carousel({ post }) {
  return (
    <div
      id={"carousel-"+post.id}
      className="carousel slide"
      data-bs-touch="false"
      data-bs-interval="false"
    >
      <div className="carousel-indicators">
        {post.photos.map((photo, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target={"#carousel-"+post.id}
            data-bs-slide-to={idx}
            className={idx == 0 ? "active" : ""}
            aria-current="true"
            aria-label={"Slide " + (idx + 1)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {post.photos.map((photo, idx) => (
          <div
            key={idx}
            className={idx == 0 ? "carousel-item active" : "carousel-item"}
          >
            <Image
              alt=""
              src={photo.path}
              width={1000}
              height={1000}
              className="d-block w-100 h-100"
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={"#carousel-"+post.id}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={"#carousel-"+post.id}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
