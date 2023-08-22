import ReactDOM from 'react-dom/client'
import { Suspense } from 'react'
import { Provider } from 'react-redux'

import { store } from './store'

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.json'
import 'bootstrap/dist/js/bootstrap.bundle'
import './i18n.js'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Suspense fallback="loading">
        <Provider store={store}>
            <App />
        </Provider>
    </Suspense>
)
