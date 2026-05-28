import React from 'react';
import './App.css';

export default function ActividadPobrezaLeyden() {
  const ingresosEPH = [
    180000, 220000, 250000, 280000, 320000, 350000, 390000, 420000,
    460000, 500000, 540000, 590000, 640000, 700000, 760000, 820000,
    900000, 980000, 1100000, 1250000, 1400000, 1600000, 1900000
  ];

  const [ingresoMinimo, setIngresoMinimo] = React.useState(700000);

  const lineaLeyden = ingresoMinimo * 0.74;
  const personasPobres = ingresosEPH.filter((ingreso) => ingreso < lineaLeyden).length;
  const tasaPobreza = (personasPobres / ingresosEPH.length) * 100;

  const formatoPesos = (valor) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  return (
    <div className="app-shell">
      <main className="activity-card">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Actividad interactiva</span>
            <h1>Lo que las cifras no muestran</h1>
            <p>
              Explorá cómo cambia la pobreza cuando las personas definen el
              ingreso mínimo necesario para no sentirse pobres. Ajustá el valor y
              observá la diferencia entre percepción y datos.
            </p>
          </div>
          <div className="hero-badge">
            <div className="badge-label">Pobreza subjetiva</div>
            <p>
              Un enfoque que toma en cuenta la percepción de las personas sobre
              lo necesario para vivir con dignidad.
            </p>
          </div>
        </section>

        <section className="panel-grid">
          <article className="panel panel-input">
            <div className="panel-heading">
              <h2>1. Ingreso mínimo subjetivo</h2>
              <p>
                Indicá cuánto dinero mensual considerás necesario para que una
                persona o hogar no sea pobre.
              </p>
            </div>

            <div className="control-group">
              <label htmlFor="ingresoMinimo">Monto mensual</label>
              <input
                id="ingresoMinimo"
                type="range"
                min="0"
                max="2200000"
                step="10000"
                value={ingresoMinimo}
                onChange={(e) => setIngresoMinimo(Number(e.target.value) || 0)}
                className="slider"
              />
              <input
                type="number"
                min="0"
                step="10000"
                value={ingresoMinimo}
                onChange={(e) => setIngresoMinimo(Number(e.target.value) || 0)}
                placeholder="Ej: 850000"
                className="number-input"
              />
            </div>

            <div className="summary-card">
              <span>Ingreso mínimo elegido</span>
              <strong>{formatoPesos(ingresoMinimo)}</strong>
            </div>
          </article>

          <article className="panel panel-results">
            <div className="result-card">
              <div className="result-header">
                <p>Línea de pobreza de Leyden</p>
                <strong>{formatoPesos(lineaLeyden)}</strong>
              </div>
              <p className="result-note">
                Estimación basada en la percepción subjetiva del ingreso mínimo
                necesario.
              </p>
            </div>

            <div className="result-card highlight-card">
              <div className="result-header">
                <p>Tasa de pobreza estimada</p>
                <strong>{tasaPobreza.toFixed(1)}%</strong>
              </div>
              <div className="progress-track" aria-label="Tasa de pobreza estimada">
                <div className="progress-fill" style={{ width: `${tasaPobreza}%` }} />
              </div>
              <p className="result-note">
                La estimación compara la línea subjetiva con una distribución
                simplificada de ingresos basada en la EPH nacional.
              </p>
            </div>
          </article>
        </section>

        <section className="info-card">
          <h3>¿Qué representa esta actividad?</h3>
          <p>
            La pobreza subjetiva busca comprender cómo las personas perciben sus
            propias condiciones de vida. A diferencia de la pobreza objetiva —que
            utiliza una canasta fija de bienes y servicios— el enfoque de Leyden
            incorpora percepciones sociales y expectativas sobre lo que significa
            “vivir dignamente”.
          </p>
        </section>

        <footer className="activity-footnote">
          Actividad educativa inspirada en la metodología de pobreza subjetiva de
          Leyden y datos de la Encuesta Permanente de Hogares (EPH) de Argentina.
        </footer>
      </main>
    </div>
  );
}
