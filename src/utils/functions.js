export const ubicacionesToOptions = (ubicaciones) => {
    return ubicaciones.map(u => ({ label: u, value: u }));
}

export const marcasToOptions= (marcas) => {
    return marcas.map(m => ({ label: m, value: m }));
}

export const clasificacionesToOptions = (clasificaciones) => {
    return clasificaciones.map(m => ({ label: m, value: m }));
}

export const ubicacionesAdministrativasToOptions = (ubicaciones) => {
    return ubicaciones.map(u => ({ label: u, value: u }));
}