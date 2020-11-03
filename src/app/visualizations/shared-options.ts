export const shared: any = {
    titlePosition: 'center', // left, center, right or percentage
    grid: {
        left: '4%',
        right: '4%',
        containLabel: true,
    },
    toolbox: {
        show: true,
        orient: 'horizontal',
        feature: {
            saveAsImage: { title: 'Descargar Imagen'},
            dataView: {
                title: 'Ver Datos',
                readOnly: true,
                lang: ['Datos', 'Cerrar', 'Refrescar']
            }
        }
    }
};
