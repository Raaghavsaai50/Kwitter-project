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
room_name = localStorage.getItem("room_name");



function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                username = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + username + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                button_with_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> Like:"+like+"</span></button>";

                row = name_with_tag + message_with_tag + button_with_tag+ span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });

}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}