FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .

#https://stackoverflow.com/questions/59554493/unable-to-fire-a-docker-build-for-django-and-mysql
RUN apt-get update
RUN apt-get install python3-dev default-libmysqlclient-dev gcc -y

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
