import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import IconButton from "@material-ui/core/IconButton";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <div className={classes.list} role="presentation">
      <div className="menu-header">
        <div className="left">
          <span className="label">Menu</span>
        </div>
        <div
          className="right"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <CloseIcon />
        </div>
      </div>
      <Divider />
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleChange}
      >
        <TreeItem nodeId="1" label="Veículos">
          <a
            href="https://bidu-digital-prod.rj.r.appspot.com/sobrevoce"
            target="_blank"
          >
            <TreeItem nodeId="2" label="Seguro de Carro" />
          </a>
          <a
            href="https://cotacao.bidu.com.br/seguros/seguro-moto/veiculo"
            target="_blank"
          >
            <TreeItem nodeId="3" label="Seguro Moto" />
          </a>
          <a href="https://cotar.bidu.com.br/carros-antigos/" target="_blank">
            <TreeItem nodeId="4" label="Seguro Carro Antigos" />
          </a>
        </TreeItem>
        <TreeItem nodeId="11" label="Crédito">
          <a
            href="https://bidu.guiabolso.com.br/#/simulador-inicial"
            target="_blank"
          >
            <TreeItem nodeId="12" label="Empréstimo Pessoal" />
          </a>
          <a
            href="https://www.bidu.com.br/emprestimo-garantia/"
            target="_blank"
          >
            <TreeItem nodeId="14" label="Empréstimo com Garantia" />
          </a>
          <a href="https://easycredito.bidu.com.br/home" target="_blank">
            <TreeItem nodeId="15" label="Cartão de crédito" />
          </a>
        </TreeItem>
        <TreeItem nodeId="17" label="Pessoais">
          <a
            href="https://cotacao.bidu.com.br/seguros/seguro-residencial/imovel"
            target="_blank"
          >
            <TreeItem nodeId="18" label="Seguro Residencial" />
          </a>
          <a
            href="https://cotacao.bidu.com.br/seguros/seguro-viagem/viagem"
            target="_blank"
          >
            <TreeItem nodeId="19" label="Seguro Viagem" />
          </a>
          <a
            href="https://cotacao.bidu.com.br/seguros/seguro-vida"
            target="_blank"
          >
            <TreeItem nodeId="20" label="Seguro de Vida" />
          </a>
          <a
            href="https://cotacao.bidu.com.br/f/plano-de-saude"
            target="_blank"
          >
            <TreeItem nodeId="21" label="Plano de Saúde" />
          </a>
          <a
            href="https://cotacao.bidu.com.br/f/acidentes-pessoais"
            target="_blank"
          >
            <TreeItem nodeId="22" label="Seguro de Acidentes Pessoais" />
          </a>
          <a href="https://thinkseg-garantias.appspot.com/" target="_blank">
            <TreeItem nodeId="23" label="Seguro Fiança" />
          </a>
          <a href="https://www.bidu.com.br/plano-odontologico/" target="_blank">
            <TreeItem nodeId="24" label="Plano Odontológico" />
          </a>
          <a href="https://cotacao.bidu.com.br/f/seguro-pet/" target="_blank">
            <TreeItem nodeId="25" label="Seguro PET" />
          </a>
          <a href=" " target="_blank">
            <TreeItem nodeId="24" label="Seguro Saúde" />
          </a>
        </TreeItem>
      </TreeView>
    </div>
  );

  return (
    <div className="menu-mobile">
      <Button className="btn-menu-mobile" onClick={toggleDrawer("right", true)}>
        <IconButton className="btn-menu-mobile" aria-label="menu" color="dark">
          <span className="label">Menu</span>
          <MenuOpenIcon color="dark" />
        </IconButton>
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        variant="persistent"
        onClose={toggleDrawer("right", true)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
}
