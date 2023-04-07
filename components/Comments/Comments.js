import Image from "next/image";
import { useState, useContext } from "react";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import { PopoverBody, UncontrolledPopover } from "reactstrap";
import AppContext from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function Comments({ session, post }) {
  const value = useContext(AppContext);
  const avatar = value.state.avatar;

  const [comment, setComment] = useState("");

  const emotiClick = ({ id, value }) => {
    setComment(comment + value);
  };

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    document.getElementById(`btnPush_${post.id}`).style.display =
      value != "" ? "inline" : "none";
    document.getElementById(`btnEmoji_${post.id}`).style.display =
      value != "" ? "inline" : "none";

    setComment(value);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": "es-ES,es;",
      "Authorization": `Bearer ${session.token}`,
    },
  };  

  const pushComment = async () => {
    if (comment !== "") {
      let comments = post.comments;
    
      // Salvar el comentario y la api me devuelve los tres ultimos commentarios

      const url = `/api/post/comment`;
      try {
        const {data} = await axios.post(url, {post_id: post.id, summary: comment}, config);
        if (data.success) {

          console.log(data);

          comments.push({
            id: 0,
            user_id: session.id,
            name: session.firstName,
            avatar: avatar,
            comment: comment,
            elapsed: "1s",
          });
    
          setComment("");
        }
      } catch (errors) {
        console.log(errors);

        // const { detail } = response.data;
        // Swal.fire({
        //   title: "Me gusta la Publicación",
        //   text: detail,
        //   icon: "error",
        //   showCancelButton: false,
        //   allowOutsideClick: false,
        //   confirmButtonColor: "#3085d6",
        //   confirmButtonText: "Aceptar",
        // });
      }
  

    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Enter") {
      pushComment();
    }
  };

  return (
    <div className="comments">
      <div id="viewComment">
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
      </div>

      {post.amountComment !== 0 && (
        <div className="d-flex flex-row mt-2 ps-2">
          <small style={{ fontWeight: "bold", cursor: "pointer" }}>
            Ver más comentarios
          </small>
        </div>
      )}

      <div className="d-flex flex-row mt-2 mb-2">
        <div className="d-flex flex-column">
          <Image
            alt=""
            src={post.avatar}
            width={40}
            height={40}
            className="rounded-image"
          />
        </div>
        <div className="flex-grow-1 ms-2 me-2">
          <div className="comment-input mt-1">
            <input
              id={`comment_${post.id}`}
              type="text"
              className="form-control"
              autoComplete={"off"}
              placeholder="Agregar comentario..."
              value={comment}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              style={{ fontSize: "0.8rem" }}
            />

            <div className="fonts">
              <button
                id={`btnPush_${post.id}`}
                className="comment-btn bi bi-check2-circle"
                title="Publicar"
                onClick={pushComment}
                style={{
                  color: "blue",
                }}
              ></button>

              <button
                id={`btnEmoji_${post.id}`}
                className="comment-btn bi bi-emoji-neutral"
                title="Sentimiento / Actividad"
                style={{
                  color: "#F5C33B",
                }}
              ></button>

              <UncontrolledPopover
                placement="bottom"
                target={`btnEmoji_${post.id}`}
              >
                <PopoverBody style={{ background: "#e9ecef" }}>
                  <EmojiPicker onSelect={emotiClick} />
                </PopoverBody>
              </UncontrolledPopover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
