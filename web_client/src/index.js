import React from 'react';
import ReactDOM from 'react-dom';
import Leaflet from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css/animate.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/montserrat/index.css';
import './assets/app.global.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';

// @NOTE: hack, might not be required in later versions of leaflet.
delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
