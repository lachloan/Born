// Made by Lachlan, advised by many <3
// Telegram: @lockie for issues

// Sets time
function runTime() {
    var dt = new Date();
    var h = dt.getHours(),
        m = dt.getMinutes();
    minutelength = m.toString().length
    if (minutelength == "1") {
        var m = '0' + m
    }
    var _time = (h > 12) ? (h - 12 + ':' + m + 'PM') : (h + ':' + m + 'AM');
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    timediv = document.getElementById('time-info');
    timediv.innerHTML = " ";
    timediv.innerHTML = timediv.innerHTML + '<h1>' + _time + '</h1><h2>' + dayNames[dt.getDay()] + ' ' + dt.getDate() + ' ' + monthNames[dt.getMonth()] + ', ' + dt.getFullYear()
}
// Runs settime on load so we don't wait 5 seconds for it to load
runTime();
// Sets time every 5seconds so it always updates
setInterval(function() {
    runTime()
}, 5000);



// For top sites list
function buildTopsites(mostVisitedURLs) {
    var popupDiv = document.getElementById('most-visited');
    var ul = popupDiv.appendChild(document.createElement('ul'));

    var count = 0;

    for (var i = 0; i < mostVisitedURLs.length; i++) {
        if (count < "10") {
            count++
            var li = document.createElement('li');
            li.id = 'most-visited_' + count.toString();
            var li = ul.appendChild(li);
            var p = li.appendChild(document.createElement('p'));
            p.href = mostVisitedURLs[i].url;
            var link = mostVisitedURLs[i].url;
            li.innerHTML = '<p class="most-visited_items">' + mostVisitedURLs[i].url + '</p>';
            li.onclick = function() {
                getURL(this)
            }
        }
    }
}

function getURL(id) {
    item = document.getElementById(id.id);
    children = item.children;
    url = children[0].innerHTML;
    chrome.tabs.create(createProperties = {
        url: url,
        active: false
    })

}

chrome.topSites.get(buildTopsites);


function CallMethod() {
    $.ajaxSetup({
        headers: {
            'Authorization': "Client-ID abac205bc6a93d2eaa1440ed5b07d38b8d01c66ecd9cff35eb0436a46a7e62d2", // API Authorization for Unsplash API
        }
    });

    $.getJSON('https://api.unsplash.com/photos/random', {
        "w": "1920", // Image height and width. 1080 is nice and scaleable.
        "h": "1080"
    }).done(function(data) {
        $('body').css('background-image', 'url(' + data.urls.custom + ')');

		// Tracking required by Unsplash API guidelines
        UTM = "?utm_source=born&utm_medium=referral&utm_campaign=api-credit";

        user_firstname = data.user.first_name;
        user_lastname = data.user.last_name;
        user_url = data.user.links.html + UTM;
        unsplash_url = "www.unsplash.com" + UTM;

		
        if (user_lastname == null) {
          $("#image-attribution").append('<p>&lt;Photo By <a href="' + user_url + '">' + user_firstname + '</a> / <a href="' + unsplash_url + '"> Unsplash</a>>');
        } else {
            $("#image-attribution").append('<p>&lt;Photo By <a href="' + user_url + '">' + user_firstname + ' ' + user_lastname + '</a> / <a href="' + unsplash_url + '"> Unsplash</a>>');
        }

    })
}

CallMethod();
