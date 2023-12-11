
export default function Empty({message, path1, path2}) {
  return (
    <div className="wrapper">
      <div style={{ textAlign: "center" }}>
        {path1 & path2 ? (
          <svg
            width="56"
            height="56"
            fill="#0d6efd"
            className="bi bi-calendar3"
            viewBox="0 0 16 16"
          >
            <path d={path1} />
            <path d={path2} />
          </svg>
        ) : (
          <svg
            width="56"
            height="56"
            fill="#0d6efd"
            className="bi bi-calendar3"
            viewBox="0 0 16 16"
          >
            <path d={path1} />
          </svg>
        )}
        <div className="pt-4 fs-5">{message}</div>
      </div>
    </div>
  );
}
