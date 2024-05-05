window.addEventListener('load', function () {
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      #('api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const amenity_ids = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      amenity_ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenity_ids[$(this).attr('data-id')];
    }
    if (Object.keys(amenity_ids).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(amenity_ids).join(', '));
    }
  });
  $('.filters button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({})
    }).done(function (data) {
      $('section.places').empty();
      $('section.places').append('<h1>Places</h1>');
      for (const place of data) {
        const template = `<article>
        <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">

      $${place.price_by_night}
      </div>
        </div>
        <div class="information">
        <div class="max_guest">

      ${place.max_guest} Guest

      </div>
        <div class="number_rooms">

      ${place.number_rooms} Bedrooms
        </div>
          <div class="number_bathrooms">

      ${place.number_bathrooms} Bathroom

      </div>
        </div>
        <div class="description">

      ${place.description}

      </div>

      </article>`;
        $('section.places').append(template);
     }
    });
  });
});
