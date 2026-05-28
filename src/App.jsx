import React from 'react';
import './App.css';
import ephData from './data/eph_data.json';

export default function ActividadPobrezaLeyden() {
  const [ingresoMinimo, setIngresoMinimo] = React.useState(700000);
  const [dataLoaded, setDataLoaded] = React.useState(!!ephData?.hogares);

  // Metodología de Leyden:
  // 1. Y_min = ingreso mínimo que define el usuario
  // 2. Línea de pobreza de Leyden = Y_min * 0.74 (factor de Leyden)
  // 3. Una familia es pobre si IPCF_i < Y_min
  // 4. TPNP = (∑ PONDIH_i · Pobre_i) / ∑ PONDIH_i

  const lineaLeyden = ingresoMinimo * 0.74;

  // Calcular tasa de pobreza ponderada usando datos reales
  let tasaPobrezaPonderada = 0;
  let hogaresAnalisis = 0;
  
  if (dataLoaded && ephData?.hogares) {
    let pobressPonderados = 0;
    let pondihTotal = 0;

    ephData.hogares.forEach((hogar) => {
      // Solo contar hogares con IPCF > 0 (hogares con ingreso reportado)
      if (hogar.ipcf > 0) {
        hogaresAnalisis++;
        const esPobre = hogar.ipcf < ingresoMinimo ? 1 : 0;
        pobressPonderados += hogar.pondih * esPobre;
        pondihTotal += hogar.pondih;
      }
    });

    if (pondihTotal > 0) {
      tasaPobrezaPonderada = (pobressPonderados / pondihTotal) * 100;
    }
  }

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
                <strong>{tasaPobrezaPonderada.toFixed(1)}%</strong>
              </div>
              <div className="progress-track" aria-label="Tasa de pobreza estimada">
                <div className="progress-fill" style={{ width: `${tasaPobrezaPonderada}%` }} />
              </div>
              <p className="result-note">
                Tasa de pobreza ponderada calculada sobre {hogaresAnalisis.toLocaleString()} hogares
                de la Encuesta Permanente de Hogares (EPH) con ingresos reportados.
              </p>
            </div>
          </article>
        </section>

        <section className="info-card">
          <h3>¿Qué representa esta actividad?</h3>
          <p>
            La pobreza subjetiva mediante la metodología de Leyden busca comprender cómo las personas 
            perciben sus propias condiciones de vida. La línea de Leyden se construye multiplicando el 
            ingreso mínimo que considerás necesario por el factor 0.74, lo que permite estimar una 
            línea de pobreza subjetiva.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Esta actividad utiliza datos reales de la Encuesta Permanente de Hogares (EPH) de Argentina,
            comparando el ingreso per cápita familiar (IPCF) de cada hogar con tu línea de pobreza subjetiva
            y calculando una tasa de pobreza ponderada según el peso demográfico de cada hogar.
          </p>
        </section>

        <footer className="activity-footnote">
          Actividad educativa basada en la metodología de pobreza subjetiva de Leyden,
          utilizando datos reales de la Encuesta Permanente de Hogares (EPH) de Argentina.
        </footer>
      </main>
    </div>
  );
}
