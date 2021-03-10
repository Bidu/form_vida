import React, { useState, useEffect } from "react";
import Wrapper from "../../components/wrapper";
import { Steps } from "../../components/steps";
import Title from "../../components/Title";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, Controller } from "react-hook-form";
import inputsForm from "./inputsForm";
import inputsForm2 from "./inputsForm2";
import inputsForm3 from "./inputsForm3";
import { Redirect } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import Loading from "../../components/loading";
import RenderForm from "../../modules/views/RenderForm";
import yupFormValidateObject from "../../modules/yup/yupFormValidateObject";
import {
  formatStringData,
  rollbackFormatStringData,
} from "../../modules/helpers/user";

function Payment(props) {
  const [redirect, setRedirect] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      name: record.name,
    };
  });

  const form = useForm({
    resolver: yupResolver(
      yupFormValidateObject([...inputsForm, ...inputsForm2, ...inputsForm3])
    ),
    mode: "all",
    defaultValues: initialValues,
  });

  useEffect(() => {
    let value = JSON.parse(localStorage.getItem("@bidu2/user"));
    if (Object.keys(value).length > 0) {
      Object.keys(value).map((e) => {
        if (e == "date_birth")
          form.setValue(e, rollbackFormatStringData(value[e]));
        else form.setValue(e, value[e]);
      });
    }
    setLoading(false);
  }, []);

  const onSubmit = async (values) => {
    setLoading(true);
    values.date_birth = formatStringData(values.date_birth);
    await localStorage.setItem("@bidu2/user", JSON.stringify(values));

    setRedirect(true);
  };

  if (redirect) return <Redirect to="/sobre-imovel" />;

  return (
    <>
      <Wrapper>
        <Steps step1={true} step2={true} step3={true} step4={true} />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <Title text="Dados do" bold="Pagamento" />
            < br/>
            <p className="bold mb1">Débito em Conta corrente</p>
            <Grid container spacing={2}>
              <RenderForm inputs={inputsForm} xs={12} sm={6}  />
            </Grid>
            <br />
            <br />
            <p className="bold mb1">Cartão de Crédito </p>
            <Grid container spacing={2}>
              <RenderForm inputs={inputsForm2} xs={12} sm={6} center={true} />
            </Grid>
            <br />
            <br />
            <p className="bold mb1">Boleto</p>
            <Grid container spacing={2}>
              <RenderForm inputs={inputsForm3} xs={12} sm={4} center={true} />
            </Grid>


            {loading && <Loading />}

            <br />
            <div className="actions pme-actions">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                className="btn-next about-btn-next"
                onClick={form.handleSubmit(onSubmit)}
                // disabled={!this.state.opt}
              >
                Próximo
              </Button>
            </div>
          </form>
        </FormProvider>
      </Wrapper>
    </>
  );
}

export default Payment;
