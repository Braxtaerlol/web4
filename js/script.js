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



