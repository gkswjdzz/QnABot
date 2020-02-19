# QnABOT

[![Run on Ainize](https://ainize-dev.herokuapp.com/static/images/run_on_ainize_button.svg)](https://ainize-dev.web.app/redirect?git_repo=github.com/gkswjdzz/qnabot)

## Installation

	pretrained_model : https://drive.google.com/file/d/15HOJmRizBrgoPPVDHKpvSO2tNf0k-d8f/view?usp=sharing

<!--After download pretrained_model, put them model folder
If you want to run api server with gpu, change name of Dockerfile-gpu to Dockerfile.-->

	docker build -t qnabot -f Dockerfile-cpu .
	docker build -t qnabot -f Dockerfile-gpu .

### Run Docker

	docker run -p 80:80 -t qnabot