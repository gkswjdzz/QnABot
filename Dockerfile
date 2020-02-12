
  
FROM rackspacedot/python37:latest

CMD ["bash"]

# Install Node.js 8 and npm 5
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
RUN apt install wget

RUN mkdir /workspace
WORKDIR /workspace

RUN mkdir /workspace/model
COPY model /workspace/model

COPY requirements.txt .
RUN pip install -r ./requirements.txt
RUN python -m spacy download en_core_web_md

COPY package.json .
RUN npm install

COPY server.py .
COPY server.js .
COPY modeling.py .
COPY infer.py .
COPY infer_utils.py .
COPY iq.py .

EXPOSE 80

RUN apt-get install -y supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord"]
