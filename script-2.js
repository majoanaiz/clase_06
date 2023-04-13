async function segundo() {
    const consulta = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson");
    const data = await consulta.json();
    //Declaro variables que parten en cero
    let argentino = 0;
    let australiano = 0;
    let otro = 0;
    //Reviso data con alguna condiciones
    data.features.forEach((t) => {
        if (t.properties.place.includes("Argentina")) {
            argentino = argentino + 1;
        } else if (t.properties.place.includes("Australia")) {
            australiano = australiano + 1;
        } else {
            otro = otro + 1;
        }
    });
    //Creo una variable como un arreglo vacío
    var numeros = [];
    //Empujo a la variable los resultados del contador
    numeros.push(argentino, australiano, otro);
    var nombres = ["En Argentina", "En Australia", "En el resto del mundo"];
    //Ahora puedo armar el gráfico
    new Chart(document.getElementById("earthquakes").getContext("2d"), {
        type: "doughnut",
        data: {
            labels: nombres,
            datasets: [
                { 
                    label: "Earthquakes", 
                    data: numeros, 
                    backgroundColor: ["#e8b4c1", "#80a9cf","#df643e"] 
                }
            ],
        },
        options: {
            plugins: {
                title: {
                    display: false,
                },
            },
            responsive: true,
            layout: {
                padding: 25,
            }
        }
    });
}
segundo().catch((error) => console.error(error));
