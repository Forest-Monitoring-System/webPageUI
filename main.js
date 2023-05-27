const firebaseConfig = {
    // Replace with your Firebase configuration
    apiKey: "AIzaSyDWjNUhJ8LaPVPsytvWwu0Q6nxXwJ4wIac",
    authDomain: "forest-monitoring-system.firebaseapp.com",
    projectId: "forest-monitoring-system",
    storageBucket: "forest-monitoring-system.appspot.com",
    messagingSenderId: "149217236846",
    appId: "1:149217236846:web:44f848c7858a04b34b537f",
    measurementId: "G-K36YLNY17C",
    databaseURL: "https://forest-monitoring-system-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var databaseRef = firebase.database().ref('node_1');

databaseRef.on('value', function (snapshot) {
    var data = snapshot.val();
    // Update your webpage with the new data
    // For example, you can update HTML elements using their IDs
    document.getElementById('temperature').innerHTML = data.temperature;
    document.getElementById('humidity').innerHTML = data.humidity;
    document.getElementById('smoke').innerHTML = data.smoke_detected;
    document.getElementById('flame').innerHTML = data.flame_detected;

    if (data.smoke_detected == "1") {
        console.log("Smoke detected");
        window.alert("Warning...! Smoke detected..!");
    }
    if (data.flame_detected == "1") {
        console.log("Fire detected");
        window.alert("Warning...! Fire detected..!");
    }
});


setInterval(drawClock, 2000);

function drawClock() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    //Date
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();
    document.getElementById("date").innerHTML = today.toLocaleDateString("en-US", options);

    //hour
    var hourAngle = (360 * (hour / 12)) + ((360 / 12) * (minute / 60));
    var minAngle = 360 * (minute / 60);
    document.getElementById("hour").style.transform = "rotate(" + (hourAngle) + "deg)";
    //minute
    document.getElementById("min").style.transform = "rotate(" + (minAngle) + "deg)";


    // Get sensor data from Firebase Firestore
    //document.getElementById('temperature').innerHTML = data.Temperature;
    //document.getElementById('humidity').innerHTML = data.Humidity;
}