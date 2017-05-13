var drawingCanvas = document.getElementById("drawing_canvas");
var statusLabel = document.getElementById('status_label');
var segmentColors = ["red", "blue", "yellow", "grey", "green", "orange", "brown", "pink"];
var users = [{ name: "?!?!?!", color: "red" }, { name: "willem", color: "blue" }, { name: "kees", color: "yellow" }, { name: "piet", color: "grey" }, { name: "harry", color: "green" }, { name: "gerard", color: "orange" }, { name: "johan", color: "brown" }, { name: "henk", color: "pink" }];

// var audioBuffer = null;
// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var audioContext = new AudioContext();
// var source;
//
// function play() {
//     var request = new XMLHttpRequest();
//     if (source) {
//         try {
//             source.stop();
//         } catch (err) {}
//     }
//     source = audioContext.createBufferSource();
//     source.connect(audioContext.destination);
//     request.open('GET', 'bierkoala.mp3', true);
//     request.responseType = 'arraybuffer';
//     request.onload = function() {
//         audioContext.decodeAudioData(request.response, function(buffer) {
//             source.buffer = buffer;
//             source.start(0);
//         });
//     };
//     request.send();
// }

var audio = new Audio('bierkoala.mp3');
audio.addEventListener("touchend", function () {
    console.log("dfsd");
    audio.play();
}, false);

var touchEndEvent = new Event('touchend');

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
    audio.dispatchEvent(touchEndEvent);
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
    if (users.length > 0) {
        if (users[0].name == "?!?!?!") {
            users = [];
        }
    }
    users.push({ name: userValue, color: segmentColors[users.length], userCount: 0 });

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
    if (countVariable) {
        countVariable.innerHTML = user.userCount;
    }
}

function updateLegend() {
    var legendEl = document.getElementById('legend');
    legendEl.innerHTML = "";

    users.forEach(function (user, i) {
        if (user.shotEverybody) {
            var lItemColor = document.createElement('td');
            lItemColor.className = "lItemColor";
            lItemColor.style.backgroundColor = user.color;

            var lItemName = document.createElement('td');
            lItemName.id = "shots";
            lItemName.className = "lItemName";
            lItemName.innerHTML = user.name;

            var newUserRow = document.createElement('tr');
            newUserRow.className = "legendItem";
            newUserRow.appendChild(lItemColor);
            newUserRow.appendChild(lItemName);

            legendEl.appendChild(newUserRow);
        } else {
            var lItemColor = document.createElement('td');
            lItemColor.className = "lItemColor";
            lItemColor.style.backgroundColor = user.color;

            var lItemCount = document.createElement('td');
            lItemCount.innerHTML = user.userCount;
            lItemCount.className = "userCount " + user.name;

            var lItemName = document.createElement('td');
            lItemName.className = "lItemName";
            lItemName.innerHTML = user.name;

            var lItemDelBtnCell = document.createElement('td');
            var lItemDeleteButton = document.createElement('i');
            lItemDeleteButton.className = "fa fa-times";            
            lItemDeleteButton.onclick = function () {deleteUser(i)};
            lItemDelBtnCell.appendChild(lItemDeleteButton);

            var newUserRow = document.createElement('tr');
            newUserRow.className = "legendItem";
            newUserRow.appendChild(lItemColor);
            newUserRow.appendChild(lItemName);
            newUserRow.appendChild(lItemCount);
            newUserRow.appendChild(lItemDelBtnCell);

            legendEl.appendChild(newUserRow);
        }

    });
}

function addUserOnEnter(e) {
    if (e.keyCode == 13) {
        addUser();
        return false;
    }
}

function spin() {
    var velo = Math.floor(Math.random() * 20) + 6;
    shotWheel.spin(velo);
}