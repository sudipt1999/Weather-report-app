$(function() {

    const btn = $('#search-btn')
    const address = $('#place-name')


    btn.click(function(event) {
        submitAddress(address.val())
        address.val("")
    })

    address.keypress(function(event) {
        //check if enter key is pressed
        if (event.which == 13){
            submitAddress(address.val())
            address.val("")
        }
     });


     const showModal = (data) => {
         if(!data){
             return;
         }
        toggleLoading(false);

        const place = $('#place');
        const checkboxes = $('#checkboxes');
        const headers = data.headers;
        const tbody = $('#tbody');
        const thead = $('#thead');
        let values = {head: '', body: ''};

        place.text(data.location);
        Object.keys(data.forecastData).map(key=>{
            let head = Object.keys(headers).includes(key) ? headers[key] : key;
            if(key == "summary" && head.text && head.text.length){
                data.forecastData[key] = `<img src="${headers.icon.text}${data.forecastData["icon"]}.png" id="${'img-'+key}" alt="${data.forecastData[key]}" style="width:60px"/> ${data.forecastData[key]}`;
            }
            
            if(head.show){
                values.head += `<th style="${!head.default? 'display:none' : ''}" class="${'column-' + key}">${head.text}</th>\n`;
                values.body += `<td class="${'column-' + key}" style="${!head.default? 'display:none' : ''}">${data.forecastData[key]}</td>`;
                checkboxes.append(`<div id="${'input-' + key}" class="col-4"><input type="checkbox" id="${key}" ${head.default? 'checked' : ''}><label for="${key}">${head.text}</label></div>`);
            }
        });
        thead.append(values.head);
        tbody.append(values.body);
        thead.children('th').css('width', '120px');
        $('.modal').modal('show');
     }
     
     $(document).on('change', 'input[type="checkbox"]', function(){
        $('.column-' + $(this).attr('id')).toggle();
     });

     const submitAddress = (address) => {
         if(address.length == 0) {
             // a invalid address showing a model stating invlaid address
             $('#invalid-alert').addClass('show')
             setTimeout(()=>{
                $('#invalid-alert').removeClass('show')
             },2000)
             return
            }

            toggleLoading(true);

            // making call to server for weather report
            const data = JSON.stringify({address})
            $.ajax({

                url : '/',
                type : 'POST',
                data : data,
                dataType:'json',
                contentType: 'application/json',
                success : function(data) {
                    showModal(data)
                },
                error : function(request,error)
                {
                    // a invalid address showing a model stating invlaid address
                    $('#invalid-alert').addClass('show')
                    setTimeout(()=>{
                        $('#invalid-alert').removeClass('show')
                    },2000)
                    return
                }
            });

     }

    const toggleLoading = (isLoading) => {
        document.querySelector('#place-name').disabled = isLoading;
        document.querySelector('#search-btn').disabled = isLoading;
    };
});