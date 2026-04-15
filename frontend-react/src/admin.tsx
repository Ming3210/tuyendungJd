import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './AdminApp'
import './index.css'
import { ConfigProvider, App as AntdApp } from 'antd'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#bc2228',
          },
        }}
      >
        <AntdApp>
          <AdminApp />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
