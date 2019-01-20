export const ubicacionesToOptions = (ubicaciones) => {
    return ubicaciones.map(u => ({ label: u.desubifis, value: u.codubifis }));
}

export const marcasToOptions= (marcas) => {
    return marcas.map(m => ({ label: m, value: m }));
}

export const clasificacionesToOptions = (clasificaciones) => {
    return clasificaciones.map(m => ({ label: m, value: m }));
}