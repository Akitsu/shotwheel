var drawingCanvas = document.getElementById("drawing_canvas");
var statusLabel = document.getElementById('status_label');
var segmentColors = ["red", "blue", "yellow", "grey", "green", "orange", "brown"];
var users = ["", "", "", "", "", "", "", ""];

var shotWheel = new ShotWheel(drawingCanvas, statusLabel, segmentColors, users, function (userIndex) {
    console.log(users[userIndex]);
});
shotWheel.init();

statusLabel.innerHTML = 'Give it a good spin!';

function addUser() {
    var userField = document.getElementById('adduserfield');
    var userValue = userField.value;
    if (users[0] == "") {
        users = [];
    }
    users.push(userValue);

    shotWheel.setUsers(users);

    userField.value = "";
    updateLegend();
}

function deleteUser() {
    //TODO
}

function updateLegend() {
    var legendEl = document.getElementById('legend');
    legendEl.innerHTML = "";

    var i = 0;
    users.forEach(function (user) {
        var lItemColor = document.createElement('div');
        lItemColor.className = "lItemColor";
        lItemColor.style.backgroundColor = segmentColors[i];

        var lItemName = document.createElement('div');
        lItemName.className = "lItemName";
        lItemName.innerHTML = user;

        var newUserRow = document.createElement('div');
        newUserRow.className = "legendItem";
        newUserRow.appendChild(lItemColor);
        newUserRow.appendChild(lItemName);

        legendEl.appendChild(newUserRow);
        i++;
    });
}

function spin() {
    var velo = Math.floor(Math.random() * 20) + 6;
    shotWheel.spin(velo);
}