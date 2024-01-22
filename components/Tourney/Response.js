import { useState } from "react";
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
import Register from "./Competitors/Register";

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
                    Registro
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
                    Invitaciones
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                    toggleTab("3");
                    }}
                >
                    Jugadores
                </NavLink>
            </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Register tourney={tourney}/>
            </TabPane>
            <TabPane tabId="2">
                <Invitations tourney={tourney} />
            </TabPane>
            <TabPane tabId="3">
                <Players tourney={tourney} />
            </TabPane>
        </TabContent>
      </div>
    </div>
  );
}
