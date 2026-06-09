/**
 * loader.js — Pantalla de carga inicial (solo index.html)
 *
 * 1. Construye la cuadrícula 7×5 del logo con los colores de marca.
 * 2. Espera a que la página cargue por completo (imágenes, fuentes, etc.).
 * 3. Mantiene el loader visible al menos MIN_DISPLAY_MS milisegundos.
 * 4. Hace fade out y elimina el overlay del DOM.
 *
 * Debe cargarse justo después del HTML del loader para que la
 * cuadrícula aparezca antes de que se renderice el resto de la página.
 */
(function () {
    'use strict';

    /** Matriz de colores del logo (5 filas × 7 columnas) */
    var PIXELS = [
        ['#9F9F9F', '#D1D5DB', '#000000', '#000000', '#000000', '#D1D5DB', '#9F9F9F'],
        ['#D1D5DB', '#9F9F9F', '#000000', '#D1D5DB', '#9F9F9F', '#9F9F9F', '#D1D5DB'],
        ['#9F9F9F', '#9F9F9F', '#000000', '#000000', '#000000', '#9F9F9F', '#D1D5DB'],
        ['#D1D5DB', '#9F9F9F', '#D1D5DB', '#9F9F9F', '#000000', '#D1D5DB', '#9F9F9F'],
        ['#9F9F9F', '#9F9F9F', '#000000', '#000000', '#000000', '#9F9F9F', '#D1D5DB']
    ];

    /** Tiempo mínimo visible del loader en milisegundos */
    var MIN_DISPLAY_MS = 5000;

    var grid = document.getElementById('loader-grid');
    var loader = document.getElementById('page-loader');
    var index = 0;

    /* Genera cada píxel con su color y retardo de animación (--i) */
    PIXELS.forEach(function (row) {
        row.forEach(function (color) {
            var pixel = document.createElement('div');
            pixel.className = 'loader-pixel';
            pixel.style.backgroundColor = color;
            pixel.style.setProperty('--i', index++);
            grid.appendChild(pixel);
        });
    });

    var startTime = Date.now();

    /** Aplica fade out, restaura el scroll y elimina el overlay */
    function hideLoader() {
        loader.classList.add('fade-out');
        document.body.classList.remove('loading');
        setTimeout(function () { loader.remove(); }, 550);
    }

    /**
     * Espera el evento 'load' (recursos listos) y respeta el tiempo mínimo
     * para que el loader no desaparezca demasiado rápido en conexiones rápidas.
     */
    window.addEventListener('load', function () {
        var elapsed = Date.now() - startTime;
        var remaining = MIN_DISPLAY_MS - elapsed;
        setTimeout(hideLoader, Math.max(0, remaining));
    });
})();
