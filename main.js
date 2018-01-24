// Initialize Firebase
let config = {
    apiKey: "AIzaSyAUOvkfH43lcVkNDACsUUGDUIFdN_wQ6c0",
    authDomain: "progforce-be475.firebaseapp.com",
    databaseURL: "https://progforce-be475.firebaseio.com",
    projectId: "progforce-be475",
    storageBucket: "",
    messagingSenderId: "369028942060"
};
firebase.initializeApp(config);

let databaseRef = firebase.database().ref().child("users");
let list = document.querySelector(".list");
let winner = document.querySelector(".winner");
let fail = false;

databaseRef.on('child_added', function (data) {
    let newLi = document.createElement('li');
    newLi.innerHTML = `${data.val().name} ${data.val().surname}`;

    list.appendChild(newLi);
});


function save(form) {
    let name = form.name.value,
        surname = form.surname.value,
        email = form.email.value,
        phone = form.phone.value,
        birth = form.birth.value;

    let validName = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
        validEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

    if (validName.test(name) == false) {
        fail = "Имя введено некорректно! Допустимые значения A-z, 0-9, '_', '.', '-'."
    } else if (validName.test(surname) == false) {
        fail = "Фамилия введена некорректно! Допустимые значения A-z, 0-9, '_', '.', '-'."
    } else if (validEmail.test(email) == false) {
        fail = "Email введен некорректно!"
    }

    if(fail) {
        alert(fail);
        fail = false;
    } else {
        writeUserData(name, surname, email, phone, birth);
    }
}

function writeUserData(name, surname, email, phone, birth) {
    databaseRef.push().set({
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        birth: birth
    });
}

function lottery() {
    databaseRef.on('value', (data)=>{
        let arr = [];
        for(key in data.val()){
            arr.push(data.val()[key])
        }

        let random = getRandomIntValue(0, arr.length - 1);

        winner.innerHTML = `WINNER is ${arr[random].name} ${arr[random].surname}`;
    });
}

// Return random value
function getRandomIntValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

