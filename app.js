// app.js
document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let currentMarker = null;
    let antipodeMarker = null;
    let inputLocationMarker = null;
    let inputAntipodeMarker = null;

    const showCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            currentMarker = L.marker([lat, lng]).addTo(map)
                .bindPopup('You are here')
                .openPopup();
            map.setView([lat, lng], 17);

            document.getElementById('currentLocation').textContent = `Current Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }, error => {
            alert('Unable to retrieve your location');
        });
    };

    const showAntipodeLocation = () => {
        if (currentMarker) {
            const lat = currentMarker.getLatLng().lat;
            const lng = currentMarker.getLatLng().lng;
            const antipodeLat = -lat;
            const antipodeLng = lng > 0 ? lng - 180 : lng + 180;

            if (antipodeMarker) {
                map.removeLayer(antipodeMarker);
            }
            antipodeMarker = L.marker([antipodeLat, antipodeLng]).addTo(map)
                .bindPopup('Opposite Location')
                .openPopup();
            map.setView([antipodeLat, antipodeLng], 17);

            document.getElementById('oppositeLocation').textContent = `Opposite Location: ${antipodeLat.toFixed(6)}, ${antipodeLng.toFixed(6)}`;
        } else {
            alert('Current location is not set.');
        }
    };

    const showInputLocation = () => {
        const lat = parseFloat(document.getElementById('latInput').value);
        const lng = parseFloat(document.getElementById('lngInput').value);

        if (!isNaN(lat) && !isNaN(lng)) {
            if (inputLocationMarker) {
                map.removeLayer(inputLocationMarker);
            }
            inputLocationMarker = L.marker([lat, lng]).addTo(map)
                .bindPopup('Input Location')
                .openPopup();
            map.setView([lat, lng], 13);

            document.getElementById('inputLocation').textContent = `Input Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

            const antipodeLat = -lat;
            const antipodeLng = lng > 0 ? lng - 180 : lng + 180;

            if (inputAntipodeMarker) {
                map.removeLayer(inputAntipodeMarker);
            }
            inputAntipodeMarker = L.marker([antipodeLat, antipodeLng]).addTo(map)
                .bindPopup('Opposite Location')
                .openPopup();
            map.setView([antipodeLat, antipodeLng], 17);

            document.getElementById('inputAntipode').textContent = `Input Opposite Location: ${antipodeLat.toFixed(6)}, ${antipodeLng.toFixed(6)}`;
        } else {
            alert('Please enter valid latitude and longitude values');
        }
    };

    document.getElementById('currentLocationBtn').addEventListener('click', showCurrentLocation);
    document.getElementById('oppositeLocationBtn').addEventListener('click', showAntipodeLocation);
    document.getElementById('showInputLocationBtn').addEventListener('click', showInputLocation);
});
