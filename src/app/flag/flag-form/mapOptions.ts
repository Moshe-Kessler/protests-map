const mapOptions: google.maps.MapOptions = {
  mapTypeId: 'roadmap',
  zoomControl: true,
  scrollwheel: true,
  zoom: 11,
  disableDoubleClickZoom: false,
  maxZoom: 32,
  minZoom: -4,
  disableDefaultUI: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
  fullscreenControl: false,
};

export default mapOptions;
