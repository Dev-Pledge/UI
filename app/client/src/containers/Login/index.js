import loadable from 'loadable-components';

import { ErrorDisplay, Loading } from '../../components';

export default loadable(() => import('./Login'), {
  ErrorComponent: ErrorDisplay,
  LoadingComponent: Loading
});
