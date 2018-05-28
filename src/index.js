import dva from 'dva';
import './index.css';
import router from './router';

// 1. Initialize
const app = dva({
  // history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/HomePage'));
app.model(require('./models/maintainRecord'));
app.model(require('./models/deviceManagement'));
app.model(require('./models/EPatrol'));
app.model(require('./models/loginModels'));
app.model(require('./models/Evaluation'));
app.model(require('./models/DcCheckLine/DcCheckLine'));
app.model(require('./models/WxBindModels'));
// 4. Router
app.router(router);

// 5. Start
app.start('#root');
