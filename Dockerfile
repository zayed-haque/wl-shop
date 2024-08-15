# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install core dependencies.
RUN apt-get update && apt-get install -y libpq-dev build-essential netcat-openbsd

# Install packages
RUN pip install --no-cache-dir -r requirements.txt || \
    (apt-get update && \
     apt-get install -y gcc libpq-dev && \
     pip install --no-cache-dir -r requirements.txt)

# Expose
EXPOSE 5000

# ENvironment variable
ENV FLASK_APP=wsgi.py
ENV FLASK_RUN_HOST=0.0.0.0

# Start script
RUN chmod +x /app/start.sh

# Run the start script when the container launches
CMD ["/app/start.sh"]