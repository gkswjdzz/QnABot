from flask import Flask, request, render_template
from flask import send_file,session,jsonify
import string
import random
from infer import *

app = Flask(__name__,template_folder='static')

@app.route('/chat',methods=['GET', 'POST'])
def chat():
	print(request.form)
	if request.method == 'POST':
		context = request.form.get('context')
		question = request.form.get('question')
		prev_q = request.form.get('prev_q')
		prev_a = request.form.get('prev_a')
		answer = iq.predict(context,question,prev_q,prev_a)			
		return answer

SERVER = "0.0.0.0:5000"
iq = InferCoQA('model')
print('done loading model ..')

app.run(host='0.0.0.0', debug=True) # ssl_context=('cert.pem', 'key.pem'))