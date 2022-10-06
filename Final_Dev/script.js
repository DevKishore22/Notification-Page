"use strict";
const page = document.querySelector(".notifictaion_section");
const unreadNotificationCount = document.querySelector(".unread_count");
const list = document.querySelector(".list");
const markAllAsRead = document.querySelector(".mark-all-as-read-btn");
const overlay = document.querySelector(".overlay");

//drop down menu
const addNotificationBtn = document.querySelector(".add_notification_btn");
const privateNotificationBtn = document.querySelector(".private_btn ");
const reactionNotificationBtn = document.querySelector(".recation_btn");
const followNotificationBtn = document.querySelector(".follow_btn");
const joinNotificationBtn = document.querySelector(".join_btn");
const leftNotificationBtn = document.querySelector(".left_btn");
const commentNotificationBtn = document.querySelector(".comment_btn");

//private form buttons
const privateFormContainer = document.querySelector(".private");
const privateFormCancelBtn = document.querySelector(".private_form_close_btn");
// private notifications form inputs
const privateNameInput = document.querySelector("#private_user_name");
const privateImageUrlInput = document.querySelector("#private_image_url");
const privateTimeInput = document.querySelector("#private_time");
const privateMessageInput = document.querySelector("#private_message");
const privateSubmitBtn = document.querySelector(".private_submit");

//reacted form buttons
const reactedFormContainer = document.querySelector(".reacted");
const reactedFormCancelBtn = document.querySelector(".reacted_form_close_btn");
//reacted notifications inputs
const reactedNameInput = document.querySelector("#reacted_user_name");
const reactedImageUrlInput = document.querySelector("#reacted_image_url");
const reactedTimeInput = document.querySelector("#reacted_time");
const reactedPostNameInput = document.querySelector("#reacted_post_name");
const reactedSubmitBtn = document.querySelector(".reacted_submit");

//follow form buttons
const followFormContainer = document.querySelector(".follow");
const followFormCancelBtn = document.querySelector(".follow_form_close_btn");
//follow notifications inputs
const followNameInput = document.querySelector("#follow_user_name");
const followImageUrlInput = document.querySelector("#follow_image_url");
const followTimeInput = document.querySelector("#follow_time");
const followSubmitBtn = document.querySelector(".follow_submit");

//comment picture form
const commentFormContainer = document.querySelector(".comment");
const commentFormCancelBtn = document.querySelector(".comment_form_close_btn");
//comment notifications inputs
const commentNameInput = document.querySelector("#comment_user_name");
const commentImageUrlInput = document.querySelector("#comment_image_url");
const commentedPictureURl = document.querySelector("#commented_pic_image_url");
const commentTimeInput = document.querySelector("#comment_time");
const commentSubmitBtn = document.querySelector(".comment_submit");

//join picture form
const joinGroupFormContainer = document.querySelector(".join_group");
const joinGroupFormCancelBtn = document.querySelector(
  ".join_group_form_close_btn"
);
//join group notifications inputs
const joinGroupNameInput = document.querySelector("#join_group_user_name");
const joinGroupImageUrlInput = document.querySelector("#join_group_image_url");
const joinedGroupName = document.querySelector("#join_group_name");
const joinGroupTimeInput = document.querySelector("#join_group_time");
const joinGroupSubmitBtn = document.querySelector(".join_group_submit");

//left group form
const leftGroupFormContainer = document.querySelector(".left_group");
const leftGroupFormCancelBtn = document.querySelector(
  ".left_group_form_close_btn"
);
//join group notifications inputs
const leftGroupNameInput = document.querySelector("#left_group_user_name");
const leftGroupImageUrlInput = document.querySelector("#left_group_image_url");
const leftGroupName = document.querySelector("#left_group_name");
const leftGroupTimeInput = document.querySelector("#left_group_time");
const leftGroupSubmitBtn = document.querySelector(".left_group_submit");

let notificationCount = 0;
let readedNotification = [];

function fetchJson(path) {
  try {
    fetch(path)
      .then((response) => response.json())
      .then((jsonData) => {
        renderNotificationInUI(jsonData);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    alert(err);
  }
}

async function postData(url, data) {
  await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((e) => alert(e));
}

function renderNotificationInUI(jsonData) {
  jsonData.map((data) => {
    const fullFilledNotification = renderNotificationDetails(data);
    if (fullFilledNotification) {
      notificationCount++;
      page.insertAdjacentHTML("afterbegin", fullFilledNotification);
    }
  });
  unreadNotificationCount.textContent = notificationCount;
  makeReadedNotification(jsonData);
}

function renderNotificationDetails(notificationDetails) {
  const notificationType = notificationDetails.notification_type;
  if (notificationType == "reacted to recent your post") {
    return `
    <div class="reacted_to_post_notification notifiy_container read${notificationDetails.id}" id="reacted${notificationDetails.id}">
        <div class="profile_pic">
          <img src="${notificationDetails.profile_url}" alt="" />
        </div>
        <div class="notification_details">
          <div class="notification_info">
            <p class="user-name">${notificationDetails.user_name}
            <span class="notification-type">${notificationDetails.notification_type}</span>
            <span class="reaction_text">${notificationDetails.reaction_text}<span class = "dot"
            id="dot${notificationDetails.id}"> &#8226;</span>
            </span>
            </p>
          </div>
          <div>
            <p class="posted-time">${notificationDetails.posted_time}</p>
          </div>
        </div>
      </div>
    `;
  }
  if (notificationType == "followed you") {
    return `
      <div class="follow_notification notifiy_container read${notificationDetails.id}" id="follow${notificationDetails.id}">
      <div class="profile_pic">
        <img src="${notificationDetails.profile_url}" alt="" />
      </div>
      <div class="notification_details">
        <div class="notification_info">
          <p class="user-name">${notificationDetails.user_name}
          <span class="notification-type">${notificationDetails.notification_type} <span class ="dot"
          id="dot${notificationDetails.id}">&#8226;</span></span>
          </p>
        </div>
        <div>
          <p class="posted-time">${notificationDetails.posted_time}</p>
        </div>
      </div>
    </div>
    `;
  }

  if (notificationType == "has joined your group") {
    return `
    <div class="join_notification notifiy_container read${notificationDetails.id}" id="join_group${notificationDetails.id}">
        <div class="profile_pic">
          <img src="${notificationDetails.profile_url}" alt="" />
        </div>
        <div class="notification_details">
          <div class="notification_info">
            <p class="user-name">${notificationDetails.user_name}
            <span class="notification-type">${notificationDetails.notification_type}</span>
            <span class="group_name">${notificationDetails.joining_group_name}<span class ='dot' id="dot${notificationDetails.id}">&#8226;</span></span> 
            </p>
          </div>
          <div>
            <p class="posted-time">${notificationDetails.posted_time}</p>
          </div>
        </div>
      </div>
    `;
  }

  if (notificationType == "left the group") {
    return `
    <div class="left_notification notifiy_container read${notificationDetails.id}" id="left_group${notificationDetails.id}">
        <div class="profile_pic">
          <img src="${notificationDetails.profile_url}" alt="" />
        </div>
        <div class="notification_details">
          <div class="notification_info">
            <p class="user-name">${notificationDetails.user_name}
            <span class="notification-type">${notificationDetails.notification_type}</span>
            <span class="group_name">${notificationDetails.left_group_name}<span class ='dot' id="dot${notificationDetails.id}">&#8226;</span></span>
            </p>
          </div>
          <div>
            <p class="posted-time">${notificationDetails.posted_time}</p>
          </div>
        </div>
      </div>
    `;
  }
  if (notificationType == "sent you a private message") {
    return `
    <div class="private_notification notifiy_container read${notificationDetails.id}" id="private${notificationDetails.id}">
          <div class="profile_pic">
            <img src="${notificationDetails.profile_url}" alt="" />
          </div>
          <div class="notification_details">
            <div class="notification_info">
              <p class="user-name">${notificationDetails.user_name}
              <span class="notification-type">${notificationDetails.notification_type}<span class ='dot'
              id="dot${notificationDetails.id}">&#8226;</span></span>
              </p>
            </div>
            <div>
              <p class="posted-time">${notificationDetails.posted_time}</p>
            </div>
          </div>
        </div>
        <div class="expand_notification">
          <span>${notificationDetails.message}</span>
        </div>
    `;
  }

  if (notificationType == "commented on your picture") {
    return `
    <div class="commend_pic_notification notifiy_container read${notificationDetails.id}" id="comment${notificationDetails.id}">
        <div class="profile_pic">
          <img src="${notificationDetails.profile_url}" alt="" />
        </div>
        <div class="notification_details">
          <div class="notification_info">
            <p class="user-name">${notificationDetails.user_name}
            <span class="notification-type">${notificationDetails.notification_type} <span class ='dot'
            id="dot${notificationDetails.id}">&#8226;</span></span>
            </p>
          </div>
          <div>
            <p class="posted-time">${notificationDetails.posted_time}</p>
          </div>
        </div>
        <div class="commented_picture">
          <img src="${notificationDetails.commentedPictureUrl}" alt="profile" />
        </div>
      </div>
    `;
  }
}

function makeReadedNotification(usersData) {
  usersData?.map((usersDatum) => {
    if (document.querySelector(`#follow${usersDatum.id}`)) {
      document
        .querySelector(`#follow${usersDatum.id}`)
        .addEventListener("click", () => {
          if (
            !readedNotification.includes(`follow${usersDatum.id}`) &&
            notificationCount > 0
          ) {
            readedNotification.push(`follow${usersDatum.id}`);
            unreadNotificationCount.textContent = --notificationCount;
          }
          document.querySelector(
            `#follow${usersDatum.id}`
          ).style.backgroundColor = "white";
          document.querySelector(`#dot${usersDatum.id}`).style.display = "none";
        });
    }
    if (document.querySelector(`#reacted${usersDatum.id}`)) {
      document
        .querySelector(`#reacted${usersDatum.id}`)
        .addEventListener("click", () => {
          if (
            !readedNotification.includes(`reacted${usersDatum.id}`) &&
            notificationCount > 0
          ) {
            readedNotification.push(`reacted${usersDatum.id}`);
            unreadNotificationCount.textContent = --notificationCount;
          }
          document.querySelector(
            `#reacted${usersDatum.id}`
          ).style.backgroundColor = "white";
          document.querySelector(`#dot${usersDatum.id}`).style.display = "none";
        });
    }
    if (document.querySelector(`#left_group${usersDatum.id}`)) {
      document
        .querySelector(`#left_group${usersDatum.id}`)
        .addEventListener("click", () => {
          if (
            !readedNotification.includes(`left_group${usersDatum.id}`) &&
            notificationCount > 0
          ) {
            readedNotification.push(`left_group${usersDatum.id}`);
            unreadNotificationCount.textContent = --notificationCount;
          }
          document.querySelector(
            `#left_group${usersDatum.id}`
          ).style.backgroundColor = "white";
          document.querySelector(`#dot${usersDatum.id}`).style.display = "none";
        });
    }
    if (
      document.querySelector(`#join_group${usersDatum.id}`) &&
      notificationCount > 0
    ) {
      document
        .querySelector(`#join_group${usersDatum.id}`)
        .addEventListener("click", () => {
          if (
            !readedNotification.includes(`join_group${usersDatum.id}`) &&
            notificationCount > 0
          ) {
            readedNotification.push(`join_group${usersDatum.id}`);
            unreadNotificationCount.textContent = --notificationCount;
          }
          document.querySelector(
            `#join_group${usersDatum.id}`
          ).style.backgroundColor = "white";
          document.querySelector(`#dot${usersDatum.id}`).style.display = "none";
        });
    }
    if (document.querySelector(`#comment${usersDatum.id}`)) {
      document
        .querySelector(`#comment${usersDatum.id}`)
        .addEventListener("click", () => {
          if (
            !readedNotification.includes(`comment${usersDatum.id}`) &&
            notificationCount > 0
          ) {
            readedNotification.push(`comment${usersDatum.id}`);
            unreadNotificationCount.textContent = --notificationCount;
          }
          document.querySelector(
            `#comment${usersDatum.id}`
          ).style.backgroundColor = "white";
          document.querySelector(`#dot${usersDatum.id}`).style.display = "none";
        });
    }
    if (document.querySelector(`#private${usersDatum.id}`)) {
      document
        .querySelector(`#private${usersDatum.id}`)
        .addEventListener("click", () => {
          if (
            !readedNotification.includes(`private${usersDatum.id}`) &&
            notificationCount > 0
          ) {
            readedNotification.push(`private${usersDatum.id}`);
            unreadNotificationCount.textContent = --notificationCount;
          }
          document.querySelector(
            `#private${usersDatum.id}`
          ).style.backgroundColor = "white";
          document.querySelector(`#dot${usersDatum.id}`).style.display = "none";
          document;
        });
    }
  });
}

function init() {
  fetchJson("http://localhost:3000/users");
}
init();
function toggleOverlay() {
  overlay.classList.toggle("hidden");
}

// Event listerners
addNotificationBtn.addEventListener("click", function (e) {
  e.preventDefault();
  list.classList.toggle("hidden");
});

// Add private notification form listeners
privateNotificationBtn.addEventListener("click", function () {
  privateFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
privateFormCancelBtn.addEventListener("click", function () {
  privateFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
privateSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let privateData = {
    user_name: `${privateNameInput.value}`,
    notification_type: "sent you a private message",
    profile_url: `${privateImageUrlInput.value}`,
    message: `${privateMessageInput.value}`,
    posted_time: `${privateTimeInput.value}`,
  };
  postData("http://localhost:3000/users", privateData);
  privateFormContainer.classList.toggle("hidden");
});

//Add reacted notification form listeners
reactionNotificationBtn.addEventListener("click", function () {
  reactedFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
reactedFormCancelBtn.addEventListener("click", function () {
  reactedFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
reactedSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let reactedData = {
    user_name: `${reactedNameInput.value}`,
    notification_type: "reacted to recent your post",
    profile_url: `${reactedImageUrlInput.value}`,
    reaction_text: `${reactedPostNameInput.value}`,
    posted_time: `${reactedTimeInput.value}`,
  };
  postData("http://localhost:3000/users", reactedData);
  reactedFormContainer.classList.toggle("hidden");
});

//Add follow notification form listeners
followNotificationBtn.addEventListener("click", function () {
  followFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
followFormCancelBtn.addEventListener("click", function () {
  followFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
followSubmitBtn.addEventListener("click", function (e) {
  let followdata = {
    user_name: `${followNameInput.value}`,
    notification_type: "followed you",
    profile_url: `${followImageUrlInput.value}`,
    posted_time: `${followTimeInput.value}`,
  };
  e.preventDefault();
  postData("http://localhost:3000/users", followdata);
  followFormContainer.classList.toggle("hidden");
});

// Add comment to pic notification form listeners
commentNotificationBtn.addEventListener("click", function () {
  commentFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
commentFormCancelBtn.addEventListener("click", function () {
  commentFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
commentSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let commentData = {
    user_name: `${commentNameInput.value}`,
    notification_type: "commented on your picture",
    profile_url: `${commentImageUrlInput.value}`,
    commentedPictureUrl: `${commentedPictureURl.value}`,
    posted_time: `${commentTimeInput.value}`,
  };
  postData("http://localhost:3000/users", commentData);
  commentFormContainer.classList.toggle("hidden");
});

// Add join group notification form listeners
leftNotificationBtn.addEventListener("click", function () {
  leftGroupFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
leftGroupFormCancelBtn.addEventListener("click", function (e) {
  leftGroupFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
leftGroupSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let leftGroupdata = {
    user_name: `${leftGroupNameInput.value}`,
    notification_type: "left the group",
    profile_url: `${leftGroupImageUrlInput.value}`,
    left_group_name: `${leftGroupName.value}`,
    posted_time: `${leftGroupTimeInput.value}`,
  };
  postData("http://localhost:3000/users", leftGroupdata);
  leftGroupFormContainer.classList.toggle("hidden");
});

// Add left group notification form listeners
joinNotificationBtn.addEventListener("click", function () {
  joinGroupFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
joinGroupFormCancelBtn.addEventListener("click", function (e) {
  joinGroupFormContainer.classList.toggle("hidden");
  toggleOverlay();
});
joinGroupSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let joinGroupdata = {
    user_name: `${joinGroupNameInput.value}`,
    notification_type: "has joined your group",
    profile_url: `${joinGroupImageUrlInput.value}`,
    joining_group_name: `${joinedGroupName.value}`,
    posted_time: `${joinGroupTimeInput.value}`,
  };
  postData("http://localhost:3000/users", joinGroupdata);
  joinGroupFormContainer.classList.toggle("hidden");
});

markAllAsRead.addEventListener("click", function () {
  for (let i = 1; i <= notificationCount; i++) {
    document.querySelector(`.read${i}`).style.backgroundColor = "white";
    document.querySelector(`#dot${i}`).style.display = "none";
    unreadNotificationCount.textContent = 0;
  }
  notificationCount = 0;
});
