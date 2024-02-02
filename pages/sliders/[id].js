import { useRouter } from "next/router";
import { CardBody, CardHeader} from "reactstrap";
import { Card } from "reactstrap";
import Image from "next/image";
import SliderResult from "../../components/Slider/Index";
import Head from "next/head";

export default function Sliders() {
    const router = useRouter();
    const id = router.query.id

    return (
        <div className="d-flex flex-column min-vh-100" on>
            <Head>
                <link rel="shortcut icon" href="/smartdomino.ico" />
                <title>Resultados del Torneo</title>
            </Head>
            <div className="container pt-4">
                <div className="d-flex align-items-center justify-content-between pb-4">
                    <Image alt="SmartDomino" src="/Logo-H.png" width={250} height={40} style={{cursor: "pointer"}} />
                </div>
                <Card
                    style={{ borderRadius: "10px", cursor: "default" }}
                >
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        <span>Resultados del Torneo</span>
                    </CardHeader>
                    <CardBody>

                        <div className="container" style={{maxWidth: '1300px'}}>
                            
                            <h5 className="text-center py-2">Tabla de Posiciones por Jugadores</h5>

                            <div>
                                <SliderResult id={id}/>
                            </div>

                        </div>

                    </CardBody>                
                </Card>
            </div>
        </div>
    )
}