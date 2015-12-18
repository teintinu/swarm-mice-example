// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import localstorage from 'localstorage-down'
import levelup from 'levelup'
import { Provider } from 'swarm-react'
import { Client } from 'swarm-client'
import { base64 } from 'swarm-stamp'
import { Model, Set } from 'swarm-syncable'

import App from './components/App'

const  app = window.app = {}
app.id = window.localStorage.getItem('localuser') || 'A' + base64.int2base((Math.random() * 10000) | 0)
window.localStorage.setItem('localuser', app.id)

// server host uri
// app.wsServerUri = 'ws://' + window.location.host
app.wsServerUri = 'ws://localhost:1337'
const hash = window.location.hash || '#0';
const ssn = app.id.match(/A([\w~_]+)/)[1] // FIXME ugly
const ssnInt = base64.base2int(ssn)

app.swarm = new Client({
  db_id: app.id + hash.replace('#', '~'),
  ssn_id: ssn,
  db: levelup('swarm', { db: localstorage }),
  connect:'ws://localhost:1337'
})

app.mouse = app.swarm.get('/Model#' + app.id)
app.mouse.onInit(() => {
  app.mouse.set({
    x:100+(0|(Math.random()*100)),
    y:100+(0|(Math.random()*100)),
    symbol: String.fromCharCode(10000+ssnInt%60) // dingbats
  })
})

app.mice = app.swarm.get('/Set#mice')
app.mice.onInit(() => {
  app.mice.add(app.mouse)
})

window.onbeforeunload = (e) => {
  app.mice.remove(app.mouse)
  app.swarm.close()
}

render(
  <Provider swarm={app.swarm.host()}>
    <App spec='/Set#mice'/>
  </Provider>,
  document.getElementById('app')
)
