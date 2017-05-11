var drawingCanvas = document.getElementById("drawing_canvas");
var statusLabel = document.getElementById('status_label');
var segmentColors = ["red", "blue", "yellow", "grey", "green", "orange", "brown", "pink"];
var users = [{ name: "", color: "red" }, { name: "", color: "blue" }, { name: "", color: "yellow" }, { name: "", color: "grey" }, { name: "", color: "green" }, { name: "", color: "orange" }, { name: "", color: "brown" }, { name: "", color: "pink" }];
var audio = document.getElementById('bier');

var shotWheel = new ShotWheel(drawingCanvas, statusLabel, users, function (userIndex) {
    if (users[userIndex].shotEverybody) {
        users.forEach(function (user) {
            if (!user.shotEverybody) {
                user.userCount++;
                updateCount(user);
            }

        });
    } else {
        users[userIndex].userCount++;
        updateCount(users[userIndex]);
    }
    audio.play();
});
shotWheel.init();

statusLabel.innerHTML = 'Give it a good spin!';

function addEverybody(el) {
    if (el.checked) {
        users.push({ name: "SHOTS!!", color: segmentColors[users.length], shotEverybody: true });
        shotWheel.setUsers(users);
        updateLegend();
    } else {
        var shots = document.getElementById('shots');
        users.forEach(function (user, i) {
            if (user.shotEverybody) {
                users.splice(i, 1);
            }
        });
        shotWheel.setUsers(users);
        updateLegend();
    }
}

function addUser() {
    var userField = document.getElementById('adduserfield');
    var userValue = userField.value;
    if (users[0].name == "") {
        users = [];
    }
    users.push({ name: userValue, color: segmentColors[users.length], userCount: 0 });
    console.log(users);

    shotWheel.setUsers(users);

    userField.value = "";
    updateLegend();
}

function deleteUser(index) {
    users.splice(index, 1);
    shotWheel.setUsers(users);
    updateLegend();
}

function updateCount(user) {
    var countVariable = document.getElementsByClassName(user.name)[0];
    countVariable.innerHTML = user.name + user.userCount;
}

function updateLegend() {
    var legendEl = document.getElementById('legend');
    legendEl.innerHTML = "";

    users.forEach(function (user, i) {
        if (user.shotEverybody) {
            var lItemColor = document.createElement('div');
            lItemColor.className = "lItemColor";
            lItemColor.style.backgroundColor = user.color;

            var lItemName = document.createElement('div');
            lItemName.className = "lItemName ";
            lItemName.id = "shots";
            lItemName.innerHTML = user.name;

            var newUserRow = document.createElement('div');
            newUserRow.className = "legendItem";
            newUserRow.appendChild(lItemColor);
            newUserRow.appendChild(lItemName);

            legendEl.appendChild(newUserRow);
        } else {
            var lItemColor = document.createElement('div');
            lItemColor.className = "lItemColor";
            lItemColor.style.backgroundColor = user.color;

            var lItemName = document.createElement('div');
            lItemName.className = "lItemName " + user.name;
            lItemName.innerHTML = user.name + user.userCount;

            var lItemDeleteButton = document.createElement('button');
            lItemDeleteButton.innerHTML = "DELET"
            lItemDeleteButton.onclick = (() => { deleteUser(i) });

            var newUserRow = document.createElement('div');
            newUserRow.className = "legendItem";
            newUserRow.appendChild(lItemColor);
            newUserRow.appendChild(lItemName);
            newUserRow.appendChild(lItemDeleteButton);

            legendEl.appendChild(newUserRow);
        }

    });
}

function spin() {
    var velo = Math.floor(Math.random() * 20) + 6;
    shotWheel.spin(velo);
}