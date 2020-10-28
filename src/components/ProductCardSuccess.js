import React, { Component } from "react";
import { ConvertCurrency } from "../helpers";

export class ProductCardSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados_cotacao: JSON.parse(localStorage.getItem("@bidu2/dados_cotacao"))
    };
  }

  render() {
    const { dados_cotacao } = this.state;
    return (
      <>
        <div className="txt-center product-card">
          <div className="product">
            <div className="content">
              <div className="logo-container">
                <figure className="logo-hdmi">
                  <img
                    alt="hdmi"
                    src={`${require(`../assets/img/${dados_cotacao.susep}.svg`)}`}
                  />
                </figure>
              </div>
              <div className="infos">
                <div className="price">
                  {`${ConvertCurrency(dados_cotacao.precoParcelamento
                    ? dados_cotacao.precoParcelamento
                    : dados_cotacao.preco)}`}
                </div>
                <div className="description">
                  <span className="bold">Plano Customizado</span>
                  <p>
                    Guincho, carro com reserva, vidro, roubo, danos a terceiros,
                    franquia, outros.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {localStorage.clear()}
      </>
    );
  }
}
