var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");
var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputE1.value.trim();

    if (username) {
        getUserRepos(username);
        repoContainerE1.textContent = "";
        nameInputE1.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    
    console.log(event);
};

var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
              console.log(data);
              displayRepos(data, user);
            });
          } else {
            alert('Error: ' + response.statusText);
          }
        })
        .catch(function(error) {
          alert('Unable to connect to GitHub');
        });
    };

  var displayRepos = function(repos, searchTerm) {
      console.log(repos);
      console.log(searchTerm);

      //clear old content
      repoContainerE1.textContent = "";
      repoSearchTerm.textContent = searchTerm;

      //loop over repos
      for (var i = 0; i < repos.length; i++) {
          //format repo name
          var repoName = repos[i].owner.login + "/" + repos[i].name;

          //create a container for each repo
          var repoE1 = document.createElement("div");
          repoE1.classList = "list-item flex-row justify-space-between align-center";
 
          //create a span element to hold repository name
          var titleE1 = document.createElement("span");
          titleE1.textContent = repoName;

          //append to container
          repoE1.appendChild(titleE1);

          // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoE1.appendChild(statusEl);

    //append container to the dom
    repoContainerE1.appendChild(repoE1);
      }
  };

  userFormE1.addEventListener("submit", formSubmitHandler);

  
  userFormE1.addEventListener("submit", formSubmitHandler);