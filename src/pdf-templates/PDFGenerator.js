import React from "react";
import * as jsPDF from "jspdf";
import ReactDOM from "react-dom";
import * as html2canvas from "html2canvas";

// Little hack to get a React Element into a DOM Element to Make PDF!
export const render = (element) => {
    const domElement = document.getElementById("pdfroot");
    ReactDOM.render(element, domElement, () => {
        html2canvas(domElement)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "pt", "a4", true);
                pdf.addImage(imgData, "PNG", 0, 0);
                pdf.save("download.pdf");
            }).catch(err => {
            console.log("ERROR!", err);
        }).finally(() => {
            ReactDOM.render(<div/>, domElement); // The way to clear it?
        });
    });

};

