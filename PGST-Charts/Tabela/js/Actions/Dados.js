function Dados(arr) {  
    const base = "../../../PGST-Charts/JSON/Terras_Ind.geojson"
    const api = axios.create({
        baseURL: base,
    });
    api.get(base).then((response) => {
        var temp = [];
        response.data.features.map( value => {
            temp.push(value.properties);
        });
        arr = temp.map(function(obj) {
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
        });
        arr.unshift(Object.keys(response.data.features[0].properties))
        document.getElementById("tabela").appendChild(criarTabela(arr));
        
    }).catch((err) => {
            console.error("Ops! Ocorreu um erro " + err);
    });
}