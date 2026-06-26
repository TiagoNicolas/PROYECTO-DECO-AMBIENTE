import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./App.css";


const roomEmojis = {
  "Sala de Estar": { emoji: "🛋️", bg: "#F2EAE0" },
  "Comedor":       { emoji: "🍽️", bg: "#E8EFF0" },
  "Dormitorio":    { emoji: "🛏️", bg: "#F0EAF2" },
  "Baño":          { emoji: "🛁", bg: "#E8F2EE" },
  "Oficina":       { emoji: "📚", bg: "#F2EDE8" },
  "Cocina":        { emoji: "🍳", bg: "#F2F0E8" }
};

const muebleEmojis = {
  "Asientos":      "🪑",
  "Mesas":         "🪟",
  "Dormitorio":    "🛏️",
  "Almacenamiento":"🗄️",
  "Oficina":       "🖥️",
  "Iluminación":   "💡",
  "Decoración":    "🪞"
};

const statusClass = {
  "En Progreso": "status-progress",
  "Finalizado":  "status-done",
  "Planificado": "status-plan"
};

const palettes = [
  { name: "Toscana Cálida",       colors: ["#C4704F","#8A9E8A","#BFA060","#4A3728","#E8DDD0"] },
  { name: "Nordic Sereno",         colors: ["#7EAFC4","#C4B5A5","#4A5C6B","#E8DDD0","#F7F3EE"] },
  { name: "Medianoche Botánica",   colors: ["#2C3E2D","#8A9E8A","#C4B5A5","#BFA060","#E8DDD0"] },
  { name: "Art Déco Clásico",      colors: ["#2C2C2C","#BFA060","#C4B5A5","#7C5C2C","#E8DDD0"] },
];

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(74,55,40,0.45)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#FDFAF6", borderRadius: 4, width: 480, maxWidth: "92vw",
        padding: "36px 40px", position: "relative",
        boxShadow: "0 24px 64px rgba(74,55,40,0.18)"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", fontSize: 20,
          cursor: "pointer", color: "#8B7355", lineHeight: 1
        }}>✕</button>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 24, fontWeight: 400, color: "#4A3728", marginBottom: 24
        }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", fontSize: 10, letterSpacing: "0.15em",
        textTransform: "uppercase", color: "#8B7355", marginBottom: 6, fontWeight: 500
      }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 14px",
  border: "1px solid #E8DDD0", borderRadius: 2,
  fontFamily: "'Jost', sans-serif", fontSize: 13,
  background: "white", color: "#2C2C2C", outline: "none"
};


export default function App() {
  const [ambientes, setAmbientes] = useState([]);
  const [muebles,   setMuebles]   = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/api/ambientes.php")
      .then(res => res.json())
      .then(data => setAmbientes(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error cargando ambientes:", err));

    fetch("http://localhost/backend/api/mobiliario.php")
      .then(res => res.json())
      .then(data => setMuebles(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error cargando mobiliario:", err));
  }, []);

  const navItems = [
    { to: "/",           label: "Inicio",     icon: "🏠" },
    { to: "/ambientes",  label: "Ambientes",  icon: "🛋️" },
    { to: "/mobiliario", label: "Mobiliario", icon: "🪑" },
  ];

  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="brand">Mi Decorador<span>de Ambientes</span></div>
            <div className="team-badge">Grupo 10</div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">Módulos</div>

            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}

            <div className="nav-section-label" style={{ marginTop: 12 }}>Herramientas</div>
            <div className="nav-item"><span className="nav-icon">🎨</span>Paletas de Color</div>
            <div className="nav-item"><span className="nav-icon">📊</span>Presupuesto</div>
            <div className="nav-item"><span className="nav-icon">📋</span>Reportes</div>
          </nav>
          <div className="sidebar-footer">
            <div className="user-row">
              <div className="user-avatar">T</div>
              <div className="user-info">
                <div className="name">Tiago Navarro</div>
                <div className="role">Programador</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          <Routes>
            <Route path="/"           element={<HomePage     ambientes={ambientes} muebles={muebles} />} />
            <Route path="/ambientes"  element={<AmbientesPage ambientes={ambientes} setAmbientes={setAmbientes} />} />
            <Route path="/mobiliario" element={<MobiliarioPage muebles={muebles}   setMuebles={setMuebles} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function HomePage({ ambientes, muebles }) {
  const navigate = useNavigate();

  const totalPresupuesto = muebles.reduce((acc, m) => acc + parseFloat(m.precio || 0), 0);

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Bienvenido, <em>Tiago</em></div>
          <div className="page-subtitle">Junio 2026 · {ambientes.length} ambientes en total</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => navigate("/ambientes")}>Ver todo</button>
          <button className="btn btn-primary"  onClick={() => navigate("/ambientes")}>+ Nuevo espacio</button>
        </div>
      </div>

      <div className="page-content">
        <div className="home-hero">
          <div className="hero-eyebrow">✦ Proyecto destacado</div>
          <div className="hero-title">Rediseño del <em>Living</em><br />Principal</div>
          <div className="hero-desc">
            Transformá cada rincón de tu hogar con paletas de color cuidadosamente
            seleccionadas y mobiliario que refleja tu estilo.
          </div>
          <div className="hero-cta">
            <button className="btn-hero"       onClick={() => navigate("/ambientes")}>Continuar proyecto</button>
            <button className="btn-hero-ghost" onClick={() => navigate("/mobiliario")}>Ver mobiliario</button>
          </div>
        </div>

        <div className="stats-row">
          {[
            { v: ambientes.length.toString(),                         l: "Ambientes",        t: "Sincronizados con DB" },
            { v: muebles.length.toString(),                           l: "Muebles totales",  t: "En inventario" },
            { v: `$${totalPresupuesto.toLocaleString("es-AR")}`,     l: "Inversión Estimada", t: "Costo total de muebles" },
            { v: "100%",                                              l: "Conexión",         t: "Base de Datos Activa" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value" style={{ fontSize: s.v.length > 8 ? "1.5rem" : "" }}>{s.v}</div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-trend">{s.t}</div>
            </div>
          ))}
        </div>

        <div className="home-grid">
          <div>
            <div className="section-title">Espacios <em>recientes</em></div>
            <div className="recent-list">
              {ambientes.slice(0, 4).map(a => {
                const config = roomEmojis[a.tipo] || { emoji: "🏠", bg: "#E2E8F0" };
                return (
                  <div key={a.id} className="recent-item">
                    <div className="room-thumb" style={{ background: config.bg }}>{config.emoji}</div>
                    <div className="recent-info">
                      <div className="room-name">{a.nombre}</div>
                      <div className="room-meta">{a.tipo} · {a.metros_cuadrados} m²</div>
                    </div>
                    <div className={`recent-status ${statusClass[a.estado] || ""}`}>{a.estado}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="section-title">Paletas <em>guardadas</em></div>
            {palettes.map((p, i) => (
              <div key={i} className="palette-card">
                <div className="palette-name">{p.name}</div>
                <div className="palette-swatches">
                  {p.colors.map((c, j) => <div key={j} className="swatch" style={{ background: c }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <div className="section-header-row">
            <div className="section-title">Todos los <em>Ambientes</em></div>
            <button className="btn btn-outline" onClick={() => navigate("/ambientes")}>Ver todos</button>
          </div>
          <div className="rooms-grid">
            {ambientes.map(a => {
              const config = roomEmojis[a.tipo] || { emoji: "🏠", bg: "#E2E8F0" };
              return (
                <div key={a.id} className="room-card">
                  <div className="room-card-img" style={{ background: config.bg }}>
                    <span style={{ fontSize: 52 }}>{config.emoji}</span>
                    <div className={`room-card-badge ${statusClass[a.estado] || ""}`}>{a.estado}</div>
                  </div>
                  <div className="room-card-body">
                    <div className="room-card-name">{a.nombre}</div>
                    <div className="room-card-type">{a.tipo}</div>
                    <div className="room-card-info">
                      <div className="info-item"><strong>{a.metros_cuadrados} m²</strong>Superficie</div>
                      <div className="info-item"><strong>{a.cantidad_muebles || 0}</strong>Elementos</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <div className="section-header-row">
            <div className="section-title">Elementos de <em>Mobiliario</em></div>
            <button className="btn btn-outline" onClick={() => navigate("/mobiliario")}>Ver todos</button>
          </div>
          <div className="muebles-grid">
            {muebles.map(m => {
              const emoji = muebleEmojis[m.categoria] || "🪑";
              return (
                <div key={m.id} className="mueble-card">
                  <div className="mueble-img">{emoji}</div>
                  <div className="mueble-body">
                    <div className="mueble-name">{m.nombre}</div>
                    <div className="mueble-cat">{m.categoria}</div>
                    <div style={{ marginTop: 8 }}>
                      <span className="tag tag-wood">{m.material}</span>
                    </div>
                    <div className="mueble-footer">
                      <div className="mueble-price">$ {parseFloat(m.precio).toLocaleString("es-AR")}<span> ARS</span></div>
                      <div className="mueble-room">📍 {m.ambiente}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function AmbientesPage({ ambientes, setAmbientes }) {
  const navigate = useNavigate();

  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState("Todos");

  const [form, setForm] = useState({
    nombre: "", tipo: "Sala de Estar",
    metros_cuadrados: "", cantidad_muebles: "", estado: "Planificado"
  });
  const [errores, setErrores] = useState({});

  const tiposAmbiente = ["Sala de Estar", "Dormitorio", "Comedor", "Cocina", "Oficina", "Baño"];
  const estados       = ["Planificado", "En Progreso", "Finalizado"];
  const filters       = ["Todos", ...tiposAmbiente];

  const ambientesFiltrados = filtroActivo === "Todos"
    ? ambientes
    : ambientes.filter(a => a.tipo === filtroActivo);

  const validar = () => {
    const e = {};
    if (!form.nombre.trim())       e.nombre           = "El nombre es obligatorio";
    if (!form.metros_cuadrados)    e.metros_cuadrados = "Ingresá los metros cuadrados";
    return e;
  };

  const openAdd = () => {
    setForm({ nombre: "", tipo: "Sala de Estar", metros_cuadrados: "", cantidad_muebles: "", estado: "Planificado" });
    setErrores({});
    setModal("add");
  };

  const openEdit = (a) => {
    setSelected(a);
    setForm({
      nombre: a.nombre, tipo: a.tipo,
      metros_cuadrados: a.metros_cuadrados,
      cantidad_muebles: a.cantidad_muebles || 0,
      estado: a.estado
    });
    setErrores({});
    setModal("edit");
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar este ambiente?")) return;
    fetch(`http://localhost/backend/api/ambientes.php?id=${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => setAmbientes(prev => prev.filter(a => a.id !== id)))
      .catch(err => console.error(err));
  };

  const handleSubmit = () => {
    const e = validar();
    if (Object.keys(e).length > 0) { setErrores(e); return; }

    const payload = {
      nombre:           form.nombre.trim(),
      tipo:             form.tipo,
      metros_cuadrados: Number(form.metros_cuadrados),
      cantidad_muebles: Number(form.cantidad_muebles) || 0,
      estado:           form.estado
    };

    if (modal === "add") {
      fetch("http://localhost/backend/api/ambientes.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(data => {
          setAmbientes(prev => [...prev, { ...payload, id: data.id ?? Date.now() }]);
          setModal(null);
        })
        .catch(err => console.error("Error en POST:", err));
    } else {
      fetch(`http://localhost/backend/api/ambientes.php?id=${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(() => {
          setAmbientes(prev => prev.map(a =>
            a.id === selected.id ? { ...a, ...payload } : a
          ));
          setModal(null);
        })
        .catch(err => console.error("Error en PUT:", err));
    }
  };

  return (
    <>
      {modal && (
        <Modal
          title={modal === "add" ? "Nuevo Ambiente" : "Editar Ambiente"}
          onClose={() => setModal(null)}
        >
          <Field label="Nombre">
            <input
              style={{ ...inputStyle, borderColor: errores.nombre ? "#A24632" : "#E8DDD0" }}
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
            {errores.nombre && <div style={{ color: "#A24632", fontSize: 11, marginTop: 4 }}>{errores.nombre}</div>}
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Tipo">
              <select style={inputStyle} value={form.tipo}
                onChange={e => setForm({ ...form, tipo: e.target.value })}>
                {tiposAmbiente.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Estado">
              <select style={inputStyle} value={form.estado}
                onChange={e => setForm({ ...form, estado: e.target.value })}>
                {estados.map(e => <option key={e}>{e}</option>)}
              </select>
            </Field>
            <Field label="Metros cuadrados">
              <input
                style={{ ...inputStyle, borderColor: errores.metros_cuadrados ? "#A24632" : "#E8DDD0" }}
                type="number" value={form.metros_cuadrados}
                onChange={e => setForm({ ...form, metros_cuadrados: e.target.value })}
              />
              {errores.metros_cuadrados && <div style={{ color: "#A24632", fontSize: 11, marginTop: 4 }}>{errores.metros_cuadrados}</div>}
            </Field>
            <Field label="Cantidad de muebles">
              <input style={inputStyle} type="number" value={form.cantidad_muebles}
                onChange={e => setForm({ ...form, cantidad_muebles: e.target.value })} />
            </Field>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
            <button className="btn btn-outline" onClick={() => setModal(null)}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {modal === "add" ? "Agregar" : "Guardar cambios"}
            </button>
          </div>
        </Modal>
      )}

      <div className="page-header">
        <div>
          <div className="page-title">Gestión de <em>Ambientes</em></div>
          <div className="page-subtitle">{ambientesFiltrados.length} espacios registrados</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline" onClick={() => navigate("/")}>← Inicio</button>
          <button className="btn btn-primary" onClick={openAdd}>+ Nuevo ambiente</button>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          {filters.map(f => (
            <div
              key={f}
              className="filter-chip"
              onClick={() => setFiltroActivo(f)}
              style={{
                background: filtroActivo === f ? "#4A3728" : "white",
                color:      filtroActivo === f ? "#F7F3EE" : "#8B7355",
                borderColor: filtroActivo === f ? "#4A3728" : "#E8DDD0"
              }}
            >{f}</div>
          ))}
        </div>

        <div className="rooms-grid">
          {ambientesFiltrados.map(a => {
            const config = roomEmojis[a.tipo] || { emoji: "🏠", bg: "#E2E8F0" };
            return (
              <div key={a.id} className="room-card">
                <div className="room-card-img" style={{ background: config.bg }}>
                  <span style={{ fontSize: 48 }}>{config.emoji}</span>
                  <div className={`room-card-badge ${statusClass[a.estado] || ""}`}>{a.estado}</div>
                </div>
                <div className="room-card-body">
                  <div className="room-card-name">{a.nombre}</div>
                  <div className="room-card-type">{a.tipo}</div>
                  <div className="room-card-info">
                    <div className="info-item"><strong>{a.metros_cuadrados} m²</strong>Superficie</div>
                    <div className="info-item"><strong>{a.cantidad_muebles || 0}</strong>Muebles</div>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                      <button className="btn-action" title="Editar"    onClick={() => openEdit(a)}>✏️</button>
                      <button className="btn-action" title="Eliminar"  onClick={() => handleDelete(a.id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="room-card add-card" onClick={openAdd}>
            <div style={{ textAlign: "center", color: "#C4B5A5" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>＋</div>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Nuevo ambiente</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobiliarioPage({ muebles, setMuebles }) {
  const navigate = useNavigate();

  const [modal,        setModal]        = useState(null);
  const [selected,     setSelected]     = useState(null);
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [errores,      setErrores]      = useState({});

  const [form, setForm] = useState({
    nombre: "", categoria: "Asientos", ambiente: "", material: "", precio: ""
  });

  const categorias = ["Asientos", "Mesas", "Dormitorio", "Almacenamiento", "Oficina", "Iluminación", "Decoración"];
  const filters    = ["Todos", ...categorias];

  const mueblesFiltrados = filtroActivo === "Todos"
    ? muebles
    : muebles.filter(m => m.categoria === filtroActivo);

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.precio)        e.precio = "El precio es obligatorio";
    return e;
  };

  const openAdd = () => {
    setForm({ nombre: "", categoria: "Asientos", ambiente: "", material: "", precio: "" });
    setErrores({});
    setModal("add");
  };

  const openEdit = (m) => {
    setSelected(m);
    setForm({ nombre: m.nombre, categoria: m.categoria, ambiente: m.ambiente, material: m.material, precio: m.precio });
    setErrores({});
    setModal("edit");
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar este mueble?")) return;
    fetch(`http://localhost/backend/api/mobiliario.php?id=${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => setMuebles(prev => prev.filter(m => m.id !== id)))
      .catch(err => console.error(err));
  };

  const handleSubmit = () => {
    const e = validar();
    if (Object.keys(e).length > 0) { setErrores(e); return; }

    const payload = { ...form, precio: Number(form.precio) };

    if (modal === "add") {
      fetch("http://localhost/backend/api/mobiliario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(data => {
          setMuebles(prev => [...prev, { ...payload, id: data.id ?? Date.now() }]);
          setModal(null);
        })
        .catch(err => console.error("Error en POST:", err));
    } else {
      fetch(`http://localhost/backend/api/mobiliario.php?id=${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(() => {
          setMuebles(prev => prev.map(m =>
            m.id === selected.id ? { ...m, ...payload } : m
          ));
          setModal(null);
        })
        .catch(err => console.error("Error en PUT:", err));
    }
  };

  return (
    <>
      {modal && (
        <Modal
          title={modal === "add" ? "Nuevo Mueble" : "Editar Mueble"}
          onClose={() => setModal(null)}
        >
          <Field label="Nombre">
            <input
              style={{ ...inputStyle, borderColor: errores.nombre ? "#A24632" : "#E8DDD0" }}
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
            {errores.nombre && <div style={{ color: "#A24632", fontSize: 11, marginTop: 4 }}>{errores.nombre}</div>}
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Categoría">
              <select style={inputStyle} value={form.categoria}
                onChange={e => setForm({ ...form, categoria: e.target.value })}>
                {categorias.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Material">
              <input style={inputStyle} value={form.material}
                onChange={e => setForm({ ...form, material: e.target.value })} />
            </Field>
            <Field label="Ambiente">
              <input style={inputStyle} value={form.ambiente}
                onChange={e => setForm({ ...form, ambiente: e.target.value })} />
            </Field>
            <Field label="Precio (ARS)">
              <input
                style={{ ...inputStyle, borderColor: errores.precio ? "#A24632" : "#E8DDD0" }}
                type="number" value={form.precio}
                onChange={e => setForm({ ...form, precio: e.target.value })}
              />
              {errores.precio && <div style={{ color: "#A24632", fontSize: 11, marginTop: 4 }}>{errores.precio}</div>}
            </Field>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
            <button className="btn btn-outline" onClick={() => setModal(null)}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {modal === "add" ? "Agregar" : "Guardar cambios"}
            </button>
          </div>
        </Modal>
      )}

      <div className="page-header">
        <div>
          <div className="page-title">Gestión de <em>Mobiliario</em></div>
          <div className="page-subtitle">{mueblesFiltrados.length} elementos registrados</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline" onClick={() => navigate("/")}>← Inicio</button>
          <button className="btn btn-primary" onClick={openAdd}>+ Nuevo mueble</button>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          {filters.map(f => (
            <div
              key={f}
              className="filter-chip"
              onClick={() => setFiltroActivo(f)}
              style={{
                background:  filtroActivo === f ? "#4A3728" : "white",
                color:       filtroActivo === f ? "#F7F3EE" : "#8B7355",
                borderColor: filtroActivo === f ? "#4A3728" : "#E8DDD0"
              }}
            >{f}</div>
          ))}
        </div>

        <div className="muebles-grid">
          {mueblesFiltrados.map(m => {
            const emoji = muebleEmojis[m.categoria] || "🪑";
            return (
              <div key={m.id} className="mueble-card">
                <div className="mueble-img">{emoji}</div>
                <div className="mueble-body">
                  <div className="mueble-name">{m.nombre}</div>
                  <div className="mueble-cat">{m.categoria}</div>
                  <div style={{ marginTop: 8 }}>
                    <span className="tag tag-wood">{m.material}</span>
                  </div>
                  <div className="mueble-footer">
                    <div className="mueble-price">
                      $ {parseFloat(m.precio).toLocaleString("es-AR")}<span> ARS</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-action" title="Editar"   onClick={() => openEdit(m)}>✏️</button>
                      <button className="btn-action" title="Eliminar" onClick={() => handleDelete(m.id)}>🗑️</button>
                    </div>
                  </div>
                  <div className="mueble-room" style={{ marginTop: 6 }}>📍 {m.ambiente}</div>
                </div>
              </div>
            );
          })}

          <div className="mueble-card add-card" onClick={openAdd}>
            <div style={{ textAlign: "center", color: "#C4B5A5" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>＋</div>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Nuevo mueble</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}