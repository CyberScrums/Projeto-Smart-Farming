document.addEventListener("DOMContentLoaded", function() {
    const temperatureData = [
        { date: new Date(2022, 0, 1), temperature: 32 },
        { date: new Date(2022, 1, 1), temperature: 29 },
        { date: new Date(2022, 2, 1), temperature: 26 },
        { date: new Date(2022, 3, 1), temperature: 35 },
        { date: new Date(2022, 4, 1), temperature: 40 },
        { date: new Date(2022, 5, 1), temperature: 28 },
    ];
    
    const waterVolumeData = [
        { date: new Date(2022, 0, 1), volume: 50 },
        { date: new Date(2022, 1, 1), volume: 12 },
        { date: new Date(2022, 2, 1), volume: 40 },
        { date: new Date(2022, 3, 1), volume: 65 },
        { date: new Date(2022, 4, 1), volume: 120 },
        { date: new Date(2022, 5, 1), volume: 76 },
    ];
    
    const humidityData = [
        { date: new Date(2022, 0, 1), humidity: 40 },
        { date: new Date(2022, 1, 1), humidity: 65 },
        { date: new Date(2022, 2, 1), humidity: 36 },
        { date: new Date(2022, 3, 1), humidity: 51 },
        { date: new Date(2022, 4, 1), humidity: 23 },
        { date: new Date(2022, 5, 1), humidity: 46 },
    ];
    
    const soilMoistureData = [
        { date: new Date(2022, 0, 1), moisture: 20 },
        { date: new Date(2022, 1, 1), moisture: 25 },
        { date: new Date(2022, 2, 1), moisture: 30 },
        { date: new Date(2022, 3, 1), moisture: 35 },
        { date: new Date(2022, 4, 1), moisture: 40 },
        { date: new Date(2022, 5, 1), moisture: 45 },
    ];
    
    const commonOptions = {
        background: 'rgba(0, 0, 0, 0)', 
        axes: [
            {
                type: "time",
                position: "bottom",
                nice: true,
            },
            {
                type: "number",
                position: "left",
            },
        ],
        series: [
            {
                type: "area",
                xKey: "date",
                tooltip: {
                    renderer: ({ datum, xKey, yKey }) => {
                        return {
                            content: `${Intl.DateTimeFormat("en-GB").format(datum[xKey])}: ${datum[yKey]}`,
                        };
                    },
                },
            },
        ],
    };
    
    agCharts.AgChart.create({
        container: document.getElementById("temperature-chart"),
        data: temperatureData,
        title: {
            text: "Temperatura (°C)",
        },
        ...commonOptions,
        series: [
            {
                ...commonOptions.series[0],
                yKey: "temperature",
                yName: "Temperatura (°C)",
                fill: 'rgba(236, 182, 83, 0.8)',
            },
        ],
    });
    
    agCharts.AgChart.create({
        container: document.getElementById("water-volume-chart"),
        data: waterVolumeData,
        title: {
            text: "Volume de Água (Litros)",
        },
        ...commonOptions,
        series: [
            {
                ...commonOptions.series[0],
                yKey: "volume",
                yName: "Volume (litros)",
                fill: 'rgba(0, 191, 255, 0.8)',
            },
        ],
    });
    
    agCharts.AgChart.create({
        container: document.getElementById("humidity-chart"),
        data: humidityData,
        title: {
            text: "Umidade Ambiente (%)",
        },
        ...commonOptions,
        series: [
            {
                ...commonOptions.series[0],
                yKey: "humidity",
                yName: "Umidade (%)",
                fill: 'rgba(122, 172, 33, 0.8)',
            },
        ],
    });
    agCharts.AgChart.create({
        container: document.getElementById("soil-moisture-chart"),
        data: soilMoistureData,
        title: {
            text: "Umidade do Solo (%)",
        },
        ...commonOptions,
        series: [
            {
                ...commonOptions.series[0],
                yKey: "moisture",
                yName: "Umidade do Solo (%)",
                fill: 'rgba(160, 82, 45, 0.8)',
            },
        ],
    });
});
