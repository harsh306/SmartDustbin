$(function () {
    $('#container').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text: 'Total No. of frequincies of Garbage Collectors'
        },

        xAxis: {
            categories: ['Swargate', 'Kondhwa', 'Hadapasar', 'Kothrud', 'Katraj']
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of Trips'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: [{
            name: 'Recycle',
            data: [5, 3, 4, 7, 2],
            stack: 'male'
        }, {
            name: 'Inorganic',
            data: [3, 4, 4, 2, 5],
            stack: 'male'
        }, {
            name: 'e-Waste',
            data: [2, 5, 6, 2, 1],
            stack: 'female'
        }]
    });
});
