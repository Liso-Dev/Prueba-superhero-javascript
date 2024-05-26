$(document).ready(function () {
    $('#searchForm').submit(function (event) {
        event.preventDefault();

        const heroId = $("#heroId").val();

        if (heroId < 1 || heroId > 731) {
            alert('El número de superhéroe debe estar entre 1 y 731.');
            return;

        }

        $.ajax({
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + heroId,
            type: "GET",
            dataType: "json",
            success: function (response) {

                const heroInfo = `
                <h1>Super Héroe Encontrado</h1>
                    <div class="card text-bg-dark">
                        <div class="card-body">
                        <div class="row align-items-start">
                        <div class="col">
                        <img src="${response.image.url}" class="card-img-top" alt="${response.name}">
                        </div>
                        <div class="col text-start">
                        <h5 class="card-title">Nombre: ${response.name}</h5>
                        <p class="card-text">Conexiones: ${response.connections["group-affiliation"]}</p>
                            <p class="card-text">Ocupación: ${response.work.occupation}</p>
                            <p class="card-text">Primera aparición: ${response.biography["first-appearance"]}</p>
                            <p class="card-text">Altura: ${response.appearance.height}</p>
                            <p class="card-text">Peso: ${response.appearance.weight}</p>
                            <p class="card-text">Alianzas: ${response.biography.aliases}</p>
                        </div>
                            
                        </div>
                    </div>
                `;
                $('#heroInfo').html(heroInfo);

                const chartData = [];
                $.each(response.powerstats, function (stat, value) {
                    chartData.push({ label: stat, y: parseInt(value) || 0 });
                });

                const chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    title: {
                        text: "Estadísticas de Poder de " + response.name,
                    },
                    data: [{
                        type: "pie",
                        startAngle: 240,
                        yValueFormatString: "##0\"%\"",
                        indexLabel: "{label} {y}",
                        dataPoints: chartData
                    }]
                });
                chart.render();
            },

            error: function (error) {
                console.log("Objeto error: ", error)
                console.error('Error al obtener los datos:', error.status);
            }
        });
    });
});

