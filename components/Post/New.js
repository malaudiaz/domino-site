import Image from "next/image";
import { useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Row,
  Col,
  Button,
  Label,
  InputGroup,
} from "reactstrap";

export default function NewPost({ session, newPost, setNewPost, avatar }) {
  const [reload, setReload] = useState(false);
  const [start, setStart] = useState(0);
  const [post, setPost] = useState({
    comment: "",
    image: [],
    objUrl: [],
  });

  const prev = () => {
    if (start > 0) {
      setStart(start - 1);
    }
  }

  const next = () => {
    if (start + 3 < post.objUrl.length) {
      setStart(start + 1);
    }
  }

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
          setNewPost(false);
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
              <span className="fw-bold">{session.firstName}</span>
            </div>
          </div>
        </Row>
        <Row className="pt-3">
          <InputGroup size="sm">
            <Input
              type="textarea"
              name="comment"
              id="comment"
              rows="3"
              placeholder={"¿ Que estas pensando, " + session.firstName + " ?"}
              style={{ border: 0, resize: "none" }}
            />
          </InputGroup>
        </Row>

        {post.objUrl.length > 0 && (
          <Row className="pt-2 ps-2 pe-2">
            
            <div className="d-flex flex-row w-100 d-inline-block border border-ligth rounded p-2">
                <Col
                  md={1}
                  className="d-flex justify-content-left align-items-center"
                >

                  <Label
                    className="btn btn-circle" 
                    title="Anterior"
                    style={start+3 > 3 ? {cursor: "pointer", background: "#198754"} : {background: "#c7c7c7"}}
                    onClick={prev} 
                  >
                    <i className="bi bi-caret-left-fill" style={{ color: "white", fontSize: "12px", fontWeight: "bold" }} />
                  </Label>

                </Col>
                <Col className="d-flex flex-grow-1 justify-content-center align-items-center">
                  {post.objUrl.slice(start, start+3).map((obj, idx) => (
                    <div key={idx} className="image-container">
                      <Image
                        className="rounded"
                        src={obj}
                        alt=""
                        width="150"
                        height="150"
                        quality={50}
                        priority
                        layout='intrinsic'
                        sizes="(max-width:3000px) 10vw"
                      />
                      <Label
                        href="#"
                        className="btn btn-danger btn-circle"
                        title="Eliminar"
                        style={{ color: "white" }}
                      >
                        <i className="bi bi-trash"></i>
                      </Label>
                    </div>
                  ))}
                </Col>
                <Col
                  md={1}
                  className="d-flex justify-content-right align-items-center"
                >

                  <Label
                    className="btn btn-circle" 
                    title="Siguiente"
                    style={start+3 < post.objUrl.length ? {cursor: "pointer", background: "#198754"} : {background: "#c7c7c7"}}
                    onClick={next} 
                  >
                      <i className="bi bi-caret-right-fill" style={{ color: "white", fontSize: "12px", fontWeight: "bold" }} />
                  </Label>


                </Col>
            </div>
          </Row>
        )}

        <Row className="h-25 p-2">
          <div className="d-flex justify-content-between border border-ligth rounded p-2 px-3">
            <div className="d-flex flex-row align-items-center">
              <a>Añadir a tu Publicación</a>
            </div>
            <div className="d-flex flex-row mt-1 ellipsis align-items-center">
              <Label
                className="btn btn-primary btn-circle"
                title="Añadir foto/video a la publicación"
                style={{ color: "white" }}
              >
                <i className="bi bi-images"></i>
                <Input
                  type="file"
                  hidden
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      const i = event.target.files[0];
                      if (i.type.includes("image")) {
                        post.image.push(i);
                        post.objUrl.push(URL.createObjectURL(i));
                        setNewPost(post);
                        setReload(!reload);
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Cargando Imagen",
                          text: "Ha ocurrido un error al cargar la imagen, debe ser un jpg menor de 6 kb",
                          showConfirmButton: true,
                        });
                      }
                    }
                  }}
                />
              </Label>
            </div>
          </div>
        </Row>
        <Row className="p-2">
          <Button type="submit" color="primary">
            <i className="bi bi-check2-circle"></i> Publicar
          </Button>
        </Row>
      </ModalBody>
    </Modal>
  );
}
