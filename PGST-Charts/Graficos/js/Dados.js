/*var labels = [];
var Data = [];

function getDadosIBGE_Cidades(Id) {

    const base = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + Id + "/municipios"
    const api = axios.create({
        baseURL: base,
    });
    api.get(base).then((response) => {
        //console.log(response.data)
        Data.push(response.data.length)

    }).catch((err) => {
        console.error("Ops! Ocorreu um erro " + err);
    });
}

function trazerRepositorios(Tipo) {

    var input, filter;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    const base = "https://servicodados.ibge.gov.br/api/v1/localidades/regioes/" + filter + "/estados"

    const api = axios.create({
        baseURL: base,
    });
    api.get(base).then((response) => {
        response.data.map(value => (
            labels.push(value.nome)
        ))
        response.data.map(key => {
            //console.log(key);
            getDadosIBGE_Cidades(key.id);
            return ""
        })
    }).catch((err) => {
        console.error("Ops! Ocorreu um erro " + err);
    });

    console.log(labels)
    console.log(Data);

    if (labels.length != 0 && Data.length != 0) {

        if (Tipo == "Barras") {
            const ctx = document.getElementById('myChart');

            var myLineChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Cidades',
                        data: Data,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        if ( Tipo == "Pizza"){
            const ctx = document.getElementById('myChart');
            
            var myLineChart = new Chart(ctx, {
                type: 'pizza',
                labels: labels,
                datasets: [
                    {
                      label: 'Cidades',
                      data: Data,
                      borderWidth: 1,
                    }
                ]
            })
        }
    }

    labels = [];
    Data = [];
    //myLineChart.destroy();
}
*/


function get(labels) {
    const base = "../../JSON/Terras_Ind.geojson"
    const api = axios.create({
        baseURL: base,
    });
    api.get(base).then((response) => {
        response.data.features.map(key => {
            if (key.properties.uf_sigla != undefined) {
                if (!labels.includes(key.properties.uf_sigla)) {
                    labels.push(key.properties.uf_sigla)
                }
            }
        })
        //console.log(labels);

    }).catch((err) => {
        console.error("Ops! Ocorreu um erro " + err);
    });
}

