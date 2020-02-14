var express = require("express"),
  cors = require("cors"),
  fs = require("fs"),
  request = require('request-promise-native')
var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
  origin: 'https://ainize.ai',
}))

var table = {}
const textdir = './texts/'

var txtfiles = fs.readdirSync(textdir, 'utf-8');
console.log(txtfiles)

for(let i = 0; i < txtfiles.length; i++){
  let txtfile = txtfiles[i]
  let filename = txtfile.substring(0, txtfile.lastIndexOf('.'))
  
  table[filename] = {
    'prev_a' : '',
    'prev_q' : '',
    'context' : '',
  }

  table[filename]['context'] = fs.readFileSync(textdir + txtfile, 'utf8')
}

//chatting
app.get('/chat', async function (req, res) {
  return new Promise(async (resolve, reject) => {
    const bot_id = req.query.bot_id
    const question = req.query.ques
    
    if(!(bot_id in table)){
      console.log(bot_id + ' is not exist')
      res.writeHead(400)
      res.end()
      return
    }
    console.log(bot_id, question)
    
    console.log('request from ' + bot_id + ', question is ' + question)
    const prev_q = table[bot_id]['prev_q']
    const prev_a = table[bot_id]['prev_a']
    const context = table[bot_id]['context']    

    // form data
    // python post arguments
    let postData = {
      prev_q : prev_q,
      prev_a : prev_a,
      context : context,
      question : question
    }
      
    // request option
    var options = {
      //python server
      url:'http://127.0.0.1:5000/chat',
      method: 'POST',
      form: postData
    };

    //request to python server 0.0.0.0:5000
    request(options, function (error, response, body) {
      // in addition to parsing the value, deal with possible errors
      if (error) return reject(error);
      try {
        console.log('answer is ')
        console.log(body)
        res.send(body)
        resolve(body)
      } catch(e) {
        reject(e);
        res.send(500);
      }
    })
    
  })
})
app.listen(80, () => {
  console.log("server connect")
})