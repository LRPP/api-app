var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    var settings = {
        url: YOUTUBE_BASE_URL,
        data: {
            part: 'snippet',
            key: 'AIzaSyBcNX1xVrmVGTDyHb_ZDL9qeUV24VG6NLU',
            q: 'searchTerm',
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}



function displayYouTubeSearchData(data) {
    var resultElement = '';
    if (data.part) {
        data.part.forEach(function(snippet) {
            resultElement += '<p>' + snippet.title + '</p>';
        });
    } else {
        resultElement += '<p>No results</p>';
    }

    $('.js-search-results').html(resultElement);
}

function watchSubmit() {
    $('.js-search-form').submit(function(e) {
        e.preventDefault();
        var query = $(this).find('.js-query').val();
        getDataFromApi(query, displayYouTubeSearchData);
    });
}

$(function() { watchSubmit(); });