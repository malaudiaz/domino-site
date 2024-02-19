import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import RoundPositions from "../Raiting/Player/Round/Index";
import AcumulatedPositions from "../Raiting/Player/Acumulated/Index";

export default function PlayerRaiting({ tourney, round, active }) {
    const [activeTab, setActiveTab] = useState("1");

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
    };
    
    return (
        <div className="p-4">
            <h5 className="text-center py-2">Tabla de Posiciones por Jugadores</h5>

            <div className="d-flex justify-content-center">

                <Nav className="text-center" pills fill>
                    <NavItem>
                        <NavLink
                            href="#"
                            className={classnames({ active: activeTab === "1" })}
                            onClick={() => {
                                toggleTab("1");
                            }}
                        >
                            Ronda
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            href="#"
                            className={classnames({ active: activeTab === "2" })}
                            onClick={() => {
                                toggleTab("2");
                            }}
                        >
                            Acumulado
                        </NavLink>
                    </NavItem>
                </Nav>

            </div>


            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <RoundPositions id={round.id} active={active && activeTab==="1"}/>
                </TabPane>
                <TabPane tabId="2">
                    <AcumulatedPositions id={tourney.id} active={active && activeTab==="2"}/>
                </TabPane>
            </TabContent>

        </div>
    )
};
