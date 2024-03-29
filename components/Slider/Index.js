import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from '../../AppContext';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Table
} from 'reactstrap';

export default function SliderResult({id}) {
    const { token, lang } = useAppContext();
    const [raiting, setRaiting] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const rowsPerPage = 20;

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        }
    };
  
    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/scale/player/accumulated/${id}?page=${page}&per_page=${rowsPerPage}`;
  
        try {
            const { data } = await axios.get(url, config);
            if (data.success) {
                setTotal(data.total);
                setTotalPages(data.total_pages);
                setRaiting(data.data);
                const arrTable = [];
                for (let i=0; i<data.total_pages; i++) {
                    arrTable.push({key: i+1, altText: "Slide "+i+1, caption: "Slide "+i+1});
                }
                setItems(arrTable);
            }
        } catch ({ code, message, name, request }) {
            if (code === "ERR_NETWORK") {
                Swal.fire({
                    title: "Posiciones por Jugadores en ronda",
                    text: "Error en su red, consulte a su proveedor de servicio",
                    icon: "error",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                });
            } else {
                if (code === "ERR_BAD_REQUEST") {
                    const { detail } = JSON.parse(request.response);
                    Swal.fire({
                        title: "Posiciones por Jugadores en ronda",
                        text: detail,
                        icon: "error",
                        showCancelButton: false,
                        allowOutsideClick: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Aceptar",
                    });
                }
            }
        }
    };
  
    useEffect(() => {
      if (id) {
        fetchData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, page, activeIndex]); 

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    const nextPage = page === totalPages ? 1 : page + 1;
    setActiveIndex(nextIndex);
    setPage(nextPage);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    const nextPage = page === 1 ? totalPages : page - 1;
    setActiveIndex(nextIndex);
    setPage(nextPage);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.key}
        >       
            <Table
                bordered
                hover
                responsive
                size="sm"
                striped
            >
                <thead>
                    <tr>
                        <th className="text-center" rowSpan={2}>Pos</th>
                        <th className="text-center" rowSpan={2}>Nombre</th>

                        <th className="text-center" rowSpan={2}>Estado</th>

                        <th className="text-center" rowSpan={2}>
                            JJ
                        </th>
                        <th className="text-center" rowSpan={2}>
                            JG
                        </th>
                        <th className="text-center" rowSpan={2}>
                            JP
                        </th>
                        <th className="text-center" rowSpan={2}>
                            P+
                        </th>
                        <th className="text-center" rowSpan={2}>
                            P-
                        </th>
                        <th className="text-center" rowSpan={2}>
                            DIF
                        </th>

                        <th className="text-center" colSpan={2}>Puntuación</th>

                        <th className="text-center" colSpan={3}>ELO</th>

                        <th className="text-center" colSpan={4}>FC</th>

                        <th className="text-center" rowSpan={2}>
                            BON
                        </th>

                        <th className="text-center" colSpan={3}>Ptos x Penaliz.</th>


                    </tr>
                    <tr className="text-center">
                        <th>
                            Esperada
                        </th>
                        <th>
                            Obtenida
                        </th>
                        <th>
                            Inicio
                        </th>
                        <th>
                            Var.
                        </th>
                        <th>
                            Final
                        </th>
                        <th>
                            K1
                        </th>
                        <th>
                            K2
                        </th>
                        <th>
                            K3
                        </th>
                        <th>
                            K
                        </th>
                        <th>
                            Total
                        </th>
                        <th>
                            Rojas
                        </th>
                        <th>
                            Amar.
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {raiting.map((item, idx) => (
                        <tr key={idx} style={{verticalAlign: "middle"}}>
                            <th scope="row" className="text-center">
                                {item.position_number}
                            </th>
                            <td>
                                {item.name}
                            </td>

                            <td>
                                {item.status_description}
                            </td>

                            <td className="text-center">
                                {item.games_played}
                            </td>
                            <td className="text-center">
                                {item.games_won}
                            </td>
                            <td className="text-center">
                                {item.games_lost}
                            </td>
                            <td className="text-center">
                                {item.points_positive}
                            </td>
                            <td className="text-center">
                                {item.points_negative}
                            </td>
                            <td className="text-center">
                                {item.points_difference}
                            </td>

                            <td className="text-center">
                                {item.score_expected}
                            </td>
                            <td className="text-center">
                                {item.score_obtained}
                            </td>

                            <td className="text-center">
                                {item.elo}
                            </td>
                            <td className="text-center">
                                {item.elo_variable}
                            </td>
                            <td className="text-center">
                                {item.elo_at_end}
                            </td>

                            <td className="text-center">
                                {"K1"}
                            </td>
                            <td className="text-center">
                                {"K2"}
                            </td>
                            <td className="text-center">
                                {"K3"}
                            </td>
                            <td className="text-center">
                                {"K"}
                            </td>

                            <td className="text-center">
                                {item.bonus_points}
                            </td>

                            <td className="text-center">
                                {item.penalty_total}
                            </td>
                            <td className="text-center">
                                {item.penalty_red}
                            </td>
                            <td className="text-center">
                                {item.penalty_yellow}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>

            {/* <CarouselCaption
                captionText={item.caption}
                captionHeader={item.caption}
            />             */}

        </CarouselItem>
    );
  });  

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      interval={5000}
      previous={previous}
      dark={true}
    >
      {/* <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      /> */}

        {slides}

      {/* <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      /> */}
    </Carousel>
  );
};