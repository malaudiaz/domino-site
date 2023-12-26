
export default function Empty({message, path1, path2}) {
  return (
      <div className="container">
        <div className="d-flex flex-column justify-conten-between" >
          <div className="text-center align-middle">
            {(path1 !== "" & path2 !== "") ? (
              <svg
                width="56"
                height="56"
                fill="#0d6efd"
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
                viewBox="0 0 16 16"
              >
                <path d={path1} />
              </svg>
            )}
          </div>
          <div className="text-center align-middle pt-4 fs-5">{message}</div>
        </div>
      </div>   
  );
}
