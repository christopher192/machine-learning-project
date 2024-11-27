/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: slope Chart init js
*/

// get colors array from the string
function getChartColorsArray(chartId) {
    if (document.getElementById(chartId) !== null) {
        var colors = document.getElementById(chartId).getAttribute("data-colors");
        colors = JSON.parse(colors);
        return colors.map(function (value) {
            var newValue = value.replace(" ", "");
            if (newValue.indexOf(",") === -1) {
                var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
                if (color) return color;
                else return newValue;;
            } else {
                var val = value.split(',');
                if (val.length == 2) {
                    var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                    rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                    return rgbaColor;
                } else {
                    return newValue;
                }
            }
        });
    }
}


// basic_charts Chart
var slopeBasicColors = getChartColorsArray("basic_charts");
if (slopeBasicColors) {
    var options = {
        series: [
            {
                name: 'Blue',
                data: [
                    {
                        x: 'Jan',
                        y: 43,
                    },
                    {
                        x: 'Feb',
                        y: 58,
                    },
                ],
            },
            {
                name: 'Green',
                data: [
                    {
                        x: 'Jan',
                        y: 33,
                    },
                    {
                        x: 'Feb',
                        y: 38,
                    },
                ],
            },
            {
                name: 'Red',
                data: [
                    {
                        x: 'Jan',
                        y: 55,
                    },
                    {
                        x: 'Feb',
                        y: 21,
                    },
                ],
            },
        ],
        chart: {
            height: 350,
            width: 400,
            type: 'line',
        },
        plotOptions: {
            line: {
                isSlopeChart: true,
            },
        },
        colors: slopeBasicColors,
    };

    var chart = new ApexCharts(document.querySelector("#basic_charts"), options);
    chart.render();
}


// multi_charts Chart
var slopeMultiColors = getChartColorsArray("multi_charts");
if (slopeMultiColors) {
    var options = {
        series: [
            {
                name: 'Blue',
                data: [
                    {
                        x: 'Category 1',
                        y: 503,
                    },
                    {
                        x: 'Category 2',
                        y: 580,
                    },
                    {
                        x: 'Category 3',
                        y: 135,
                    },
                ],
            },
            {
                name: 'Green',
                data: [
                    {
                        x: 'Category 1',
                        y: 733,
                    },
                    {
                        x: 'Category 2',
                        y: 385,
                    },
                    {
                        x: 'Category 3',
                        y: 715,
                    },
                ],
            },
            {
                name: 'Orange',
                data: [
                    {
                        x: 'Category 1',
                        y: 255,
                    },
                    {
                        x: 'Category 2',
                        y: 211,
                    },
                    {
                        x: 'Category 3',
                        y: 441,
                    },
                ],
            },
            {
                name: 'Red',
                data: [
                    {
                        x: 'Category 1',
                        y: 428,
                    },
                    {
                        x: 'Category 2',
                        y: 749,
                    },
                    {
                        x: 'Category 3',
                        y: 559,
                    },
                ],
            },
        ],
        chart: {
            height: 350,
            width: 600,
            type: 'line',
        },
        plotOptions: {
            line: {
                isSlopeChart: true,
            },
        },
        tooltip: {
            followCursor: true,
            intersect: false,
            shared: true,
        },
        dataLabels: {
            background: {
                enabled: true,
            },
            formatter(val, opts) {
                const seriesName = opts.w.config.series[opts.seriesIndex].name
                return val !== null ? seriesName : ''
            },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
            },
        },
        xaxis: {
            position: 'bottom',
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
        },
        stroke: {
            width: [2, 3, 4, 2],
            dashArray: [0, 0, 5, 2],
            curve: 'smooth',
        },
        colors: slopeMultiColors,
    };

    var chart = new ApexCharts(document.querySelector("#multi_charts"), options);
    chart.render();
}
