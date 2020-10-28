import React from "react";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const TooltipDispositivo = (props) => (
  <BootstrapTooltip title="É um código do certificado do dispositivo de segurança que foi colocado no seu veículo">
    <ContactSupportIcon
      style={{
        fontSize: 20,
        position: "relative",
        top: "5px",
        color: "#00f1e7",
        cursor: "pointer",
      }}
    />
  </BootstrapTooltip>
);

export default TooltipDispositivo;
