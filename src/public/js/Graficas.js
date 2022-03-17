function GraficaCategoria() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChartCategoria);
    google.charts.setOnLoadCallback(drawChartPersonal);
    //Grafica Categoria
    function drawChartCategoria() {
        let ArregloDatos = [['Categoria','Total']];
        $.ajax({
            url: '/EstaCategoria/' + localStorage.getItem('ProyectoActual'),
            success: function (data) {

                for (let index = 0; index < data.length; index++) {
                     let Categoria = data[index].Grupo
                     let Cantidad = data[index].Cantidad

                     let array = [Categoria,Cantidad]
                     ArregloDatos.push(array)
                }

                console.log(ArregloDatos)
                var data = google.visualization.arrayToDataTable(ArregloDatos); 
                var options = {
                    title: 'Reparto total de actividades'
                };

                var chart = new google.visualization.PieChart(document.getElementById('piechart')); 
                chart.draw(data, options);
            } //Funcion success
        }); //Ajax 
 
    }
    //Grafica Categoria
    function drawChartPersonal() {
        let ArregloDatos = [['Categoria','Total']];
        $.ajax({
            url: '/EstaPersonal/' + localStorage.getItem('ProyectoActual'),
            success: function (data) {

                for (let index = 0; index < data.length; index++) {
                     let Completas = data[index].Completas
                     let Pendientes = data[index].Pendientes

                     let array = ["Completas",Completas]
                     ArregloDatos.push(array)
                     array = ["Pendientes",Pendientes]
                     ArregloDatos.push(array)
                }

                console.log(ArregloDatos)
                var data = google.visualization.arrayToDataTable(ArregloDatos); 
                var options = {
                    title: 'Estatus de tareas',
                    pieHole: 0.2,
                };

                var chart = new google.visualization.PieChart(document.getElementById('donutchart')); 
                chart.draw(data, options);
            } //Funcion success
        }); //Ajax 

 
    }





}
