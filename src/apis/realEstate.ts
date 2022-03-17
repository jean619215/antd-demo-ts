export async function requestReelEstatesData() {
    return fetch("/api/properties")
    .then((res) => res.json())
    .catch(error => console.error('Error:', error))
    .then((json) => {
      return json;
    })
}