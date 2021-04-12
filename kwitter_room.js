var firebaseConfig = {
  apiKey: "AIzaSyBHnBm59OOIBSBjuAG5Pxoq1ulT3_Qg1q8",
  authDomain: "kwitter-94295.firebaseapp.com",
  databaseURL: "https://kwitter-94295-default-rtdb.firebaseio.com",
  projectId: "kwitter-94295",
  storageBucket: "kwitter-94295.appspot.com",
  messagingSenderId: "343619611089",
  appId: "1:343619611089:web:64dde354a479847acc18f0",
  measurementId: "G-P2BQCSVKB7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>"
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}