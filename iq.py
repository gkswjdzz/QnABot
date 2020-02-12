
import sys
import io

text_trap = io.StringIO()
sys.stdout = text_trap
sys.stderr = text_trap

from infer import * 

iq = InferCoQA('model')
answer = iq.predict(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4])
sys.stdout = sys.__stdout__
print(answer)