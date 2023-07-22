# Use an appropriate Python + Django base image
FROM python:3.9

WORKDIR /app

# Copy the Django app files to the container
COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

# Grant execute permissions to the entrypoint script
RUN chmod +x ./entrypoint.sh

# Set the entry point to the script
ENTRYPOINT ["./entrypoint.sh"]
