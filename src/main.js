const dataUsers = [
  {
    id: 1,
    userFullname: "brayan munoz",
    userEmail: "brayan@academlo.com",
    pass1User: "123",
  },
  {
    id: 2,
    userFullname: "stiven quiroz",
    userEmail: "stiven@academlo.com",
    pass1User: "123",
  },
];

let theDBMS = [];
let thePacket = {};

const formUserHTML = document.querySelector("#formUser");
const contentModalError = document.querySelector(".contentModalError");
const iconClose = document.querySelector(".icon__close");

function deleteUser(theMail) {
  theDBMS = theDBMS.filter((user) => user.userEmail !== theMail);
  localStorage.setItem("mylocaldb", JSON.stringify(theDBMS));
  printUsers(dataUsers);
}

function printUsers(users) {
  let html = "";

  for (const { pass1User, userEmail, userFullname } of users) {
    html += `
			<div class="user">
				<p>${userFullname}</p>
				<p>${userEmail}</p>
				<p>${pass1User}</p>
			</div>
		`;
  }

  theDBMS = JSON.parse(localStorage.getItem("mylocaldb")) || [];

  let chain1 = "user";
  for (let i = 0; i <= theDBMS.length - 1; i++) {
    chain1 = "user" + i;
    html += `
		    <div class="user">
			   <p>${theDBMS[i].userFullname}</p>
			   <p>${theDBMS[i].userEmail}</p>
			   <p>${theDBMS[i].pass1User}</p>
			   <br>			   
			   <form id="${chain1}">
			      <button type="submit" class="btn2" name="${chain1}"
				   onclick="deleteUser('${theDBMS[i].userEmail}')">Eliminate</button>
               </form>
			</div>
			`;
  }
  document.querySelector(".users").innerHTML = html;
}

function printAlert(text = "naruto") {
  document.querySelector("#modalText").textContent = text;
  contentModalError.classList.toggle("contentModalError__show");
}

formUserHTML.addEventListener("submit", function (event) {
  	event.preventDefault();

  const userFullname = event.target.userFullname.value.trim().toLowerCase();
  const userEmail = event.target.userEmail.value.trim().toLowerCase();
  const pass1User = event.target.pass1User.value.trim();
  const pass2User = event.target.pass2User.value.trim();

  if (!userFullname || !userEmail || !pass1User || !pass2User)
    // return printAlert("Todos los campos son necesarios");
    return Swal.fire("Todos los campos son necesarios");

  if (pass1User !== pass2User)
    // return printAlert("las contrasenias no coinciden");
    return Swal.fire("las contraseñas no coinciden");

  thePacket.userFullname = userFullname;
  thePacket.userEmail = userEmail;
  thePacket.pass1User = pass1User;

  /* Verificar lo previamente guardado en local storage */

  theDBMS = JSON.parse(localStorage.getItem("mylocaldb")) || [];
  theDBMS.push(thePacket);

  /*Iniciar el proceso de guardar en local storage */

  localStorage.setItem("mylocaldb", JSON.stringify(theDBMS));

  console.log({
    userFullname,
    userEmail,
    pass1User,
    pass2User,
  });

  // console.log(event.target.countryUser.value);
  // console.log(event.target.genderUser.value);
  // console.log(event.target.terms.checked);
  // console.log(event.target.dateBirth.value);
});

iconClose.addEventListener("click", function () {
  contentModalError.classList.remove("contentModalError__show");
});

printUsers(dataUsers);
