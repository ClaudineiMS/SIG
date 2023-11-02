function openNav(type) {
    //console.log(type);
    document.getElementById("mySidenav").style.width = "44.3%";
    if ( type == "Barras"){
      document.getElementById('Grafico').innerHTML = '<object id="graph" class="Bar" type="text/html" data="PGST-Charts/Graficos/html/GraficoDeBarras.html"></object>'
    }
    if ( type == "Pizza"){
      document.getElementById('Grafico').innerHTML = '<object id="graph" class="Pie" type="text/html" data="PGST-Charts/Graficos/html/GraficoDePizza.html"></object>'
    }
    if ( type == "Linha"){
      document.getElementById('Grafico').innerHTML = '<object id="graph" class="Line" type="text/html" data="PGST-Charts/Graficos/html/GraficoDeLinha.html"></object>'
    }
    if ( type == "Area"){
      document.getElementById('Grafico').innerHTML = '<object id="graph" class="Area" type="text/html" data="PGST-Charts/Graficos/html/GraficoDeArea.html"></object>'
    }
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    var temp = document.getElementById('graph');
    $(temp).remove();
  }