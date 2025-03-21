// Obtiene el elemento del botón con el id "fetchJoke"
const boton = document.getElementById("fetchJoke");

// Función que obtiene un chiste de la API de Chuck Norris y lo muestra en la página
let chartInstance = null; // Variable para almacenar la instancia

function fetchJoke() {
    fetch('https://api.chucknorris.io/jokes/random', {})
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            console.log(datos);

            // Destruimos chart si existe
            if (chartInstance) {
                chartInstance.destroy();
            }

            const ctx = document.getElementById('miGrafico').getContext('2d');
            const datosChiste = {
                labels: ['Longitud'],
                datasets: [{
                    label: 'Longitud de los chistes',
                    data: [datos.value.length],
                    backgroundColor: 'rgba(54, 162, 235, 0.3)',
                    borderColor: 'rgba(54, 162, 235, 0.9)',
                    borderWidth: 2,
                }]
            };

            // Creamos una nueva instancia y la sobreescibimos
            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: datosChiste,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        }
                    }
                }
            });

            const valor = document.createElement("li");
            valor.innerHTML = datos.value;

            const btnborrar = document.createElement("button");
            btnborrar.innerHTML = "Eliminar";
            btnborrar.style.background = "red";

            btnborrar.addEventListener("click", function () {
                eliminarChiste(valor, datos.value);
            });

            const container = document.getElementById("jokeList");
            container.appendChild(valor);
            valor.appendChild(btnborrar);

            almacenarChiste(datos.value);
        });
}

// Función para almacenar un chiste
function almacenarChiste(chiste) {
    let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
    jokes.push(chiste);
    localStorage.setItem("chistes", JSON.stringify(jokes));
}

// Función para eliminar un chiste
function eliminarChiste(element, chiste) {
    element.remove();
    let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
    jokes = jokes.filter(function (joke) {
        return joke !== chiste;
    });
    localStorage.setItem("chistes", JSON.stringify(jokes));
}

// Mostrar chistes almacenados al cargar
function mostrarChistes() {
    let jokes = JSON.parse(localStorage.getItem("chistes")) || [];
    jokes.forEach(function (chiste) {
        const valor = document.createElement("li");
        valor.innerHTML = chiste;

        const btnborrar = document.createElement("button");
        btnborrar.innerHTML = "Eliminar";
        btnborrar.style.background = "red";

        btnborrar.addEventListener("click", function () {
            eliminarChiste(valor, chiste);
        });

        const container = document.getElementById("jokeList");
        container.appendChild(valor);
        valor.appendChild(btnborrar);
    });
}

boton.addEventListener("click", fetchJoke);
document.addEventListener("DOMContentLoaded", mostrarChistes);

//El signo || hacer la funcion de (OR)

//Solucion Profe Nicolas

/* const btnGetJoke = document.getElementById("fetchJoke");
 const jokeList = document.getElementById("jokeList");
 
 let jokesArray = [];
 
 const getJoke = () => {
   fetch("https://api.chucknorris.io/jokes/random")
     .then((res) => res.json())
     .then((data) => {
       jokesArray.push(data.value);
       saveJokes();
       displayJokes();
     });
 };
 
 const displayJokes = () => {
   jokeList.innerHTML = "";
   jokesArray.forEach((joke, index) => {
     jokeList.innerHTML += `
         <div>
         <p>${joke}</p>
         <button class='redButton' onclick=deleteJoke(${index})>Eliminar</button>
         </div>
         `;
   });
 };
 
 const saveJokes = () => {
   localStorage.setItem("jokes", JSON.stringify(jokesArray));
 };
 
 const deleteJoke = (idToDelete) => {
   // Filtrar aquellos elementos cuyo indice sea diferente al seleccionado a borrar
   jokesArray = jokesArray.filter((_, index) => index != idToDelete);
   saveJokes();
   displayJokes();
 };
 
 const loadJokes = () => {
   if (localStorage.getItem("jokes")) {
     const localJokes = JSON.parse(localStorage.getItem("jokes"));
     jokesArray = localJokes;
     displayJokes();
   }
 };
 
 btnGetJoke.addEventListener("click", getJoke);
 loadJokes(); */