console.log("Sanity Check: JS is working");

var github_endpoint = "https://api.github.com/users/";
var username;
var fullname;

$(document).ready(function (){
  $('#ghusername').on('submit', function (e) {
    e.preventDefault();
    var username = $('#ghuserdname').val();
    console.log('search button clicked for ' + username);
    callGithubAPI();
  });

  function callGithubAPI(){
    $.ajax({
      method: "GET",
      url: github_endpoint + $('#ghuserdname').val(),
      success: displayGithubInfo,
      error: handleError
    });
  }

  function displayGithubInfo(json) {
    // else we have a user and we display their info
    console.log(json);
    var fullname   = json.name;
    var username   = json.login;
    var aviurl     = json.avatar_url;
    var profileurl = json.html_url;
    var location   = json.location;
    var followersnum = json.followers;
    var followingnum = json.following;
    var reposnum     = json.public_repos;

    if (fullname !== null) {
      console.log('name is not null, current name is:', fullname);
    } else {
     fullname = json.login;
     console.log('new fullname', json.login);
    }

    var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
    outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
    outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
    outhtml = outhtml + '<div class="repolist clearfix">';

   $('#ghinfo').html(outhtml);

  }

  function handleError(xhr, status, errorThrown) {
    console.log("Error " + errorThrown);
    console.log("Status: " + status);
    console.log(xhr);
    if(errorThrown == "Not Found" ) {
      $('#ghinfo').append("<h2>No User Info Found</h2>");
    }
  }

});
