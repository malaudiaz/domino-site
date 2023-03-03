import Image from "next/image";

export default function Comments({ post }) {
  return (
    <div className="comments">
  
      {post.comments.map((comment, idx) => (
        <div key={idx} className="d-flex flex-row mt-2 mb-2">
          <div className="d-flex flex-column">
            <Image
              alt=""
              src={comment.avatar}
              width={40}
              height={40}
              className="rounded-image"
            />
          </div>
          <div className="d-flex flex-column ms-2">
            <span className="name">{comment.name}</span>{" "}
            <small className="comment-text">{comment.comment}</small>
            <div className="d-flex flex-row align-items-center status">
              <small className="post-option">Me gusta</small>
              <small className="post-option">Responder</small>
              <small className="post-option">{comment.elapsed}</small>
            </div>
          </div>
        </div>
      ))}

      {post.amountComment !== 0 &&
        <div className="d-flex flex-row mt-2 ps-2">
            <small style={{ fontWeight: "bold", cursor: "pointer" }}>
            Ver más comentarios
            </small>
        </div>
      }
      <div className="comment-input mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Agregar comentario..."
          style={{ fontSize: "0.8rem" }}
        />
        <div className="fonts">
          <i className="bi bi-emoji-smile"></i>
        </div>
      </div>
    </div>
  );
}
