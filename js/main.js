var imageInput = document.getElementById("avatarInput");
var nameInput = document.getElementById("contactName");
var phoneInput = document.getElementById("contactPhone");
var emailInput = document.getElementById("contactEmail");
var addressInput = document.getElementById("contactAddress");
var groupInput = document.getElementById("contactGroup");
var noteInput = document.getElementById("contactNotes");
var favouriteInput = document.getElementById("contactFavorite");
var emergencyInput = document.getElementById("contactEmergency");
var searchInput = document.getElementById("search");
var contactsList = [];

var favouriteList = [];

var emergancyList = [];

var filterContact = [];

checkDataStored();

function resetAllInputs() {
  imageInput.value = "";
  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  addressInput.value = "";
  groupInput.value = "";
  noteInput.value = "";
  favouriteInput.value = "";
  emergencyInput.value = "";
  searchInput.value = "";
}
function checkDataStored() {
  contactsList = JSON.parse(localStorage.getItem("listOfContact"))
    ? JSON.parse(localStorage.getItem("listOfContact"))
    : [];
  favouriteList = JSON.parse(localStorage.getItem("favList"))
    ? JSON.parse(localStorage.getItem("favList"))
    : [];
  emergancyList = JSON.parse(localStorage.getItem("emgList"))
    ? JSON.parse(localStorage.getItem("emgList"))
    : [];
  displayContats(contactsList);
 
}
document.getElementById("total-contact").innerHTML = contactsList.length;
document.getElementById("total-contact-fav").innerHTML = favouriteList.length;
document.getElementById("total-contact-emer").innerHTML = emergancyList.length;

function addContact() {
  if (isNameValid() !== "valid") {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a name for the contact!",
    });
  } else if (isPhoneValid() !== "valid") {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
  } else if (isEmailValid() !== "valid") {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
  } else {
    var contact = {
      id: Math.floor(Math.random() * 100),
      image: imageInput.value,
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      address: addressInput.value,
      group: groupInput.value,
      note: noteInput.value,
      favourite: favouriteInput.checked,
      emergency: emergencyInput.checked,
    };
    contactsList.push(contact);

    localStorage.setItem("listOfContact", JSON.stringify(contactsList));
    if (contact.favourite) {
      favouriteList.push(contact);
      localStorage.setItem("favList", JSON.stringify(favouriteList));
    }
    if (contact.emergency) {
      emergancyList.push(contact);
      localStorage.setItem("emgList", JSON.stringify(emergancyList));
    }
    resetAllInputs();
    displayContats(contactsList);
    var modal = bootstrap.Modal.getInstance(
      document.getElementById("exampleModal"),
    );
    modal.hide();

    document.getElementById("total-contact").innerHTML = contactsList.length;
    Swal.fire({
      title: "Added!",
      text: "Contact has been add successfully.",
      icon: "success",
      draggable: true,
    });
  }
 
}

function displayContats(contacts) {
  if (filterContact.length !== 0) {
    contacts = filterContact;
  } else {
    contacts = contactsList;
  }
  if (contacts.length === 0) {
    document.getElementById("rowContactLeft").innerHTML = `<div class="row g-3">
      <div class="col-12 text-center py-5">
        <div class="mb-4">
        <i
            class="fa-solid fa-address-book text-muted"
            style="font-size: 5rem"
        ></i>
        </div>
        <h2 class="h4 text-muted mb-3">No contacts found</h2>
        <p class="text-secondary">
        Click "Add Contact" to get started
        </p>
        </div>
    </div>
    `;
    return;
  }

  var cartona = "";
  for (var i = 0; i < contacts.length; i++) {
    cartona += `
   
                  <div class="col-12 col-sm-12 col-md-6 col-lg-6 contact-card">
                    <div class="contact-header d-flex gap-3">
                      <div class="header-logo">
                        <p class="sami-name">${getInitials(contacts[i].name)}</p>
                        <div class="contact-icon">
                          <div class="icon icon-fav ${contacts[i].favourite == true ? "d-block" : "d-none"}">
                            <i class="fa-solid fa-star"></i>
                          </div>
                          <div class="icon icon-emg ${contacts[i].emergency == true ? "d-block" : "d-none"}">
                            <i class="fa-solid fa-heart-pulse"></i>
                          </div>
                        </div>
                      </div>
                      <div class="contact-info">
                        <h3>${contacts[i].name}</h3>
                        <div class="phone d-flex gap-2">
                          <div class="phone-icon">
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          <div class="phone-number">
                            <p>${contacts[i].phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="contant-content">
                      <div class="email d-flex gap-2 my-2">
                        <div class="email-icon">
                          <i class="fa-solid fa-envelope"></i>
                        </div>
                        <div class="email-number">
                          <p>${contacts[i].email}</p>
                        </div>
                      </div>
                      <div class="location d-flex gap-2 my-2">
                        <div class="location-icon">
                          <i class="fa-solid fa-location-dot"></i>
                        </div>
                        <div class="location-number">
                          <p>${contacts[i].address}</p>
                        </div>
                      </div>
                      <span class="badge bg-primary">${contacts[i].group}</span>
                      ${
                        contacts[i].emergency == true
                          ? `<span id="emergancyBadge" class="badge bg-danger"><i class="fa-solid fa-heart-pulse"></i
                          > Emergency</span>`
                          : ""
                      }
                      
                    </div>
                    <div class="card-footer">
                      <div class="content d-flex justify-content-between">
                        <div class="left-content d-flex gap-3">
                          <a class="icon-phone btn-icon" href="tel:01228845512"
                            ><i class="fa-solid fa-phone"></i
                          ></a>
                          <a
                            class="icon-email btn-icon"
                            href="mailto:mahofato@mailinator.com"
                            ><i class="fa-solid fa-envelope"></i
                          ></a>
                        </div>
                        <div class="right-content d-flex gap-3">
                          <a id='fav-1' class="icon-favt btn-icon ${contacts[i].favourite == true ? "d-none" : "d-block"}" onclick='addFavourite(${contacts[i].id})'
                            ><i class="fa-regular fa-star"></i
                          ></a>
                          <a id='fav-2' class="icon-favt btn-icon  ${contacts[i].favourite == true ? "d-block" : "d-none"} solid-fav-icon" onclick='addFavourite(${contacts[i].id})'
                            ><i class="fa-solid fa-star"></i></a>

                          <a id='emg-1' class="icon-emergancy btn-icon ${contacts[i].emergency == true ? "d-none" : "d-block"}" onclick='addEmergancy(${contacts[i].id})'
                            ><i class="fa-regular fa-heart"></i
                          ></a>
                          <a id='emg-2' class="icon-emergancy btn-icon ${contacts[i].emergency == true ? "d-block" : "d-none"} solid-emg-icon" onclick='addEmergancy(${contacts[i].id})'
                            ><i class="fa-solid fa-heart-pulse"></i
                          ></a>
                          <a class="icon-edit btn-icon" onclick='putContactDate(${i})'
                            ><i class="fa-solid fa-pen"></i
                          ></a>
                          <a class="icon-delete btn-icon" onclick='deleteContact(${contacts[i].id})'
                            ><i class="fa-solid fa-trash"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
    `;
  }
  document.getElementById("rowContactLeft").innerHTML = cartona;
  document.getElementById("total-contact").innerHTML = contactsList.length;
  document.getElementById("total-contact-fav").innerHTML = favouriteList.length;
  document.getElementById("total-contact-emer").innerHTML =
    emergancyList.length;
  document.getElementById("totalContact").innerHTML = contactsList.length;
  displayFavContacts();
  displayEmgContacts();
}

function isNameValid() {
  var regex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
  if (regex.test(nameInput.value)) {
    document.getElementById("contactNameError").classList.add("d-none");
    document.getElementById("contactNameError").classList.remove("d-block");
    return "valid";
  } else {
    document.getElementById("contactNameError").classList.remove("d-none");
    document.getElementById("contactNameError").classList.add("d-block");
    return "inValid";
  }
}

function isPhoneValid() {
  var regex = /^(\+20|0020|20)?0?1[0125][0-9]{8}$/;
  if (regex.test(phoneInput.value)) {
    document.getElementById("contactPhoneError").classList.add("d-none");
    document.getElementById("contactPhoneError").classList.remove("d-block");
    return "valid";
  } else {
    document.getElementById("contactPhoneError").classList.remove("d-none");
    document.getElementById("contactPhoneError").classList.add("d-block");
    return "inValid";
  }
}

function isEmailValid() {
  var regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(emailInput.value)) {
    document.getElementById("contactEmailError").classList.add("d-none");
    document.getElementById("contactEmailError").classList.remove("d-block");
    return "valid";
  } else {
    document.getElementById("contactEmailError").classList.remove("d-none");
    document.getElementById("contactEmailError").classList.add("d-block");
    return "inValid";
  }
}

function addFavourite(id, flag) {
  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].id == id) {
      flag == "update"
        ? (contactsList[i].favourite = contactsList[i].favourite)
        : (contactsList[i].favourite = !contactsList[i].favourite);
      
       if ((contactsList[i].favourite && (favouriteList.length !== 0 && favouriteList[i].id !== id)) ||  favouriteList.length == 0) {
        favouriteList.push(contactsList[i]);
        localStorage.setItem("favList", JSON.stringify(favouriteList));
        displayContats(contactsList);
      }else if (contactsList[i].favourite &&(favouriteList.length !==0 && favouriteList[i].id == id)){
        displayContats(contactsList);
      } 
      else {
        removeFavourite(id);
      }
    }
  }
}
function removeFavourite(id) {
  for (var i = 0; i < favouriteList.length; i++) {
    if (favouriteList[i].id == id) {
      favouriteList.splice(i, 1);
      localStorage.setItem("favList", JSON.stringify(favouriteList));
    }
  }
  displayContats(contactsList);
}

function addEmergancy(id, flag) {
  for (var i = 0; i < contactsList.length; i++) {
    console.log(emergancyList);

    if (contactsList[i].id == id) {
      
      flag == "update"
        ? contactsList[i].emergency == contactsList[i].emergency
        : (contactsList[i].emergency =
            contactsList[i].emergency == false ? true : false);
      if ((contactsList[i].emergency && (emergancyList.length !== 0 && emergancyList[i].id !== id)) ||  emergancyList.length == 0) {
        emergancyList.push(contactsList[i]);
        localStorage.setItem("emgList", JSON.stringify(emergancyList));
        localStorage.setItem("listOfContact", JSON.stringify(contactsList));
        displayContats(contactsList);
      }else if (contactsList[i].emergency &&(emergancyList.length !==0 && emergancyList[i].id == id)){
        displayContats(contactsList);
      }
       else {
        localStorage.setItem("listOfContact", JSON.stringify(contactsList));
        removeEmergancy(id);
      }
    }
  }
}
function removeEmergancy(id) {
  for (var i = 0; i < emergancyList.length; i++) {
    if (emergancyList[i].id == id) {
      emergancyList.splice(i, 1);
      localStorage.setItem("emgList", JSON.stringify(emergancyList));
    }
  }
  displayContats(contactsList);
}

function searchContact() {
  var searchTerm = searchInput.value;
  if (searchTerm == "") {
    filterContact = [];
  } else {
    for (var i = 0; i < contactsList.length; i++) {
      if (
        contactsList[i].name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        contactsList[i].phone
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        contactsList[i].email
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      ) {
        filterContact.push(contactsList[i]);
      }
    }
  }

  displayContats(filterContact);
}

function deleteContact(id) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete Wayne Avery? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    for (var i = 0; i < contactsList.length; i++) {
      if (contactsList[i].id == id) {
        contactsList.splice(i, 1);
        localStorage.setItem("listOfContact", JSON.stringify(contactsList));
      }
    }
    for (var i = 0; i < favouriteList.length; i++) {
      if (favouriteList[i].id == id) {
        favouriteList.splice(i, 1);
        localStorage.setItem("favList", JSON.stringify(favouriteList));
      }
    }
    for (var i = 0; i < emergancyList.length; i++) {
      if (emergancyList[i].id == id) {
        emergancyList.splice(i, 1);
        localStorage.setItem("emgList", JSON.stringify(emergancyList));
      }
    }
    displayContats(contactsList);
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function displayFavContacts() {
  var cartona = "";
  if (favouriteList.length == 0) {
    cartona = `<div class="div text-center">No favorites yet</div>`;
  }
  for (var i = 0; i < favouriteList.length; i++) {
    cartona += `
        <div
                      class="contact-item d-flex align-items-center justify-content-between"
                    >
                      <!-- Left -->
                      <div class="d-flex align-items-center gap-3">
                        <!-- Avatar -->
                        <div class="avatar">${getInitials(favouriteList[i].name)}</div>

                        <!-- Info -->
                        <div>
                          <h6 class="mb-0 fw-bold">${favouriteList[i].name}</h6>
                          <small class="text-muted">${favouriteList[i].phone}</small>
                        </div>
                      </div>

                      <!-- Right Icon -->
                      <div class="call-btn">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                    </div>
        `;
  }
  document.getElementById("rowFavorite").innerHTML = cartona;
}

function displayEmgContacts() {
  var cartona = "";
  if (emergancyList.length == 0) {
    cartona = `<div class="div text-center ">No emergency contacts</div>`;
  }
  for (var i = 0; i < emergancyList.length; i++) {
    cartona += `
        <div
                      class="contact-item-emr d-flex align-items-center justify-content-between"
                    >
                      <div class="d-flex align-items-center gap-3">
                        <div class="avatar">${getInitials(emergancyList[i].name)}</div>

                        <div>
                          <h6 class="mb-0 fw-bold">${emergancyList[i].name}</h6>
                          <small class="text-muted">${emergancyList[i].phone}</small>
                        </div>
                      </div>

                      <div class="call-btn emr-btn">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                    </div>
        `;
  }
  document.getElementById("rowEmergancy").innerHTML = cartona;
}
var updateIndex = 0;
function putContactDate(index) {
  updateID = contactsList[index].id;
  nameInput.value = contactsList[index].name;
  phoneInput.value = contactsList[index].phone;
  emailInput.value = contactsList[index].email;
  addressInput.value = contactsList[index].address;
  groupInput.value = contactsList[index].group;
  noteInput.value = contactsList[index].note;
  favouriteInput.checked = contactsList[index].favourite;
  emergencyInput.checked = contactsList[index].emergency;

  document.getElementById("updateContact").classList.add("d-block");
  document.getElementById("updateContact").classList.remove("d-none");
  document.getElementById("saveContact").classList.add("d-none");

  var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
}

function updateContact() {
  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].id == updateID) {
      contactsList[i].name = nameInput.value;
      contactsList[i].phone = phoneInput.value;
      contactsList[i].email = emailInput.value;
      contactsList[i].address = addressInput.value;
      contactsList[i].group = groupInput.value;
      contactsList[i].note = noteInput.value;
      contactsList[i].favourite = favouriteInput.checked;
      contactsList[i].emergency = emergencyInput.checked;

      if (contactsList[i].favourite == false) {
        removeFavourite(updateID);
      } else {
        addFavourite(updateID, "update");
      }
      if (contactsList[i].emergency == false) {
        removeEmergancy(updateID);
      } else {
        addEmergancy(updateID, "update");
      }
    }
    localStorage.setItem("listOfContact", JSON.stringify(contactsList));

    displayContats(contactsList);
    displayFavContacts();
    displayEmgContacts();
  }

  updateID = 0;
  var modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal"),
  );
  modal.hide();
  resetAllInputs();
   Swal.fire({
      title: "Updated!",
      text: "Contact has been updated successfully.",
      icon: "success",
      draggable: true,
    });
}
