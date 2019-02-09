import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { translateKey } from "utils/translate";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import ViewPager from "../organisms/ViewPager";
import Paper from "@material-ui/core/Paper/Paper";
import OrdenesSelector from "../organisms/OrdenesSelector";
import Button from "@material-ui/core/Button/Button";
import ActivosForm from "../organisms/ActivosForm";

const styles = theme => ({});

const steps = [
    "Escoger la Orden de Compra y la Factura",
    "Ingresar los datos del Activo",
];

const CrearActivosPage = ({ step, clasificaciones, marcas, ordenes, handleNext, handleBack, onSelectOrden, isCompleted, activo, onActivoChange, create }) => (
    <Grid container>
        <Paper style={{ width: "100%", height: "80vh" }}>
            <Stepper nonLinear activeStep={step}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepButton disabled
                                        completed={isCompleted(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            <ViewPager page={step} style={{
                background: "white",
                padding: "0 24px",
                height: "65vh",
            }}>
                <OrdenesSelector
                    activo={activo}
                    ordenes={ordenes}
                    onSelect={onSelectOrden}/>
                <ActivosForm activo={activo}
                             onChange={onActivoChange}
                             marcas={marcas}
                             clasificaciones={clasificaciones}/>
            </ViewPager>
            <div>
                <Button
                    disabled={step === 0}
                    onClick={handleBack}
                >
                    Atrás
                </Button>
                {step === steps.length - 1 ?
                    <Button
                        disabled={!isCompleted(step)}
                        variant="contained"
                        color="primary"
                        onClick={create}
                    >
                        Crear Activo
                    </Button> : <Button
                        disabled={!isCompleted(step)}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                    >
                        Siguiente
                    </Button>}

            </div>
        </Paper>
    </Grid>
);

export default withStyles(styles)(CrearActivosPage);
