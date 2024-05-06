$(document).ready(function () {
    const selectedAmenities = {};
    const selectedStates = {};
    const selectedCities = {};

    $('input[type="checkbox"]').click(function () {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');
        const type = $(this).parent().hasClass('locations') ? 'state' : 'city';

        if ($(this).prop('checked') === true) {
            if (type === 'state') {
                selectedStates[id] = name;
            } else {
                selectedCities[id] = name;
            }
        } else if ($(this).prop('checked') === false) {
            if (type === 'state') {
                delete selectedStates[id];
            } else {
                delete selectedCities[id];
            }
        }

        const locationsList = [...Object.values(selectedStates), ...Object.values(selectedCities)].join(', ');

        if (locationsList.length > 30) {
            $('.locations h4').text(locationsList.substring(0, 29) + '...');
        } else {
            $('.locations h4').text(locationsList);
        }

        if ($.isEmptyObject(selectedStates) && $.isEmptyObject(selectedCities)) {
            $('.locations h4').html('&nbsp;');
        }
    });

    // Event listener for the span next to the Reviews h2
    $('.locations h2 span').click(function () {
        const text = $(this).text();
        const reviewsVisible = (text.trim().toLowerCase() === 'hide');

        if (reviewsVisible) {
            // Hide reviews
            $('.reviews').remove();
            $(this).text('show');
        } else {
            // Fetch and display reviews
            // Assuming the function fetchReviews() is defined elsewhere
            fetchReviews();
            $(this).text('hide');
        }
    });

    $('.container .filters button').click(function () {
        const requestData = {
            amenities: Object.keys(selectedAmenities),
            states: Object.keys(selectedStates),
            cities: Object.keys(selectedCities)
        };

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function (places) {
                $('article').remove();
                $.get('http://0.0.0.0:5001/api/v1/users/', function (users) {
                    const newPlaces = places.map(place => {
                        const user = users.find(user => user.id === place.user_id);
                        return `<article>
                                    <div class="title">
                                        <h2>#${place.name}</h2>
                                        <div class="price_by_night">$${place.price_by_night}</div>
                                    </div>
                                    <div class="information">
                                        <div class="max_guest">
                                            <i class="fa fa-users fa-3x" aria-hidden="true"></i><br>
                                            ${place.max_guest} Guests
                                        </div>
                                        <div class="number_rooms">
                                            <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br>
                                            ${place.number_rooms} Bedrooms
                                        </div>
                                        <div class="number_bathrooms">
                                            <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>
                                            ${place.number_bathrooms} Bathroom
                                        </div>
                                    </div>
                                    <div class="user">
                                        <strong>Owner: ${user.first_name} ${user.last_name}</strong>
                                    </div>
                                    <div class="description">
                                        ${place.description}
                                    </div>
                                </article>`;
                    });
                    $("section.places").append(newPlaces.join(''));
                });
            }
        });
    });
});
