FROM python:3.12-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

#Portfreigabe für den Docker
EXPOSE 5000

CMD ["flask", "--app", "monsters", "run", "--host=0.0.0.0", "--debug"]