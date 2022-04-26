

function getFestivals() {

    $.ajax({
        url: '/todos',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            sortFestivalarray = response.festivalList;
        },
        error: (jqXHRresponse) => {
            renderMessage(jqXHRresponse.responseJSON.message);
        },
    }).then(() => {
    });
}
