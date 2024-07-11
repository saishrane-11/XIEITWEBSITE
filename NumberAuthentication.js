document.getElementById("form1").addEventListener("click", function (event) {
    event.preventDefault()
});
document.getElementById("form2").addEventListener("click", function (event) {
    event.preventDefault()
});
document.getElementById("form").addEventListener("click", function (event) {
    event.preventDefault()
});


window.onload = function () {
    render();
};
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
function phoneAuth() {
    //get the number
    var number = document.getElementById('number').value;
    //phone number authentication function of firebase
    //it takes two parameter first one is number,,,second one is recaptcha
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        console.log(coderesult);
        alert("Message sent");
        document.getElementById('sendCode').style.display = 'none';
        document.getElementById('codeVerification').style.display = 'block';
        document.getElementById('number').readOnly = true;
        document.getElementById('number').style.color = 'gray';

        document.getElementById('recaptcha-container').style.display = 'none';
        document.getElementById('btn1').style.display = 'none';
        document.getElementById('number').readOnly = true;


    }).catch(function (error) {
        alert(error.message);
    });
}
function codeverify() {
    var code = document.getElementById('verificationCode').value;
    var number = document.getElementById('number').value;
    coderesult.confirm(code).then(function (result) {
        alert("Successfully verification");
        //   document.getElementById('codeVerification').style.display='none';
        //   document.getElementById('pass').style.display='block';
        var user = result.user;
        console.log(user);
        console.log(user.phoneNumber);
        document.getElementById('sendCode').style.display = 'none';

        document.getElementById('number').readOnly = true;
        document.getElementById('number').style.color = 'gray';
        document.getElementById('codeVerification').style.display = 'none';
        document.getElementById('afterVerification').style.display = 'block';
        document.getElementById('exampleInputContact1').value = user.phoneNumber;
        document.getElementById('exampleInputContact1').readOnly = true;
    }).catch(function (error) {
        alert(error.message);
    });
}
