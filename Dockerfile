#Fichier docker d'installation du serveur

#effacer toutes les images : docker rmi $(docker images -a -q)
#effacer tous les containers : docker rm  $(docker ps -a -f status=exited -q)

#install docker :
#sudo curl -sSL get.docker.com | sh
#systemctl start docker
#systemctl enable --now docker
#configurer le firewall via cockpit aver ouverture des port pour mongoDB & 6800
#pour fedora 31 : https://linuxconfig.org/how-to-install-docker-on-fedora-31
#dnf install -y grubby && grubby --update-kernel=ALL --args="systemd.unified_cgroup_hierarchy=0" && reboot

#renouvellement des certificats
#désactiver le parefeu puis
#certbot certonly --standalone --email hhoareau@gmail.com -d server.f80lab.com
#cp /etc/letsencrypt/live/server.f80lab.com/* /root/certs

#Ouverture des ports : firewall-cmd --zone=public --add-port=2222/tcp

#fabrication: docker build -t f80hub/nftstoreview . & docker push f80hub/nftstoreview:latest
#installation: docker rm -f nftstoreview && docker pull f80hub/nftstoreview:latest
#démarrage prod :
#docker rm -f nftstoreview && docker pull f80hub/nftstoreview && docker run --restart=always -v /root/certs:/certs -p 2222:2222 --name nftstoreview -d f80hub/nftstoreview:latest python3 app.py 2222 ssl


FROM python:3.9.0-buster

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt $APP_HOME/
RUN pip3 -v install -r requirements.txt

RUN export PATH="$HOME/.local/bin:$PATH"

WORKDIR /

RUN mkdir temp
RUN mkdir static
VOLUME /certs

COPY *.py $APP_HOME/

CMD ["python3", "app.py","2222","ssl"]
