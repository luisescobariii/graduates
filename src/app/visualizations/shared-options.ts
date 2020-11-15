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
                lang: ['Datos', 'Cerrar', 'Refrescar'],
                optionToContent: opt => {
                    let values = opt.series[0].data;
                    let categories;
                    if (typeof(values[0]) === 'object') {
                        categories = values.map(v => v.name);
                        values = values.map(v => v.value);
                    } else {
                        categories = opt.yAxis[0].data;
                        if (categories?.length !== values.length) {
                            categories = opt.xAxis[0].data;
                        }
                    }
                    const rows: string[] = [];
                    for (let i = 0; i < values.length; i++) {
                        rows.push(`<tr><td>${categories[i]}</td><td>${values[i]}</td></tr>`);
                    }
                    return `<h5>${opt.series[0].name}</h5>
                        <table class="dataview-table">
                        <thead><tr><th>Etiqueta</th><th>Valor</th></tr></thead>
                        <tbody>${rows.join('')}</tbody>
                        <tfoot><tr><td><strong>Total</string></td><td><strong>${values.reduce((a, b) => a + b, 0)}</strong></td></tr></tfoot>
                        </table>`;
                },
            },
        }
    }
};

