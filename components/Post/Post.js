import Image from "next/image";
import Carousel from "../Carousel/Carousel";
import Comments from "../Comments/Comments";
import TBar from "../Comments/TBar";

export default function Post({ posts }) {
  return (
    <div className="col-8">
      {posts.map((post, idx) => (
        <div key={idx} className="card">
          <div className="d-flex justify-content-between p-2 px-3">
            <div className="d-flex flex-row align-items-center">
              <Image
                alt=""
                src={post.avatar}
                width={40}
                height={40}
                className="rounded-image"
              />
              <div className="d-flex flex-column ms-2">
                <span className="fw-bold">{post.name}</span>
              </div>
            </div>
            <div className="d-flex flex-row mt-1 ellipsis align-items-center">
              <small className="me-2">{post.elapsed}</small>
              <i className="bi bi-three-dots"></i>
            </div>
          </div>

          <Carousel post={post} />

          <div className="p-2">
            <p className="text-justify">{post.comment}</p>

            <TBar post={post} />

            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row icons d-flex align-items-center">
                <span className="fw-bold fs-12">
                  {post.amountLike} Me gusta
                </span>
              </div>
            </div>

            <Comments post={post} />
          </div>
        </div>
      ))}
    </div>
  );
}
