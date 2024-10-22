export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.145744 lng: 127.325 }
    this.id = new Date().toString() + Math.random().toString();
  }
}
