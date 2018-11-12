import App from 'next/app'

if (typeof window !== 'undefined') {
  require('aframe')
  require('aframe-react')
  require('aframe-event-set-component')
  require('aframe-star-system-component')
  require('aframe-animation-component')
}

export default App
