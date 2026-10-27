/**
 * Tło map (mapa obserwacji i wybór miejsca w formularzu): ciemny styl OpenFreeMap.
 * Darmowe, bez klucza i bez limitu, wolno go używać komercyjnie (https://openfreemap.org).
 * Wektorowe kafelki rysuje MapLibre GL, a Leaflet zostaje do znaczników i dymków.
 * Biblioteki ładują się dopiero, gdy na stronie jest mapa.
 */
import type * as Leaflet from 'leaflet';

export const BASEMAP_STYLE = 'https://tiles.openfreemap.org/styles/dark';

export async function addBasemap(map: Leaflet.Map) {
  await import('maplibre-gl/dist/maplibre-gl.css');
  const { maplibreGL } = await import('@maplibre/maplibre-gl-leaflet');
  // atrybucja (OpenFreeMap, OpenMapTiles, OpenStreetMap) jest w stylu – wtyczka dopisze ją sama
  return maplibreGL({ style: BASEMAP_STYLE }).addTo(map);
}
