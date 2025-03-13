// Obtiene el elemento del botón con el id "fetchJoke"
const boton = document.getElementById("fetchJoke");

// Función que obtiene un chiste de la API de Chuck Norris y lo muestra en la página
function fetchJoke() {
    // Hace una solicitud fetch a la API de chistes de Chuck Norris
    fetch('https://api.chucknorris.io/jokes/random', {})
    .then(function(respuesta) {
        // Convierte la respuesta a formato JSON
        return respuesta.json();
    })
    .then(function(datos) {
        // Muestra los datos en la consola
        console.log(datos);
        
        // Crea un nuevo elemento de lista (li) y le asigna el chiste obtenido
        const valor = document.createElement("li");
        valor.innerHTML = datos.value;

        // Crea un botón "Eliminar" y le asigna estilo y funcionalidad
        const btnborrar = document.createElement("button");
        btnborrar.innerHTML = "Eliminar";
        btnborrar.style.background = "red";

        // Define la función para manejar el evento de clic
        function eliminarHandler() {
            eliminarChiste(valor, datos.value);
        }

        // Añade el evento 'click' a btnborrar con la función eliminada separada
        btnborrar.addEventListener("click", eliminarHandler);

        // Añade el chiste y el botón a la lista de chistes en la página
        const container = document.getElementById("jokeList");
        container.appendChild(valor);
        valor.appendChild(btnborrar);

        // Almacena el chiste en localStorage
        almacenarChiste(datos.value);
    });
}

// Función que almacena un chiste en localStorage
function almacenarChiste(chiste) {
    // Obtiene los chistes almacenados en localStorage o crea un array vacío si no hay ninguno
    let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
    // Añade el nuevo chiste al array
    jokes.push(chiste);
    // Guarda el array actualizado en localStorage
    localStorage.setItem("chistes", JSON.stringify(jokes));
}

// Función que elimina un chiste de la página y de localStorage
function eliminarChiste(element, chiste) {
    // Elimina el elemento de la lista de la página
    element.remove();
    // Obtiene los chistes almacenados en localStorage
    let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
    // Elimina el chiste específico del array
    jokes = jokes.filter(function(joke) {
        return joke !== chiste;
    });
    // Guarda el array actualizado en localStorage
    localStorage.setItem("chistes", JSON.stringify(jokes));
}

// Añade un event listener al botón para ejecutar fetchJoke cuando se hace clic en él
boton.addEventListener("click", fetchJoke);