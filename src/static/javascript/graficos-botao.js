document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("uploadBtn").addEventListener("change", function(event) {
        const file = event.target.files[0];  // Obter o arquivo CSV
        const reader = new FileReader();

        reader.onload = function(e) {
            const csvData = e.target.result;  // Conteúdo do CSV como string
            const rows = csvData.split("\n");  // Dividir em linhas

            const labels = [];  // Para os rótulos do eixo x
            const temperatureData = [];  // Dados para temperatura
            const soilMoistureData = [];  // Dados para umidade do solo
            const humidityData = [];  // Dados para umidade do ambiente
            const waterVolumeData = [];  // Dados para volume de água

            rows.forEach((row, index) => {
                if (index === 0) return;  // Ignorar cabeçalho
                const columns = row.split(",");  // Dividir em colunas
                if (columns.length >= 7) {  // Certificar-se de que há colunas suficientes
                    const dateLabel = `${columns[0]} ${columns[1]} ${columns[2]}`;  // Dia da semana, data, hora
                    labels.push(dateLabel);  // Adicionar ao eixo x

                    temperatureData.push(parseFloat(columns[3]));  // Temperatura
                    soilMoistureData.push(parseFloat(columns[4]));  // Umidade do solo
                    humidityData.push(parseFloat(columns[5]));  // Umidade do ambiente
                    waterVolumeData.push(parseFloat(columns[6]));  // Volume de água
                }
            });

            // Criar gráfico de temperatura
            const ctx1 = document.getElementById("temperature-chart").getContext("2d");
            new Chart(ctx1, {
                type: "line",  // Tipo de gráfico
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Temperatura (°C)",
                            data: temperatureData,  // Dados de temperatura
                            borderColor: "rgba(236, 182, 83, 1)",  // Cor da linha
                            backgroundColor: "rgba(236, 182, 83, 0.2)",  // Cor do preenchimento
                        },
                    ],
                },
            });

            // Criar gráfico de umidade do solo
            const ctx2 = document.getElementById("soil-moisture-chart").getContext("2d");
            new Chart(ctx2, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Umidade do Solo (%)",
                            data: soilMoistureData,  // Dados de umidade do solo
                            borderColor: "rgba(160, 82, 45, 1)",  // Cor da linha
                            backgroundColor: "rgba(160, 82, 45, 0.2)",  // Cor do preenchimento
                        },
                    ],
                },
            });

            // Criar gráfico de umidade do ambiente
            const ctx3 = document.getElementById("humidity-chart").getContext("2d");
            new Chart(ctx3, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Umidade do Ambiente (%)",
                            data: humidityData,  // Dados de umidade do ambiente
                            borderColor: "rgba(122, 172, 33, 1)",  // Cor da linha
                            backgroundColor: "rgba(122, 172, 33, 0.2)",  // Cor do preenchimento
                        },
                    ],
                },
            });

            // Criar gráfico de volume de água
            const ctx4 = document.getElementById("water-volume-chart").getContext("2d");
            new Chart(ctx4, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Volume de Água (Litros)",
                            data: waterVolumeData,  // Dados de volume de água
                            borderColor: "rgba(0, 191, 255, 1)",  // Cor da linha
                            backgroundColor: "rgba(0, 191, 255, 0.2)",  // Cor do preenchimento
                        },
                    ],
                },
            });
        };

        // Ler o arquivo CSV como texto
        reader.readAsText(file);
    });
});
