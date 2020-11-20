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
                    return `<h5>${opt.title[0].text}</h5>
                        <table class="dataview-table">
                        <thead><tr><th>Etiqueta</th><th>Valor</th></tr></thead>
                        <tbody>${rows.join('')}</tbody>
                        <tfoot><tr><td><strong>Total</string></td><td><strong>${values.reduce((a, b) => a + b, 0)}</strong></td></tr></tfoot>
                        </table>`;
                },
            },
        }
    },
    toolboxMultiple: {
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
                        rows.push(`<tr><td>${categories[i]}</td>${opt.series.map(s => '<td>' + s.data[i] + '</td>').join('')}</tr>`);
                    }
                    return `<h5>${opt.title[0].text}</h5>
                        <table class="dataview-table">
                        <thead><tr><th>Etiqueta</th>${opt.series.map(s => '<th>' + s.name + '</th>').join('')}</tr></thead>
                        <tbody>${rows.join('')}</tbody>
                        <tfoot><tr><td><strong>Total</string></td>${opt.series.map(s => `<td><strong>${s.data.reduce((a, b) => a + b, 0)}</strong></td>`).join('')}</tr></tfoot>
                        </table>`;
                },
            },
        }
    }
};

