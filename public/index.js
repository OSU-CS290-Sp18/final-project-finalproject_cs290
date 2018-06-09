


var allProfiles = [];



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



function parsepprofile(profileElem) {

    var profile = {};
  
    var profileText = profileElem.querySelector('.profile-text');
    profile.text = profileText.textContent.trim();
  
    var profileName = twitElem.querySelector('.profile-name a');
    profile.name = profileName.textContent.trim();
  
    var profilePhoto = twitElem.querySelector('.profile-photo a');
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