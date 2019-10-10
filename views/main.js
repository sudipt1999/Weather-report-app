$(function() {
  const btn = $('#search-btn');
  const address = $('#place-name');
  let checkboxStates = {};
  btn.click(function(event) {
    submitAddress(address.val());
    address.val('');
  });

  address.keypress(function(event) {
    //check if enter key is pressed
    if (event.which == 13) {
      submitAddress(address.val());
      address.val('');
    }
  });

  const showModal = data => {
    if (!data) {
      return;
    }

    render(data);
    $('.modal').modal('show');
  };

  const render = data => {
    const forecastDataKeys = Object.keys(data.forecastData);
    const place = $('#place');
    place.text(data.location);

    const checkboxes = $('#checkboxes');
    const checkboxesValues = forecastDataKeys.map(key => {
      checkboxStates[key] = true;
      return `<div><input type="checkbox" id="${key}" checked><label for="${key}">${key}</label></div>`;
    });

    checkboxes.append(checkboxesValues.join(' '));

    forecastDataKeys.map(key => {
      $(`#${key}`).click(function() {
        checkboxStates[key] = !checkboxStates[key];
        console.log(checkboxStates);
        renderTable(data);
      });
    });

    renderTable(data);
  };

  const renderTable = data => {
    const forecastDataKeys = Object.keys(data.forecastData);

    const tbody = $('#tbody');
    tbody.empty();
    let values = forecastDataKeys.map(key => {
      if (!checkboxStates[key]) return ``;
      return `<tr>
                    <td>${key}</td>
                    <td>${data.forecastData[key]}</td>
                </tr>
                `;
    });
    tbody.append(values.join());
  };

  const submitAddress = address => {
    if (address.length == 0) {
      // a invalid address showing a model stating invlaid address
      $('#invalid-alert').addClass('show');
      setTimeout(() => {
        $('#invalid-alert').removeClass('show');
      }, 2000);
      return;
    }

    // making call to server for weather report
    const data = JSON.stringify({ address });
    console.log(data);
    $.ajax({
      url: '/',
      type: 'POST',
      data: data,
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        //  alert('Data:');
        console.log(data);
        showModal(data);
      },
      error: function(request, error) {
        console.log(error);
        // a invalid address showing a model stating invlaid address
        $('#invalid-alert').addClass('show');
        setTimeout(() => {
          $('#invalid-alert').removeClass('show');
        }, 2000);
        return;
      }
    });
  };
});
