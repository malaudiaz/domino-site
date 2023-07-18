import Image from "next/image";
import ImgCarousel from "../Carousel/Carousel";
import Comments from "../Comments/Comments";
import TBar from "../Comments/TBar";
import { useState } from "react";
import {useAppContext} from "../../AppContext";
import NewPost from "./New";
import DropDownMenu from "../DropDownMenu/Menu";

export default function Post({ posts, setRefresh }) {
  const {profile} = useAppContext();

  const [newPost, setNewPost] = useState(false);
  const avatar = profile.photo;

  const ctxMenu = (user_id) => {
    if (user_id === profile.id) {
      return [
        { text: "Editar", key: "mnuEdit", icon: "bi bi-pencil-square" },
        { text: "Eliminar", key: "mnuDel", icon: "bi bi-trash" },
        {
          text: "Desactivar Comentarios",
          key: "mnuDisabledComment",
          icon: "bi bi-chat",
        },
        {
          text: "Ocultar recuento Me Gusta",
          key: "mnuHideLike",
          icon: "bi bi-eye-slash",
        },
      ];
    } else {
      return [
        { text: "Reportar", key: "mnuReport", icon: "" },
        { text: "Deja de Seguir", key: "mnuFollow", icon: "" },
        {
          text: "Información sobre esta Cuenta",
          key: "mnuInfoAccount",
          icon: "",
        },
      ];
    }
  };

  const onMenuSelection = (key, index) => {
    switch (key) {
      case "mnuEdit":
        break;
      case "mnuDel":
        break;
      case "mnuFollow":
        break;
    }
  };

  return (
    <div className="col-8">
      <div className="card">
        <div className="d-flex flex-row align-items-center p-3">
          <Image
            alt=""
            src={avatar}
            width={40}
            height={40}
            className="rounded-image"
          />
          <div className="flex-grow-1 ps-2">
            <div className="comment-input">
              <input
                type="text"
                className="form-control"
                onClick={(e) => {
                  e.preventDefault;
                  setNewPost(true);
                }}
                readOnly={true}
                placeholder={
                  "¿ Que estas pensando, " + profile.name + " ?"
                }
                style={{ fontSize: "0.8rem", background: "#e9ecef" }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center pb-3">
          <div className="mx-auto">
            <button
              onClick={(e) => {
                e.preventDefault;
                setNewPost(true);
              }}
              type="button"
              className="btn btn-primary btn-sm"
            >
              <i className="bi bi-images pe-2" />
              Fotos / Videos
            </button>
          </div>
        </div>
      </div>

      {posts.map((post, idx) => (
        <div key={idx} className="card">
          <div className="d-flex justify-content-between p-2 px-3">
            <div className="d-flex flex-row align-items-center">
              <Image
                alt=""
                src={post.avatar}
                quality={50}
                priority
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
              <DropDownMenu
                idx={idx}
                items={ctxMenu(post.user_id)}
                onMenuSelection={() => onMenuSelection(ctxMenu.key, idx)}
              />
            </div>
          </div>

          <ImgCarousel
            id={idx}
            photos={post.photos}
            url={"path"}
            owner={"post"}
            videoHeight={"600"}
          />

          <div className="p-2">
            <p className="text-justify">{post.comment}</p>

            {post.showCountLike && <TBar post={post} />}

            {post.allowComment && <Comments post={post} />}
          </div>
        </div>
      ))}

      <NewPost
        newPost={newPost}
        setNewPost={setNewPost}
        setRefresh={setRefresh}
      />
    </div>
  );
}
