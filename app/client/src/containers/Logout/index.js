import loadable from 'loadable-components';

import { ErrorDisplay, Loading } from '../../components';

export default loadable(() => import('./Logout'), {
  ErrorComponent: ErrorDisplay,
  LoadingComponent: Loading
});
