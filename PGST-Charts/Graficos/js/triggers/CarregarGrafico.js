function show(){
    $('#meuModal').on('shown.bs.modal', function () {
        $('#meuInput').trigger('focus')
    })
}