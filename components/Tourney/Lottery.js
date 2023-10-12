import { useAppContext } from "../../AppContext";

export default function Lottery({tourneyId, menu, lottery}) {
    const { profile, token, lang } = useAppContext();

    return (
        <div>
          <div className="ps-4">
            <h1 className="title">Sorteo {lottery}</h1>
          </div>
        </div>
    )
};
