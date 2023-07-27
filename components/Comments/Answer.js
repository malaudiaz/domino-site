import Image from "next/image";
import { useState } from "react";
import {useAppContext} from "../../AppContext";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import axios from "axios";
import Swal from "sweetalert2";

import {
  Modal,
  ModalHeader,
  ModalBody,
  PopoverBody,
  UncontrolledPopover,
} from "reactstrap";

export default function Answer({ isOpen, setIsOpen, comment, setRefresh }) {
  
  const {profile, lang, token} = useAppContext();
  const avatar = profile.photo;
  const [answer, setAnswer] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };  

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    document.getElementById("btnPush").style.display =
      value != "" ? "inline" : "none";
    document.getElementById("btnEmoji").style.display =
      value != "" ? "inline" : "none";

    setAnswer(value);
  };

  const emotiClick = ({ id, value }) => {
    setAnswer(answer + value);
  };

  const pushAnswer = async () => {
    if (answer !== "") {

        const url = `${process.env.NEXT_PUBLIC_API_URL}commentcomment?profile_id=${profile.id}`;
        try {
          const {data} = await axios.post(url, {comment_id: comment.id, summary: answer}, config);
          if (data.success) {
            setAnswer("");
            document.getElementById("btnPush").style.display = "none";
            document.getElementById("btnEmoji").style.display = "none";   
            setAnswer("");
            setIsOpen(false);
            setRefresh(true);
          }
        } catch ({response}) {
          const { detail } = response.data;
          Swal.fire({
            title: "Responder Comentario",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }  
    }
  };


  const handleKeyDown = (event) => {
    if (event.code === "Enter") {
        pushAnswer();
    }
  };

  return (
    comment && (
      <Modal
        id={"answer"}
        isOpen={isOpen}
        backdrop={"static"}
        keyboard={true}
        centered={true}
      >
        <ModalHeader
          toggle={(e) => {
            setAnswer("");
            setIsOpen(false);
          }}
        >
          Responder
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-row mt-2 mb-2">
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
            </div>
          </div>
          <div
            className="d-flex flex-row mt-2 mb-2"
            style={{ marginLeft: "50px" }}
          >
            <div className="d-flex flex-column">
              <Image
                alt=""
                src={avatar}
                width={40}
                height={40}
                className="rounded-image"
              />
            </div>
            <div className="flex-grow-1 ms-2 me-2">
              <div className="comment-input mt-1">
                <input
                  id="answer"
                  type="text"
                  className="form-control"
                  autoComplete={"off"}
                  value={answer}
                  onChange={(e) => handleChange(e)}
                  placeholder="Responder comentario..."
                  onKeyDown={(e) => handleKeyDown(e)}
                  style={{ fontSize: "0.8rem" }}
                />

                <div className="fonts">
                  <button
                    id="btnPush"
                    className="comment-btn bi bi-check2-circle"
                    title="Publicar"
                    onClick={pushAnswer}
                    style={{
                      color: "blue",
                    }}
                  ></button>

                  <button
                    id="btnEmoji"
                    className="comment-btn bi bi-emoji-neutral"
                    title="Sentimiento / Actividad"
                    style={{
                      color: "#F5C33B",
                    }}
                  ></button>

                  <UncontrolledPopover placement="bottom" target="btnEmoji">
                    <PopoverBody style={{ background: "#e9ecef" }}>
                      <EmojiPicker onSelect={emotiClick} />
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    )
  );
}
