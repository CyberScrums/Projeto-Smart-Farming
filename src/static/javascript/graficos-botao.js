document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("uploadBtn").addEventListener("change", function(event) {
        const file = event.target.files[0];  
        const reader = new FileReader();

        reader.onload = function(e) {
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
                    const timeLabel = `${columns[2]}`;  
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

            const commonOptions = {
                scales: {
                    x: {
                        type: "category", 
                        ticks: {
                            color: "white",  
                            maxTicksLimit: 10, 
                        },
                    },
                    y: {
                        beginAtZero: true, 
                        ticks: {
                            color: "white",  
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        mode: 'nearest',  
                        intersect: false, 
                        callbacks: {
                            label: function(context) {
                                return `Valor: ${context.parsed.y}`; 
                            },
                        },
                    },
                    legend: {
                        display: true,  
                        labels: {
                            color: "white",  
                        },
                    },
                    title: {
                        display: true,
                        text: `Data: ${fixedDate}`,  
                        position: 'bottom',  
                        color: "white",
                    },
                },
            };

            
            const ctx1 = document.getElementById("temperature-chart").getContext("2d");
            new Chart(ctx1, {
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

            const ctx2 = document.getElementById("soil-moisture-chart").getContext("2d");
            new Chart(ctx2, {
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

            const ctx3 = document.getElementById("humidity-chart").getContext("2d");
            new Chart(ctx3, {
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

            const ctx4 = document.getElementById("water-volume-chart").getContext("2d");
            new Chart(ctx4, {
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

        }; 

        reader.readAsText(file);  
    }); 
});  
