import Home from 'page/home';
import React from 'react';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

const App: React.FC = () => {
  return (
    <div style={{width: "100%"}}>
      <ConfigProvider locale={ptBR}>
      <Home />
      </ConfigProvider>
    </div>
  );
};

export default App;
