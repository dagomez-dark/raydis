// ==================================================================
//               RAYDis (version 1.0)   
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

let db;
const DB_NAME = "ColegioDB";
const DB_VERSION = 2;

// ==========================================
// 1. INICIO Y SEGURIDAD
// ==========================================
function initDB() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('estudiantes')) {
            const osEstudiantes = db.createObjectStore('estudiantes', { keyPath: 'id', autoIncrement: true });
            osEstudiantes.createIndex('grado', 'grado', { unique: false });
            osEstudiantes.createIndex('documento', 'documento', { unique: false });
            osEstudiantes.createIndex('nombre', 'nombre', { unique: false });
        }
        if (!db.objectStoreNames.contains('reportes')) {
            const osReportes = db.createObjectStore('reportes', { keyPath: 'id', autoIncrement: true });
            osReportes.createIndex('estudiante_id', 'estudiante_id', { unique: false });
            osReportes.createIndex('materia', 'materia', { unique: false });
        }
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        verificarEstadoSeguridad();
        cargarMaterias();
        actualizarListasDeGrados();
    };
}
window.onload = initDB;

function verificarEstadoSeguridad() { 
    if (!localStorage.getItem("app_pin")) localStorage.setItem("app_pin", "1234"); 
}

function validarPIN() {
    if (document.getElementById('pinInput').value === localStorage.getItem("app_pin")) {
        document.getElementById('pantallaLogin').classList.remove('activa');
// ESTA ES LA LÍNEA NUEVA QUE OBLIGA AL RECUADRO A DESAPARECER:
        document.getElementById('pantallaLogin').style.display = "none";
        document.getElementById('pantallaInicio').classList.add('activa');
        document.getElementById('mainHeader').style.display = "flex";
        document.getElementById('menuNavegacion').classList.add('activo');
        document.getElementById('pinInput').value = ""; 
    } else {
        document.getElementById('msgLogin').style.display = "block";
        document.getElementById('msgLogin').textContent = "PIN incorrecto.";
    }
}

function actualizarSeguridad() {
    const nuevoPin = document.getElementById('nuevoPin').value;
    const palabra = document.getElementById('palabraRecuperacion').value;
    if (nuevoPin && nuevoPin.length !== 4) return alert("El PIN debe tener exactamente 4 dígitos numéricos.");
    if (nuevoPin) localStorage.setItem("app_pin", nuevoPin);
    if (palabra) localStorage.setItem("app_palabra", palabra.toLowerCase().trim());
    alert("✅ Configuración de seguridad actualizada.");
    document.getElementById('nuevoPin').value = '';
    document.getElementById('palabraRecuperacion').value = '';
}

function recuperarPIN() {
    const guardada = localStorage.getItem("app_palabra");
    if (!guardada) return alert("No has configurado una palabra secreta en la pestaña de Configuración.");
    const respuesta = prompt("Ingresa tu palabra de recuperación secreta:");
    if (respuesta && respuesta.toLowerCase().trim() === guardada) {
        localStorage.setItem("app_pin", "1234");
        alert("✅ Palabra correcta. Tu PIN ha sido restablecido a: 1234");
    } else if (respuesta) {
        alert("❌ Palabra incorrecta.");
    }
}

function cerrarSesion() { location.reload(); }

function navegar(idPantalla, elementoMenu) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    document.getElementById('pantalla' + idPantalla).classList.add('activa');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('activo'));
    elementoMenu.classList.add('activo');
    if (idPantalla === 'Estudiantes') cargarEstudiantesCrud();
}

// ==========================================
// 2. MATERIAS Y GESTIÓN
// ==========================================
function cargarMaterias() {
    const materias = JSON.parse(localStorage.getItem('materias_app')) || ["Ciencias Naturales"];
    const select = document.getElementById('selectMateria');
    const valorPrevio = select.value; // Guardar lo que estaba seleccionado
    
    select.innerHTML = '<option value="">Selecciona la materia...</option>';
    materias.forEach(m => select.innerHTML += `<option value="${m}">${m}</option>`);
    
    // Restaurar selección si la materia sigue existiendo
    if (materias.includes(valorPrevio)) select.value = valorPrevio;
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

// NUEVO: Funciones de la ventana de Gestión de Materias
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
                <button onclick="editarMateria(${index})" style="background:#3498db; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;" title="Editar">✏️</button>
                <button onclick="eliminarMateria(${index})" style="background:var(--danger); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;" title="Eliminar">🗑️</button>
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
        
        // Actualizamos todos los reportes históricos en la base de datos
        actualizarMateriaEnReportes(nombreViejo, nombreNuevo.trim());
        
        cargarMaterias();
        renderizarListaMaterias();
    }
}

function eliminarMateria(index) {
    let materias = JSON.parse(localStorage.getItem('materias_app')) || ["Ciencias Naturales"];
    
    if (materias.length === 1) return alert("⚠️ Debes tener al menos una materia en la lista.");

    if (confirm(`¿Estás seguro de eliminar "${materias[index]}"? \n\n(Nota: Los reportes anteriores que ya tienen esta materia asignada NO se borrarán de la base de datos).`)) {
        materias.splice(index, 1);
        localStorage.setItem('materias_app', JSON.stringify(materias));
        cargarMaterias();
        renderizarListaMaterias();
    }
}

function actualizarMateriaEnReportes(nombreViejo, nombreNuevo) {
    const transaccion = db.transaction(['reportes'], 'readwrite');
    const store = transaccion.objectStore('reportes');
    const request = store.openCursor();
    let contador = 0;

    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value.materia === nombreViejo) {
                const registroActualizado = cursor.value;
                registroActualizado.materia = nombreNuevo;
                cursor.update(registroActualizado);
                contador++;
            }
            cursor.continue();
        } else if (contador > 0) {
            console.log(`Se actualizaron ${contador} reportes con el nuevo nombre de materia.`);
        }
    };
}
// ==========================================
// 3. DESPLEGABLES
// ==========================================
function actualizarListasDeGrados() {
    const request = db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').getAll();
    request.onsuccess = e => {
        const gradosUnicos = [...new Set(e.target.result.map(x => x.grado))].sort();
        ['selectGradoInicio', 'exportGrado', 'filtroGradoCrud'].forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                const prevVal = el.value; 
                el.innerHTML = '<option value="">-- Todos / Elige Grado --</option>';
                gradosUnicos.forEach(g => el.innerHTML += `<option value="${g}">${g}</option>`);
                el.value = prevVal; 
            }
        });
    };
}

function cargarEstudiantesGradoInicio() {
    const grado = document.getElementById('selectGradoInicio').value;
    const selectEst = document.getElementById('selectListaEstudiantesInicio');
    if (!grado) { selectEst.classList.add('hidden'); return; }
    const request = db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').index('grado').getAll(grado);
    request.onsuccess = e => {
        const estudiantes = e.target.result.sort((a,b) => a.nombre.localeCompare(b.nombre));
        selectEst.innerHTML = '<option value="">-- Selecciona Estudiante --</option>';
        estudiantes.forEach(est => selectEst.innerHTML += `<option value="${est.id}">${est.nombre}</option>`);
        selectEst.classList.remove('hidden');
    };
}

function seleccionarDesdeLista() {
    const select = document.getElementById('selectListaEstudiantesInicio');
    if (select.value) seleccionarEstudiante(select.value);
}

// ==========================================
// 4. LECTURA EXCEL Y BÚSQUEDA
// ==========================================
function procesarExcel() {
    const archivo = document.getElementById('archivoExcel').files[0];
    if (!archivo) return alert("Selecciona un archivo Excel.");
    const lector = new FileReader();
    lector.onload = function(evento) {
        const data = new Uint8Array(evento.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const transaccion = db.transaction(['estudiantes'], 'readwrite');
        const store = transaccion.objectStore('estudiantes');
        let cont = 0;
        workbook.SheetNames.forEach(nombreHoja => {
            const filas = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja], { header: 1 });
            for (let i = 1; i < filas.length; i++) {
                if (!filas[i] || !filas[i][0]) continue;
                store.add({
                    grado: nombreHoja.trim(), nombre: String(filas[i][0] || "").trim(),
                    documento: String(filas[i][1] || "").trim(), edad: filas[i][2] || "",
                    telefono: String(filas[i][3] || "").trim(), acudiente: String(filas[i][4] || "").trim(),
                    tel_acudiente: String(filas[i][5] || "").trim()
                });
                cont++;
            }
        });
        transaccion.oncomplete = () => { alert(`¡${cont} estudiantes importados!`); actualizarListasDeGrados(); document.getElementById('archivoExcel').value = ''; };
    };
    lector.readAsArrayBuffer(archivo);
}

function buscarEstudianteUI() {
    const query = document.getElementById('buscador').value.toLowerCase();
    const resDiv = document.getElementById('resultadosBusqueda');
    if (query.length < 2) { resDiv.innerHTML = ''; document.getElementById('zonaReporte').classList.add('hidden'); return; }

    const request = db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').getAll(); 
    request.onsuccess = e => {
        const filtrados = e.target.result.filter(es => es.nombre.toLowerCase().includes(query) || es.documento.includes(query)).slice(0, 10);
        resDiv.innerHTML = '';
        if (filtrados.length > 0) {
            filtrados.forEach(est => {
                const div = document.createElement('div');
                div.style.padding = '12px'; div.style.borderBottom = '1px solid #eee'; div.style.cursor = 'pointer';
                div.innerHTML = `<strong>${est.nombre}</strong> <br><small>Grado: ${est.grado} | Doc: ${est.documento}</small>`;
                div.onclick = () => seleccionarEstudiante(est.id);
                resDiv.appendChild(div);
            });
        }
    };
}

function seleccionarEstudiante(id) {
    const request = db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').get(Number(id));
    request.onsuccess = e => {
        const est = e.target.result;
        if (!est) return;

        document.getElementById('nombreEstudianteSeleccionado').textContent = `${est.nombre} - Grado ${est.grado}`;
        document.getElementById('idEstudianteSeleccionado').value = est.id;
        
        // Cargar datos del Acudiente y preparar WhatsApp
        const divAcu = document.getElementById('infoAcudiente');
        if (est.acudiente || est.tel_acudiente) {
            divAcu.style.display = 'block';
            document.getElementById('lblAcudiente').textContent = est.acudiente || 'No registrado';
            document.getElementById('lblTelAcudiente').textContent = est.tel_acudiente || 'No registrado';
            
            const btnWp = document.getElementById('btnWhatsApp');
            if (est.tel_acudiente) {
                btnWp.style.display = 'block';
                btnWp.onclick = () => {
                    let tel = est.tel_acudiente.replace(/\D/g, ''); // Limpiar el número
                    if (tel.length === 10 && tel.startsWith('3')) tel = '57' + tel; // Añadir indicativo de Colombia si aplica
                    const msj = encodeURIComponent(`Cordial saludo ${est.acudiente || 'padre de familia'}, me comunico de la institución educativa para informarle sobre un reporte del estudiante ${est.nombre}.`);
                    window.open(`https://wa.me/${tel}?text=${msj}`, '_blank');
                };
            } else {
                btnWp.style.display = 'none';
            }
        } else {
            divAcu.style.display = 'none';
        }

        document.getElementById('buscador').value = '';
        document.getElementById('resultadosBusqueda').innerHTML = '';
        document.getElementById('zonaReporte').classList.remove('hidden');
        cargarHistorialEstudiante(est.id);
    };
}

// ==========================================
// 5. HISTORIAL Y BORRADO DE REPORTES
// ==========================================
function cargarHistorialEstudiante(estId) {
    const div = document.getElementById('listaHistorialEstudiante');
    div.innerHTML = '<small>Cargando...</small>';
    const request = db.transaction(['reportes'], 'readonly').objectStore('reportes').index('estudiante_id').getAll(Number(estId));
    
    request.onsuccess = e => {
        const reportes = e.target.result.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
        if (reportes.length === 0) { div.innerHTML = '<small style="color:#666;">No hay reportes previos.</small>'; return; }
        div.innerHTML = '';
        reportes.forEach(r => {
            div.innerHTML += `
            <div style="background:#f4f6f7; padding:10px; margin-bottom:5px; border-radius:4px; font-size:0.85rem; position:relative;">
                <strong style="color:var(--primary)">${r.fecha} - ${r.materia} (${r.tipo_reporte})</strong><br>${r.contenido}
                <button onclick="eliminarReporteIndividual(${r.id})" style="position:absolute; top:5px; right:5px; background:none; border:none; color:red; font-size:1.2rem; cursor:pointer;">✖</button>
            </div>`;
        });
    };
}

function eliminarReporteIndividual(idReporte) {
    if(!confirm("¿Estás seguro de borrar este reporte específico?")) return;
    const transaccion = db.transaction(['reportes'], 'readwrite');
    transaccion.objectStore('reportes').delete(idReporte);
    transaccion.oncomplete = () => cargarHistorialEstudiante(document.getElementById('idEstudianteSeleccionado').value);
}

function borrarReportesRango() {
    const estId = document.getElementById('idEstudianteSeleccionado').value;
    const ini = document.getElementById('fechaIniBorrado').value;
    const fin = document.getElementById('fechaFinBorrado').value;
    if (!ini || !fin) return alert("Selecciona fecha inicio y fin.");
    if (new Date(ini) > new Date(fin)) return alert("Fecha inicio no puede ser mayor a la fin.");
    if (!confirm(`¿Borrar definitivamente los reportes de este estudiante entre ${ini} y ${fin}?`)) return;

    const transaccion = db.transaction(['reportes'], 'readwrite');
    const store = transaccion.objectStore('reportes');
    const request = store.index('estudiante_id').getAll(Number(estId));

    request.onsuccess = e => { e.target.result.forEach(r => { if (r.fecha >= ini && r.fecha <= fin) store.delete(r.id); }); };
    transaccion.oncomplete = () => { alert("Reportes eliminados."); cargarHistorialEstudiante(estId); };
}

function borrarReportesGlobalesRango() {
    const ini = document.getElementById('fechaIniGlobal').value;
    const fin = document.getElementById('fechaFinGlobal').value;
    if (!ini || !fin) return alert("Selecciona fecha inicio y fin.");
    if (new Date(ini) > new Date(fin)) return alert("Fecha inicio no puede ser mayor a la fin.");
    if (!confirm(`⚠️ ADVERTENCIA: ¿Estás seguro de borrar TODOS los reportes de TODOS los estudiantes generados entre el ${ini} y el ${fin}? Esta acción NO se puede deshacer.`)) return;

    const transaccion = db.transaction(['reportes'], 'readwrite');
    const store = transaccion.objectStore('reportes');
    const request = store.openCursor();
    let cont = 0;

    request.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
            if (cursor.value.fecha >= ini && cursor.value.fecha <= fin) {
                cursor.delete();
                cont++;
            }
            cursor.continue();
        } else {
            alert(`🗑️ Se eliminaron ${cont} reportes en el rango seleccionado.`);
            const estId = document.getElementById('idEstudianteSeleccionado').value;
            if(estId) cargarHistorialEstudiante(estId); // Refrescar si hay uno seleccionado
        }
    };
}

// ==========================================
// 6. MODAL REPORTES
// ==========================================
function mostrarFormulario(tipo) {
    const mat = document.getElementById('selectMateria').value;
    if (!mat) return alert("⚠️ Selecciona la materia.");
    document.getElementById('tituloModalReporte').textContent = `Reporte ${tipo} - ${mat}`;
    document.getElementById('tipoReporteActual').value = tipo;
    document.getElementById('fechaReporte').value = new Date().toISOString().split('T')[0];
    
    document.getElementById('formAcademico').classList.add('hidden');
    document.getElementById('formDisciplinario').classList.add('hidden');
    document.getElementById(tipo === 'Academico' ? 'formAcademico' : 'formDisciplinario').classList.remove('hidden');
    
    cargarOpcionesGuardadas();
    document.getElementById('modalReporte').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalReporte').style.display = 'none';
    document.querySelectorAll('#modalReporte input[type="checkbox"]').forEach(c => c.checked = false);
    document.getElementById('obsAcademica').value = ''; document.getElementById('obsDisciplina').value = '';
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

    // Creamos una lista vacía para ir guardando las partes del texto
    let partesTexto = [];

    if (tipo === 'Academico') {
        // 1. Tomamos las frases seleccionadas
        const f = Array.from(document.querySelectorAll('input[name="chk_academico"]:checked')).map(c => c.value);
        if (f.length > 0) partesTexto.push(f.join(', '));
        
        // 2. Tomamos la observación manual
        const obs = document.getElementById('obsAcademica').value.trim();
        if (obs) partesTexto.push(obs);
        
    } else { // Si es Disciplinario
        // 1. Frases de disciplina
        const f = Array.from(document.querySelectorAll('input[name="chk_disciplina"]:checked')).map(c => c.value);
        if (f.length > 0) partesTexto.push(f.join(', '));
        
        // 2. Lista de chequeo (uniforme, etc.)
        const q = Array.from(document.querySelectorAll('input[name="chk_chequeo"]:checked')).map(c => c.value);
        if (q.length > 0) partesTexto.push(q.join(', '));
        
        // 3. Observación manual
        const obs = document.getElementById('obsDisciplina').value.trim();
        if (obs) partesTexto.push(obs);
    }

    // Unimos todas las partes usando un punto y un espacio (. ) para crear un párrafo natural
    nuevoReporte.contenido = partesTexto.join('. ');

    const transaccion = db.transaction(['reportes'], 'readwrite');
    transaccion.objectStore('reportes').add(nuevoReporte);
    
    transaccion.oncomplete = () => { 
        alert("✅ Reporte guardado."); 
        cerrarModal(); 
        cargarHistorialEstudiante(estId); 
    };
}
function agregarOpcionLocal(contId, name, key) {
    const n = prompt("Nueva frase:");
    if (n && n.trim()) {
        const l = document.createElement('label'); l.innerHTML = `<input type="checkbox" name="${name}" value="${n}" checked> ${n}`;
        document.getElementById(contId).appendChild(l);
        let g = JSON.parse(localStorage.getItem(key)) || []; g.push(n.trim()); localStorage.setItem(key, JSON.stringify(g));
    }
}

function cargarOpcionesGuardadas() {
    const c = (k, id, nm) => {
        let g = JSON.parse(localStorage.getItem(k)) || [];
        const ex = Array.from(document.getElementById(id).querySelectorAll('input')).map(i => i.value);
        g.forEach(f => { if(!ex.includes(f)) { const l = document.createElement('label'); l.innerHTML = `<input type="checkbox" name="${nm}" value="${f}"> ${f}`; document.getElementById(id).appendChild(l); } });
    };
    c('frases_acad', 'frasesAcademicoContainer', 'chk_academico'); c('frases_disc', 'frasesDisciplinaContainer', 'chk_disciplina'); c('chequeo_disc', 'chequeoDisciplinaContainer', 'chk_chequeo');
}

// ==========================================
// 7. EXPORTACIÓN
// ==========================================
function toggleFiltrosExport() {
    const tipo = document.getElementById('tipoExportacion').value;
    document.getElementById('exportGrado').classList.add('hidden'); document.getElementById('exportEstudiante').classList.add('hidden');
    if (tipo === 'grado') document.getElementById('exportGrado').classList.remove('hidden');
    if (tipo === 'estudiante') { document.getElementById('exportGrado').classList.remove('hidden'); document.getElementById('exportEstudiante').classList.remove('hidden'); }
}

function cargarEstudiantesExport() {
    const grado = document.getElementById('exportGrado').value;
    const sel = document.getElementById('exportEstudiante');
    if (!grado) { sel.classList.add('hidden'); return; }
    const request = db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').index('grado').getAll(grado);
    request.onsuccess = e => {
        sel.innerHTML = '<option value="">-- Elige Estudiante --</option>';
        e.target.result.sort((a,b) => a.nombre.localeCompare(b.nombre)).forEach(es => sel.innerHTML += `<option value="${es.id}">${es.nombre}</option>`);
        sel.classList.remove('hidden');
    };
}

function exportarReportes() {
    const tipoFiltro = document.getElementById('tipoExportacion').value;
    const gSel = document.getElementById('exportGrado').value;
    const eSel = document.getElementById('exportEstudiante').value;
    
    if (tipoFiltro === 'grado' && !gSel) return alert("Selecciona un grado.");
    if (tipoFiltro === 'estudiante' && (!gSel || !eSel)) return alert("Selecciona grado y estudiante.");

    const t = db.transaction(['estudiantes', 'reportes'], 'readonly');
    const reqEst = t.objectStore('estudiantes').getAll();
    
    reqEst.onsuccess = () => {
        const mapa = {}; 
        reqEst.result.forEach(e => mapa[e.id] = { n: e.nombre, d: e.documento });
        
        const reqRep = t.objectStore('reportes').getAll();
        
        reqRep.onsuccess = () => {
            let reps = reqRep.result;
            
            // 1. VARIABLE DINÁMICA PARA EL NOMBRE DEL ARCHIVO
            let nombreArchivo = "RAYDis_General.xlsx"; // Nombre por defecto si exportan todo
            
            // 2. FILTRAMOS Y ARMAMOS EL NOMBRE SEGÚN LO QUE ELIJA EL DOCENTE
            if (tipoFiltro === 'grado') {
                reps = reps.filter(r => r.grado === gSel);
                // Si eligen grado, el archivo se llamará: RAYDis_Grado_8B.xlsx
                nombreArchivo = `RAYDis_Grado_${gSel.replace(/\s+/g, '')}.xlsx`; 
            }
            if (tipoFiltro === 'estudiante') {
                reps = reps.filter(r => r.estudiante_id == eSel);
                // Extraemos el nombre del estudiante y cambiamos los espacios por guiones bajos
                const nombreEstudiante = mapa[eSel] ? mapa[eSel].n.replace(/\s+/g, '_') : "Estudiante";
                // El archivo se llamará: RAYDis_Juan_Perez.xlsx
                nombreArchivo = `RAYDis_${nombreEstudiante}.xlsx`;
            }
            
            if (reps.length === 0) return alert("No hay datos para esta selección.");

            reps.sort((a,b) => b.timestamp - a.timestamp);
            const data = reps.map(r => ({
                "Fecha": r.fecha, "Grado": r.grado, "Materia": r.materia, "Documento": mapa[r.estudiante_id]?.d || "N/A",
                "Estudiante": mapa[r.estudiante_id]?.n || "Eliminado", "Tipo": r.tipo_reporte, "Observaciones": r.contenido
            }));

            const hoja = XLSX.utils.json_to_sheet(data);
            hoja['!cols'] = [{wch:12}, {wch:8}, {wch:20}, {wch:15}, {wch:35}, {wch:15}, {wch:80}];
            const libro = XLSX.utils.book_new(); 
            XLSX.utils.book_append_sheet(libro, hoja, "Reportes"); 
            
            // 3. DESCARGAMOS EL ARCHIVO CON EL NOMBRE PERSONALIZADO
            XLSX.writeFile(libro, nombreArchivo);
        };
    };
}
// ==========================================
// 8. CRUD DE ESTUDIANTES (PANTALLA ALUMNOS)
// ==========================================
function cargarEstudiantesCrud() {
    const gradoFiltro = document.getElementById('filtroGradoCrud').value;
    const divLista = document.getElementById('listaEstudiantesCrud');
    divLista.innerHTML = '<small>Cargando estudiantes...</small>';

    const request = db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').getAll();
    request.onsuccess = e => {
        let estudiantes = e.target.result;
        if (gradoFiltro) estudiantes = estudiantes.filter(est => est.grado === gradoFiltro);
        estudiantes.sort((a, b) => a.nombre.localeCompare(b.nombre));
        divLista.innerHTML = '';
        if (estudiantes.length === 0) {
            divLista.innerHTML = '<p style="color:#666; text-align:center; padding: 1rem;">No hay estudiantes para mostrar.</p>'; return;
        }
        estudiantes.forEach(est => {
            divLista.innerHTML += `
            <div style="background:#fff; padding:12px; margin-bottom:10px; border: 1px solid #ddd; border-radius:6px; display: flex; justify-content: space-between; align-items: center;">
                <div><strong style="color:var(--primary)">${est.nombre}</strong><br><small style="color:#666;">Grado: ${est.grado} | Doc: ${est.documento}</small></div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="editarEstudiante(${est.id})" style="background:#3498db; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">✏️</button>
                    <button onclick="eliminarEstudiante(${est.id})" style="background:var(--danger); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">🗑️</button>
                </div>
            </div>`;
        });
    };
}

function abrirModalNuevoEstudiante() {
    document.getElementById('tituloModalEstudiante').textContent = "Nuevo Estudiante";
    document.getElementById('crudId').value = ""; document.getElementById('crudNombre').value = ""; document.getElementById('crudDocumento').value = ""; document.getElementById('crudGrado').value = ""; document.getElementById('crudEdad').value = ""; document.getElementById('crudTelefono').value = ""; document.getElementById('crudAcudiente').value = ""; document.getElementById('crudTelAcudiente').value = "";
    document.getElementById('modalEstudiante').style.display = 'flex';
}

function editarEstudiante(id) {
    const request = db.transaction(['estudiantes'], 'readonly').objectStore('estudiantes').get(id);
    request.onsuccess = e => {
        const est = e.target.result;
        if (est) {
            document.getElementById('tituloModalEstudiante').textContent = "Editar Estudiante";
            document.getElementById('crudId').value = est.id; document.getElementById('crudNombre').value = est.nombre; document.getElementById('crudDocumento').value = est.documento; document.getElementById('crudGrado').value = est.grado; document.getElementById('crudEdad').value = est.edad; document.getElementById('crudTelefono').value = est.telefono; document.getElementById('crudAcudiente').value = est.acudiente; document.getElementById('crudTelAcudiente').value = est.tel_acudiente;
            document.getElementById('modalEstudiante').style.display = 'flex';
        }
    };
}

function cerrarModalEstudiante() { document.getElementById('modalEstudiante').style.display = 'none'; }

function guardarEstudiante() {
    const id = document.getElementById('crudId').value;
    const nombre = document.getElementById('crudNombre').value.trim();
    const grado = document.getElementById('crudGrado').value.trim();
    if (!nombre || !grado) return alert("⚠️ El nombre y el grado son campos obligatorios.");

    const estudiante = {
        nombre: nombre, documento: document.getElementById('crudDocumento').value.trim(), grado: grado, edad: document.getElementById('crudEdad').value.trim(), telefono: document.getElementById('crudTelefono').value.trim(), acudiente: document.getElementById('crudAcudiente').value.trim(), tel_acudiente: document.getElementById('crudTelAcudiente').value.trim()
    };
    if (id) estudiante.id = parseInt(id);

    const transaccion = db.transaction(['estudiantes'], 'readwrite');
    const store = transaccion.objectStore('estudiantes');
    if (id) store.put(estudiante); else store.add(estudiante);

    transaccion.oncomplete = () => {
        alert(id ? "✅ Actualizado exitosamente." : "✅ Creado exitosamente.");
        cerrarModalEstudiante(); actualizarListasDeGrados(); cargarEstudiantesCrud();
    };
}

function eliminarEstudiante(id) {
    if (!confirm("⚠️ ¿Estás seguro de eliminar a este estudiante? Sus reportes se conservarán globalmente.")) return;
    db.transaction(['estudiantes'], 'readwrite').objectStore('estudiantes').delete(id).onsuccess = () => { alert("🗑️ Eliminado."); actualizarListasDeGrados(); cargarEstudiantesCrud(); };
}
