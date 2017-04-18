var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    var settings = {
        url: YOUTUBE_BASE_URL,
        data: {
            part: 'snippet',
            key: 'AIzaSyBcNX1xVrmVGTDyHb_ZDL9qeUV24VG6NLU',
            q: searchTerm,
            maxResults: 50,
            //order: title,
            //type: video,
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}



function displayYouTubeSearchData(data) {
    var resultElement = '';
    if (data.items) {
        data.items.forEach(function(item) {
            resultElement += '<p>' + item.snippet.title + '</p><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.medium.url + '"></a>';
        });
    } else {
        resultElement += '<p>No results</p>';
    }

    $('.js-search-results').html(resultElement);
}

function watchSubmit() {
    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        var query = $(this).find('.js-query').val();
        getDataFromApi(query, displayYouTubeSearchData);
    });
}

$(function() { watchSubmit(); });