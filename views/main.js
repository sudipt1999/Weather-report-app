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


         const place = $('#place')
         place.text(data.location)

         const tbody = $('#tbody')
         let values = Object.keys(data.forecastData).map(key=>{
            return(
                `<tr>
                    <td>${key}</td>
                    <td>${data.forecastData[key]}</td>
                </tr>
                `
            )
         })

         tbody.append(values.join())
         $('.modal').modal('show')
     }





     const submitAddress = (address) => {
         if(address.length == 0) {
             // a invalid address showing a model stating invlaid address
             $('#invalid-alert').addClass('show')
             setTimeout(()=>{
                $('#invalid-alert').removeClass('show')
             },2000)
             return
            }

            // making call to server for weather report
            const data = JSON.stringify({address})
            console.log(data)
            $.ajax({

                url : '/',
                type : 'POST',
                data : data,
                dataType:'json',
                contentType: 'application/json',
                success : function(data) {              
                  //  alert('Data:');
                    console.log(data)
                    showModal(data)
                },
                error : function(request,error)
                {
                    console.log(error)
                    // a invalid address showing a model stating invlaid address
                    $('#invalid-alert').addClass('show')
                    setTimeout(()=>{
                        $('#invalid-alert').removeClass('show')
                    },2000)
                    return
                }
            });

     }

});