
function insertNewProfile(profileText, profileName, profilePhoto) {

    var profileTemplate = Handlebars.templates.profile;
  
    var newProfileHTML = profileTemplate({
    description: profileDescription,
    name: profileName,
    photoURL: profilePhoto
    });
  
    var profileContainer = document.querySelector('.profile-container');
    profileContainer.insertAdjacentHTML('beforeend', newProfileHTML);
  
  }

var allProfiles = [];

function handleModalAcceptClick() {

    var profileDescription = document.getElementById('profile-desciption-input').value;
    var profileName = document.getElementById('profile-name-input').value;
    var profilePhoto = document.getElementById('profile-photo-input').value;
  
    /*
     * Only generate the new twit if the user supplied values for both the twit
     * text and the twit attribution.  Give them an alert if they didn't.
     */
    if (profileDescription && profileName && profilePhoto) {
  
      allProfiles.push({
        description: profileDescription,
        name: profileName,
        photoURL: profilePhoto
      });
  
      clearSearchAndReinsertProfiles();
  
      hideCreateProfileModal();
  
    } else {
  
      alert('You must specify your name, description, and provide a photo for your profile.');
  
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

function profileMatchesSearch(profile, searchQuery) {
    /*
     * An empty query matches all twits.
     */
    if (!searchQuery) {
      return true;
    }
  
    /*
     * The search query matches the twit if either the twit's text or the twit's
     * author contains the search query.
     */
    searchQuery = searchQuery.trim().toLowerCase();
    return (profile.author + " " + profile.text).toLowerCase().indexOf(searchQuery) >= 0;
}

function doSearchUpdate() {

    /*
     * Grab the search query from the navbar search box.
     */
    var searchQuery = document.getElementById('navbar-search-input').value;
  
    /*
     * Remove all twits from the DOM temporarily.
     */
    var profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
      while (profileContainer.lastChild) {
        profileContainer.removeChild(profileContainer.lastChild);
      }
    }
  
    /*
     * Loop through the collection of all twits and add twits back into the DOM
     * if they match the current search query.
     */
    allProfiles.forEach(function (profile) {
      if (profileMatchesSearch(profile, searchQuery)) {
        insertNewProfile(profile.description, profile.name, profile.photo);
      }
    });
}

function parsepprofile(profileElem) {

    var profile = {};
  
    var profileText = profileElem.querySelector('.profile-text');
    profile.text = profileText.textContent.trim();
  
    var profileName = profileElem.querySelector('.profile-name a');
    profile.name = profileName.textContent.trim();
  
    var profilePhoto = profileElem.querySelector('.profile-photo a');
    profile.photo = profilePhoto.textContent.trim();

    return profile;
}

/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

    // Remember all of the existing twits in an array that we can use for search.
    var profileElems = document.getElementsByClassName('profile');
    for (var i = 0; i < profileElems.length; i++) {
      allProfiles.push(parseProfile(profileELems[i]));
    }
  
    var createProfileButton = document.getElementById('create-profile-button');
    if (createProfileButton) {
      createProfileButton.addEventListener('click', showCreateProfileModal);
    }
  
    var modalClose = document.querySelector('#create-profile-modal .modal-close-button');
    if (modalClose) {
      modalClose.addEventListener('click', hideCreateProfileModal);
    }
  
    var modalCancelButton = document.querySelector('#create-profile-modal .modal-cancel-button');
    if (modalCancel) {
      modalCancel.addEventListener('click', hideCreateProfileModal);
    }
  
    var modalAccept = document.querySelector('#create-profile-modal .modal-accept-button');
    if (modalAccept) {
      modalAccept.addEventListener('click', handleModalAccept);
    }
  
    var search = document.getElementById('navbar-search-button');
    if (search) {
      searchButton.addEventListener('click', doSearchUpdate);
    }
  
    var searchInput = document.getElementById('navbar-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', doSearchUpdate);
    }
  
  });