import Image from "next/image";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {useAppContext} from "../../AppContext";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Row,
  Button,
  InputGroup,
  PopoverBody,
  UncontrolledPopover,
} from "reactstrap";

import EmojiPicker from "../EmojiPicker/EmojiPicker";
import ImgCarousel from "../Carousel/Carousel";

export default function NewPost({ newPost, setNewPost, setRefresh }) {
  const {profile, lang, token} = useAppContext();
  const avatar = profile.photo;

  const [reload, setReload] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [post, setPost] = useState({
    id: "",
    summary: "",
    files: [],
    media: [],
    objUrl: [],
  });

  const emotiClick = ({ id, value }) => {
    setPost({ ...post, summary: post.summary + value });
  };

  const handleChange = (prop) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setPost({ ...post, [prop]: value });
  };

  const deleteFiles = (index) => {
    post.files.splice(index,1);
    post.media.splice(index,1);
    setPost(post);
    if (post.objUrl.length == 0) {
      setReload(!reload);
    }
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      if ( i.type.includes("image") || i.type.includes("video") ) {

        post.files.push(i.name);
        post.media.push(i);

        post.objUrl.push({
          type: i.type,
          url: URL.createObjectURL(i),
        });

        let tmp = [];
        for (let j=post.objUrl.length-1; j>=0; j--) {
          tmp.push(post.objUrl[j]);
        }

        post.objUrl=tmp;

        setPost(post);
        setReload(!reload);

      } else {
        Swal.fire({
          icon: "error",
          title: "Cargando Imagen",
          text: "Ha ocurrido un error al cargar la imagen",
          showConfirmButton: true,
        });
      }
    }
  };

  const config = {
    headers: {
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setDisabled(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}post?summary=${post.summary}`;

    const body = new FormData();
    for (let i=0; i<post.media.length; i++) {
      body.append("files", post.media[i]);
    }

    try {
      const { data } = await axios.post(url, body, config);

      if (data.success) {

        setPost({
          id: "",
          summary: "",
          files: [],
          media: [],
          objUrl: [],
        });

        setDisabled(false);
        setRefresh(true);
        setNewPost(false);

      }
    } catch (errors) {
      console.log(errors);

      const { detail } = errors.response;
      Swal.fire({
        title: "Creando Publicación",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Modal
      id={"newPost"}
      isOpen={newPost}
      backdrop={"static"}
      keyboard={true}
      centered={true}
    >
      <ModalHeader
        toggle={(e) => {

          if (post.summary != "" || post.objUrl.length > 0) {
            Swal.fire({
              title: "¿ Descartar publicación ?",
              text: "Si continuas, no se guardán los cambios",
              icon: "question",
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Descartar",
            }).then((result) => {
              if (result.isConfirmed) {
                setPost({
                  id: "",
                  summary: "",
                  files: [],
                  media: [],
                  objUrl: [],
                });
                setDisabled(false);
                setNewPost(false);    
              }
            });
          } else {
            setDisabled(false);
            setNewPost(false);    
          }          
        }}
      >
        Crear Publicación
      </ModalHeader>
      <ModalBody>
        <Row>
          <div className="d-flex flex-row align-items-center">
            <Image
              alt=""
              src={avatar}
              width={40}
              height={40}
              className="rounded-image"
            />
            <div className="d-flex flex-column ms-2">
              <span className="fw-bold">{profile.firtsName}</span>
            </div>
          </div>
        </Row>
        <Row className="pt-3">
          <InputGroup size="sm">
            <Input
              type="textarea"
              name="summary"
              id="summary"
              value={post.summary}
              onChange={handleChange("summary")}
              rows="3"
              placeholder={"¿ Que estas pensando, " + profile.firtsName + " ?"}
              style={{ border: 0, resize: "none" }}
            />
          </InputGroup>
        </Row>

        {post.objUrl.length > 0 && (
          <div className="row border border-ligth rounded">
            <ImgCarousel
              photos={post.objUrl}
              url={"url"}
              owner={"new-post"}
              videoHeight={"360"}
              showTrash={true}
              deleteFiles={deleteFiles}
            />
          </div>
        )}

        <Row className="h-25 p-2">
          <div className="d-flex justify-content-between border border-ligth rounded p-2 px-3">
            <div className="d-flex flex-grow-1 align-items-center">
              <a>Añadir a tu Publicación</a>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <div className="file-input-wrapper">
                <button
                  className="btn-file-input btn-circle bi bi-images"
                  title="Añadir foto/video a la publicación"
                />
                <input
                  type="file"
                  name="image"
                  id="image"
                  value=""
                  onChange={(e) => onSelectFile(e)}
                />
              </div>

              <button
                id="UncontrolledPopover"
                className="btn-circle bi bi-emoji-neutral"
                title="Sentimiento / Actividad"
                style={{
                  cursor: "pointer",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#F5C33B",
                }}
              ></button>

              <UncontrolledPopover placement="top" target="UncontrolledPopover">
                <PopoverBody style={{ background: "#e9ecef" }}>
                  <EmojiPicker onSelect={emotiClick} />
                </PopoverBody>
              </UncontrolledPopover>
            </div>
          </div>
        </Row>
        <Row className="p-2">
          <Button onClick={handleSave} color="primary" disabled={disabled}>
            <i className="bi bi-check2-circle"></i> Publicar
          </Button>
        </Row>
      </ModalBody>
    </Modal>
  );
}
