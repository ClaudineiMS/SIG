function GetLine(linha){
    console.log(linha)
    linha.classList.toggle("selecionado");
    getDadosIBGE_Cidades(11)
}

function getDadosIBGE_Cidades(Id) {

    const base = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + Id + "/municipios"
    const api = axios.create({
        baseURL: base,
    });
    api.get(base).then((response) => {
        console.log(response.data)
        

    }).catch((err) => {
        console.error("Ops! Ocorreu um erro " + err);
    });
}