import os
import glob

from flask import Flask, request, render_template, make_response
from flask import send_file,session,jsonify
import string
import random
from infer import *

app = Flask(__name__,template_folder='static')

textfiles = {}
for textfile in glob.glob('./texts/*.txt'):
	filename = os.path.basename(textfile).split('.')[0]
	textfiles[filename] = open(textfile).read()

@app.route('/chat',methods=['GET'])
def chat():
	bot_id = request.args.get('bot_id', '')
	if bot_id == None:
	    return make_response('bot_id not found!', 500)

	context = textfiles.get(bot_id, '')
	
	question = request.args.get('question', '')
	if question == None:
		return make_response('question not found!', 500)
	
	answer = iq.predict(context, question, '', '')

	print('question : ' + question)
	return jsonify(
        answer=answer,
        okay=('true' if answer != 'unknown' else 'false'),
        question=question
    )


iq = InferCoQA('model')
print('done loading model ..')

app.run(host='0.0.0.0', port=80, debug=True) 