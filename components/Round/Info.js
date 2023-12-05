

import { Card, CardHeader, Label, Input, CardFooter, CardBody } from "reactstrap";

export default function Info({round}) {
    return (
        <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
            <div className="container-events">
                <Card
                //   key={idx}
                  className="d-flex flex-column align-items-center rounded"
                  style={{ height: "400px", background: "#ebebeb" }}
                >
                    <CardHeader className="w-100">Mesa <b>{1}</b> - {"Tradicional"}</CardHeader>
                    <CardBody>

                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

