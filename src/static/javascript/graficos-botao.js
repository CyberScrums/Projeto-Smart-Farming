let temperatureChart, soilMoistureChart, humidityChart, waterVolumeChart;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("uploadBtn").addEventListener("change", function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvData = e.target.result;
            const rows = csvData.split("\n");

            const labels = [];
            const temperatureData = [];
            const soilMoistureData = [];
            const humidityData = [];
            const waterVolumeData = [];

            let fixedDate = "";
            rows.forEach((row, index) => {
                if (index === 0) return;
                const columns = row.split(",");
                if (columns.length >= 7) {
                    const timeLabel = `${columns[1]} ${columns[2]}`;
                    labels.push(timeLabel);

                    if (!fixedDate) {
                        fixedDate = columns[1];
                    }

                    temperatureData.push(parseFloat(columns[5].replace(/"/g, '')));
                    soilMoistureData.push(parseFloat(columns[3]));
                    humidityData.push(parseFloat(columns[4]));
                    waterVolumeData.push(parseFloat(columns[6]));
                }
            });

            updateCharts(labels, temperatureData, soilMoistureData, humidityData, waterVolumeData);
        };

        reader.readAsText(file);
    });
});

// Dados do banco de dados
document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch('/api/dados');
    const data = await response.json();

    const labels = [];
    const temperatureData = [];
    const soilMoistureData = [];
    const humidityData = [];
    const waterVolumeData = [];

    data.forEach((item) => {
        const timeLabel = `${item.Data} ${item.Hora}`;
        labels.push(timeLabel);

        temperatureData.push(item.Temperatura);
        soilMoistureData.push(item.UmidadeSolo);
        humidityData.push(item.UmidadeAmbiente);
        waterVolumeData.push(item.VolumeAgua);
    });

    updateCharts(labels, temperatureData, soilMoistureData, humidityData, waterVolumeData);
});

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/medias');
    const data = await response.json();

    const temperaturaMedia = parseFloat(data.TemperaturaMedia).toFixed(1);
    const umidadeSoloMedia = parseFloat(data.UmidadeSoloMedia).toFixed(1);
    const umidadeAmbienteMedia = parseFloat(data.UmidadeAmbienteMedia).toFixed(1);
    const volumeAguaMedia = parseFloat(data.VolumeAguaMedia).toFixed(1);

    document.getElementById('temperatura-media').textContent = `${temperaturaMedia} °C`;
    document.getElementById('umidade-solo-media').textContent = `${umidadeSoloMedia} %`;
    document.getElementById('umidade-ambiente-media').textContent = `${umidadeAmbienteMedia} %`;
    document.getElementById('volume-agua-media').textContent = `${volumeAguaMedia} L`;

    $('#filtro-calendario').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-BR",
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function (e) {
        const selectedDate = e.format('dd/mm/yyyy');
        fetchMediasByDate(selectedDate);
        fetchDadosByDate(selectedDate);
    });

    async function fetchMediasByDate(date) {
        try {
            const response = await fetch(`/api/mediasdata?data=${date}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const data = await response.json();

            if (data.error) {
                alert(data.error);
                return;
            }
            const temperaturaMedia = parseFloat(data.TemperaturaMedia).toFixed(1);
            const umidadeSoloMedia = parseFloat(data.UmidadeSoloMedia).toFixed(1);
            const umidadeAmbienteMedia = parseFloat(data.UmidadeAmbienteMedia).toFixed(1);
            const volumeAguaMedia = parseFloat(data.VolumeAguaMedia).toFixed(1);
            document.getElementById('temperatura-media').textContent = `${temperaturaMedia} °C`;
            document.getElementById('umidade-solo-media').textContent = `${umidadeSoloMedia} %`;
            document.getElementById('umidade-ambiente-media').textContent = `${umidadeAmbienteMedia} %`;
            document.getElementById('volume-agua-media').textContent = `${volumeAguaMedia} L`;
        } catch (error) {
            console.error('Erro:', error);
            if (error.message === 'Erro ao buscar dados') {
                console.log('Dados não encontrados. Exibindo modal de erro.');
                $('#errorModal').modal('show');
            } else {
                alert('Erro ao buscar dados para a data selecionada.');
            }
        }
    }

    async function fetchDadosByDate(date) {
        try {
            const response = await fetch(`/api/dadosdata?data=${date}`);
            const data = await response.json();

            if (data.error) {
                alert(data.error);
                return;
            }

            const labels = data.map(d => d.Hora);
            const temperatureData = data.map(d => d.Temperatura);
            const soilMoistureData = data.map(d => d.UmidadeSolo);
            const humidityData = data.map(d => d.UmidadeAmbiente);
            const waterVolumeData = data.map(d => d.VolumeAgua);

            updateCharts(labels, temperatureData, soilMoistureData, humidityData, waterVolumeData);
        } catch (error) {
            console.error('Erro:', error);
            if (error.message === 'Erro ao buscar dados') {
                console.log('Dados não encontrados. Exibindo modal de erro.');
                $('#errorModal').modal('show');
            } else {
                alert('Erro ao buscar dados para a data selecionada.');
            }
        }
    }

    function updateCharts(labels, temperatureData, soilMoistureData, humidityData, waterVolumeData) {
        const commonOptions = {
            scales: {
                x: {
                    type: 'category',
                    ticks: {
                        color: 'white',
                        autoSkip: true,
                        maxTicksLimit: 6.5,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                    },
                },
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        },
                    },
                },
                legend: {
                    display: true,
                    labels: {
                        color: '#00ff59',
                    },
                },
                title: {
                    display: true,
                    color: 'white',
                },
            },
        };

        if (temperatureChart) temperatureChart.destroy();
        const ctx1 = document.getElementById("temperature-chart").getContext("2d");
        temperatureChart = new Chart(ctx1, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Temperatura (°C)",
                        data: temperatureData,
                        borderColor: "rgba(255,255,51, 1)",
                        backgroundColor: "rgba(255,255,51, 0.6)",
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: commonOptions,
        });

        if (soilMoistureChart) soilMoistureChart.destroy();
        const ctx2 = document.getElementById("soil-moisture-chart").getContext("2d");
        soilMoistureChart = new Chart(ctx2, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Umidade do Solo (%)",
                        data: soilMoistureData,
                        borderColor: "rgba(255,51,51, 1)",
                        backgroundColor: "rgba(255,51,51, 0.6)",
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: commonOptions,
        });

        if (humidityChart) humidityChart.destroy();
        const ctx3 = document.getElementById("humidity-chart").getContext("2d");
        humidityChart = new Chart(ctx3, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Umidade do Ambiente (%)",
                        data: humidityData,
                        borderColor: "rgba(122,172,33, 1)",
                        backgroundColor: "rgba(122,172,33, 0.6)",
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: commonOptions,
        });

        if (waterVolumeChart) waterVolumeChart.destroy();
        const ctx4 = document.getElementById("water-volume-chart").getContext("2d");
        waterVolumeChart = new Chart(ctx4, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Volume de Água (Litros)",
                        data: waterVolumeData,
                        borderColor: "rgba(0,191,255, 1)",
                        backgroundColor: "rgba(0,191,255, 0.6)",
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: commonOptions,
        });
    }
});
