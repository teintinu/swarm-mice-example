// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import Swarm, { Client, base64 } from 'swarm-browser'
import { Provider } from 'swarm-react'

import App from './components/App'

const  app = window.app = {}
app.id = window.localStorage.getItem('localuser') || 'A' + base64.int2base((Math.random() * 10000) | 0)
window.localStorage.setItem('localuser', app.id)

// server host uri
app.wsServerUri = 'ws://localhost:8000'
app.hash = window.location.hash || '#0';
app.ssn = app.id.match(/A([\w~_]+)/)[1] // FIXME ugly
app.ssnInt = base64.base2int(app.ssn)

app.swarm = new Client({
  db_id: 'mice',
  ssn_id: app.ssn,
  // prefix: true,
  connect: app.wsServerUri,
  callback: start
})

function start() {
  app.mouse = app.swarm.get('/Model#' + app.id)
  app.mouse.onInit(() => {
    app.mouse.set({
      x:100+(0|(Math.random()*100)),
      y:100+(0|(Math.random()*100)),
      symbol: String.fromCharCode(10000+app.ssnInt%60) // dingbats
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
    <Provider swarm={app.swarm.host}>
      <App mice={app.mice} mouse={app.mouse} />
    </Provider>,
    document.getElementById('app')
  )
}
