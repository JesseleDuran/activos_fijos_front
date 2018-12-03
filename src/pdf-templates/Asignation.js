import React from "react";
import moment from "moment";
import "moment/locale/es";


const styles = {

    logo: {
        width: "175px",
        height: "auto",
    },
    date: {
        textAlign: "right",
        margin: 0,
    },
    title: {
        fontWeight: "700",
        fontSize: "18px",
        textDecoration: "underline",
        textAlign: "center",
        margin: "50px 0 30px 0",
    },
    paragraph: {
        textAlign: "justify",
        lineHeight: "30px",
    },
    product: {
        fontWeight: "700",
        fontSize: "18px",
        textAlign: "center",
    },
    sign: {
        width: "50%",
        padding: "10px",
        fontWeight: "700",
        textAlign: "center",
        marginTop: "30px",
    },
    footer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
    },
    columnHead: {
        fontWeight: "bold",
        textAlign: "left",
        verticalAlign: "top",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        padding: "10px 5px",
        borderStyle: "solid",
        borderWidth: "1px",
        overflow: "hidden",
        wordBreak: "normal",
        borderColor: "black",
    },
    table: {
        borderCollapse: "collapse",
        borderSpacing: 0,
    },
    td: {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        padding: "10px 5px",
        borderStyle: "solid",
        borderWidth: "1px",
        overflow: "hidden",
        wordBreak: "normal",
        borderColor: "black",
    },


};

const formatThousandDots = str => str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatNames = str => str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

const Asignation = ({ movements }) => {
    const mainData = movements[0];
    const multiple = movements.length > 1;
    const title = mainData.sexper === "F" ? "Sra" : "Sr";
    const cedAuth = formatThousandDots(mainData.cedusu);
    const cedPer = formatThousandDots(mainData.cedper);
    const cargoPer = formatNames(mainData.cargo_personal);
    const nameUsu = formatNames(mainData.nomusu + " " + mainData.apeusu);
    const namePer = formatNames(mainData.nomper + " " + mainData.apeper);
    const momentInstance = moment(mainData.created_at);
    momentInstance.locale("es");
    const activosText = multiple ? "de los activos siguientes" : "del activo siguiente";
    return <div>
        <div>
            <img
                style={styles.logo}
                src="img/cvg-logo.jpg"
            />
        </div>
        <div>
            <p style={styles.date}>{formatNames(momentInstance.format("LL"))}</p>
        </div>
        <div>
            <p style={styles.title}>ACTA DE ASIGNACION DE BIENES</p>
        </div>
        <div>
            <p style={styles.paragraph}>{`Por medio de la presente se deja constancia de la Revisión y Actualización del
                inventario de activos adscritos a la Gerencia de Comercializacion de Maderas del Orinoco, C.A. Así
                mismo,
                se hace constar que el ${title}. ${namePer} , cédula de identidad N° ${cedPer} ocupando el
                Cargo de ${cargoPer} es responsable ${activosText}:`}
            </p>
        </div>
        <div>
            {!multiple ?
                <p style={styles.product}>{`01 ${mainData.descripcion.toUpperCase()} MARCA ${mainData.marca.toUpperCase()} (No. Activo ${mainData.n_activo})`}</p> :
                renderTable(movements)}
        </div>
        <div>
            <p style={styles.paragraph}>En el entendido de que el bien descrito es propiedad de Maderas del Orinoco,
                C.A. se asigna
                la responsabilidad de la custodia, uso, administración, mantenimiento, resguardo y
                conservación de los mismo de acuerdo a lo establecido al Articulo 92 de la Ley Orgánica de
                Bienes Públicos a la mencionada trabajadora.</p>
        </div>
        <div style={{ display: "flex" }}>
            <div style={styles.sign}>
                <p>{nameUsu}</p>
                <p>C.I: {cedAuth}</p>
                <p>Dpto. Control de Activos </p>
            </div>
            <div style={styles.sign}>
                <p>{namePer}</p>
                <p>C.I: {cedPer}</p>
                <p>{cargoPer}</p>
            </div>
        </div>
        <div style={styles.footer}>
            <img
                src="img/doc-footer.png"
            />
        </div>
    </div>;
};

const renderTable = movements => {
    return <table style={styles.table}>
        <tr>
            <th style={styles.columnHead}>Cant.</th>
            <th style={styles.columnHead}>No. Activo</th>
            <th style={styles.columnHead}>Descripcion</th>
            <th style={styles.columnHead}>Marca</th>
            <th style={styles.columnHead}>Modelo</th>
            <th style={styles.columnHead}>Serial</th>
            <th style={styles.columnHead}>Ubicacion</th>
        </tr>
        {movements.map(renderRow)}
    </table>;
};

const renderRow = movement => {
    return <tr>
        <td style={styles.td}>01</td>
        <td style={styles.td}>{movement.n_activo}</td>
        <td style={styles.td}>{movement.descripcion}</td>
        <td style={styles.td}>{movement.marca}</td>
        <td style={styles.td}>{movement.modelo}</td>
        <td style={styles.td}>{movement.serial}</td>
        <td style={styles.td}>{movement.desubifis}</td>
    </tr>;
};

export default Asignation;

