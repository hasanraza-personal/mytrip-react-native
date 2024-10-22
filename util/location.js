const GOOGLE_API_KEY = "AIzaSyD35cYc1O_HUKoADKxX7VHUZZKeaeTk1PU";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  console.log("imagePreviewUrl: ", imagePreviewUrl);
  return imagePreviewUrl;
}
