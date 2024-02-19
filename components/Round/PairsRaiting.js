import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import PairsPositions from "../Raiting/Pairs/Round/Index";

export default function PairsRaiting({ tourney, round, active }) {
    const [activeTab, setActiveTab] = useState("1");

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
    };
    
    return (
        <div className="p-4">
            <h5 className="text-center py-2">Tabla de Posiciones por Parejas</h5>

            {round.modality!=="Individual" ? (
                <>
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
                            <PairsPositions id={round.id} active={active && round.modality!=="Individual"}/>
                        </TabPane>
                        <TabPane tabId="2">
                        </TabPane>
                    </TabContent>
                </>
            ) : (
                <PairsPositions id={round.id} active={active && round.modality==="Individual"}/>
            )}

        </div>
    )
};
