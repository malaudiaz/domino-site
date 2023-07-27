import { useState, useEffect } from "react";
import {useAppContext} from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function TBar({ post, setRefresh }) {
  const {profile, lang, token} = useAppContext();

  const [like, setLike] = useState(post.like);
  const [amountLike, setAmountLike] = useState(post.amountLike);

  useEffect(()=>{
    setLike(post.like);
    setAmountLike(post.amountLike);
  },[post]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };  

  const toggle = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}postlike?profile_id=${profile.id}`;

    try {
      const {data} = await axios.post(url, {post_id: post.id}, config);
      if (data.success) {
        setAmountLike(!like ? amountLike + 1 : amountLike - 1);
        setLike(!like);    
        setRefresh(true);
      }
    } catch (errors) {
      const { detail } = errors.response;
      Swal.fire({
        title: "Me gusta la Publicación",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const commentFocus = () => {
    document.getElementById(`comment_${post.id}`).focus();
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-row icons d-flex align-items-center">
          <div className="btn-like" onClick={() => toggle()}>
            <svg
              aria-label="Me gusta"
              width="20"
              height="20"
              fill={like ? "red" : "rgb(38, 38, 38)"}
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                d={
                  like
                    ? "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    : "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                }
              />
            </svg>
          </div>

          {post.allowComment && (
            <div className="btn-comment ms-3" onClick={()=>commentFocus()}>
              <svg
                aria-label="Comentar"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-chat-right"
                viewBox="0 0 16 16"
              >
                <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
              </svg>
            </div>
          )}
        </div>
        <div className="d-flex flex-row fw-bold muted-color align-items-center">
          {post.allowComment && (
            <span className="fs-12">{post.amountComment} comentarios</span>
          )}
        </div>
      </div>

      {post.showCountLike && (
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row icons d-flex align-items-center">
            <span className="fw-bold fs-12">{amountLike} Me gusta</span>
          </div>
        </div>
      )}
    </>
  );
}
