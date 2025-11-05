# Étape 1: L'image de base
FROM python:3.11-slim

# Étape 2: Définir le répertoire de travail
WORKDIR /app

# Étape 3: Copier les fichiers de notre projet
COPY requirements.txt requirements.txt
COPY app.py app.py

# Étape 4: Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Étape 5: Définir les variables d'environnement
# Informe l'extérieur que notre app écoute sur le port 8080.
# (La variable PORT est lue par notre app.py)
ENV PORT=8080
EXPOSE 8080

# Étape 6: Le point d'entrée
# Lance l'application avec le serveur de développement Flask
CMD ["python", "app.py"]