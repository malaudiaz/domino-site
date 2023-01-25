import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../AppContext";

const Notifications = () => {
    const value = useContext(AppContext);
    const t = value.state.languages.notification;
    
    const notifications = [
        {
          severity: "warning",
          title: "Lorem Ipsum",
          notification: "Quae dolorem earum veritatis oditseno",
          timeElapsed: "30 min. ago"
        },
        {
          severity: "danger",
          title: "Atque rerum nesciunt",
          notification: "Quae dolorem earum veritatis oditseno",
          timeElapsed: "1 hr. ago"
        },
        {
          severity: "success",
          title: "Sit rerum fuga",
          notification: "Quae dolorem earum veritatis oditseno",
          timeElapsed: "2 hrs. ago"
        },
        {
          severity: "primary",
          title: "Dicta reprehenderit",
          notification: "Quae dolorem earum veritatis oditseno",
          timeElapsed: "4 hrs. ago"
        },
    ];    

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