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

    /** Tiempo máximo de espera antes de ocultar (evita quedar bloqueado) */
    var MAX_WAIT_MS = 12000;

    var grid = document.getElementById('loader-grid');
    var loader = document.getElementById('page-loader');

    if (!grid || !loader) {
        return;
    }

    var index = 0;
    var hidden = false;
    var startTime = Date.now();

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

    /** Aplica fade out, restaura el scroll y elimina el overlay */
    function hideLoader() {
        if (hidden) {
            return;
        }
        hidden = true;
        loader.classList.add('fade-out');
        document.body.classList.remove('loading');
        setTimeout(function () { loader.remove(); }, 550);
    }

    /** Respeta el tiempo mínimo de visualización antes de ocultar */
    function scheduleHide() {
        var elapsed = Date.now() - startTime;
        var remaining = MIN_DISPLAY_MS - elapsed;
        setTimeout(hideLoader, Math.max(0, remaining));
    }

    /**
     * Espera el evento 'load' (recursos listos). Si la página ya cargó
     * (caché del navegador), oculta de inmediato respetando el mínimo.
     */
    if (document.readyState === 'complete') {
        scheduleHide();
    } else {
        window.addEventListener('load', scheduleHide);
    }

    /**
     * Fallback: si algún recurso externo bloquea el evento 'load',
     * el loader no debe quedarse visible indefinidamente.
     */
    setTimeout(scheduleHide, MAX_WAIT_MS);
})();
