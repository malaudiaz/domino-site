import { Button } from "reactstrap";
import Image from "next/image";

export default function EventImage({
  event,
  image,
  handleAddPhoto,
  clearImage,
}) {
  return (
    <div className="img-event-container">
      <div className="img-container">
        {image ? (
          <Image
            alt="Events Image"
            src={image}
            width={500}
            height={450}
            quality={50}
            priority
            layout="intrinsic"
          />
        ) : (
          <div style={{height: "50vh",}}></div>
        )}

        {event.image != "" && (
          <div className="img-clear">
            <Button
              className="btn btn-danger btn-circle bi bi-trash"
              onClick={(e) => {
                clearImage(e);
              }}
              style={{
                border: "none",
                color: "white",
                fontSize: "14px",
                fontWeight: "700",
              }}
              title="Aceptar"
            />
          </div>
        )}

        {event.image == "" && (
          <>
            <div className="img-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                fill="#e2e5ec"
                className="bi bi-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
              </svg>
              <h6 className="pt-4" style={{ fontWeight: 600 }}>
                Imagen del Evento
              </h6>
            </div>
            <div className="img-button">
              <div className="file-input-wrapper" style={{ height: "60px" }}>
                <button className="success" title="Añadir foto al Evento">
                  Añadir foto al Evento
                </button>
                <input
                  type="file"
                  name="image"
                  id="image"
                  value=""
                  onChange={(e) => handleAddPhoto(e)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
