(function ($) {
    $('button').on('click', function () {
        // remove resultset if this has already been run
        $('.content ul').remove();
        // add spinner to indicate something is happening
        $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
        
        // get selected zip code from selectbox
        var zip = $('select option:selected').text();

        // make AJAX call
        var potHolesAccessEndPoint = 'http://data.cityofchicago.org/resource/7as2-ds3y.json?';
        var filter1 = 'STATUS=Open&';
        $.getJSON(potHolesAccessEndPoint+filter1+'ZIP=' + zip, function (data) {
     
            var items = [],
                $ul;
            
            $.each(data, function (key, val) {
                //iterate through the returned data and build a list
                items.push('<li id="' + key + '"><span class="name">' + val.street_address + '</span><br><span class="addr">' + val.location.latitude + '</span> <span class="city">' + val.location.longitude + '</span></li>');
            });
            // if no items were returned then add a message to that effect
            if (items.length < 1) {
                items.push('<li>No results for this ZIP code, try again!</li>');
            }
            
            // remove spinner
            $('.fa-spin').remove();
            
            // append list to page
            $ul = $('<ul />').appendTo('.content');
            
            //append list items to list
            $ul.append(items);
        });
    });
}(jQuery));