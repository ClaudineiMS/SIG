
function criarTabela(conteudo) {
  var tabela = document.createElement("table");
  tabela.id = "myTable";
  var thead = document.createElement("thead");
  thead.class = "header";
  var tbody = document.createElement("tbody");
  var thd = function (i) { return (i == 0) ? "th" : "td"; };
  var tr = document.createElement("tr");
  
  /*for ( var j = 0; j < conteudo[0].length; j++ ){
    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.id = "search";
    var td = document.createElement("td");
    td.appendChild(input);
    tr.appendChild(td);
  }
  tbody.appendChild(tr);*/

  for (var i = 0; i < conteudo.length; i++) {
    var tr = document.createElement("tr");
    tr.id = i;
    for (var o = 0; o < conteudo[i].length; o++) {
      var t = document.createElement(thd(i));
      var texto = document.createTextNode(conteudo[i][o]);
      t.appendChild(texto);
      tr.appendChild(t);
      //Click
      if (o == 0) {
        tr.addEventListener("click", function () {
          //Adicionar ao atual
          GetLine(this);
        });
      }
    }
    (i == 0) ? thead.appendChild(tr) : tbody.appendChild(tr);
  }
  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  return tabela;
}
