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
            <td>
              {cotacao.resultadoCotacao &&
              cotacao.resultadoCotacao.tipoPlanoCobertura !=
                "SEGURO DE TERCEIROS" &&
              cotacao.resultadoCotacao.tipoPlanoCobertura !=
                "INCENDIOS_ROUBOS_FURTOS" && cotacao.resultadoCotacao.tipoPlanoCobertura !=
                "FURTO" ? (
                Object.values(cotacao.resultadoCotacao.franquias).filter(
                  (e) => e.tipo === "CASCO" || e.tipo === "Casco"
                ).length > 0 ? (
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                )
              ) : cotacao.resultadoCotacao.tipoPlanoCobertura ==
                  "SEGURO DE TERCEIROS" ||
                cotacao.resultadoCotacao.tipoPlanoCobertura ==
                  "INCENDIOS_ROUBOS_FURTOS" || cotacao.resultadoCotacao.tipoPlanoCobertura ==
                  "FURTO" ? (
                <CancelIcon color="secondary" />
              ) : (
                <CheckCircleIcon color="primary" />
              )}
            </td>

            <td>
              {cotacao.resultadoCotacao.tipoPlanoCobertura !=
              "SEGURO DE TERCEIROS" ? (
                <CheckCircleIcon color="primary" />
              ) : (
                <CancelIcon color="secondary" />
              )}
            </td>
            <td>
              {cotacao.resultadoCotacao &&
              cotacao.resultadoCotacao.tipoPlanoCobertura !=
                "SEGURO DE TERCEIROS" ? (
                Object.values(cotacao.resultadoCotacao.servicos).filter(
                  (e) =>
                    e.tipo === "100_KM" ||
                    e.tipo === "GUINCHO_24H" ||
                    e.tipo === "REBOQUE_CASO_ACIDENTE" ||
                    e.tipo === "SERVICO_DE_GUINCHO" ||
                    e.tipo === "GUINCHO" ||
                    e.tipo === "SERVICO_DE_GUINCHO_CUSTOM"
                ).length > 0 ? (
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                )
              ) : (
                cotacao.susep == 6572 &&
                (cotacao.resultadoCotacao.tipoPlanoCobertura ==
                "SEGURO DE TERCEIROS" ? (
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                ))
              )}
            </td>
            <td>
              {cotacao.resultadoCotacao &&
              cotacao.resultadoCotacao.tipoPlanoCobertura !=
                "SEGURO DE TERCEIROS" ? (
                Object.values(cotacao.resultadoCotacao.franquias).filter(
                  (e) =>
                    e.tipo === "VIDROS_COMPLETOS" ||
                    e.tipo === "VIDROS_BASICOS" ||
                    e.tipo === "Vidro Traseiro" ||
                    e.tipo === "Vidro Lateral"
                  // toLowerCase().indexOf("vidro") != -1
                ).length > 0 ? (
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                )
              ) : (
                cotacao.susep == 6572 &&
                (cotacao.resultadoCotacao.tipoPlanoCobertura ==
                "SEGURO DE TERCEIROS" ? (
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                ))
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
