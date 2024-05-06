$(document).ready(function () {
    const selectedAmenities = {};

    $('input[type="checkbox"]').click(function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');

      if ($(this).prop('checked') === true) {
        selectedAmenities[amenityId] = amenityName;
      } else if ($(this).prop('checked') === false) {
        delete selectedAmenities[amenityId];
      }

      const amenityListText = Object.values(selectedAmenities).join(', ');
      const amenityDisplay = $('.amenities h4');

      if (amenityListText.length > 30) {
        amenityDisplay.text(amenityListText.substring(0, 29) + '...');
      } else {
        amenityDisplay.text(amenityListText);
      }

      if ($.isEmptyObject(selectedAmenities)) {
        amenityDisplay.html('&nbsp;');
      }
    });
  });