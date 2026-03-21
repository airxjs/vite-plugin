import * as airx from 'airx'
import { App } from './App'

airx.createApp(airx.createElement(App, { name: 'Airx' })).mount(
  document.getElementById('root')!
)
