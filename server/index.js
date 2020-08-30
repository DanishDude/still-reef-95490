const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const FormData = require('form-data');
const logger = require('morgan');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
}

app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/api', (req, res) => {
  try {
    return res.status(200).send({Title: 'Still Reef !'});
  } catch (err) {
    return res.status(500).send({msg: 'something went wrong'});
  }
});

app.post('/api/oauth', (req, res) => {
  const { client_id, redirect_uri, client_secret, code } = req.body;
  const data = new FormData();
  data.append('client_id', client_id);
  data.append('redirect_uri', redirect_uri);
  data.append('client_secret', client_secret);
  data.append('code', code);

  const options = {
    method: 'POST',
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: data
  };

  let token = '';

  fetch(`https://github.com/login/oauth/access_token`, options)
    .then(res => res.text())
    .then(paramsString => {
      const params = new URLSearchParams(paramsString);
      const access_token = params.get('access_token');
      const scope = params.get('scope');
      const token_type = params.get('token_type');

      token = access_token;
      return fetch(`https://api.github.com/user?access_token=${access_token}&scope=${scope}&token_type=${token_type}`);
    })
    .then(res => res.json())
    .then(user => {
      return res.status(200).json({token, ...user});
    })
    .catch(error => {
      return res.status(400).json(error);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
