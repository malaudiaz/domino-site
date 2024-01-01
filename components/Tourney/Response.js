import { useState, useEffect } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Invitations from "./Competitors/Invitations";
import Players from "./Competitors/Players";

export default function Response({ tourney }) {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between item-align-center ps-4 pe-4">
        <h1 className="title">{"Competidores"}</h1>
      </div>

      <div className="p-2">
         <Nav tabs>
            <NavItem>
                <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                    toggleTab("1");
                    }}
                >
                    Invitaciones
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
                    Jugadores
                </NavLink>
            </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <Invitations tourney={tourney} />
            </TabPane>
            <TabPane tabId="2">
                <Players tourney={tourney} />
            </TabPane>
        </TabContent>
      </div>
    </div>
  );
}
