//mongodb getting name for post url
function getnameFromURL() {
  var path = window.location.pathname;
  var pathParts = path.split('/');
  if (pathParts[1] === "lizards") {
    return pathParts[2];
  } else {
    return null;
  }
}
//^^

function insertNewProfile(profileDescription, profileName, profilePhoto, profileHearts) {
    var profileTemplate = Handlebars.templates.profile;

    var newProfileHTML = profileTemplate({
        name: profileName,
        photoURL: profilePhoto,
        description: profileDescription,
        hearts: profileHearts
    });

    var profileContainer = document.querySelector('.profile-container');
    profileContainer.insertAdjacentHTML('beforeend', newProfileHTML);
    hideCreateProfileModal();
}

var allProfiles = [];

function handleModalAcceptClick() {

    var profileDescription = document.getElementById('profile-description-input').value;
    var profileName = document.getElementById('profile-name-input').value;
    var profilePhoto = document.getElementById('profile-photo-input').value;

    if (profileDescription && profileName && profilePhoto) {

      var request = new XMLHttpRequest();
      var url = "/lizards/addProfile";
      request.open("POST", url);

      var requestBody = JSON.stringify({
        name: profileName,
        photoURL: profilePhoto,
        description: profileDescription,
        hearts: 0
      });

      request.addEventListener('load', function (event) {
        if (event.target.status === 200) {
          var profileTemplate = Handlebars.templates.profile;
          var newProfileHTML = profileTemplate({
            name: profileName,
            photoURL: profilePhoto,
            description: profileDescription,
            hearts: 0
          });
          var profileContainer = document.querySelector('.profile-container');
          profileContainer.insertAdjacentHTML('beforeend', newProfileHTML);
        } else {
          alert("Error storing photo: " + event.target.response);
        }
      });

      request.setRequestHeader('Content-Type', 'application/json');
      request.send(requestBody);

      clearSearchAndReinsertProfiles();
      hideCreateProfileModal();

    }
    else {
      alert('You must specify your name, description, and provide a photo for your profile.');
    }
}

function handleModalDeleteClick() {

    var profileName = document.getElementById('profile-delete-input').value;

    if(profileName) {
      var request = new XMLHttpRequest();
      //var name = getNameFromURL();
      //var url = "/lizards/" + profileName + "/removeProfile";
      var url = "/lizards/removeProfile";
      request.open("POST", url);
      var requestBody = JSON.stringify({
        name: profileName,
      });

      request.addEventListener('load', function (event) {
        console.log(event.target.status);
        if (event.target.status === 200) {
          console.log("Profile Deleted");
        }
        else {
          console.log(event.target.status);//correct
          alert("Error deleting profile");
        }
        });

      request.setRequestHeader('Content-Type', 'application/json');
      request.send(requestBody);//fails here

      clearSearchAndReinsertProfiles();

      hideDeleteProfileModal();
    }
    else {

      alert('You must specify the name');

    }
}

function clearSearchAndReinsertProfiles() {
    document.getElementById('navbar-search-input').value = "";
    doSearchUpdate();
}

function showCreateProfileModal() {

    var modalBackdrop = document.getElementById('modal-backdrop');
    var createProfileModal = document.getElementById('create-profile-modal');

    // Show the modal and its backdrop.
    modalBackdrop.classList.remove('hidden');
    createProfileModal.classList.remove('hidden');
}

function showDeleteProfileModal() {

    var modalBackdrop = document.getElementById('modal-backdrop');
    var deleteProfileModal = document.getElementById('delete-profile-modal');

    // Show the modal and its backdrop.
    modalBackdrop.classList.remove('hidden');
    deleteProfileModal.classList.remove('hidden');
}

function clearProfileInputs() {

    var profileInputs = document.getElementsByClassName('profile-input-element');
    for (var i = 0; i < profileInputs.length; i++) {
      var input = profileInputs[i].querySelector('input, textarea');
      input.value = '';
    }
}

function hideCreateProfileModal() {

    var modalBackdrop = document.getElementById('modal-backdrop');
    var createProfileModal = document.getElementById('create-profile-modal');

    // Hide the modal and its backdrop.
    modalBackdrop.classList.add('hidden');
    createProfileModal.classList.add('hidden');

    clearProfileInputs();
}

function hideDeleteProfileModal() {

    var modalBackdrop = document.getElementById('modal-backdrop');
    var deleteProfileModal = document.getElementById('delete-profile-modal');

    // Hide the modal and its backdrop.
    modalBackdrop.classList.add('hidden');
    deleteProfileModal.classList.add('hidden');

    clearProfileInputs();
}

function profileMatchesSearch(profile, searchQuery) {

    if (!searchQuery) {
      return true;
    }

    searchQuery = searchQuery.trim().toLowerCase();
    return (profile.name + " " + profile.description).toLowerCase().indexOf(searchQuery) >= 0;
}

function doSearchUpdate() {
    /*
      Grab the search query from the navbar search box.
     */
    var searchQuery = document.getElementById('navbar-search-input').value;

    var profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
      while (profileContainer.lastChild) {
        profileContainer.removeChild(profileContainer.lastChild);
      }
    }

    allProfiles.forEach(function (profile) {
      if (profileMatchesSearch(profile, searchQuery)) {
        insertNewProfile(profile.description, profile.name, profile.photoURL, profile.hearts);
      }
    });
}

function parseProfile(profileElem) {

    var profile = {};

    var profileDescription = profileElem.querySelector('.profile-description');
    profile.description = profileDescription.textContent.trim();

    var profileName = profileElem.querySelector('.profile-name');
    profile.name = profileName.textContent.trim();

    var profilePhoto = profileElem.querySelector('.profile-photo');
    profile.photoURL = profilePhoto.src;

    var profileHearts = profileElem.querySelector('.hearts');
    profile.hearts = profileHearts.textContent.trim();

    return profile;
}

/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

    var profileElems = document.getElementsByClassName('profile');
    for (var i = 0; i < profileElems.length; i++) {
      allProfiles.push(parseProfile(profileElems[i]));
    }

    var createProfileButton = document.getElementById('create-profile-button');
    if (createProfileButton) {
      createProfileButton.addEventListener('click', showCreateProfileModal);
    }

    var deleteProfileButton = document.getElementById('delete-profile-button');
    if (deleteProfileButton) {
      deleteProfileButton.addEventListener('click', showDeleteProfileModal);
    }

    var modalDeleteClose = document.querySelector('#delete-profile-modal .modal-close-button');
    if (modalDeleteClose) {
      modalDeleteClose.addEventListener('click', hideDeleteProfileModal);
    }

    var modalDeleteCancelButton = document.querySelector('#delete-profile-modal .delete-cancel-button');
    if (modalDeleteCancelButton) {
      modalDeleteCancelButton.addEventListener('click', hideDeleteProfileModal);
    }

    var modalDelete = document.querySelector('#delete-profile-modal .modal-delete-button');
    if (modalDelete) {
      modalDelete.addEventListener('click', handleModalDeleteClick);
    }

    var modalClose = document.querySelector('#create-profile-modal .modal-close-button');
    if (modalClose) {
      modalClose.addEventListener('click', hideCreateProfileModal);
    }

    var modalCancelButton = document.querySelector('#create-profile-modal .modal-cancel-button');
    if (modalCancelButton) {
      modalCancelButton.addEventListener('click', hideCreateProfileModal);
    }

    var modalAccept = document.querySelector('#create-profile-modal .modal-accept-button');
    if (modalAccept) {
      modalAccept.addEventListener('click', handleModalAcceptClick);
    }

    var searchButton = document.getElementById('navbar-search-button');
    if (searchButton) {
      searchButton.addEventListener('click', doSearchUpdate);
    }

    var searchInput = document.getElementById('navbar-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', doSearchUpdate);
    }

  });
