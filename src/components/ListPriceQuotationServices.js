// Componente usado para dinamizar icones de cotação

import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export default ({ cotacao }) => {
  return (
    <div>
      <table className="table-body">
        <tbody>
          <tr>
            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/icon_colisao.svg")}`}
                />
              </figure>
              <br />
              Colisão
            </td>

            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/icon_furto.svg")}`}
                />
              </figure>
              <br />
              Roubo e Furto
            </td>

            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/icon_guincho.svg")}`}
                />
              </figure>
              <br />
              Guincho
            </td>
            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/icon_vidros.svg")}`}
                />
              </figure>
              <br />
              Vidro
            </td>
          </tr>

          <tr>
            {""}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
