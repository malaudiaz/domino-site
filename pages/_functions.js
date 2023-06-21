
const eventDate = (startDate, endDate) => {
    let cadena = "";
    if (startDate != "") {
        const start = new Date(startDate + " 00:00");

        cadena =
        start.toLocaleString("default", { weekday: "short" }).toUpperCase() +
        ", " +
        start.getDate() +
        " " +
        start.toLocaleString("default", { month: "short" }).toUpperCase();  
    }
    if (endDate != "") {
        const end = new Date(endDate  + " 00:00");
        
        cadena = cadena + " - " +
        end.toLocaleString("default", { weekday: "short" }).toUpperCase() +
        ", " +
        end.getDate() +
        " " +
        end.toLocaleString("default", { month: "short" }).toUpperCase();        
    }

    return cadena;
};

export {eventDate};