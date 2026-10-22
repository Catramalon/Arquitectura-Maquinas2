// Alternador de tema adaptado para Tailwind CSS (clase 'dark' en html)
function toggleTheme() {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains('dark')) {
        htmlEl.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        document.getElementById('themeIcon').className = 'fa-solid fa-moon';
    } else {
        htmlEl.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        document.getElementById('themeIcon').className = 'fa-solid fa-sun';
    }
}

// Cargar tema guardado
(function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
});

// Función global para evaluar Quizzes en cualquier unidad
function evaluarQuiz(total, urlSiguiente) {
    const form = document.getElementById('quizForm');
    const res = document.getElementById('resultado');
    const btnSiguiente = document.getElementById('btnSiguiente');
    let aciertos = 0; 
    let respondidas = 0;
    
    for(let i=1; i<=total; i++) {
        let opciones = form.elements['p'+i];
        let marcada = false;
        if(opciones) {
            for(let j=0; j<opciones.length; j++) {
                if(opciones[j].checked) {
                    marcada = true;
                    if(opciones[j].value === 'correcto') aciertos++;
                }
            }
        }
        if(marcada) respondidas++;
    }

    res.classList.remove('hidden');

    if(respondidas < total) {
        res.className = 'p-6 rounded-2xl text-center font-bold text-lg border bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-500/50 mt-8';
        res.innerHTML = '<i class="fa-solid fa-triangle-exclamation mr-2"></i> Por favor, responde todas las preguntas.';
        return;
    }
    
    btnSiguiente.classList.remove('pointer-events-none', 'opacity-50', 'bg-slate-300', 'text-slate-500', 'dark:bg-slate-700', 'dark:text-slate-300');
    btnSiguiente.classList.add('bg-emerald-500', 'text-white', 'hover:bg-emerald-400', 'shadow-lg', 'shadow-emerald-500/30');
    btnSiguiente.href = urlSiguiente;
    
    if(aciertos === total) {
        res.className = 'p-6 rounded-2xl text-center font-bold text-lg border bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-500/50 mt-8';
        res.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> ¡Excelente! ${aciertos}/${total} correctas. Módulo superado.`;
    } else {
        res.className = 'p-6 rounded-2xl text-center font-bold text-lg border bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-500/50 mt-8';
        res.innerHTML = `<i class="fa-solid fa-circle-xmark mr-2"></i> Obtuviste ${aciertos}/${total}. Avance autorizado, pero te sugerimos repasar.`;
    }
}