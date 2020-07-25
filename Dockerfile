FROM blorenz/python-buster-node
ADD package.json /home/docker/code/
ADD requirements.txt /home/docker/code/
WORKDIR /home/docker/code
RUN ls
RUN pip install -r requirements.txt
CMD bash
COPY run.sh /usr/bin/
