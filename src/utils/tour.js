import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function startGuidedTour(onTourComplete) {
  let completed = false;

  const triggerCompletion = () => {
    if (!completed) {
      completed = true;
      if (onTourComplete) {
        setTimeout(() => {
          onTourComplete();
        }, 300);
      }
    }
  };

  const driverObj = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    overlayColor: 'rgba(3, 4, 10, 0.92)',
    stagePadding: 12,
    stageRadius: 20,
    nextBtnText: 'Siguiente →',
    prevBtnText: '← Atrás',
    doneBtnText: '¡Entendido! ✓',
    onDestroyed: () => {
      triggerCompletion();
    },
    steps: [
      {
        element: '#tour-brand',
        popover: {
          title: '✦ BIENVENIDO A EL CASILLERO',
          description: 'Plataforma oficial para organizar, filtrar y exportar tu colección de Espíritus de Fortnite Override y Runners (Gen 1 y 2).',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#tour-gen-switcher',
        popover: {
          title: '⚡ GENERACIÓN 1 Y 2',
          description: 'Alterna instantáneamente entre la Generación 2 (Override) y la Generación 1 (Runners) para gestionar tus casilleros.',
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '#tour-sprite-grid',
        popover: {
          title: '🎯 SELECCIÓN DE ESTADO (1-TAP)',
          description: 'Toca cualquier tarjeta de espíritu para alternar su estado en secuencia: 0 (No tengo) ➔ 1 (Tengo - Verde Esmeralda) ➔ 2 (Dominado - Dorado) ➔ 3 (Faltante - Carmesí).',
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '#tour-counters',
        popover: {
          title: '👁 VISITAS Y 📸 EXPORTACIONES',
          description: 'Consulta en tiempo real el número de visitas únicas y la cantidad de capturas en alta definición exportadas por la comunidad.',
          side: 'bottom',
          align: 'end'
        }
      },
      {
        element: '#tour-audio-player',
        popover: {
          title: '🎵 MÚSICA CHILL DE FONDO',
          description: 'Disfruta de música lofi súper ambiental al 5% de volumen. Puedes pausar, cambiar de canción o silenciar cuando quieras.',
          side: 'left',
          align: 'end'
        }
      },
      {
        element: '#tour-download-btn',
        popover: {
          title: '⬇ EXPORTAR CAPTURA PNG HD',
          description: 'Genera una imagen en alta definición con tu colección formateada con marca de agua oficial para compartir en redes sociales.',
          side: 'bottom',
          align: 'end'
        }
      }
    ]
  });

  driverObj.drive();
}
