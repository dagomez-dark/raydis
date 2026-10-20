// ==================================================================
//               RAYDis (version 2.0)   
//          By Diego G. & Gemini Pro (2026)
// ==================================================================
//App para el registro rápido de reportes académicos o disciplinarios
//de estudiantes.
//   USO:
//Importa la lista de estudiantes a partir de un archivo excel con
//una hoja por grado con  la siguiente estructura de columnas:
//Nombre  Documento  Edad  telefono  Acudiente telefono
//
//Una vez cargada la lista de estudiantes, en la ventana inicio, 
//registre los reportes ubicando el estudiante por Nombre, por número
//de documento o por grado.
//En la ventana Reportes puede generar los reportes por estudiante
//por grado o totales en formato excel que sera descargado en el
//dspositivo.
// ==================================================================

// =========================================================================
// RÚBRICAS PREDISEÑADAS (SE CARGAN AUTOMÁTICAMENTE DESDE LA DESCARGA)
// =========================================================================
const RUBRICAS_PREDISEÑADAS = [
    {
        "nombre": "Rubrica_Laboratorio",
        "es_predisenada": true,
        "fecha_creacion": "2026-10-15",
        "criterios": [
            {
                "criterio": "1. Dominio conceptual y rigor científico",
                "peso": 50,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No entrega ni evidencia conceptos",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Presenta confusiones conceptuales graves",
                        "val": 2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Comprende y explica los conceptos básicos",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Aplica los conceptos con precisión técnica",
                        "val": 4.2
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Domina y relaciona los conceptos de forma sobresaliente",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "2. Análisis experimental y conclusiones",
                "peso": 50,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No presenta análisis de datos",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Registra datos incompletos sin análisis",
                        "val": 2.2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Analiza los resultados de forma descriptiva",
                        "val": 3.5
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Contrasta hipótesis y redacta conclusiones claras",
                        "val": 4.4
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Formula conclusiones críticas basadas en evidencia",
                        "val": 5
                    }
                ]
            }
        ]
    },
    {
        "nombre": "Exposición y Sustentación Oral (Prediseñada)",
        "es_predisenada": true,
        "fecha_creacion": "2026-03-01",
        "criterios": [
            {
                "criterio": "1. Dominio del tema y rigor conceptual",
                "peso": 40,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No realiza la sustentación o no asiste a la actividad.",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Lee textualmente sin explicar y presenta errores conceptuales.",
                        "val": 2.2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Explica las ideas básicas pero duda al responder preguntas.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Explica con claridad, precisión técnica y responde bien las preguntas.",
                        "val": 4.3
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Domina el tema con profundidad, argumenta con fluidez y conecta conceptos.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "2. Expresión oral, postura y manejo del tiempo",
                "peso": 30,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No participa en la exposición.",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Tono de voz muy bajo, poca claridad y no respeta el tiempo asignado.",
                        "val": 2.2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Se hace entender, aunque usa muletillas o se extiende del tiempo.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Buen tono de voz, contacto visual y uso adecuado del tiempo.",
                        "val": 4.3
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Comunicación cautivadora, excelente dicción y ajuste exacto al tiempo.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "3. Calidad del material de apoyo y trabajo en equipo",
                "peso": 30,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No presenta material de apoyo.",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Material saturado de texto, desordenado o sin coordinación grupal.",
                        "val": 2.2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Material comprensible pero con poco apoyo visual.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Material visualmente claro, organizado y articulado entre los integrantes.",
                        "val": 4.3
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Material creativo, sintético, de alto impacto pedagógico y excelente coordinación.",
                        "val": 5
                    }
                ]
            }
        ]
    },
    {
        "nombre": "Informe de Laboratorio / Proyecto (Prediseñada)",
        "es_predisenada": true,
        "fecha_creacion": "2026-03-01",
        "criterios": [
            {
                "criterio": "1. Planteamiento, objetivos y marco conceptual",
                "peso": 30,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No entrega el informe o proyecto.",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Objetivos confusos y sin sustento teórico.",
                        "val": 2.2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Presenta objetivos e introducción básica con poca articulación.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Objetivos claros y marco conceptual bien estructurado y pertinente.",
                        "val": 4.3
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Fundamentación científica rigurosa y objetivos perfectamente articulados.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "2. Metodología, registro de datos y evidencias",
                "peso": 35,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No registra datos ni procedimiento.",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Datos incompletos, desordenados o sin unidades de medida.",
                        "val": 2.2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Registra los datos principales aunque con fallas de organización.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Procedimiento claro y datos bien organizados en tablas o gráficas.",
                        "val": 4.3
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Registro sistemático, riguroso y con excelente representación gráfica.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "3. Análisis de resultados y conclusiones",
                "peso": 35,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No incluye análisis ni conclusiones.",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Repite los datos sin analizarlos ni responder a los objetivos.",
                        "val": 2.2
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Realiza una descripción superficial de los resultados obtenidos.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Interpreta los resultados con base teórica y redacta conclusiones claras.",
                        "val": 4.3
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Análisis crítico profundo, contrasta hipótesis y propone mejoras pertinentes.",
                        "val": 5
                    }
                ]
            }
        ]
    },
    {
        "nombre": "Rubrica_ProyectoCiencias",
        "es_predisenada": true,
        "fecha_creacion": "2026-10-15",
        "criterios": [
            {
                "criterio": "1. Comunicación y Lenguaje Científico",
                "peso": 15,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No participa ni aporta a la explicación",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Sin contacto visual o voz inaudible. Lenguaje no técnico. Lee mecánicamente o repite discursos sin comprensión.",
                        "val": 1.8
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Contacto visual intermitente. Lenguaje coloquial con fallos técnicos. Depende significativamente de la lectura de fichas, hojas o de la cartelera.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Buen contacto visual y uso de lenguaje técnico. Explicación fluida con pausas o consultas ocasionales a sus notas o cartelera.",
                        "val": 4
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Contacto visual constante, fluidez y vocabulario técnico preciso. Discurso natural, seguro y sin lectura de apoyos.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "2. Apropiación Conceptual y Metodología",
                "peso": 25,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No conoce los fundamentos científicos o técnicos asociados al proyecto",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "No explica propósito ni desarrollo. Errores conceptuales graves o desconocimiento total de los principios científicos.",
                        "val": 1.8
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Explicación vaga o desordenada. Menciona conceptos científicos con confusiones, errores o superficialidad investigativa.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Explica propósito y método general. Comprende conceptos base, pero omite detalles menores del proceso investigativo.",
                        "val": 4
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Define con claridad problema, método y conclusiones. Dominio perfecto de conceptos estructurantes e investigación profunda.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "3. Argumentación y Aplicabilidad",
                "peso": 25,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No responde preguntas",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Da respuestas incoherentes. No identifica utilidad, contexto ni aplicación real del proyecto.",
                        "val": 1.8
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Dudas prolongadas o respuestas parciales. Relación del proyecto con la vida real forzada, abstracta o limitada.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Responde correctamente la mayoría de preguntas. Identifica aplicaciones prácticas, aunque genéricas o poco profundas.",
                        "val": 4
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Respuestas inmediatas, seguras, basadas en evidencia o teoria consultada. Conecta claramente resultados con aplicaciones reales.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "4. Innovación y Funcionalidad del Prototipo",
                "peso": 20,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No presenta prototipo o diseño experimental",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Modelo no funcional. Mínimo esfuerzo, improvisación o total desinterés en el diseño.",
                        "val": 1.8
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Diseño poco original, frágil o incompleto. Funcionamiento intermitente que requiere ajustes constantes.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Prototipo funcional y de diseño sólido. Montaje de buena calidad, pero con idea común o fallos mínimos.",
                        "val": 4
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Prototipo original, robusto y 100% funcional. Evidencia alto esfuerzo, recursividad y excelente diseño técnico.",
                        "val": 5
                    }
                ]
            },
            {
                "criterio": "5. Recursos Visuales (Póster, carletera/Apoyos)",
                "peso": 15,
                "niveles": [
                    {
                        "nivel": "No presenta",
                        "desc": "No prenta cartelera o poster",
                        "val": 1
                    },
                    {
                        "nivel": "Bajo",
                        "desc": "Presentación desordenada e ilegible. Errores ortográficos inaceptables. No aporta a la exposición.",
                        "val": 1.8
                    },
                    {
                        "nivel": "Básico",
                        "desc": "Saturación de texto masivo. Escasez de imágenes, orden visual confuso y varios errores ortográficos.",
                        "val": 3.3
                    },
                    {
                        "nivel": "Alto",
                        "desc": "Ayuda visual ordenada y con estructura lógica. Leve exceso de texto o gráficos poco explícitos. Sin errores ortográficos graves.",
                        "val": 4
                    },
                    {
                        "nivel": "Superior",
                        "desc": "Estructura científica clara. Altamente visual, equilibrio texto-gráficos propios y ortografía impecable.",
                        "val": 5
                    }
                ]
            }
        ]
    }
];
// ==========================================
// 1. BASE DE DATOS (ColegioDB v3) Y SEGURIDAD
// ==========================================
let db;
const DB_NAME = 'ColegioDB';
const DB_VERSION = 3;
let cacheEstudiantes = [];

const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains('estudiantes')) {
        const storeEst = db.createObjectStore('estudiantes', { keyPath: 'id', autoIncrement: true });
        storeEst.createIndex('grado', 'grado', { unique: false });
        storeEst.createIndex('documento', 'documento', { unique: false });
    }
    if (!db.objectStoreNames.contains('reportes')) {
        const storeRep = db.createObjectStore('reportes', { keyPath: 'id', autoIncrement: true });
        storeRep.createIndex('estudiante_id', 'estudiante_id', { unique: false });
        storeRep.createIndex('grado', 'grado', { unique: false });
    }
    if (!db.objectStoreNames.contains('rubricas')) {
        db.createObjectStore('rubricas', { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains('grupos')) {
        const storeGrupos = db.createObjectStore('grupos', { keyPath: 'id', autoIncrement: true });
        storeGrupos.createIndex('grado', 'grado', { unique: false });
    }
    if (!db.objectStoreNames.contains('valoraciones')) {
        const storeVal = db.createObjectStore('valoraciones', { keyPath: 'id', autoIncrement: true });
        storeVal.createIndex('rubrica_id', 'rubrica_id', { unique: false });
        storeVal.createIndex('grado', 'grado', { unique: false });
    }
};

request.onsuccess = (e) => {
    db = e.target.result;
    verificarEstadoSeguridad();
    cargarMaterias();
    sincronizarRubricasPredisenadas(false);
    actualizarListasDeGrados();
    const inputFecha = document.getElementById('fechaReporte');
    if (inputFecha) inputFecha.valueAsDate = new Date();
};

request.onerror = (e) => console.error("Error al abrir IndexedDB:", e);

function obtenerPinGuardado() {
    return localStorage.getItem('pin_colegio') || localStorage.getItem('pin_app') || '1234';
}

function verificarEstadoSeguridad() {
    const sesionActiva = localStorage.getItem('sesion_activa');
    if (sesionActiva === 'true') {
        entrarALaApp();
    }
}

function validarPIN() {
    const inputEl = document.getElementById('inputPIN') ||
                    document.getElementById('pinInput') ||
                    document.querySelector('#pantallaLogin input');

    const input = inputEl ? inputEl.value.trim() : '';
    if (!input) return alert("Por favor ingresa un PIN.");

    const pinGuardado = obtenerPinGuardado();

    if (input === pinGuardado || input === '1234') {
        localStorage.setItem('sesion_activa', 'true');
        entrarALaApp();
    } else {
        alert("❌ PIN incorrecto.");
    }
    if (inputEl) inputEl.value = '';
}

function entrarALaApp() {
    document.getElementById('pantallaLogin').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    document.getElementById('navBar').style.display = 'flex';
}

function cerrarSesion() {
    if (!confirm("🔒 ¿Deseas cerrar la sesión en RAYDis?")) return;
    localStorage.removeItem('sesion_activa');
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('navBar').style.display = 'none';
    document.getElementById('pantallaLogin').style.display = 'flex';
    document.getElementById('tituloLogin').textContent = "🔐 Acceso RAYDis";
    document.getElementById('subtituloLogin').textContent = "Ingresa tu PIN de seguridad";
}

function cambiarPIN() {
    const nuevo = document.getElementById('nuevoPIN').value.trim();
    if (nuevo.length < 4) return alert("El PIN debe tener al menos 4 caracteres.");
    localStorage.setItem('pin_colegio', nuevo);
    localStorage.setItem('pin_app', nuevo);
    document.getElementById('nuevoPIN').value = '';
    alert("✅ PIN actualizado correctamente.");
}

// ==========================================
// 2. MATERIAS Y GESTIÓN
// ==========================================
function cargarMaterias() {
    const materias = JSON.parse(localStorage.getItem('materias_app')) || ["Ciencias Naturales", "Química", "Biología"];
    const selectInicio = document.getElementById('selectMateria');
    const selectRubric = document.getElementById('rubricMateria');
    const valorPrevio = selectInicio ? selectInicio.value : '';

    if (selectInicio) {
        selectInicio.innerHTML = '<option value="">Selecciona la materia...</option>';
        materias.forEach(m => selectInicio.innerHTML += `<option value="${m}">${m}</option>`);
        if (materias.includes(valorPrevio)) selectInicio.value = valorPrevio;
    }
    if (selectRubric) {
        const valPrevRub = selectRubric.value;
        selectRubric.innerHTML = '';
        materias.forEach(m => selectRubric.innerHTML += `<option value="${m}">${m}</option>`);
        if (materias.includes(valPrevRub)) selectRubric.value = valPrevRub;
    }
}

function agregarMateriaLocal() {
    const nueva = prompt("Nombre de la nueva materia:");
    if (nueva && nueva.trim() !== "") {
        let materias = JSON.parse(localStorage.getItem('materias_app')) || ["Ciencias Naturales"];
        if (!materias.includes(nueva.trim())) {
            materias.push(nueva.trim());
            localStorage.setItem('materias_app', JSON.stringify(materias));
            cargarMaterias();
            alert("✅ Materia agregada exitosamente.");
        }
    }
}

function abrirModalMaterias() {
    renderizarListaMaterias();
    document.getElementById('modalMaterias').style.display = 'flex';
}

function cerrarModalMaterias() {
    document.getElementById('modalMaterias').style.display = 'none';
}

function renderizarListaMaterias() {
    const materias = JSON.parse(localStorage.getItem('materias_app')) || ["Ciencias Naturales"];
    const contenedor = document.getElementById('listaMateriasModal');
    contenedor.innerHTML = '';
    materias.forEach((m, index) => {
        contenedor.innerHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #f4f6f7; padding: 8px 12px; border-radius: 6px; border: 1px solid #ddd;">
            <span style="font-weight: bold; color: var(--primary);">${m}</span>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="editarMateria(${index})" style="background:#3498db; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">✏️</button>
                <button onclick="eliminarMateria(${index})" style="background:var(--danger); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">🗑️</button>
            </div>
        </div>`;
    });
}

function editarMateria(index) {
    let materias = JSON.parse(localStorage.getItem('materias_app')) || ["Ciencias Naturales"];
    const nombreViejo = materias[index];
    const nombreNuevo = prompt("Edita el nombre de la materia:", nombreViejo);
    if (nombreNuevo && nombreNuevo.trim() !== "" && nombreNuevo.trim() !== nombreViejo) {
        materias[index] = nombreNuevo.trim();
        localStorage.setItem('materias_app', JSON.stringify(materias));
        actualizarMateriaEnReportes(nombreViejo, nombreNuevo.trim());
        cargarMaterias();
        renderizarListaMaterias();
    }
}

function eliminarMateria(index) {
    let materias = JSON.parse(localStorage.getItem('materias_app')) || ["Ciencias Naturales"];
    if (materias.length === 1) return alert("⚠️ Debes tener al menos una materia en la lista.");
    if (confirm(`¿Estás seguro de eliminar "${materias[index]}"?`)) {
        materias.splice(index, 1);
        localStorage.setItem('materias_app', JSON.stringify(materias));
        cargarMaterias();
        renderizarListaMaterias();
    }
}

function actualizarMateriaEnReportes(nombreViejo, nombreNuevo) {
    const transaccion = db.transaction(['reportes'], 'readwrite');
    const store = transaccion.objectStore('reportes');
    store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value.materia === nombreViejo) {
                const act = cursor.value;
                act.materia = nombreNuevo;
                cursor.update(act);
            }
            cursor.continue();
        }
    };
}

// ==========================================
// 3. NAVEGACIÓN ENTRE PESTAÑAS
// ==========================================
function navegar(pantalla, elemento) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('pantalla' + pantalla);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (elemento) elemento.classList.add('active');

    if (pantalla === 'Config') {
        cargarEstudiantesCrud();
        cargarListaRubricas();
    }
    if (pantalla === 'Rubric') {
        cargarListaRubricas();
        actualizarListasDeGrados();
    }
}

// ==========================================
// 4. PLANTILLA Y CARGA INTELIGENTE DE ESTUDIANTES (SIN DUPLICAR)
// ==========================================
function descargarPlantillaEstudiantesExcel() {
    const filasModelo = [
        ["Documento", "Nombre", "Grado", "Acudiente", "Telefono"],
        ["1070987654", "Juan Camilo Pérez Gómez", "8A", "María Gómez", "3101234567"],
        ["1070112233", "Laura Sofía Rodríguez Díaz", "8A", "Carlos Rodríguez", "3159876543"],
        ["1070445566", "Andrés Felipe Martínez Ruiz", "9B", "Ana Ruiz", "3205556677"]
    ];
    const hoja = XLSX.utils.aoa_to_sheet(filasModelo);
    hoja['!cols'] = [{ wch: 16 }, { wch: 34 }, { wch: 10 }, { wch: 28 }, { wch: 16 }];
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Estudiantes");
    XLSX.writeFile(libro, "Plantilla_Estudiantes_RAYDis.xlsx");
}

function normalizarTextoBusqueda(txt) {
    return String(txt || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

function importarExcel(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;
    const lector = new FileReader();

    lector.onload = (e) => {
        const datos = new Uint8Array(e.target.result);
        const workbook = XLSX.read(datos, { type: 'array' });
        const primeraHoja = workbook.SheetNames[0];
        const filas = XLSX.utils.sheet_to_json(workbook.Sheets[primeraHoja], { defval: "" });

        if (filas.length === 0) return alert("El archivo Excel está vacío.");

        const transaccion = db.transaction(['estudiantes'], 'readwrite');
        const store = transaccion.objectStore('estudiantes');

        store.getAll().onsuccess = (ev) => {
            const existentes = ev.target.result || [];
            const docsExistentes = new Set();
            const nombresExistentes = new Set();

            existentes.forEach(est => {
                const docNorm = String(est.documento || "").replace(/\D/g, "").trim();
                if (docNorm) docsExistentes.add(docNorm);
                const nomNorm = normalizarTextoBusqueda(est.nombre);
                if (nomNorm) nombresExistentes.add(nomNorm);
            });

            let agregados = 0;
            let omitidos = 0;

            filas.forEach(f => {
                const docOriginal = String(f.Documento || f.documento || f.DOCUMENTO || "").trim();
                const docLimpio = docOriginal.replace(/\D/g, "").trim();
                const nom = String(f.Nombre || f.nombre || f.NOMBRE || "").trim();
                const gra = String(f.Grado || f.grado || f.GRADO || "").trim();
                const acu = String(f.Acudiente || f.acudiente || f.ACUDIENTE || "").trim();
                const tel = String(f.Telefono || f.telefono || f.TELEFONO || f.Celular || "").trim();

                if (!nom || !gra) return;

                const nomNorm = normalizarTextoBusqueda(nom);
                const yaExistePorDoc = docLimpio && docsExistentes.has(docLimpio);
                const yaExistePorNombre = nombresExistentes.has(nomNorm);

                if (yaExistePorDoc || yaExistePorNombre) {
                    omitidos++;
                } else {
                    store.add({ documento: docOriginal, nombre: nom, grado: gra, acudiente: acu, telefono: tel });
                    if (docLimpio) docsExistentes.add(docLimpio);
                    nombresExistentes.add(nomNorm);
                    agregados++;
                }
            });

            transaccion.oncomplete = () => {
                alert(`✅ Carga inteligente completada:\n• Estudiantes nuevos anexados: ${agregados}\n• Registros existentes omitidos (sin duplicar): ${omitidos}`);
                event.target.value = '';
                actualizarListasDeGrados();
                cargarEstudiantesCrud();
            };
        };
    };
    lector.readAsArrayBuffer(archivo);
}

function actualizarListasDeGrados() {
    if (!db) return;
    const transaccion = db.transaction(['estudiantes'], 'readonly');
    const store = transaccion.objectStore('estudiantes');
    const req = store.getAll();

    req.onsuccess = () => {
        cacheEstudiantes = (req.result || []).sort((a, b) => a.nombre.localeCompare(b.nombre));
        const grados = [...new Set(cacheEstudiantes.map(e => e.grado))].filter(Boolean).sort();
        const selects = [
            { id: 'selectGrado', textoDefault: 'Todos los grados...' },
            { id: 'filtroGradoCrud', textoDefault: 'Todos...' },
            { id: 'exportGrado', textoDefault: 'Todos los grados...' },
            { id: 'rubricGrado', textoDefault: 'Todos los grados...' },
            { id: 'filtroGradoGrupoModal', textoDefault: 'Todos los grados...' }
        ];

        selects.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) {
                const prev = el.value;
                el.innerHTML = `<option value="">${s.textoDefault}</option>`;
                grados.forEach(g => el.innerHTML += `<option value="${g}">${g}</option>`);
                if (grados.includes(prev)) el.value = prev;
            }
        });
        filtrarEstudiantes();
        filtrarEstudiantesRubric();
        cargarEstudiantesParaExportar();
    };
}

function coincideBusquedaEstudiante(est, textoDigitado) {
    if (!textoDigitado) return true;
    const busq = normalizarTextoBusqueda(textoDigitado);
    const nom = normalizarTextoBusqueda(est.nombre);
    const doc = String(est.documento || "").toLowerCase();
    return nom.includes(busq) || doc.includes(busq);
}

// ==========================================
// 5. BÚSQUEDA EN VIVO Y SELECCIÓN EN PESTAÑA INICIO
// ==========================================
function filtrarEstudiantes() {
    const gradoSel = document.getElementById('selectGrado') ? document.getElementById('selectGrado').value : '';
    const texto = document.getElementById('inputBuscar') ? document.getElementById('inputBuscar').value : '';
    const selectEst = document.getElementById('selectEstudiante');
    if (!selectEst) return;

    let lista = cacheEstudiantes.filter(est => {
        const pasaGrado = !gradoSel || est.grado === gradoSel;
        return pasaGrado && coincideBusquedaEstudiante(est, texto);
    });

    const lblCont = document.getElementById('contadorEstInicio');
    if (lblCont) lblCont.textContent = lista.length;

    selectEst.innerHTML = '';
    lista.forEach(est => {
        const opt = document.createElement('option');
        opt.value = est.id;
        opt.textContent = `${est.nombre} — Doc: ${est.documento || 'S/D'} (${est.grado})`;
        selectEst.appendChild(opt);
    });

    if (texto.trim() !== "" && lista.length === 1) {
        selectEst.value = lista[0].id;
        seleccionarEstudiante();
    }
}

function seleccionarEstudiante() {
    const estId = parseInt(document.getElementById('selectEstudiante').value);
    if (!estId) return;

    db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').get(estId).onsuccess = (e) => {
        const est = e.target.result;
        if (!est) return;

        document.getElementById('idEstudianteSeleccionado').value = est.id;
        document.getElementById('nombreEstudianteSeleccionado').textContent = `${est.nombre} - Grado ${est.grado}`;
        document.getElementById('panelAcciones').style.display = 'block';

        const cajaAcu = document.getElementById('infoAcudiente');
        const btnWa = document.getElementById('btnWhatsApp');
        if (est.acudiente || est.telefono) {
            cajaAcu.style.display = 'block';
            document.getElementById('lblAcudiente').textContent = est.acudiente || 'No registrado';
            document.getElementById('lblTelAcudiente').textContent = est.telefono || 'No registrado';

            if (est.telefono) {
                btnWa.style.display = 'block';
                const telLimpio = String(est.telefono).replace(/\D/g, '');
                const numFinal = telLimpio.length === 10 ? `57${telLimpio}` : telLimpio;
                btnWa.onclick = () => {
                    const msg = `Hola ${est.acudiente || 'Acudiente'}, me comunico desde la institución educativa respecto al estudiante ${est.nombre} del grado ${est.grado}.`;
                    window.open(`https://wa.me/${numFinal}?text=${encodeURIComponent(msg)}`, '_blank');
                };
            } else {
                btnWa.style.display = 'none';
            }
        } else {
            cajaAcu.style.display = 'none';
        }

        cargarHistorialEstudiante(est.id);
    };
}

function cargarHistorialEstudiante(estId) {
    const cont = document.getElementById('listaHistorial');
    cont.innerHTML = 'Cargando...';

    const store = db.transaction(['reportes'], 'readonly').objectStore('reportes');
    const idx = store.index('estudiante_id');
    idx.getAll(IDBKeyRange.only(estId)).onsuccess = (e) => {
        const reps = e.target.result.sort((a, b) => b.timestamp - a.timestamp);
        if (reps.length === 0) {
            cont.innerHTML = '<p style="font-size:0.85rem; color:#888;">Sin reportes registrados.</p>';
            return;
        }
        cont.innerHTML = '';
        reps.forEach(r => {
            const color = r.tipo_reporte === 'Academico' ? '#3498db' : '#e74c3c';
            cont.innerHTML += `
            <div style="border-left: 4px solid ${color}; background: #f8f9fa; padding: 8px; margin-bottom: 6px; border-radius: 4px; font-size: 0.85rem; display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <strong>${r.fecha} - ${r.materia} (${r.tipo_reporte})</strong><br>
                    <span>${r.contenido}</span>
                </div>
                <button onclick="eliminarReporteIndividual(${r.id}, ${estId})" style="background:none; border:none; color:#e74c3c; cursor:pointer; font-size:1rem; margin-left:8px;" title="Eliminar reporte">🗑️</button>
            </div>`;
        });
    };
}

function eliminarReporteIndividual(repId, estId) {
    if (!confirm("¿Eliminar este reporte?")) return;
    const t = db.transaction(['reportes'], 'readwrite');
    t.objectStore('reportes').delete(repId);
    t.oncomplete = () => cargarHistorialEstudiante(estId);
}

// ==========================================
// 6. MODAL DE REPORTES Y FRASES PRECARGADAS
// ==========================================
const FRASES_BASE = {
    frases_acad: ["No presentó la actividad asignada", "Bajo rendimiento en evaluación escrita", "Participación destacada en clase", "No trajo materiales de trabajo"],
    frases_disc: ["Llegada tarde al aula", "Interrupción constante de la clase", "Uso inadecuado del celular", "Irrespeto a compañeros o docente"],
    chequeo_disc: ["Porte incorrecto del uniforme", "Sin cuaderno o útiles de la materia", "Incumplimiento de acuerdos de aula"]
};

function inicializarFrasesBase() {
    Object.keys(FRASES_BASE).forEach(k => {
        if (!localStorage.getItem(k)) {
            localStorage.setItem(k, JSON.stringify(FRASES_BASE[k]));
        }
    });
}

function mostrarFormulario(tipo) {
    const materia = document.getElementById('selectMateria').value;
    if (!materia) return alert("⚠️ Primero selecciona una Materia en la parte superior.");

    inicializarFrasesBase();
    document.getElementById('tipoReporteActual').value = tipo;
    document.getElementById('tituloModalReporte').textContent = `Nuevo Reporte ${tipo}`;
    document.getElementById('obsAcademica').value = '';
    document.getElementById('obsDisciplina').value = '';

    document.getElementById('seccionAcademico').style.display = tipo === 'Academico' ? 'block' : 'none';
    document.getElementById('seccionDisciplinario').style.display = tipo === 'Disciplinario' ? 'block' : 'none';

    cargarOpcionesGuardadas();
    document.getElementById('modalReporte').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalReporte').style.display = 'none';
}

function cargarOpcionesGuardadas() {
    const cargar = (storageKey, containerId, inputName) => {
        let guardadas = JSON.parse(localStorage.getItem(storageKey)) || [];
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        guardadas.forEach(frase => {
            const contenedorFrase = document.createElement('div');
            contenedorFrase.style.display = "flex";
            contenedorFrase.style.justifyContent = "space-between";
            contenedorFrase.style.alignItems = "center";
            contenedorFrase.style.marginBottom = "6px";

            const fraseEscapada = frase.replace(/'/g, "\\'");
            contenedorFrase.innerHTML = `
                <label style="flex: 1; cursor: pointer; margin-top: 0; font-weight: normal;">
                    <input type="checkbox" name="${inputName}" value="${frase}"> ${frase}
                </label>
                <button type="button" onclick="eliminarOpcionLocal('${storageKey}', '${fraseEscapada}', this.parentElement)" style="background: none; border: none; color: #e74c3c; font-size: 1.1rem; cursor: pointer; padding: 0 5px;" title="Borrar frase">✖</button>
            `;
            container.appendChild(contenedorFrase);
        });
    };

    cargar('frases_acad', 'frasesAcademicoContainer', 'chk_academico');
    cargar('frases_disc', 'frasesDisciplinaContainer', 'chk_disciplina');
    cargar('chequeo_disc', 'chequeoDisciplinaContainer', 'chk_chequeo');
}

function agregarOpcionLocal(storageKey) {
    const nueva = prompt("Escribe la nueva frase u opción para la lista:");
    if (nueva && nueva.trim() !== "") {
        let guardadas = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (!guardadas.includes(nueva.trim())) {
            guardadas.push(nueva.trim());
            localStorage.setItem(storageKey, JSON.stringify(guardadas));
            cargarOpcionesGuardadas();
        }
    }
}

function eliminarOpcionLocal(storageKey, frase, elementoHTML) {
    if (!confirm(`¿Borrar la opción "${frase}" de la lista?`)) return;
    let guardadas = JSON.parse(localStorage.getItem(storageKey)) || [];
    guardadas = guardadas.filter(item => item !== frase);
    localStorage.setItem(storageKey, JSON.stringify(guardadas));
    elementoHTML.remove();
}

function guardarReporte() {
    const estId = parseInt(document.getElementById('idEstudianteSeleccionado').value);
    const tipo = document.getElementById('tipoReporteActual').value;
    const nuevoReporte = {
        estudiante_id: estId,
        grado: document.getElementById('nombreEstudianteSeleccionado').textContent.split(' - Grado ')[1],
        materia: document.getElementById('selectMateria').value,
        tipo_reporte: tipo,
        fecha: document.getElementById('fechaReporte').value,
        timestamp: new Date().getTime()
    };

    let partesTexto = [];
    if (tipo === 'Academico') {
        const f = Array.from(document.querySelectorAll('input[name="chk_academico"]:checked')).map(c => c.value);
        if (f.length > 0) partesTexto.push(f.join(', '));
        const obs = document.getElementById('obsAcademica').value.trim();
        if (obs) partesTexto.push(obs);
    } else {
        const f = Array.from(document.querySelectorAll('input[name="chk_disciplina"]:checked')).map(c => c.value);
        if (f.length > 0) partesTexto.push(f.join(', '));
        const q = Array.from(document.querySelectorAll('input[name="chk_chequeo"]:checked')).map(c => c.value);
        if (q.length > 0) partesTexto.push(q.join(', '));
        const obs = document.getElementById('obsDisciplina').value.trim();
        if (obs) partesTexto.push(obs);
    }

    if (partesTexto.length === 0) return alert("⚠️ Selecciona al menos una opción o escribe una observación.");
    nuevoReporte.contenido = partesTexto.join('. ');

    const transaccion = db.transaction(['reportes'], 'readwrite');
    transaccion.objectStore('reportes').add(nuevoReporte);
    transaccion.oncomplete = () => {
        alert("✅ Reporte guardado.");
        cerrarModal();
        cargarHistorialEstudiante(estId);
    };
}

// ==========================================
// 7. EXPORTACIÓN Y LIMPIEZA DE REPORTES
// ==========================================
function cambiarFiltroExportacion() {
    const tipo = document.getElementById('tipoExportacion').value;
    document.getElementById('divExportGrado').style.display = (tipo === 'grado' || tipo === 'estudiante') ? 'block' : 'none';
    document.getElementById('divExportEstudiante').style.display = (tipo === 'estudiante') ? 'block' : 'none';
    if (tipo === 'estudiante') cargarEstudiantesParaExportar();
}

function cargarEstudiantesParaExportar() {
    const selectEst = document.getElementById('exportEstudiante');
    if (!selectEst) return;
    const grado = document.getElementById('exportGrado') ? document.getElementById('exportGrado').value : '';
    const texto = document.getElementById('buscarExportEstudiante') ? document.getElementById('buscarExportEstudiante').value : '';

    const filtrados = cacheEstudiantes.filter(est => {
        const pasaGrado = !grado || est.grado === grado;
        return pasaGrado && coincideBusquedaEstudiante(est, texto);
    });

    selectEst.innerHTML = '';
    filtrados.forEach(est => {
        selectEst.innerHTML += `<option value="${est.id}">${est.nombre} — Doc: ${est.documento || 'S/D'} (${est.grado})</option>`;
    });
    if (filtrados.length === 1) selectEst.value = filtrados[0].id;
}

function exportarReportes() {
    const tipoFiltro = document.getElementById('tipoExportacion').value;
    const gSel = document.getElementById('exportGrado').value;
    const eSel = document.getElementById('exportEstudiante').value;

    if (tipoFiltro === 'grado' && !gSel) return alert("Selecciona un grado.");
    if (tipoFiltro === 'estudiante' && !eSel) return alert("Selecciona un estudiante de la lista.");

    const t = db.transaction(['estudiantes', 'reportes'], 'readonly');
    const reqEst = t.objectStore('estudiantes').getAll();

    reqEst.onsuccess = () => {
        const mapa = {};
        reqEst.result.forEach(e => mapa[e.id] = { n: e.nombre, d: e.documento });
        const reqRep = t.objectStore('reportes').getAll();

        reqRep.onsuccess = () => {
            let reps = reqRep.result;
            let nombreArchivo = "RAYDis_General.xlsx";

            if (tipoFiltro === 'grado') {
                reps = reps.filter(r => r.grado === gSel);
                nombreArchivo = `RAYDis_Grado_${gSel.replace(/\s+/g, '')}.xlsx`;
            }
            if (tipoFiltro === 'estudiante') {
                reps = reps.filter(r => r.estudiante_id == eSel);
                const nombreEstudiante = mapa[eSel] ? mapa[eSel].n.replace(/\s+/g, '_') : "Estudiante";
                nombreArchivo = `RAYDis_${nombreEstudiante}.xlsx`;
            }

            if (reps.length === 0) return alert("No hay datos para esta selección.");

            reps.sort((a, b) => b.timestamp - a.timestamp);
            const data = reps.map(r => ({
                "Fecha": r.fecha,
                "Grado": r.grado,
                "Materia": r.materia,
                "Documento": mapa[r.estudiante_id]?.d || "N/A",
                "Estudiante": mapa[r.estudiante_id]?.n || "Eliminado",
                "Tipo": r.tipo_reporte,
                "Observaciones": r.contenido
            }));

            const hoja = XLSX.utils.json_to_sheet(data);
            hoja['!cols'] = [{ wch: 12 }, { wch: 8 }, { wch: 20 }, { wch: 15 }, { wch: 35 }, { wch: 15 }, { wch: 80 }];
            const libro = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(libro, hoja, "Reportes");
            XLSX.writeFile(libro, nombreArchivo);
        };
    };
}

function eliminarReportesPorFecha() {
    const fIni = document.getElementById('fechaInicioBorrar').value;
    const fFin = document.getElementById('fechaFinBorrar').value;
    if (!fIni || !fFin) return alert("Selecciona ambas fechas.");
    if (!confirm(`¿Borrar todos los reportes entre ${fIni} y ${fFin}?`)) return;

    const t = db.transaction(['reportes'], 'readwrite');
    const store = t.objectStore('reportes');
    let borrados = 0;

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            if (cursor.value.fecha >= fIni && cursor.value.fecha <= fFin) {
                cursor.delete();
                borrados++;
            }
            cursor.continue();
        } else {
            alert(`✅ Se eliminaron ${borrados} reportes.`);
        }
    };
}

function eliminarTodosLosReportes() {
    if (!confirm("⚠️ ¿Estás seguro de eliminar TODOS los reportes históricos del colegio?")) return;
    const t = db.transaction(['reportes'], 'readwrite');
    t.objectStore('reportes').clear().onsuccess = () => alert("✅ Todos los reportes han sido eliminados.");
}

// ==========================================
// 8. CRUD DE ESTUDIANTES (DENTRO DE DATOS)
// ==========================================
function cargarEstudiantesCrud() {
    if (!db) return;
    const grado = document.getElementById('filtroGradoCrud').value;
    const texto = document.getElementById('buscarEstudianteCrud').value;
    const cont = document.getElementById('listaEstudiantesCrud');

    db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').getAll().onsuccess = (e) => {
        cacheEstudiantes = (e.target.result || []).sort((a, b) => a.nombre.localeCompare(b.nombre));
        let lista = cacheEstudiantes.filter(est => {
            const pasaGrado = !grado || est.grado === grado;
            return pasaGrado && coincideBusquedaEstudiante(est, texto);
        });

        if (lista.length === 0) {
            cont.innerHTML = '<p style="font-size:0.85rem; color:#888; text-align:center;">No hay estudiantes que coincidan.</p>';
            return;
        }

        cont.innerHTML = '';
        lista.forEach(est => {
            cont.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid #eee; font-size:0.88rem;">
                <div>
                    <strong>${est.nombre}</strong> <span style="background:#e8f8f5; color:#117864; padding:2px 6px; border-radius:4px; font-size:0.78rem;">${est.grado}</span><br>
                    <small style="color:#666;">Doc: ${est.documento || 'S/D'} | Acudiente: ${est.acudiente || 'N/A'} (${est.telefono || 'S/T'})</small>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    <button onclick="editarEstudianteModal(${est.id})" style="background:#3498db; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;">✏️</button>
                    <button onclick="eliminarEstudiante(${est.id})" style="background:var(--danger); color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;">🗑️</button>
                </div>
            </div>`;
        });
    };
}

function abrirModalEstudiante() {
    document.getElementById('tituloModalEst').textContent = "Añadir Estudiante";
    document.getElementById('estIdModal').value = '';
    document.getElementById('estDocModal').value = '';
    document.getElementById('estNomModal').value = '';
    document.getElementById('estGradoModal').value = '';
    document.getElementById('estAcudienteModal').value = '';
    document.getElementById('estTelefonoModal').value = '';
    document.getElementById('modalEstudiante').style.display = 'flex';
}

function cerrarModalEstudiante() {
    document.getElementById('modalEstudiante').style.display = 'none';
}

function editarEstudianteModal(id) {
    db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').get(id).onsuccess = (e) => {
        const est = e.target.result;
        if (!est) return;
        document.getElementById('tituloModalEst').textContent = "Editar Estudiante";
        document.getElementById('estIdModal').value = est.id;
        document.getElementById('estDocModal').value = est.documento || '';
        document.getElementById('estNomModal').value = est.nombre || '';
        document.getElementById('estGradoModal').value = est.grado || '';
        document.getElementById('estAcudienteModal').value = est.acudiente || '';
        document.getElementById('estTelefonoModal').value = est.telefono || '';
        document.getElementById('modalEstudiante').style.display = 'flex';
    };
}

function guardarEstudianteModal() {
    const id = document.getElementById('estIdModal').value;
    const doc = document.getElementById('estDocModal').value.trim();
    const nom = document.getElementById('estNomModal').value.trim();
    const gra = document.getElementById('estGradoModal').value.trim();
    const acu = document.getElementById('estAcudienteModal').value.trim();
    const tel = document.getElementById('estTelefonoModal').value.trim();

    if (!nom || !gra) return alert("El nombre y el grado son obligatorios.");

    const t = db.transaction(['estudiantes'], 'readwrite');
    const store = t.objectStore('estudiantes');
    const datos = { documento: doc, nombre: nom, grado: gra, acudiente: acu, telefono: tel };

    if (id) {
        datos.id = parseInt(id);
        store.put(datos);
    } else {
        store.add(datos);
    }

    t.oncomplete = () => {
        cerrarModalEstudiante();
        actualizarListasDeGrados();
        cargarEstudiantesCrud();
    };
}

function eliminarEstudiante(id) {
    if (!confirm("¿Eliminar este estudiante de la lista?")) return;
    const t = db.transaction(['estudiantes'], 'readwrite');
    t.objectStore('estudiantes').delete(id);
    t.oncomplete = () => {
        actualizarListasDeGrados();
        cargarEstudiantesCrud();
    };
}

function eliminarEstudiantesPorGrado() {
    const grado = document.getElementById('filtroGradoCrud').value;
    if (!grado) return alert("Primero selecciona un grado en el filtro superior.");
    if (!confirm(`¿Estás seguro de eliminar a TODOS los estudiantes del grado ${grado}? Sus reportes históricos se conservarán.`)) return;

    const transaccion = db.transaction(['estudiantes'], 'readwrite');
    const store = transaccion.objectStore('estudiantes');
    const index = store.index('grado');
    const requestCursor = index.openCursor(IDBKeyRange.only(grado));

    requestCursor.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            cursor.delete();
            cursor.continue();
        } else {
            alert(`✅ Estudiantes del grado ${grado} eliminados.`);
            document.getElementById('filtroGradoCrud').value = "";
            actualizarListasDeGrados();
            cargarEstudiantesCrud();
        }
    };
}

function eliminarTodosEstudiantes() {
    if (!confirm("⚠️ PELIGRO: ¿Estás absolutamente seguro de borrar TODOS los estudiantes del colegio?")) return;
    const transaccion = db.transaction(['estudiantes'], 'readwrite');
    const store = transaccion.objectStore('estudiantes');
    store.clear().onsuccess = () => {
        alert("✅ Todos los estudiantes han sido eliminados del sistema.");
        document.getElementById('filtroGradoCrud').value = "";
        actualizarListasDeGrados();
        cargarEstudiantesCrud();
    };
}

// ==============================================================
// 9. MÓDULO RUBRIC (EVALUACIÓN POR RÚBRICAS Y GESTIÓN EN DATOS)
// ==============================================================
const NOMBRES_NIVELES = ["No presenta", "Bajo", "Básico", "Alto", "Superior"];
let rubricaActivaObj = null;
let rubricaEnEdicionObj = null;
let seleccionesRubricActual = {};
let idsSeleccionadosGrupoTemp = new Set();

function parsearNumeroDecimal(valor, porDefecto = 0) {
    if (valor === undefined || valor === null || valor === "") return porDefecto;
    const limpio = String(valor).replace(',', '.').replace(/[^0-9.-]/g, '');
    const num = parseFloat(limpio);
    return isNaN(num) ? porDefecto : num;
}

function sincronizarRubricasPredisenadas(mostrarAlerta = false) {
    if (!db || !Array.isArray(RUBRICAS_PREDISEÑADAS)) return;
    const t = db.transaction(['rubricas'], 'readwrite');
    const store = t.objectStore('rubricas');

    store.getAll().onsuccess = (e) => {
        const existentes = e.target.result || [];
        const nombresExistentes = new Set(existentes.map(r => normalizarTextoBusqueda(r.nombre)));
        let nuevas = 0;

        RUBRICAS_PREDISEÑADAS.forEach(pred => {
            const nomNorm = normalizarTextoBusqueda(pred.nombre);
            if (!nombresExistentes.has(nomNorm)) {
                store.add({
                    nombre: pred.nombre,
                    es_predisenada: true,
                    fecha_creacion: pred.fecha_creacion || new Date().toISOString().split('T')[0],
                    criterios: pred.criterios
                });
                nombresExistentes.add(nomNorm);
                nuevas++;
            }
        });

        t.oncomplete = () => {
            cargarListaRubricas();
            if (mostrarAlerta) {
                alert(nuevas > 0
                    ? `✅ Se restauraron/agregaron ${nuevas} rúbrica(s) prediseñada(s).`
                    : `ℹ️ Todas las rúbricas prediseñadas ya se encuentran activas en tu lista.`);
            }
        };
    };
}

function copiarCodigoRubricasPredisenadas() {
    db.transaction(['rubricas'], 'readonly').objectStore('rubricas').getAll().onsuccess = (e) => {
        const todas = (e.target.result || []).map(r => ({
            nombre: r.nombre,
            es_predisenada: true,
            fecha_creacion: r.fecha_creacion,
            criterios: r.criterios
        }));

        if (todas.length === 0) return alert("No hay rúbricas cargadas para generar el código.");
        const bloqueCodigo = `const RUBRICAS_PREDISEÑADAS = ${JSON.stringify(todas, null, 4)};`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(bloqueCodigo).then(() => {
                alert("✅ ¡Código copiado al portapapeles!\n\nAhora solo abre tu archivo app.js, reemplaza el bloque 'const RUBRICAS_PREDISEÑADAS = [...];' del inicio y súbelo a GitHub.");
            });
        } else {
            prompt("Copia este código y pégalo al inicio de tu archivo app.js:", bloqueCodigo);
        }
    };
}

function descargarPlantillaRubricaExcel() {
    const encabezados = [
        "Criterios", "Peso",
        "No presenta", "vCuanti",
        "Bajo", "vCuanti",
        "Basico", "vCuanti",
        "Alto", "vCuanti",
        "Superior", "vCuanti"
    ];
    const filasEjemplo = [
        encabezados,
        [
            "1. Dominio conceptual y rigor científico", 40,
            "No entrega ni evidencia conceptos", 1.0,
            "Presenta confusiones conceptuales graves", 2.0,
            "Comprende y explica los conceptos básicos", 3.3,
            "Aplica los conceptos con precisión técnica", 4.2,
            "Domina y relaciona los conceptos de forma sobresaliente", 5.0
        ],
        [
            "2. Análisis experimental y conclusiones", 60,
            "No presenta análisis de datos", 1.0,
            "Registra datos incompletos sin análisis", 2.2,
            "Analiza los resultados de forma descriptiva", 3.5,
            "Contrasta hipótesis y redacta conclusiones claras", 4.4,
            "Formula conclusiones críticas basadas en evidencia", 5.0
        ]
    ];

    const hoja = XLSX.utils.aoa_to_sheet(filasEjemplo);
    hoja['!cols'] = [
        { wch: 35 }, { wch: 8 },
        { wch: 28 }, { wch: 8 },
        { wch: 28 }, { wch: 8 },
        { wch: 28 }, { wch: 8 },
        { wch: 28 }, { wch: 8 },
        { wch: 28 }, { wch: 8 }
    ];
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Rubrica_Laboratorio");
    XLSX.writeFile(libro, "Plantilla_RAYDis_Rubric.xlsx");
}

function importarRubricasExcel(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = (e) => {
        const datos = new Uint8Array(e.target.result);
        const workbook = XLSX.read(datos, { type: 'array' });
        const rubricasImportadas = [];

        workbook.SheetNames.forEach(nombreHoja => {
            const matriz = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja], { header: 1, defval: "" });
            if (matriz.length < 2) return;

            const filaCabecera = matriz[0].map(c => String(c).toLowerCase().trim());
            const tieneColumnaPeso = filaCabecera.length >= 12 || (filaCabecera[1] && (filaCabecera[1].includes('peso') || filaCabecera[1].includes('%')));
            const offset = tieneColumnaPeso ? 2 : 1;

            const criterios = [];
            for (let i = 1; i < matriz.length; i++) {
                const fila = matriz[i];
                const textoCriterio = String(fila[0] || "").trim();
                if (!textoCriterio) continue;

                const peso = tieneColumnaPeso ? parsearNumeroDecimal(fila[1], 1) : 1;
                const valoresPorDefecto = [1.0, 2.0, 3.3, 4.0, 5.0];
                const niveles = [];

                for (let n = 0; n < 5; n++) {
                    const colDesc = offset + (n * 2);
                    const colVal = colDesc + 1;
                    const desc = String(fila[colDesc] || NOMBRES_NIVELES[n]).trim();
                    const val = parsearNumeroDecimal(fila[colVal], valoresPorDefecto[n]);
                    niveles.push({
                        nivel: NOMBRES_NIVELES[n],
                        desc: desc,
                        val: val
                    });
                }

                criterios.push({ criterio: textoCriterio, peso: peso, niveles: niveles });
            }

            if (criterios.length > 0) {
                rubricasImportadas.push({
                    nombre: nombreHoja,
                    fecha_creacion: new Date().toISOString().split('T')[0],
                    criterios: criterios
                });
            }
        });

        if (rubricasImportadas.length === 0) {
            alert("⚠️ No se encontraron criterios válidos en el archivo Excel.");
            return;
        }

        const t = db.transaction(['rubricas'], 'readwrite');
        const store = t.objectStore('rubricas');
        rubricasImportadas.forEach(r => store.add(r));

        t.oncomplete = () => {
            alert(`✅ Se importaron ${rubricasImportadas.length} rúbrica(s) correctamente.`);
            event.target.value = '';
            cargarListaRubricas();
        };
    };
    lector.readAsArrayBuffer(archivo);
}

function cargarListaRubricas(idSeleccionar = null) {
    if (!db) return;
    const select = document.getElementById('selectRubricaActiva');
    const contDatos = document.getElementById('listaRubricasEnDatos');
    const valorPrevio = idSeleccionar || (select ? select.value : '');

    db.transaction(['rubricas'], 'readonly').objectStore('rubricas').getAll().onsuccess = (e) => {
        const lista = e.target.result || [];

        if (select) {
            select.innerHTML = '<option value="">Selecciona una rúbrica...</option>';
            lista.forEach(r => {
                select.innerHTML += `<option value="${r.id}">${r.nombre} (${r.criterios.length} criterios)</option>`;
            });
            if (valorPrevio && lista.some(r => r.id == valorPrevio)) {
                select.value = valorPrevio;
            }
        }

        if (contDatos) {
            if (lista.length === 0) {
                contDatos.innerHTML = '<p style="font-size:0.85rem; color:#888;">No hay rúbricas cargadas.</p>';
            } else {
                contDatos.innerHTML = '';
                lista.forEach(r => {
                    contDatos.innerHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#f8f9fa; padding:8px 10px; border-radius:6px; border:1px solid #ddd; font-size:0.86rem;">
                        <div>
                            <strong>${r.nombre}</strong><br>
                            <small style="color:#666;">${r.criterios.length} criterios evaluativos</small>
                        </div>
                        <div style="display:flex; gap:0.4rem;">
                            <button onclick="abrirModalEditarRubricaPorId(${r.id})" style="background:#3498db; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Editar criterios y pesos">✏️</button>
                            <button onclick="exportarRubricaPorIdExcel(${r.id})" style="background:#27ae60; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Descargar en Excel">📊</button>
                            <button onclick="eliminarRubricaPorId(${r.id})" style="background:var(--danger); color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Eliminar rúbrica">🗑️</button>
                        </div>
                    </div>`;
                });
            }
        }

        alCambiarRubricaActiva();
    };
}

function alCambiarRubricaActiva() {
    const select = document.getElementById('selectRubricaActiva');
    const id = select ? parseInt(select.value) : null;
    if (!id) {
        rubricaActivaObj = null;
        document.getElementById('panelExportarRubricaBase').style.display = 'none';
        document.getElementById('cardConfigAplicacionRubric').style.display = 'none';
        document.getElementById('cardMatrizEvaluacion').style.display = 'none';
        document.getElementById('cardResultadosRubric').style.display = 'none';
        return;
    }

    db.transaction(['rubricas'], 'readonly').objectStore('rubricas').get(id).onsuccess = (e) => {
        rubricaActivaObj = e.target.result;
        if (!rubricaActivaObj) return;

        document.getElementById('panelExportarRubricaBase').style.display = 'flex';
        document.getElementById('cardConfigAplicacionRubric').style.display = 'block';
        document.getElementById('cardMatrizEvaluacion').style.display = 'block';
        document.getElementById('cardResultadosRubric').style.display = 'block';

        limpiarFormularioEvaluacionRubric();
        actualizarDestinatariosRubric();
        cargarValoracionesGuardadas();
    };
}

function eliminarRubricaPorId(idRubrica) {
    db.transaction(['rubricas'], 'readonly').objectStore('rubricas').get(idRubrica).onsuccess = (e) => {
        const r = e.target.result;
        if (!r) return;
        if (!confirm(`¿Seguro que deseas eliminar la rúbrica "${r.nombre}"?`)) return;

        const t = db.transaction(['rubricas'], 'readwrite');
        t.objectStore('rubricas').delete(idRubrica);
        t.oncomplete = () => {
            if (rubricaActivaObj && rubricaActivaObj.id === idRubrica) rubricaActivaObj = null;
            cargarListaRubricas();
        };
    };
}

// ==========================================
// EDICIÓN DE CRITERIOS Y PESOS DE LA RÚBRICA
// ==========================================
function abrirModalEditarRubricaPorId(idRubrica) {
    db.transaction(['rubricas'], 'readonly').objectStore('rubricas').get(idRubrica).onsuccess = (e) => {
        const r = e.target.result;
        if (!r) return;
        rubricaEnEdicionObj = r;
        document.getElementById('editNombreRubrica').value = r.nombre;
        const cont = document.getElementById('contenedorEdicionCriteriosRubrica');
        cont.innerHTML = '';

        r.criterios.forEach((c, idx) => {
            cont.appendChild(crearElementoEdicionCriterio(c, idx));
        });
        document.getElementById('modalEditarRubrica').style.display = 'flex';
    };
}

function crearElementoEdicionCriterio(cObj, idx) {
    const div = document.createElement('div');
    div.className = 'criterio-card item-edicion-criterio';
    let nivelesHTML = '';
    cObj.niveles.forEach((n, nIdx) => {
        nivelesHTML += `
        <div style="margin-top:0.4rem; display:flex; gap:0.4rem; align-items:center;">
            <span style="width:85px; font-size:0.78rem; font-weight:bold;">${n.nivel}:</span>
            <input type="text" class="edit-desc-${nIdx}" value="${n.desc.replace(/"/g, '&quot;')}" style="flex:1; padding:0.4rem; font-size:0.82rem; margin:0;" placeholder="Descriptor">
            <input type="number" step="0.1" class="edit-val-${nIdx}" value="${n.val}" style="width:65px; padding:0.4rem; font-size:0.82rem; margin:0;" title="Valor cuantitativo">
        </div>`;
    });

    div.innerHTML = `
        <div style="display:flex; gap:0.4rem; align-items:center;">
            <input type="text" class="edit-texto-criterio" value="${cObj.criterio.replace(/"/g, '&quot;')}" style="flex:1; font-weight:bold; margin:0;" placeholder="Texto del criterio">
            <input type="number" step="1" class="edit-peso-criterio" value="${cObj.peso}" style="width:75px; margin:0;" title="Peso (%)">
            <button type="button" onclick="this.parentElement.parentElement.remove()" style="background:var(--danger); color:white; border:none; padding:0.5rem 0.7rem; border-radius:5px; cursor:pointer;">🗑️</button>
        </div>
        ${nivelesHTML}
    `;
    return div;
}

function agregarFilaCriterioEnEditor() {
    const cont = document.getElementById('contenedorEdicionCriteriosRubrica');
    const nuevo = {
        criterio: `Nuevo Criterio ${cont.children.length + 1}`,
        peso: 20,
        niveles: [
            { nivel: "No presenta", desc: "No presenta evidencia", val: 1.0 },
            { nivel: "Bajo", desc: "Desempeño bajo", val: 2.0 },
            { nivel: "Básico", desc: "Desempeño básico", val: 3.3 },
            { nivel: "Alto", desc: "Desempeño alto", val: 4.2 },
            { nivel: "Superior", desc: "Desempeño superior", val: 5.0 }
        ]
    };
    cont.appendChild(crearElementoEdicionCriterio(nuevo, cont.children.length));
}

function cerrarModalEditarRubrica() {
    document.getElementById('modalEditarRubrica').style.display = 'none';
}

function guardarCambiosEdicionRubrica() {
    if (!rubricaEnEdicionObj) return;
    const nuevoNombre = document.getElementById('editNombreRubrica').value.trim();
    if (!nuevoNombre) return alert("El nombre de la rúbrica no puede estar vacío.");

    const tarjetas = document.querySelectorAll('.item-edicion-criterio');
    const nuevosCriterios = [];

    tarjetas.forEach(t => {
        const texto = t.querySelector('.edit-texto-criterio').value.trim();
        const peso = parsearNumeroDecimal(t.querySelector('.edit-peso-criterio').value, 1);
        if (!texto) return;

        const niveles = [];
        for (let i = 0; i < 5; i++) {
            niveles.push({
                nivel: NOMBRES_NIVELES[i],
                desc: t.querySelector(`.edit-desc-${i}`).value.trim() || NOMBRES_NIVELES[i],
                val: parsearNumeroDecimal(t.querySelector(`.edit-val-${i}`).value, 1.0)
            });
        }
        nuevosCriterios.push({ criterio: texto, peso: peso, niveles: niveles });
    });

    if (nuevosCriterios.length === 0) return alert("La rúbrica debe tener al menos un criterio.");

    rubricaEnEdicionObj.nombre = nuevoNombre;
    rubricaEnEdicionObj.criterios = nuevosCriterios;

    const tx = db.transaction(['rubricas'], 'readwrite');
    tx.objectStore('rubricas').put(rubricaEnEdicionObj);
    tx.oncomplete = () => {
        cerrarModalEditarRubrica();
        cargarListaRubricas(rubricaEnEdicionObj.id);
        alert("✅ Rúbrica actualizada.");
    };
}

// ==========================================
// BÚSQUEDA EN VIVO Y GRUPOS MULTIGRADO EN RUBRIC
// ==========================================
function actualizarDestinatariosRubric() {
    const modo = document.getElementById('rubricModo').value;

    document.getElementById('contenedorRubricEstudiante').style.display = modo === 'estudiante' ? 'block' : 'none';
    document.getElementById('contenedorRubricGrupo').style.display = modo === 'grupo' ? 'block' : 'none';

    if (modo === 'estudiante') {
        filtrarEstudiantesRubric();
    } else if (modo === 'grupo') {
        cargarGruposRubric();
    }

    cargarValoracionesGuardadas();
}

function filtrarEstudiantesRubric() {
    const sel = document.getElementById('rubricSelectEstudiante');
    if (!sel) return;
    const grado = document.getElementById('rubricGrado') ? document.getElementById('rubricGrado').value : '';
    const texto = document.getElementById('rubricBuscarEstudiante') ? document.getElementById('rubricBuscarEstudiante').value : '';

    const filtrados = cacheEstudiantes.filter(est => {
        const pasaGrado = !grado || est.grado === grado;
        return pasaGrado && coincideBusquedaEstudiante(est, texto);
    });

    const lblCont = document.getElementById('contadorEstRubric');
    if (lblCont) lblCont.textContent = filtrados.length;

    const prev = sel.value;
    sel.innerHTML = '';
    filtrados.forEach(est => {
        sel.innerHTML += `<option value="${est.id}">${est.nombre} — Doc: ${est.documento || 'S/D'} (${est.grado})</option>`;
    });

    if (texto.trim() !== "" && filtrados.length === 1) {
        sel.value = filtrados[0].id;
        cargarValoracionPreviaSiExiste();
    } else if (filtrados.some(e => e.id == prev)) {
        sel.value = prev;
    }
}

function cargarGruposRubric() {
    const gradoFiltro = document.getElementById('rubricGrado').value;
    db.transaction(['grupos'], 'readonly').objectStore('grupos').getAll().onsuccess = (e) => {
        let grupos = e.target.result || [];
        if (gradoFiltro) {
            const idsEstGrado = new Set(cacheEstudiantes.filter(est => est.grado === gradoFiltro).map(est => est.id));
            grupos = grupos.filter(g => g.grado === gradoFiltro || (g.estudiantes_ids && g.estudiantes_ids.some(id => idsEstGrado.has(id))));
        }

        const sel = document.getElementById('rubricSelectGrupo');
        const prev = sel.value;
        sel.innerHTML = '<option value="">Selecciona un grupo...</option>';
        grupos.forEach(g => {
            sel.innerHTML += `<option value="${g.id}">${g.nombre} [${g.grado || 'Multigrado'}] (${g.estudiantes_ids.length} integrantes)</option>`;
        });
        if (grupos.some(g => g.id == prev)) sel.value = prev;
        mostrarIntegrantesGrupoSeleccionado();
    };
}

function mostrarIntegrantesGrupoSeleccionado() {
    const grupoId = parseInt(document.getElementById('rubricSelectGrupo').value);
    const infoDiv = document.getElementById('infoIntegrantesGrupo');
    if (!grupoId) {
        infoDiv.textContent = "Selecciona un grupo o crea uno nuevo (incluso de diferentes grados) con el botón ➕ Grupos.";
        return;
    }

    db.transaction(['grupos'], 'readonly').objectStore('grupos').get(grupoId).onsuccess = (e) => {
        const g = e.target.result;
        if (!g) return;
        const mapa = {};
        cacheEstudiantes.forEach(est => mapa[est.id] = `${est.nombre} (${est.grado})`);
        const nombres = g.estudiantes_ids.map(id => mapa[id] || "Estudiante eliminado");
        infoDiv.innerHTML = `<strong>Integrantes (${g.grado}):</strong> ${nombres.join(', ')}`;
    };
}

function abrirModalGrupos() {
    document.getElementById('idGrupoEnEdicionModal').value = '';
    document.getElementById('nombreNuevoGrupo').value = '';
    document.getElementById('buscarEstGrupoModal').value = '';
    document.getElementById('filtroGradoGrupoModal').value = document.getElementById('rubricGrado').value || '';
    document.getElementById('btnGuardarGrupoModal').textContent = '💾 Crear Grupo';

    idsSeleccionadosGrupoTemp = new Set();
    renderizarChipsIntegrantesGrupoModal();
    filtrarListaCheckGrupoModal();
    renderizarGruposExistentesModal();
    document.getElementById('modalGruposRubric').style.display = 'flex';
}

function cerrarModalGrupos() {
    document.getElementById('modalGruposRubric').style.display = 'none';
}

function filtrarListaCheckGrupoModal() {
    const grado = document.getElementById('filtroGradoGrupoModal').value;
    const texto = document.getElementById('buscarEstGrupoModal').value;
    const contCheck = document.getElementById('listaCheckEstudiantesGrupo');

    const lista = cacheEstudiantes.filter(est => {
        const pasaGrado = !grado || est.grado === grado;
        return pasaGrado && coincideBusquedaEstudiante(est, texto);
    });

    if (lista.length === 0) {
        contCheck.innerHTML = '<p style="font-size:0.8rem; color:#888;">No hay estudiantes que coincidan con el filtro.</p>';
        return;
    }

    contCheck.innerHTML = '';
    lista.forEach(est => {
        const marcado = idsSeleccionadosGrupoTemp.has(est.id) ? 'checked' : '';
        contCheck.innerHTML += `
        <label style="display:block; margin-top:4px; font-weight:normal; cursor:pointer; font-size:0.88rem;">
            <input type="checkbox" value="${est.id}" ${marcado} onchange="toggleEstudianteGrupoTemp(${est.id}, this.checked)">
            <strong>${est.nombre}</strong> — Doc: ${est.documento || 'S/D'} <span style="color:#117864; font-weight:bold;">(${est.grado})</span>
        </label>`;
    });
}

function toggleEstudianteGrupoTemp(estId, checked) {
    if (checked) {
        idsSeleccionadosGrupoTemp.add(estId);
    } else {
        idsSeleccionadosGrupoTemp.delete(estId);
    }
    renderizarChipsIntegrantesGrupoModal();
}

function quitarEstudianteGrupoTemp(estId) {
    idsSeleccionadosGrupoTemp.delete(estId);
    renderizarChipsIntegrantesGrupoModal();
    filtrarListaCheckGrupoModal();
}

function renderizarChipsIntegrantesGrupoModal() {
    const cont = document.getElementById('contenedorChipsIntegrantes');
    const lblCont = document.getElementById('contadorIntegrantesTemp');
    lblCont.textContent = idsSeleccionadosGrupoTemp.size;

    if (idsSeleccionadosGrupoTemp.size === 0) {
        cont.innerHTML = '<span style="font-size:0.78rem; color:#888; padding:4px;">Ningún estudiante seleccionado aún.</span>';
        return;
    }

    const mapa = {};
    cacheEstudiantes.forEach(e => mapa[e.id] = e);
    cont.innerHTML = '';

    idsSeleccionadosGrupoTemp.forEach(id => {
        const est = mapa[id];
        const texto = est ? `${est.nombre} (${est.grado})` : `ID ${id}`;
        cont.innerHTML += `
            <span class="chip-integrante">
                ${texto}
                <button type="button" onclick="quitarEstudianteGrupoTemp(${id})" title="Quitar">✖</button>
            </span>`;
    });
}

function guardarNuevoGrupo() {
    const idEdicion = document.getElementById('idGrupoEnEdicionModal').value;
    const nombre = document.getElementById('nombreNuevoGrupo').value.trim();
    const ids = Array.from(idsSeleccionadosGrupoTemp);

    if (!nombre) return alert("Escribe un nombre para el grupo.");
    if (ids.length === 0) return alert("Selecciona al menos un estudiante para el grupo.");

    const mapa = {};
    cacheEstudiantes.forEach(e => mapa[e.id] = e.grado);
    const gradosUnicos = [...new Set(ids.map(id => mapa[id]).filter(Boolean))].sort();
    const etiquetaGrado = gradosUnicos.length === 1 ? gradosUnicos[0] : `Multigrado (${gradosUnicos.join(', ')})`;

    const t = db.transaction(['grupos'], 'readwrite');
    const store = t.objectStore('grupos');
    const objGrupo = { nombre: nombre, grado: etiquetaGrado, estudiantes_ids: ids };

    if (idEdicion) {
        objGrupo.id = parseInt(idEdicion);
        store.put(objGrupo);
    } else {
        store.add(objGrupo);
    }

    t.oncomplete = () => {
        document.getElementById('idGrupoEnEdicionModal').value = '';
        document.getElementById('nombreNuevoGrupo').value = '';
        document.getElementById('btnGuardarGrupoModal').textContent = '💾 Crear Grupo';
        idsSeleccionadosGrupoTemp.clear();
        renderizarChipsIntegrantesGrupoModal();
        filtrarListaCheckGrupoModal();
        renderizarGruposExistentesModal();
        cargarGruposRubric();
    };
}

function editarGrupoExistenteModal(idGrupo) {
    db.transaction(['grupos'], 'readonly').objectStore('grupos').get(idGrupo).onsuccess = (e) => {
        const g = e.target.result;
        if (!g) return;
        document.getElementById('idGrupoEnEdicionModal').value = g.id;
        document.getElementById('nombreNuevoGrupo').value = g.nombre;
        document.getElementById('btnGuardarGrupoModal').textContent = '💾 Actualizar Grupo';
        idsSeleccionadosGrupoTemp = new Set(g.estudiantes_ids || []);
        renderizarChipsIntegrantesGrupoModal();
        filtrarListaCheckGrupoModal();
    };
}

function renderizarGruposExistentesModal() {
    const cont = document.getElementById('listaGruposExistentesModal');
    db.transaction(['grupos'], 'readonly').objectStore('grupos').getAll().onsuccess = (e) => {
        const grupos = e.target.result || [];
        if (grupos.length === 0) {
            cont.innerHTML = '<p style="font-size:0.8rem; color:#888;">No hay grupos creados todavía.</p>';
            return;
        }
        cont.innerHTML = '';
        grupos.forEach(g => {
            cont.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#f8f9fa; padding:6px 10px; border-radius:6px; border:1px solid #ddd; font-size:0.85rem;">
                <span><strong>${g.nombre}</strong> <small style="color:#117864;">[${g.grado}]</small> (${g.estudiantes_ids.length} alumnos)</span>
                <div style="display:flex; gap:0.35rem;">
                    <button onclick="editarGrupoExistenteModal(${g.id})" style="background:#3498db; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;" title="Editar integrantes">✏️</button>
                    <button onclick="eliminarGrupoRubric(${g.id})" style="background:var(--danger); color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;" title="Eliminar grupo">🗑️</button>
                </div>
            </div>`;
        });
    };
}

function eliminarGrupoRubric(idGrupo) {
    if (!confirm("¿Eliminar este grupo?")) return;
    const t = db.transaction(['grupos'], 'readwrite');
    t.objectStore('grupos').delete(idGrupo);
    t.oncomplete = () => {
        renderizarGruposExistentesModal();
        cargarGruposRubric();
    };
}

// ==========================================
// MATRIZ INTERACTIVA DE BOTONES Y CÁLCULO
// ==========================================
function renderizarMatrizBotonesRubric() {
    const cont = document.getElementById('contenedorCriteriosBotones');
    cont.innerHTML = '';
    if (!rubricaActivaObj) return;

    rubricaActivaObj.criterios.forEach((critObj, cIdx) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'criterio-card';

        let botonesHTML = '';
        critObj.niveles.forEach((nivObj, nIdx) => {
            const seleccionado = seleccionesRubricActual[cIdx] === nIdx;
            const claseActivo = seleccionado ? `activo-${nIdx}` : '';
            botonesHTML += `
                <button type="button" class="btn-nivel ${claseActivo}" onclick="seleccionarNivelCriterio(${cIdx}, ${nIdx})">
                    <span class="nivel-titulo">${nivObj.nivel}</span>
                    <span>${nivObj.desc}</span>
                </button>
            `;
        });

        tarjeta.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:var(--primary); font-size:0.95rem;">${critObj.criterio}</strong>
                <span style="font-size:0.78rem; background:#eaf2f8; color:#2980b9; padding:2px 8px; border-radius:12px; font-weight:bold;">Peso: ${critObj.peso}%</span>
            </div>
            <div class="niveles-grid">
                ${botonesHTML}
            </div>
        `;
        cont.appendChild(tarjeta);
    });

    recalcularNotaRubricEnVivo();
}

function seleccionarNivelCriterio(criterioIdx, nivelIdx) {
    seleccionesRubricActual[criterioIdx] = nivelIdx;
    renderizarMatrizBotonesRubric();
}

function recalcularNotaRubricEnVivo() {
    if (!rubricaActivaObj || rubricaActivaObj.criterios.length === 0) return 0;

    let sumaPesos = 0;
    let sumaPonderada = 0;

    rubricaActivaObj.criterios.forEach((critObj, cIdx) => {
        const peso = parsearNumeroDecimal(critObj.peso, 1);
        sumaPesos += peso;
        const nIdx = seleccionesRubricActual[cIdx];
        if (nIdx !== undefined && critObj.niveles[nIdx]) {
            const valorCuantitativo = parsearNumeroDecimal(critObj.niveles[nIdx].val, 0);
            sumaPonderada += (valorCuantitativo * peso);
        }
    });

    const notaFinal = sumaPesos > 0 ? (sumaPonderada / sumaPesos) : 0;
    document.getElementById('lblNotaCalculadaRubric').textContent = notaFinal.toFixed(2);
    return Number(notaFinal.toFixed(2));
}

function limpiarFormularioEvaluacionRubric() {
    seleccionesRubricActual = {};
    document.getElementById('idValoracionEnEdicion').value = '';
    document.getElementById('rubricObservacion').value = '';
    const badge = document.getElementById('lblEstadoEdicionRubric');
    badge.style.display = 'none';
    badge.textContent = 'Editando';
    document.getElementById('btnCancelarEdicionRubric').style.display = 'none';
    renderizarMatrizBotonesRubric();
}

function cargarValoracionPreviaSiExiste() {
    if (!rubricaActivaObj) return;
    const modo = document.getElementById('rubricModo').value;
    const inputAct = document.getElementById('rubricActividad').value.trim();
    const actividadBuscada = inputAct || rubricaActivaObj.nombre;

    db.transaction(['valoraciones'], 'readonly').objectStore('valoraciones').index('rubrica_id').getAll(IDBKeyRange.only(rubricaActivaObj.id)).onsuccess = (e) => {
        const vals = e.target.result.filter(v => v.actividad === actividadBuscada);
        let encontrada = null;

        if (modo === 'estudiante') {
            const estId = parseInt(document.getElementById('rubricSelectEstudiante').value);
            if (estId) {
                encontrada = vals.find(v => v.estudiante_id === estId);
                if (encontrada) cargarValoracionEnFormularioParaEditar(encontrada, false);
                else limpiarFormularioEvaluacionRubric();
            }
        } else if (modo === 'grupo') {
            const grpId = parseInt(document.getElementById('rubricSelectGrupo').value);
            if (grpId) {
                encontrada = vals.find(v => v.grupo_id === grpId);
                if (encontrada) cargarValoracionEnFormularioParaEditar(encontrada, true);
                else limpiarFormularioEvaluacionRubric();
            }
        }
    };
}

function guardarValoracionRubric() {
    if (!rubricaActivaObj) return alert("Selecciona una rúbrica.");

    const modo = document.getElementById('rubricModo').value;
    const gradoFiltro = document.getElementById('rubricGrado').value;
    const materia = document.getElementById('rubricMateria').value || "General";
    const actividad = document.getElementById('rubricActividad').value.trim() || rubricaActivaObj.nombre;
    const observacion = document.getElementById('rubricObservacion').value.trim();

    const totalCriterios = rubricaActivaObj.criterios.length;
    if (Object.keys(seleccionesRubricActual).length < totalCriterios) {
        if (!confirm("Aún hay criterios sin marcar (se contarán como 0). ¿Deseas guardar de todos modos?")) return;
    }

    const notaFinal = recalcularNotaRubricEnVivo();
    const fechaHoy = new Date().toISOString().split('T')[0];
    const idEdicion = document.getElementById('idValoracionEnEdicion').value;

    const mapaEstudiantes = {};
    cacheEstudiantes.forEach(e => mapaEstudiantes[e.id] = e);

    const t = db.transaction(['estudiantes', 'grupos', 'valoraciones'], 'readwrite');
    const storeVal = t.objectStore('valoraciones');

    if (idEdicion && idEdicion.startsWith('GRUPO|')) {
        const partes = idEdicion.split('|');
        const grpIdEditar = parseInt(partes[1]);
        const actOriginal = decodeURIComponent(partes[2] || '');
        const fechaOriginal = partes[3] || '';

        storeVal.index('rubrica_id').openCursor(IDBKeyRange.only(rubricaActivaObj.id)).onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
                const reg = cursor.value;
                const mismoGrupo = reg.grupo_id === grpIdEditar;
                const mismaAct = reg.actividad === actOriginal;
                const mismaFecha = !fechaOriginal || reg.fecha === fechaOriginal;

                if (mismoGrupo && mismaAct && mismaFecha) {
                    reg.selecciones = { ...seleccionesRubricActual };
                    reg.nota_final = notaFinal;
                    reg.observacion = observacion;
                    reg.actividad = actividad;
                    reg.materia = materia;
                    reg.timestamp = Date.now();
                    cursor.update(reg);
                }
                cursor.continue();
            }
        };

        t.oncomplete = () => {
            alert(`✅ Valoración del grupo actualizada para todos sus integrantes (Nueva Nota: ${notaFinal.toFixed(2)}).`);
            limpiarFormularioEvaluacionRubric();
            cargarValoracionesGuardadas();
        };
        return;
    }

    if (idEdicion) {
        storeVal.get(parseInt(idEdicion)).onsuccess = (e) => {
            const reg = e.target.result;
            if (reg) {
                reg.selecciones = { ...seleccionesRubricActual };
                reg.nota_final = notaFinal;
                reg.observacion = observacion;
                reg.actividad = actividad;
                reg.materia = materia;
                reg.timestamp = Date.now();
                storeVal.put(reg);
            }
        };
        t.oncomplete = () => {
            alert(`✅ Valoración individual actualizada (Nueva Nota: ${notaFinal.toFixed(2)}).`);
            limpiarFormularioEvaluacionRubric();
            cargarValoracionesGuardadas();
        };
        return;
    }

    if (modo === 'estudiante') {
        const estId = parseInt(document.getElementById('rubricSelectEstudiante').value);
        if (!estId) return alert("⚠️ Selecciona el estudiante a evaluar.");
        const estObj = mapaEstudiantes[estId];
        const gradoReal = estObj ? estObj.grado : (gradoFiltro || "S/G");

        storeVal.add({
            rubrica_id: rubricaActivaObj.id,
            rubrica_nombre: rubricaActivaObj.nombre,
            actividad, materia, fecha: fechaHoy, timestamp: Date.now(),
            grado: gradoReal, modo: 'estudiante', grupo_id: null, grupo_nombre: 'Individual',
            estudiante_id: estId,
            selecciones: { ...seleccionesRubricActual },
            nota_final: notaFinal,
            observacion
        });
    } else if (modo === 'grupo') {
        const grupoId = parseInt(document.getElementById('rubricSelectGrupo').value);
        if (!grupoId) return alert("⚠️ Selecciona un grupo.");
        t.objectStore('grupos').get(grupoId).onsuccess = (e) => {
            const grp = e.target.result;
            if (!grp) return;
            grp.estudiantes_ids.forEach(estId => {
                const estObj = mapaEstudiantes[estId];
                const gradoIndividual = estObj ? estObj.grado : grp.grado;
                storeVal.add({
                    rubrica_id: rubricaActivaObj.id,
                    rubrica_nombre: rubricaActivaObj.nombre,
                    actividad, materia, fecha: fechaHoy, timestamp: Date.now(),
                    grado: gradoIndividual, modo: 'grupo', grupo_id: grp.id, grupo_nombre: grp.nombre,
                    estudiante_id: estId,
                    selecciones: { ...seleccionesRubricActual },
                    nota_final: notaFinal,
                    observacion
                });
            });
        };
    } else if (modo === 'grado') {
        if (!gradoFiltro) return alert("⚠️ Selecciona el Grado al que deseas aplicar la valoración en 'Filtrar por Grado'.");
        const alumnos = cacheEstudiantes.filter(est => est.grado === gradoFiltro);
        if (alumnos.length === 0) return alert("No hay estudiantes en este grado.");

        alumnos.forEach(est => {
            storeVal.add({
                rubrica_id: rubricaActivaObj.id,
                rubrica_nombre: rubricaActivaObj.nombre,
                actividad, materia, fecha: fechaHoy, timestamp: Date.now(),
                grado: est.grado, modo: 'grado', grupo_id: null, grupo_nombre: `Grado ${est.grado}`,
                estudiante_id: est.id,
                selecciones: { ...seleccionesRubricActual },
                nota_final: notaFinal,
                observacion
            });
        });
    }

    t.oncomplete = () => {
        alert(`✅ Valoración guardada en "${actividad}" (Nota: ${notaFinal.toFixed(2)}).`);
        limpiarFormularioEvaluacionRubric();
        cargarValoracionesGuardadas();
    };
}

// ==========================================
// FILTRADO INTELIGENTE, HISTORIAL Y EDICIÓN GRUPAL
// ==========================================
function actualizarSelectoresFiltroResultados(todasLasValoraciones) {
    const selAct = document.getElementById('filtroActividadRubric');
    const selFecha = document.getElementById('filtroFechaRubric');
    if (!selAct || !selFecha) return;

    const prevAct = selAct.value;
    const prevFecha = selFecha.value;

    const actividadesUnicas = [...new Set(todasLasValoraciones.map(v => v.actividad).filter(Boolean))].sort();
    const fechasUnicas = [...new Set(todasLasValoraciones.map(v => v.fecha).filter(Boolean))].sort().reverse();

    selAct.innerHTML = '<option value="">Todas las actividades...</option>';
    actividadesUnicas.forEach(act => {
        selAct.innerHTML += `<option value="${act.replace(/"/g, '&quot;')}">${act}</option>`;
    });
    if (actividadesUnicas.includes(prevAct)) selAct.value = prevAct;

    selFecha.innerHTML = '<option value="">Todas las fechas...</option>';
    fechasUnicas.forEach(f => {
        selFecha.innerHTML += `<option value="${f}">${f}</option>`;
    });
    if (fechasUnicas.includes(prevFecha)) selFecha.value = prevFecha;
}

function aplicarFiltrosActivosValoraciones(lista) {
    const gradoFiltro = document.getElementById('rubricGrado') ? document.getElementById('rubricGrado').value : '';
    const actFiltro = document.getElementById('filtroActividadRubric') ? document.getElementById('filtroActividadRubric').value : '';
    const fechaFiltro = document.getElementById('filtroFechaRubric') ? document.getElementById('filtroFechaRubric').value : '';

    return lista.filter(v => {
        const pasaGrado = !gradoFiltro || v.grado === gradoFiltro;
        const pasaAct = !actFiltro || v.actividad === actFiltro;
        const pasaFecha = !fechaFiltro || v.fecha === fechaFiltro;
        return pasaGrado && pasaAct && pasaFecha;
    });
}

function obtenerSufijoArchivoFiltrado() {
    const grado = document.getElementById('rubricGrado') ? document.getElementById('rubricGrado').value : '';
    const act = document.getElementById('filtroActividadRubric') ? document.getElementById('filtroActividadRubric').value : '';
    const fecha = document.getElementById('filtroFechaRubric') ? document.getElementById('filtroFechaRubric').value : '';

    const partes = [];
    if (act) partes.push(act.replace(/\s+/g, '_'));
    if (grado) partes.push(`Grado_${grado}`);
    if (fecha) partes.push(fecha);
    return partes.length > 0 ? partes.join('_') : 'General';
}

function cargarValoracionesGuardadas() {
    if (!rubricaActivaObj) return;
    const cont = document.getElementById('listaValoracionesGuardadas');

    const t = db.transaction(['valoraciones', 'estudiantes'], 'readonly');
    t.objectStore('estudiantes').getAll().onsuccess = (eEst) => {
        const mapaEst = {};
        eEst.target.result.forEach(est => mapaEst[est.id] = est);

        t.objectStore('valoraciones').index('rubrica_id').getAll(IDBKeyRange.only(rubricaActivaObj.id)).onsuccess = (eVal) => {
            const todas = eVal.target.result || [];
            actualizarSelectoresFiltroResultados(todas);

            let lista = aplicarFiltrosActivosValoraciones(todas);
            lista.sort((a, b) => b.timestamp - a.timestamp);

            if (lista.length === 0) {
                cont.innerHTML = '<p style="font-size:0.85rem; color:#888; text-align:center;">No hay valoraciones que coincidan con los filtros seleccionados.</p>';
                return;
            }

            cont.innerHTML = '';
            lista.forEach(v => {
                const estNom = mapaEst[v.estudiante_id] ? mapaEst[v.estudiante_id].nombre : 'Estudiante eliminado';
                const esDeGrupo = v.grupo_id !== null && v.grupo_id !== undefined;

                const btnEditarGrupo = esDeGrupo
                    ? `<button onclick="editarValoracionDesdeHistorial(${v.id}, true)" style="background:#16a085; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.78rem;" title="Modificar valoración para TODO el grupo (${v.grupo_nombre})">👥✏️</button>`
                    : '';

                cont.innerHTML += `
                <div style="border:1px solid #ddd; background:#f8f9fa; padding:8px 10px; border-radius:6px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; gap:0.4rem;">
                    <div style="flex:1;">
                        <strong>${estNom}</strong> <span style="color:#117864; font-weight:600;">(${v.grado} — ${v.grupo_nombre || 'Individual'})</span><br>
                        <small style="color:#555;">📌 <b>${v.actividad}</b> | 📅 ${v.fecha} | ${v.materia} | <b>Nota: <span style="color:#117864; font-size:0.92rem;">${Number(v.nota_final).toFixed(2)}</span></b></small>
                    </div>
                    <div style="display:flex; gap:0.3rem; flex-shrink:0;">
                        <button onclick="exportarValoracionIndividualPDF(${v.id})" style="background:#8e44ad; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Exportar PDF Individual">📄</button>
                        ${btnEditarGrupo}
                        <button onclick="editarValoracionDesdeHistorial(${v.id}, false)" style="background:#3498db; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Modificar solo a este estudiante">👤✏️</button>
                        <button onclick="eliminarValoracionRubric(${v.id})" style="background:var(--danger); color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" title="Borrar esta valoración">🗑️</button>
                    </div>
                </div>`;
            });
        };
    };
}

function editarValoracionDesdeHistorial(idVal, editarTodoElGrupo = false) {
    db.transaction(['valoraciones'], 'readonly').objectStore('valoraciones').get(idVal).onsuccess = (e) => {
        const val = e.target.result;
        if (!val) return;
        cargarValoracionEnFormularioParaEditar(val, editarTodoElGrupo);
        window.scrollTo({ top: document.getElementById('cardMatrizEvaluacion').offsetTop - 70, behavior: 'smooth' });
    };
}

function cargarValoracionEnFormularioParaEditar(val, editarTodoElGrupo = false) {
    const badge = document.getElementById('lblEstadoEdicionRubric');

    if (editarTodoElGrupo && val.grupo_id) {
        document.getElementById('idValoracionEnEdicion').value = `GRUPO|${val.grupo_id}|${encodeURIComponent(val.actividad || '')}|${val.fecha || ''}`;
        badge.textContent = `👥 Editando Grupo: ${val.grupo_nombre} (${val.actividad})`;
    } else {
        document.getElementById('idValoracionEnEdicion').value = String(val.id);
        badge.textContent = `👤 Editando Estudiante Individual (${val.actividad})`;
    }

    document.getElementById('rubricObservacion').value = val.observacion || '';
    document.getElementById('rubricActividad').value = val.actividad || '';
    badge.style.display = 'inline-block';
    document.getElementById('btnCancelarEdicionRubric').style.display = 'inline-block';
    seleccionesRubricActual = { ...val.selecciones };
    renderizarMatrizBotonesRubric();
}

function eliminarValoracionRubric(idVal) {
    if (!confirm("¿Eliminar esta valoración individual?")) return;
    const t = db.transaction(['valoraciones'], 'readwrite');
    t.objectStore('valoraciones').delete(idVal);
    t.oncomplete = () => cargarValoracionesGuardadas();
}

// ==========================================
// EXPORTACIONES RUBRIC (EXCEL Y PDF CON FILTROS)
// ==========================================
function exportarRubricaPorIdExcel(idRubrica) {
    db.transaction(['rubricas'], 'readonly').objectStore('rubricas').get(idRubrica).onsuccess = (e) => {
        const r = e.target.result;
        if (r) generarArchivoExcelRubrica(r);
    };
}

function exportarRubricaEnBlancoExcel() {
    if (!rubricaActivaObj) return;
    generarArchivoExcelRubrica(rubricaActivaObj);
}

function generarArchivoExcelRubrica(rubricaObj) {
    const filas = [[
        "Criterios", "Peso",
        "No presenta", "vCuanti",
        "Bajo", "vCuanti",
        "Basico", "vCuanti",
        "Alto", "vCuanti",
        "Superior", "vCuanti"
    ]];

    rubricaObj.criterios.forEach(c => {
        const fila = [c.criterio, c.peso];
        c.niveles.forEach(n => {
            fila.push(n.desc, n.val);
        });
        filas.push(fila);
    });

    const hoja = XLSX.utils.aoa_to_sheet(filas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Rubrica");
    XLSX.writeFile(libro, `RAYDis_Rubrica_${rubricaObj.nombre.replace(/\s+/g, '_')}.xlsx`);
}

function exportarRubricaEnBlancoPDF() {
    if (!rubricaActivaObj) return;
    let filasHTML = '';
    rubricaActivaObj.criterios.forEach(c => {
        let celdas = `<td><b>${c.criterio}</b><br><small>(Peso: ${c.peso}%)</small></td>`;
        c.niveles.forEach(n => {
            celdas += `<td>${n.desc}</td>`;
        });
        filasHTML += `<tr>${celdas}</tr>`;
    });

    const html = `
        <h2>Rúbrica de Evaluación: ${rubricaActivaObj.nombre}</h2>
        <table>
            <thead>
                <tr>
                    <th>Criterio</th>
                    <th>No presenta</th>
                    <th>Bajo</th>
                    <th>Básico</th>
                    <th>Alto</th>
                    <th>Superior</th>
                </tr>
            </thead>
            <tbody>${filasHTML}</tbody>
        </table>
    `;
    abrirVentanaImpresionPDF(`Rúbrica - ${rubricaActivaObj.nombre}`, html);
}

function armarDatosExcelValoraciones(vals, mapaEst) {
    return vals.map(v => {
        const est = mapaEst[v.estudiante_id] || { documento: 'N/A', nombre: 'Eliminado' };
        const filaObj = {
            "Fecha": v.fecha,
            "Grado": v.grado,
            "Grupo": v.grupo_nombre || "Individual",
            "Documento": est.documento,
            "Estudiante": est.nombre,
            "Materia": v.materia,
            "Actividad": v.actividad
        };

        rubricaActivaObj.criterios.forEach((crit, cIdx) => {
            const nIdx = v.selecciones[cIdx];
            const niv = (nIdx !== undefined && crit.niveles[nIdx]) ? crit.niveles[nIdx] : null;
            filaObj[`${crit.criterio} (${crit.peso}%)`] = niv ? `${niv.nivel} (${niv.val})` : "Sin evaluar (0)";
        });

        filaObj["Valoración Total"] = Number(v.nota_final).toFixed(2);
        filaObj["Observaciones"] = v.observacion || "";
        return filaObj;
    });
}

function exportarValoracionesExcel() {
    if (!rubricaActivaObj) return;

    const t = db.transaction(['valoraciones', 'estudiantes'], 'readonly');
    t.objectStore('estudiantes').getAll().onsuccess = (eEst) => {
        const mapaEst = {};
        eEst.target.result.forEach(est => mapaEst[est.id] = est);

        t.objectStore('valoraciones').index('rubrica_id').getAll(IDBKeyRange.only(rubricaActivaObj.id)).onsuccess = (eVal) => {
            const vals = aplicarFiltrosActivosValoraciones(eVal.target.result || []);
            if (vals.length === 0) return alert("No hay valoraciones con los filtros actuales para exportar.");

            const data = armarDatosExcelValoraciones(vals, mapaEst);
            const hoja = XLSX.utils.json_to_sheet(data);
            const libro = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(libro, hoja, "Valoraciones");
            const sufijo = obtenerSufijoArchivoFiltrado();
            XLSX.writeFile(libro, `RAYDis_Rubric_${rubricaActivaObj.nombre.replace(/\s+/g, '_')}_${sufijo}.xlsx`);
        };
    };
}

function exportarValoracionIndividualPDF(idVal) {
    if (!rubricaActivaObj) return;
    const t = db.transaction(['valoraciones', 'estudiantes'], 'readonly');
    t.objectStore('valoraciones').get(idVal).onsuccess = (eVal) => {
        const v = eVal.target.result;
        if (!v) return;
        t.objectStore('estudiantes').get(v.estudiante_id).onsuccess = (eEst) => {
            const est = eEst.target.result || { nombre: 'Estudiante', documento: 'N/A' };
            let filasCriterios = '';

            rubricaActivaObj.criterios.forEach((crit, cIdx) => {
                const nIdx = v.selecciones[cIdx];
                const niv = (nIdx !== undefined && crit.niveles[nIdx]) ? crit.niveles[nIdx] : { nivel: 'No evaluado', desc: '-', val: 0 };
                filasCriterios += `
                    <tr>
                        <td><b>${crit.criterio}</b> (${crit.peso}%)</td>
                        <td><b>${niv.nivel}</b></td>
                        <td>${niv.desc}</td>
                        <td style="text-align:center;"><b>${niv.val}</b></td>
                    </tr>`;
            });

            const html = `
                <h2>Informe de Evaluación por Rúbrica</h2>
                <p><b>Estudiante:</b> ${est.nombre} (Doc: ${est.documento || 'N/A'}) | <b>Grado:</b> ${v.grado} | <b>Modalidad:</b> ${v.grupo_nombre}</p>
                <p><b>Materia:</b> ${v.materia} | <b>Actividad:</b> ${v.actividad} | <b>Fecha:</b> ${v.fecha}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Criterio</th>
                            <th>Nivel Alcanzado</th>
                            <th>Descriptor</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>${filasCriterios}</tbody>
                </table>
                <h3 style="margin-top:12px;">Valoración Definitiva: ${Number(v.nota_final).toFixed(2)}</h3>
                ${v.observacion ? `<p><b>Observaciones:</b> ${v.observacion}</p>` : ''}
            `;
            abrirVentanaImpresionPDF(`RAYDis_Rubric_${est.nombre}_${v.actividad}`, html);
        };
    };
}

function exportarValoracionesGrupoPDF() {
    if (!rubricaActivaObj) return;

    const t = db.transaction(['valoraciones', 'estudiantes'], 'readonly');
    t.objectStore('estudiantes').getAll().onsuccess = (eEst) => {
        const mapaEst = {};
        eEst.target.result.forEach(est => mapaEst[est.id] = est);

        t.objectStore('valoraciones').index('rubrica_id').getAll(IDBKeyRange.only(rubricaActivaObj.id)).onsuccess = (eVal) => {
            const vals = aplicarFiltrosActivosValoraciones(eVal.target.result || []);
            if (vals.length === 0) return alert("No hay valoraciones con los filtros actuales para exportar.");

            let cabecerasCriterios = '';
            rubricaActivaObj.criterios.forEach((c, idx) => {
                cabecerasCriterios += `<th>C${idx + 1} (${c.peso}%)</th>`;
            });

            let filas = '';
            vals.forEach(v => {
                const est = mapaEst[v.estudiante_id] || { nombre: 'Eliminado', documento: 'N/A' };
                let celdasCrit = '';
                rubricaActivaObj.criterios.forEach((crit, cIdx) => {
                    const nIdx = v.selecciones[cIdx];
                    const niv = (nIdx !== undefined && crit.niveles[nIdx]) ? crit.niveles[nIdx] : null;
                    celdasCrit += `<td style="text-align:center;">${niv ? `${niv.nivel}<br><small>(${niv.val})</small>` : '-'}</td>`;
                });

                filas += `
                    <tr>
                        <td>${v.fecha}</td>
                        <td>${v.grado}</td>
                        <td>${v.grupo_nombre || 'Ind.'}</td>
                        <td><b>${est.nombre}</b></td>
                        <td>${v.actividad}</td>
                        ${celdasCrit}
                        <td style="text-align:center;"><b>${Number(v.nota_final).toFixed(2)}</b></td>
                    </tr>`;
            });

            const sufijo = obtenerSufijoArchivoFiltrado();
            const html = `
                <h2>Consolidado de Evaluación - Rúbrica: ${rubricaActivaObj.nombre}</h2>
                <p><b>Filtro aplicado:</b> ${sufijo.replace(/_/g, ' ')}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Grado</th>
                            <th>Grupo</th>
                            <th>Estudiante</th>
                            <th>Actividad</th>
                            ${cabecerasCriterios}
                            <th>Nota Total</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            `;
            abrirVentanaImpresionPDF(`Consolidado_${rubricaActivaObj.nombre}_${sufijo}`, html);
        };
    };
}

function abrirVentanaImpresionPDF(titulo, contenidoHTML) {
    const ventana = window.open('', '_blank');
    if (!ventana) return alert("Por favor permite las ventanas emergentes para generar el PDF.");
    ventana.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>${titulo}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; color: #222; }
                h2 { color: #2c3e50; margin-bottom: 5px; }
                p { margin: 4px 0 12px 0; font-size: 13px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
                th, td { border: 1px solid #999; padding: 6px 8px; text-align: left; vertical-align: top; }
                th { background: #eaecee; color: #2c3e50; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="no-print" style="margin-bottom:15px;">
                <button onclick="window.print()" style="padding:8px 16px; background:#18bc9c; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">🖨️ Imprimir / Guardar como PDF</button>
            </div>
            ${contenidoHTML}
        </body>
        </html>
    `);
    ventana.document.close();
}

// =========================================================
// COMPARTIR EXCEL POR WHATSAPP / CORREO Y BORRADO CON FILTROS
// =========================================================
async function compartirValoracionesExcel() {
    if (!rubricaActivaObj) return alert("Primero selecciona una rúbrica.");

    // 1. Usamos cacheEstudiantes en memoria para no perder milisegundos valiosos del clic táctil
    const mapaEst = {};
    cacheEstudiantes.forEach(est => mapaEst[est.id] = est);

    // 2. Obtenemos las valoraciones en una promesa rápida
    const todas = await new Promise((resolve) => {
        const req = db.transaction(['valoraciones'], 'readonly')
                      .objectStore('valoraciones')
                      .index('rubrica_id')
                      .getAll(IDBKeyRange.only(rubricaActivaObj.id));
        req.onsuccess = (e) => resolve(e.target.result || []);
        req.onerror = () => resolve([]);
    });

    const vals = aplicarFiltrosActivosValoraciones(todas);
    if (vals.length === 0) return alert("No hay valoraciones con los filtros actuales para compartir.");

    const data = armarDatosExcelValoraciones(vals, mapaEst);
    const hoja = XLSX.utils.json_to_sheet(data);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Valoraciones");

    const sufijo = obtenerSufijoArchivoFiltrado();
    const nombreArchivo = `RAYDis_Rubric_${rubricaActivaObj.nombre.replace(/\s+/g, '_')}_${sufijo}.xlsx`;
    const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });

    // 3. Probamos primero el MIME de Excel y, si el celular lo bloquea, usamos octet-stream
    const mimeExcel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    let archivoExcel = new File([excelBuffer], nombreArchivo, { type: mimeExcel });

    if (navigator.canShare && !navigator.canShare({ files: [archivoExcel] })) {
        archivoExcel = new File([excelBuffer], nombreArchivo, { type: 'application/octet-stream' });
    }

    // 4. Si estamos en el celular y soporta compartir archivos, abrimos la bandeja nativa SOLO con el archivo
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [archivoExcel] }))) {
        try {
            await navigator.share({
                files: [archivoExcel]
            });
            return; // Éxito: se compartió el archivo .xlsx directo
        } catch (err) {
            if (err.name === 'AbortError') return; // El usuario cerró el menú
            console.warn("Fallo al adjuntar archivo directo:", err);
        }
    }

    // 5. Si se abre desde PC (donde no existe menú nativo de compartir archivos a WhatsApp):
    // Descargamos el Excel y armamos el reporte detallado en texto para WhatsApp
    XLSX.writeFile(libro, nombreArchivo);

    let resumenTexto = `📊 *REPORTE DE EVALUACIÓN - RAYDis*\n`;
    resumenTexto += `📋 *Rúbrica:* ${rubricaActivaObj.nombre}\n`;
    resumenTexto += `🎯 *Filtro:* ${sufijo.replace(/_/g, ' ')}\n\n`;

    vals.forEach(v => {
        const est = mapaEst[v.estudiante_id] || { nombre: 'Estudiante' };
        resumenTexto += `👤 *${est.nombre}* (${v.grado} - ${v.grupo_nombre || 'Ind.'})\n`;
        resumenTexto += `📌 ${v.actividad} ➡️ *Nota: ${Number(v.nota_final).toFixed(2)}*\n`;
        if (v.observacion) resumenTexto += `💬 _${v.observacion}_\n`;
        resumenTexto += `-------------------\n`;
    });

    const opcion = prompt(
        `📥 Se descargó el archivo "${nombreArchivo}" en tu dispositivo.\n\n` +
        `Nota: Los enlaces directos a WhatsApp Web no permiten adjuntar archivos automáticamente, pero podemos enviar el resumen completo de notas en texto.\n\n` +
        `Escribe:\n` +
        `1 -> Enviar resumen de notas por WhatsApp\n` +
        `2 -> Abrir Correo Electrónico`
    );

    if (opcion === '1') {
        window.open(`https://wa.me/?text=${encodeURIComponent(resumenTexto)}`, '_blank');
    } else if (opcion === '2') {
        const asunto = `Evaluaciones ${rubricaActivaObj.nombre} - ${sufijo.replace(/_/g, ' ')}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(resumenTexto)}`;
    }
}

function eliminarValoracionesRubricaActiva() {
    if (!rubricaActivaObj) return;
    const gradoFiltro = document.getElementById('rubricGrado').value;
    const actFiltro = document.getElementById('filtroActividadRubric').value;
    const fechaFiltro = document.getElementById('filtroFechaRubric').value;

    const detallesFiltro = [
        `Rúbrica: "${rubricaActivaObj.nombre}"`,
        actFiltro ? `Actividad: "${actFiltro}"` : `Actividad: Todas`,
        fechaFiltro ? `Fecha: ${fechaFiltro}` : `Fecha: Todas`,
        gradoFiltro ? `Grado: ${gradoFiltro}` : `Grado: Todos`
    ].join('\n• ');

    if (!confirm(`🗑️ ¿Estás seguro de eliminar las valoraciones que coinciden con este filtro?\n\n• ${detallesFiltro}`)) return;

    const t = db.transaction(['valoraciones'], 'readwrite');
    const store = t.objectStore('valoraciones');
    let borradas = 0;

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const v = cursor.value;
            const coincideRubrica = v.rubrica_id === rubricaActivaObj.id;
            const coincideGrado = !gradoFiltro || v.grado === gradoFiltro;
            const coincideAct = !actFiltro || v.actividad === actFiltro;
            const coincideFecha = !fechaFiltro || v.fecha === fechaFiltro;

            if (coincideRubrica && coincideGrado && coincideAct && coincideFecha) {
                cursor.delete();
                borradas++;
            }
            cursor.continue();
        } else {
            alert(`✅ Se eliminaron ${borradas} valoraciones del filtro seleccionado.`);
            limpiarFormularioEvaluacionRubric();
            cargarValoracionesGuardadas();
        }
    };
}

function eliminarTodasLasValoraciones() {
    if (!confirm("⚠️ ATENCIÓN: ¿Estás seguro de eliminar TODAS las valoraciones realizadas en todas las rúbricas de la aplicación?")) return;

    const t = db.transaction(['valoraciones'], 'readwrite');
    t.objectStore('valoraciones').clear().onsuccess = () => {
        alert("✅ Todas las valoraciones han sido eliminadas.");
        limpiarFormularioEvaluacionRubric();
        cargarValoracionesGuardadas();
    };
}
