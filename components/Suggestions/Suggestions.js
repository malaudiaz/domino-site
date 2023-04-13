import Image from "next/image";

export default function Suggestions({ props }) {
  const players = [
    {
      name: "Daniel Frozer",
      followyou: false,
      avatar: "/profile/user-vector.jpg",
    },
    {
      name: "Elizabeth goodmen",
      followyou: true,
      avatar: "/profile/user-vector.jpg",
    },
    {
      name: "Jeanette Sun",
      followyou: false,
      avatar: "/profile/user-vector.jpg",
    },
  ];

  return (
    <div className="card">
      <div className="card-body pb-0">
        <h5 className="card-title">Sugerencias para tí</h5>

        {players.map( (player, idx) => (
          <div key={idx} className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row icons align-items-center">
              <Image
                alt=""
                src={player.avatar}
                width={40}
                height={40}
                className="rounded-image"
              />
              <div className="d-flex flex-column ms-2">
                <span className="suggestions-players">{player.name}</span>
                <small className="comment-text muted-color fs-12">
                    {player.followyou ? "Te sigue" : "Sugerencia para tí"}
                </small>
              </div>
            </div>
            <div className="d-flex flex-row muted-color">
              <a className="fallow-option">Seguir</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
