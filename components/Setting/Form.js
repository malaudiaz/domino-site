
import { FormGroup, Label, InputGroup, Input, FormFeedback, Card, CardBody, CardHeader, Col } from "reactstrap"

export default function SettingForm() {

    const handleSubmit = () => {

    }

    return (
        <div className="rounded-md bg-light py-2 px-4">
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="d-flex flex-row flex-wrap gap-1 gap-md-4 justify-content-between">
                    <div className="d-flex flex-column flex-fill">
                        <FormGroup>
                            <Label size="sm">
                                Cantidad de Mesas
                            </Label>
                            <InputGroup size="sm">
                                <Input
                                    type="text"
                                    name="amountTtable"
                                    id="amountTable"
                                    // value={formValues.amountTable.value}
                                    disabled
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label size="sm">
                                Cantidad de Mesas Inteligentes
                            </Label>
                            <InputGroup size="sm">
                                <Input
                                    type="number"
                                    name="smartTable"
                                    id="smartTable"
                                    // invalid={formValues.smartTable.error}
                                    // value={formValues.smartTable.value}
                                    // onChange={handleChange}
                                />
                                <FormFeedback>
                                    La cantidad de mesas inteligentes es requerida.
                                </FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label size="sm">
                                Puntos para ganar ronda
                            </Label>
                            <InputGroup size="sm">
                                <Input
                                type="number"
                                name="pointRound"
                                id="pointRound"
                                // invalid={formValues.pointRound.error}
                                // value={formValues.pointRound.value}
                                // onChange={handleChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}              
                                />
                                <FormFeedback>
                                    La cantidad de mesas inteligentes es requerida.
                                </FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label size="sm">
                                Tiempo máximo para ganar (min.)
                            </Label>
                            <InputGroup size="sm">
                                <Input
                                    type="number"
                                    name="timeRound"
                                    id="timeRound"
                                    //   invalid={formValues.timeRound.error}
                                    //   value={formValues.timeRound.value}
                                    //   onChange={handleChange}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                        }
                                    }}              
                                />
                                <FormFeedback>
                                    La cantidad de mesas inteligentes es requerida.
                                </FormFeedback>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label size="sm">
                                Tipo de Sorteo
                            </Label>
                            <InputGroup size="sm">
                                <Input
                                    type="select"
                                    name="lottery"
                                    id="lottery"
                                    placeholder="Sorteo"
                                    //   value={formValues.lottery.value}
                                    //   onChange={handleChange}
                                >
                                    <option key={1} value="MANUAL">
                                        Manual
                                    </option>
                                    <option key={2} value="AUTOMATIC">
                                        Automático
                                    </option>
                                </Input>
                            </InputGroup>
                            <FormFeedback>
                                La cantidad de mesas inteligentes es requerida.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label size="sm">
                                Factor de Crecimiento del ELO
                            </Label>
                            <InputGroup size="sm">
                                <Input
                                    type="number"
                                    name="constant_increase_ELO"
                                    id="constant_increase_ELO"
                                    // invalid={formValues.constant_increase_ELO.error}
                                    // value={formValues.constant_increase_ELO.value}
                                    // onChange={handleChange}
                                />
                            </InputGroup>
                            <FormFeedback>
                                La cantidad de mesas inteligentes es requerida.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label size="sm">
                                Otorgar Puntos por Ausencia o Abandono
                            </Label>
                            <InputGroup size="sm">
                                <Input
                                    type="number"
                                    name="absent_point"
                                    id="absent_point"
                                    // invalid={formValues.absent_point.error}
                                    // value={formValues.absent_point.value}
                                    // onChange={handleChange}
                                />
                            </InputGroup>
                            <FormFeedback>
                                La cantidad de mesas inteligentes es requerida.
                            </FormFeedback>
                        </FormGroup>

                    </div>
                    <div className="d-flex flex-column flex-fill">
                        <Card className="d-flex flex-fill">
                            <CardHeader>Críterios de Organización para Rondas</CardHeader>
                            <CardBody>

                            <FormGroup className="d-flex flex-row flex-wrap gap-2">
                                <Label size="sm">
                                    Críterio 1:
                                </Label>
                                <InputGroup size="sm" className="d-flex flex-row gap-2 align-items-center">
                                    <Input
                                        type="select"
                                        name="event_ordering_one"
                                        id="event_ordering_one"
                                        placeholder="Críterio # 1"
                                        //   value={formValues.event_ordering_one.value}
                                        //   onChange={handleChange}
                                    >
                                        <option key={0} value="">
                                            Seleccione
                                        </option>
                                        {/* {criteriaTourney.map(
                                            ({ key, value }, i) =>
                                            key !== formValues.event_ordering_two.value &&
                                            key !== formValues.event_ordering_three.value && (
                                                <option key={i + 1} value={key}>
                                                {value}
                                                </option>
                                            )
                                        )} */}
                                    </Input>
                                    <div className="d-flex flex-row gap-1 gap-md-2 align-items-center">
                                        <i className="bi bi-sort-up-alt"></i>
                                        <FormGroup switch>
                                            <Input 
                                                type="switch" 
                                                role="switch" 
                                                //   checked={formValues.event_ordering_dir_one.value==="DESC" ? true : false}
                                                //   value={formValues.event_ordering_dir_one.value}
                                                name="event_ordering_dir_one" 
                                                id="event_ordering_dir_one" 
                                                //   onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <i className="bi bi-sort-down"></i>
                                    </div>
                                </InputGroup>

                            </FormGroup>


                            <FormGroup className="d-flex flex-row flex-wrap gap-2">
                                <Label size="sm">
                                    Críterio 2:
                                </Label>
                                <InputGroup size="sm" className="d-flex flex-row gap-2 align-items-center">
                                    <Input
                                        type="select"
                                        name="event_ordering_one"
                                        id="event_ordering_one"
                                        placeholder="Críterio # 1"
                                        //   value={formValues.event_ordering_one.value}
                                        //   onChange={handleChange}
                                    >
                                        <option key={0} value="">
                                            Seleccione
                                        </option>
                                        {/* {criteriaTourney.map(
                                            ({ key, value }, i) =>
                                            key !== formValues.event_ordering_two.value &&
                                            key !== formValues.event_ordering_three.value && (
                                                <option key={i + 1} value={key}>
                                                {value}
                                                </option>
                                            )
                                        )} */}
                                    </Input>
                                    <div className="d-flex flex-row gap-1 gap-md-2 align-items-center">
                                        <i className="bi bi-sort-up-alt"></i>
                                        <FormGroup switch>
                                            <Input 
                                                type="switch" 
                                                role="switch" 
                                                //   checked={formValues.event_ordering_dir_one.value==="DESC" ? true : false}
                                                //   value={formValues.event_ordering_dir_one.value}
                                                name="event_ordering_dir_one" 
                                                id="event_ordering_dir_one" 
                                                //   onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <i className="bi bi-sort-down"></i>
                                    </div>
                                </InputGroup>

                            </FormGroup>


                            <FormGroup className="d-flex flex-row flex-wrap gap-2">
                                <Label size="sm">
                                    Críterio 3:
                                </Label>
                                <InputGroup size="sm" className="d-flex flex-row gap-2 align-items-center">
                                    <Input
                                        type="select"
                                        name="event_ordering_one"
                                        id="event_ordering_one"
                                        placeholder="Críterio # 1"
                                        //   value={formValues.event_ordering_one.value}
                                        //   onChange={handleChange}
                                    >
                                        <option key={0} value="">
                                            Seleccione
                                        </option>
                                        {/* {criteriaTourney.map(
                                            ({ key, value }, i) =>
                                            key !== formValues.event_ordering_two.value &&
                                            key !== formValues.event_ordering_three.value && (
                                                <option key={i + 1} value={key}>
                                                {value}
                                                </option>
                                            )
                                        )} */}
                                    </Input>
                                    <div className="d-flex flex-row gap-1 gap-md-2 align-items-center">
                                        <i className="bi bi-sort-up-alt"></i>
                                        <FormGroup switch>
                                            <Input 
                                                type="switch" 
                                                role="switch" 
                                                //   checked={formValues.event_ordering_dir_one.value==="DESC" ? true : false}
                                                //   value={formValues.event_ordering_dir_one.value}
                                                name="event_ordering_dir_one" 
                                                id="event_ordering_dir_one" 
                                                //   onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <i className="bi bi-sort-down"></i>
                                    </div>
                                </InputGroup>

                            </FormGroup>

                                
                            </CardBody>
                        </Card>

                        <Card className="d-flex flex-fill">
                            <CardHeader>Críterios de Organización para Torneos</CardHeader>
                            <CardBody>

                            <FormGroup className="d-flex flex-row flex-wrap gap-2">
                                <Label size="sm">
                                    Críterio 1:
                                </Label>
                                <InputGroup size="sm" className="d-flex flex-row gap-2 align-items-center">
                                    <Input
                                        type="select"
                                        name="event_ordering_one"
                                        id="event_ordering_one"
                                        placeholder="Críterio # 1"
                                        //   value={formValues.event_ordering_one.value}
                                        //   onChange={handleChange}
                                    >
                                        <option key={0} value="">
                                            Seleccione
                                        </option>
                                        {/* {criteriaTourney.map(
                                            ({ key, value }, i) =>
                                            key !== formValues.event_ordering_two.value &&
                                            key !== formValues.event_ordering_three.value && (
                                                <option key={i + 1} value={key}>
                                                {value}
                                                </option>
                                            )
                                        )} */}
                                    </Input>
                                    <div className="d-flex flex-row gap-1 gap-md-2 align-items-center">
                                        <i className="bi bi-sort-up-alt"></i>
                                        <FormGroup switch>
                                            <Input 
                                                type="switch" 
                                                role="switch" 
                                                //   checked={formValues.event_ordering_dir_one.value==="DESC" ? true : false}
                                                //   value={formValues.event_ordering_dir_one.value}
                                                name="event_ordering_dir_one" 
                                                id="event_ordering_dir_one" 
                                                //   onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <i className="bi bi-sort-down"></i>
                                    </div>
                                </InputGroup>

                            </FormGroup>


                            <FormGroup className="d-flex flex-row flex-wrap gap-2">
                                <Label size="sm">
                                    Críterio 2:
                                </Label>
                                <InputGroup size="sm" className="d-flex flex-row gap-2 align-items-center">
                                    <Input
                                        type="select"
                                        name="event_ordering_one"
                                        id="event_ordering_one"
                                        placeholder="Críterio # 1"
                                        //   value={formValues.event_ordering_one.value}
                                        //   onChange={handleChange}
                                    >
                                        <option key={0} value="">
                                            Seleccione
                                        </option>
                                        {/* {criteriaTourney.map(
                                            ({ key, value }, i) =>
                                            key !== formValues.event_ordering_two.value &&
                                            key !== formValues.event_ordering_three.value && (
                                                <option key={i + 1} value={key}>
                                                {value}
                                                </option>
                                            )
                                        )} */}
                                    </Input>
                                    <div className="d-flex flex-row gap-1 gap-md-2 align-items-center">
                                        <i className="bi bi-sort-up-alt"></i>
                                        <FormGroup switch>
                                            <Input 
                                                type="switch" 
                                                role="switch" 
                                                //   checked={formValues.event_ordering_dir_one.value==="DESC" ? true : false}
                                                //   value={formValues.event_ordering_dir_one.value}
                                                name="event_ordering_dir_one" 
                                                id="event_ordering_dir_one" 
                                                //   onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <i className="bi bi-sort-down"></i>
                                    </div>
                                </InputGroup>

                            </FormGroup>


                            <FormGroup className="d-flex flex-row flex-wrap gap-2">
                                <Label size="sm">
                                    Críterio 3:
                                </Label>
                                <InputGroup size="sm" className="d-flex flex-row gap-2 align-items-center">
                                    <Input
                                        type="select"
                                        name="event_ordering_one"
                                        id="event_ordering_one"
                                        placeholder="Críterio # 1"
                                        //   value={formValues.event_ordering_one.value}
                                        //   onChange={handleChange}
                                    >
                                        <option key={0} value="">
                                            Seleccione
                                        </option>
                                        {/* {criteriaTourney.map(
                                            ({ key, value }, i) =>
                                            key !== formValues.event_ordering_two.value &&
                                            key !== formValues.event_ordering_three.value && (
                                                <option key={i + 1} value={key}>
                                                {value}
                                                </option>
                                            )
                                        )} */}
                                    </Input>
                                    <div className="d-flex flex-row gap-1 gap-md-2 align-items-center">
                                        <i className="bi bi-sort-up-alt"></i>
                                        <FormGroup switch>
                                            <Input 
                                                type="switch" 
                                                role="switch" 
                                                //   checked={formValues.event_ordering_dir_one.value==="DESC" ? true : false}
                                                //   value={formValues.event_ordering_dir_one.value}
                                                name="event_ordering_dir_one" 
                                                id="event_ordering_dir_one" 
                                                //   onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <i className="bi bi-sort-down"></i>
                                    </div>
                                </InputGroup>

                            </FormGroup>


                            </CardBody>
                        </Card>


                    </div>
                </div>

            </form>
        </div>
    )    
};