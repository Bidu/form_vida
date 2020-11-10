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
                  src={`${require("../assets/img/svg-icons/human-pregnant.svg")}`}
                />
              </figure>
              <br />
              Obstetrícia
            </td>

            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/hospital.svg")}`}
                />
              </figure>
              <br />
              Ambulatorial + Hospitalar
            </td>

            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/brazil.svg")}`}
                />
              </figure>
              <br />
              Nacional
            </td>
            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/bed-outline.svg")}`}
                />
              </figure>
              <br />
              Coletiva
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
