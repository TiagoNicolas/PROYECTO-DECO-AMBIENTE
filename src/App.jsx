import { useState, useEffect } from "react";
import "./App.css";

const ambientes = [
  { id: 1, emoji: "🛋️", name: "Living Principal",      type: "Sala de Estar", bg: "#F2EAE0", m2: "28", muebles: 8, palette: ["#C4704F","#8A9E8A","#BFA060","#4A3728"], status: "progress" },
  { id: 2, emoji: "🍽️", name: "Comedor Familiar",      type: "Comedor",       bg: "#E8EFF0", m2: "18", muebles: 5, palette: ["#2C3E50","#E8DDD0","#BFA060"], status: "done"},
  { id: 3, emoji: "🛏️", name: "Dormitorio Principal",  type: "Dormitorio",    bg: "#F0EAF2", m2: "22", muebles: 7, palette: ["#7C5C7C","#E8DDD0","#C4B5A5"], status: "plan" },
  { id: 4, emoji: "🛁", name: "Baño Suite",             type: "Baño",          bg: "#E8F2EE", m2: "9",  muebles: 4, palette: ["#4A7C69","#E8DDD0","#C4B5A5"], status: "done" },
  { id: 5, emoji: "📚", name: "Estudio / Biblioteca",   type: "Estudio",       bg: "#F2EDE8", m2: "14", muebles: 6, palette: ["#8B7355","#4A3728","#BFA060"], status: "progress" },
  { id: 6, emoji: "🍳", name: "Cocina Abierta",         type: "Cocina",        bg: "#F2F0E8", m2: "20", muebles: 9, palette: ["#5C5C3C","#E8DDD0","#BFA060"], status: "plan" },
];

const muebles = [
  { id: 1, emoji: "🛋️", name: "Sofá Chesterfield",   cat: "Asientos",   price: "280.000", room: "Living Principal",     material: "Fabric", tag: "tag-fabric" },
  { id: 2, emoji: "🪑", name: "Butaca Bergère",       cat: "Asientos",     price: "95.000",  room: "Estudio / Biblioteca", material: "Madera",  tag: "tag-wood"   },
  { id: 3, emoji: "🛏️", name: "Cama King Platform",  cat: "Dormitorio",      price: "320.000", room: "Dormitorio Principal", material: "Madera",   tag: "tag-wood"   },
  { id: 4, emoji: "🪞", name: "Espejo Veneciano",     cat: "Decoración", price: "45.000",  room: "Comedor Familiar",     material: "Vidrio",  tag: "tag-glass"  },
  { id: 5, emoji: "🗄️", name: "Aparador Art Déco",   cat: "Almacenamiento",  price: "180.000", room: "Comedor Familiar",     material: "Madera", tag: "tag-wood"   },
  { id: 6, emoji: "💡", name: "Lámpara de Piso",      cat: "Iluminación",     price: "28.000",  room: "Living Principal",     material: "Metal", tag: "tag-metal"  },
  { id: 7, emoji: "🪴", name: "Macetero Cerámico",   cat: "Decoración", price: "8.500",   room: "Varios",    material: "Cerámica", tag: "tag-fabric" },
  { id: 8, emoji: "📚", name: "Biblioteca Modular",   cat: "Almacenamiento",  price: "220.000", room: "Estudio / Biblioteca", material: "Madera", tag: "tag-wood"   },
  { id: 9, emoji: "🪟", name: "Mesa de Centro",       cat: "Mesas",  price: "68.000",  room: "Living Principal",     material: "Vidrio+Metal", tag: "tag-glass"  },
];

const palettes = [
  { name: "Toscana Cálida",       colors: ["#C4704F","#8A9E8A","#BFA060","#4A3728","#E8DDD0"] },
  { name: "Nordic Sereno",        colors: ["#7EAFC4","#C4B5A5","#4A5C6B","#E8DDD0","#F7F3EE"] },
  { name: "Medianoche Botánica",  colors: ["#2C3E2D","#8A9E8A","#C4B5A5","#BFA060","#E8DDD0"] },
  { name: "Art Déco Clásico",     colors: ["#2C2C2C","#BFA060","#C4B5A5","#7C5C2C","#E8DDD0"] },
];

const statusLabel = { progress: "En progreso", done: "Finalizado", plan: "Planificado" };
const statusClass  = { progress: "status-progress", done: "status-done", plan: "status-plan" };

export default function App() {
  const [page, setPage] = useState("home");

  const navItems = [
    { id: "home", label: "Inicio", icon: "🏠" },
    { id: "ambientes",  label: "Ambientes",icon: "🛋️" },
    { id: "mobiliario", label: "Mobiliario", icon: "🪑" },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="brand">Mi Decorador<span>de Ambientes</span></div>
          <div className="team-badge">Grupo 10</div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Módulos</div>
          {navItems.map(item => (
            <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
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
  {page === "home" && <HomePage setPage={setPage} />}
  {page === "ambientes" && <AmbientesPage />}
  {page === "mobiliario" && <MobiliarioPage />}
</main>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Bienvenido, <em>Tiago</em></div>
          <div className="page-subtitle">Martes 26 de Mayo, 2026 · {ambientes.length} ambientes en total</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">Ver todo</button>
          <button className="btn btn-primary">+ Nuevo espacio</button>
        </div>
      </div>

      <div className="page-content">
        <div className="home-hero">
          <div className="hero-eyebrow">✦ Proyecto destacado</div>
          <div className="hero-title">Rediseño del <em>Living</em><br />Principal</div>
          <div className="hero-desc">
            Transformá cada rincón de tu hogar con paletas de color cuidadosamente
            seleccionadas y mobiliario que refleja tu style.
          </div>
          <div className="hero-cta">
            <button className="btn-hero">Continuar proyecto</button>
            <button className="btn-hero-ghost">Ver inspiración</button>
          </div>
        </div>

        <div className="stats-row">
          {[
            { v: ambientes.length.toString(), l: "Ambientes",  t: "Actualizado activo" },
            { v: "9",   l: "Elementos",  t: "3 pendientes"       },
            { v: "4",   l: "Paletas",    t: "1 activa"           },
            { v: "72%", l: "Completado", t: "↑ 8% esta semana"  },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value">{s.v}</div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-trend">{s.t}</div>
            </div>
          ))}
        </div>

        <div className="home-grid">
          <div>
            <div className="section-title">Espacios <em>recientes</em></div>
            <div className="recent-list">
              {ambientes.slice(0, 4).map(a => (
                <div key={a.id} className="recent-item">
                  <div className="room-thumb" style={{ background: a.bg }}>{a.emoji}</div>
                  <div className="recent-info">
                    <div className="room-name">{a.name}</div>
                    <div className="room-meta">{a.type} · {a.m2} m²</div>
                  </div>
                  <div className={`recent-status ${statusClass[a.status]}`}>{statusLabel[a.status]}</div>
                </div>
              ))}
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
            <button className="btn btn-outline" onClick={() => {}}>Ver todos</button>
          </div>
          <div className="rooms-grid">
            {ambientes.map(a => (
              <div key={a.id} className="room-card">
                <div className="room-card-img" style={{ background: a.bg }}>
                  <span style={{ fontSize: 52 }}>{a.emoji}</span>
                  <div className={`room-card-badge ${statusClass[a.status]}`}>{statusLabel[a.status]}</div>
                </div>
                <div className="room-card-body">
                  <div className="room-card-name">{a.name}</div>
                  <div className="room-card-type">{a.type}</div>
                  <div className="room-card-info">
                    <div className="info-item"><strong>{a.m2} m²</strong>Superficie</div>
                    <div className="info-item"><strong>{a.muebles}</strong>Elementos</div>
                  </div>
                  <div className="room-palette">
                    {a.palette.map((c, i) => <div key={i} className="mini-swatch" style={{ background: c }} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <div className="section-header-row">
            <div className="section-title">Elementos de <em>Mobiliario</em></div>
            <button className="btn btn-outline">Ver todos</button>
          </div>
          <div className="muebles-grid">
            {muebles.map(m => (
              <div key={m.id} className="mueble-card">
                <div className="mueble-img">{m.emoji}</div>
                <div className="mueble-body">
                  <div className="mueble-name">{m.name}</div>
                  <div className="mueble-cat">{m.cat}</div>
                  <div style={{ marginTop: 8 }}>
                    <span className={`tag ${m.tag}`}>{m.material}</span>
                  </div>
                  <div className="mueble-footer">
                    <div className="mueble-price">$ {m.price}<span> ARS</span></div>
                    <div className="mueble-room">📍 {m.room}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function AmbientesPage() {
  const [ambientes, setAmbientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/ambientes")
      .then((res) => res.json())
      .then((data) => setAmbientes(data))
      .catch((err) => console.error(err));
  }, []);

  const filters = ["Todos", "Sala de Estar", "Dormitorio", "Comedor"];

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">
            Gestión de <em>Ambientes</em>
          </div>

          <div className="page-subtitle">
            {ambientes.length} espacios registrados
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          {filters.map((f) => (
            <div key={f} className="filter-chip">
              {f}
            </div>
          ))}
        </div>

        <div className="rooms-grid">
          {ambientes.map((a) => (
            <div key={a.id} className="room-card">
              <div className="room-card-body">
                <div className="room-card-name">
                  {a.nombre}
                </div>

                <div className="room-card-type">
                  {a.tipo}
                </div>

                <div className="room-card-info">
                  <div className="info-item">
                    <strong>{a.metros_cuadrados} m²</strong>
                    <div>Superficie</div>
                  </div>

                  <div className="info-item">
                    <strong>{a.cantidad_muebles}</strong>
                    <div>Muebles</div>
                  </div>

                  <div className="info-item">
                    <strong>{a.estado}</strong>
                    <div>Estado</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


function MobiliarioPage() {
  const [muebles, setMuebles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/mobiliario")
      .then((res) => res.json())
      .then((data) => setMuebles(data))
      .catch((err) => console.error(err));
  }, []);

  const filters = ["Todos", "Asientos", "Mesas"];

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Gestión de <em>Mobiliario</em></div>
          <div className="page-subtitle">{muebles.length} elementos registrados</div>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          {filters.map(f => (
            <div key={f} className="filter-chip">{f}</div>
          ))}
        </div>

        <div className="muebles-grid">
          {muebles.map(m => (
            <div key={m.id} className="mueble-card">
              <div className="mueble-body">
                <div className="mueble-name">{m.nombre}</div>

                <div className="mueble-cat">
                  {m.categoria}
                </div>

                <div style={{ marginTop: 8 }}>
                  {m.material}
                </div>

                <div className="mueble-footer">
                  <div className="mueble-price">
                    $ {m.precio}
                  </div>

                  <div className="mueble-room">
                    📍 {m.ambiente}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}