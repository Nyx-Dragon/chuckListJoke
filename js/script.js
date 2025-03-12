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
        btnborrar.addEventListener("click", () => {
            valor.remove(); 
            btnborrar.remove();
            let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
            jokes = jokes.filter(joke => joke !== datos.value); // Eliminar el chiste del array
            localStorage.setItem("chistes", JSON.stringify(jokes));
        });

        const container = document.getElementById("jokeList");
        container.appendChild(valor);
        valor.appendChild(btnborrar);

        let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
        jokes.push(datos.value);
        localStorage.setItem("chistes", JSON.stringify(jokes));
    });
}

boton.addEventListener("click", fetchJoke);
