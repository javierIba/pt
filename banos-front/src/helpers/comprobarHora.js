import icons from "../icons/IconsPath";
export function comprobarHora(toilet) {
    let today = new Date();

    let option = {
        path: icons.iconBath,
        fillColor: "yellow",
        fillOpacity: 0.9,
        scale: 0.1,
        strokeColor: "black",
        strokeWeight: 2
    }


    let ce = (toilet) ? toilet.cerrado.split(':') : []
    let ap = (toilet) ? toilet.apertura.split(':') : []
    if (ce[0] > today.getHours() && today.getHours() >= ap[0]) {
        option.fillColor = "green"

    } else if (today.getHours >= "00" && ce[0] < "05") {
        option.fillColor = "green"
    } else {
        option.fillColor = "red"
    }
    return option
}