import Link from "next/link";
import { useEffect, useState } from "react";
import {useAppContext} from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

const Notifications = () => {
    const {profile, i18n, token} = useAppContext();
    const t = i18n.notification;
    const [notifications, setNotifications] = useState([]);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "accept-Language": "es-ES,es;",
        "Authorization": `Bearer ${token}`,
      },
    };

    const fetchData = async () => {
      const url = `${
        process.env.NEXT_PUBLIC_API_URL
      }invitation?status_name=${"SEND"}`;
  
      try {
        const { data } = await axios.get(url, config);
        if (data.success) {
          setNotification(data.data);
        } else {
          Swal.fire({
            title: "Cargando Invitaciones",
            text: detail,
            icon: "info",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (errors) {
        console.log(errors);
        const { response } = errors;
        const { detail } = response.data;
        Swal.fire({
          title: "Cargando Notificaciones",
          text: detail,
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    };  

    useEffect(() => {
      const client_id = Date.now();
      const ws = new WebSocket(`ws://localhost:5000/ws/${client_id}`);
      console.log(client_id);
      ws.onmessage = function(event) {
        notifications.push(
          {
            severity: "warning",
            title: "Lorem Ipsum",
            notification: event.data,
            timeElapsed: "30 min. ago"
          }
        )
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, []);
  
    
    // const notifications = [
    //     {
    //       severity: "warning",
    //       title: "Lorem Ipsum",
    //       notification: "Quae dolorem earum veritatis oditseno",
    //       timeElapsed: "30 min. ago"
    //     },
    //     {
    //       severity: "danger",
    //       title: "Atque rerum nesciunt",
    //       notification: "Quae dolorem earum veritatis oditseno",
    //       timeElapsed: "1 hr. ago"
    //     },
    //     {
    //       severity: "success",
    //       title: "Sit rerum fuga",
    //       notification: "Quae dolorem earum veritatis oditseno",
    //       timeElapsed: "2 hrs. ago"
    //     },
    //     {
    //       severity: "primary",
    //       title: "Dicta reprehenderit",
    //       notification: "Quae dolorem earum veritatis oditseno",
    //       timeElapsed: "4 hrs. ago"
    //     },
    // ];    

    return (
        <li className="nav-item dropdown">
        <a
          className="nav-link nav-icon"
          href="#"
          data-bs-toggle="dropdown"
        >
          <i className="bi bi-bell"></i>
          <span className="badge bg-primary badge-number">{notifications.length}</span>
        </a>
  
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
          <li className="dropdown-header">{t.header.replace("99", notifications.length)}
              <a href="#">
                <span className="badge rounded-pill bg-primary p-2 ms-2">
                  {t.viewAll}
                </span>
              </a>
          </li>
  
          {
            notifications.map( ({severity, title, notification, timeElapsed}, index) => (
              <div key={index}>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className={"bi bi-exclamation-circle text-"+severity}></i>
                  <div>
                    <h4>{title}</h4>
                    <p>{notification}</p>
                    <p>{timeElapsed}</p>
                  </div>
                </li>
              </div>
            ))
          }
  
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="dropdown-footer">
            <Link href="/notifications">
                <a href="#">{t.showAll}</a>
            </Link>
          </li>
        </ul>
      </li>        
    )
}
export default Notifications;