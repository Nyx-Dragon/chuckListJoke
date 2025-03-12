const boton = document.getElementById("fetchJoke");

function fetchJoke() {
    fetch('https://api.chucknorris.io/jokes/random', {})
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
        const valor = document.createElement("li");
        valor.innerHTML = datos.value;

        const btnborrar = document.createElement("button");
        btnborrar.innerHTML = "Eliminar";
        btnborrar.style.background = "red";
        btnborrar.addEventListener("click", () => eliminarChiste(valor, datos.value));

        const container = document.getElementById("jokeList");
        container.appendChild(valor);
        valor.appendChild(btnborrar);

        almacenarChiste(datos.value);
    });
}

function almacenarChiste(chiste) {
    let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
    jokes.push(chiste);
    localStorage.setItem("chistes", JSON.stringify(jokes));
}

function eliminarChiste(element, chiste) {
    element.remove();
    let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
    jokes = jokes.filter(joke => joke !== chiste);
    localStorage.setItem("chistes", JSON.stringify(jokes));
}

boton.addEventListener("click", fetchJoke);
