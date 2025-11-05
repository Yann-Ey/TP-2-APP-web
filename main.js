// S'assure que le script s'exécute une fois la page chargée
document.addEventListener('DOMContentLoaded', () => {

    // L'URL de notre passerelle APIM, configurée à l'étape 2
    const apiUrl = '/v1/hello';

    // L'élément HTML où nous afficherons la réponse
    const responseDiv = document.getElementById('api-response');

    // Utilisation de 'fetch' pour appeler notre API
    fetch(apiUrl)
        .then(response => {
            // Vérifie si la requête a réussi
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            // Convertit la réponse en JSON
            return response.json();
        })
        .then(data => {
            // Met à jour la page avec le message de l'API
            responseDiv.textContent = `Message de l'API : "${data.message}"`;
        })
        .catch(error => {
            // Affiche un message d'erreur si l'appel échoue
            console.error("Erreur lors de l'appel à l'API:", error);
            responseDiv.textContent = "Impossible de contacter l'API. (Vérifiez la console)";
            responseDiv.style.color = 'red';
        });

});