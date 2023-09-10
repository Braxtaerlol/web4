const filaTendencia = document.getElementById('carousel-tendencia');
const peliculasTendencia = document.querySelectorAll('#contenedor-tendencia .pelicula');

const flechaIzquierdaTendencia = document.getElementById('flecha-izquierda-tendencia');
const flechaDerechaTendencia = document.getElementById('flecha-derecha-tendencia');

const filaPopular = document.getElementById('carousel-popular');
const peliculasPopular = document.querySelectorAll('#contenedor-popular .pelicula');

const flechaIzquierdaPopular = document.getElementById('flecha-izquierda-popular');
const flechaDerechaPopular = document.getElementById('flecha-derecha-popular');

/* ----------------- Event Listener para flecha derecha en tendencia ---------- */
flechaDerechaTendencia.addEventListener('click', () => {
    filaTendencia.scrollLeft += filaTendencia.offsetWidth;

    const indicadorActivo = document.querySelector('#contenedor-tendencia .indicadores .activo');
    if (indicadorActivo.nextSibling) {
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

/* ----------------- Event Listener para flecha izquierda en tendencia ---------- */
flechaIzquierdaTendencia.addEventListener('click', () => {
    filaTendencia.scrollLeft -= filaTendencia.offsetWidth;

    const indicadorActivo = document.querySelector('#contenedor-tendencia .indicadores .activo');
    if (indicadorActivo.previousSibling) {
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

/* ----------------- Event Listener para flecha derecha en popular ---------- */
flechaDerechaPopular.addEventListener('click', () => {
    filaPopular.scrollLeft += filaPopular.offsetWidth;

    const indicadorActivo = document.querySelector('#contenedor-popular .indicadores .activo');
    if (indicadorActivo.nextSibling) {
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

/* ----------------- Event Listener para flecha izquierda en popular ---------- */
flechaIzquierdaPopular.addEventListener('click', () => {
    filaPopular.scrollLeft -= filaPopular.offsetWidth;

    const indicadorActivo = document.querySelector('#contenedor-popular .indicadores .activo');
    if (indicadorActivo.previousSibling) {
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

/* ----------------- Paginacion en tendencia -------------------- */
const numeroPaginasTendencia = Math.ceil(peliculasTendencia.length / 5);
for (let i = 0; i < numeroPaginasTendencia; i++) {
    const indicador = document.createElement('button');

    if (i === 0) {
        indicador.classList.add('activo');
    }
    document.querySelector('#contenedor-tendencia .indicadores').appendChild(indicador);
    indicador.addEventListener('click', (e) => {
        filaTendencia.scrollLeft = i * filaTendencia.offsetWidth;

        document.querySelector('#contenedor-tendencia .indicadores .activo').classList.remove('activo');
        e.target.classList.add('activo');
    });
}

/* ----------------- Paginacion en popular -------------------- */
const numeroPaginasPopular = Math.ceil(peliculasPopular.length / 5);
for (let i = 0; i < numeroPaginasPopular; i++) {
    const indicador = document.createElement('button');

    if (i === 0) {
        indicador.classList.add('activo');
    }
    document.querySelector('#contenedor-popular .indicadores').appendChild(indicador);
    indicador.addEventListener('click', (e) => {
        filaPopular.scrollLeft = i * filaPopular.offsetWidth;

        document.querySelector('#contenedor-popular .indicadores .activo').classList.remove('activo');
        e.target.classList.add('activo');
    });
}

/* ----------------------------- Hover en tendencia -------------------------*/
peliculasTendencia.forEach((pelicula) => {
    pelicula.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculasTendencia.forEach(pelicula => pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
        }, 200);
    });
});

filaTendencia.addEventListener('mouseleave', () => {
    peliculasTendencia.forEach(pelicula => pelicula.classList.remove('hover'));
});

/* ----------------------------- Hover en popular -------------------------*/
peliculasPopular.forEach((pelicula) => {
    pelicula.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculasPopular.forEach(pelicula => pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
        }, 200);
    });
});

filaPopular.addEventListener('mouseleave', () => {
    peliculasPopular.forEach(pelicula => pelicula.classList.remove('hover'));
});


const apiUrl = '/api/recientes';

async function obtenerPeliculas() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al obtener películas: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener películas:', error);
    throw error;
  }
}

obtenerPeliculas()
  .then((peliculas) => {
    console.log('Tipo de datos de fechas de estreno:', typeof peliculas[0].fecha_estreno);
    // Ordenar las películas por año de estreno (ascendente)
    peliculas.sort((a, b) => a.fecha_estreno - b.fecha_estreno);
    
    // Llama a una función para mostrar las películas en tu página web
    mostrarPeliculas(peliculas);
  })
  .catch((error) => {
    // Manejar errores en caso de que ocurran
    console.error('Error al obtener películas:', error);
  });

function mostrarPeliculas(peliculas) {
    const contenedorCarousel = document.getElementById('carousel-tendencia');
    const carousel = contenedorCarousel.querySelector('.carousel');

    peliculas.sort((a, b) => {
        const fechaA = parseInt(a.getAttribute('data-fecha-estreno'));
        const fechaB = parseInt(b.getAttribute('data-fecha-estreno'));
        return fechaA - fechaB;
      });

    carousel.innerHTML = '';
    
    peliculas.forEach((pelicula, index) => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('pelicula');

      const imagen = document.createElement('img');
      imagen.src = pelicula.imagenURL;
      imagen.alt = `Imagen de ${pelicula.titulo}`;

      const botonInformacion = document.createElement('button');
      botonInformacion.classList.add('tarjeta-botón');
      botonInformacion.textContent = 'Más Información';

      botonInformacion.addEventListener('click', () => {
          mostrarInformacionPelicula(pelicula);
      });

      tarjeta.appendChild(imagen);
      tarjeta.appendChild(botonInformacion);

      carousel.appendChild(tarjeta);
  });
}