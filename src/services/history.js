import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const historyForceRefresh = createBrowserHistory({ forceRefresh: true });

export { history, historyForceRefresh };
