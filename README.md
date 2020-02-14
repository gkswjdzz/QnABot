# QnABOT

## Installation

	pretrained_model : https://drive.google.com/file/d/15HOJmRizBrgoPPVDHKpvSO2tNf0k-d8f/view?usp=sharing

After download pretrained_model, put them model folder
If you want to run api server with gpu, change name of Dockerfile-gpu to Dockerfile.

	docker build -t qnabot .

### Run Docker

	docker run -p 80:80 -t qnabot