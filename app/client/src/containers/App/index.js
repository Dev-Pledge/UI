/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import 'bootstrap/scss/bootstrap-grid.scss';

import config from '../../config';
// Import your global styles here
// import '../../../node_modules/normalize.css/normalize.css';
import Navbar from '../../components/Navbar';
import styles from './styles.scss';

type Props = { route: Object };

export default ({ route }: Props) => (
  <div className={styles.App}>
    <Helmet {...config.app} />
    <div className={styles.header}>
      <div className={styles['container-fluid']}>
        <div className={styles.row}>
          <div className={styles['col-6']}>
            <img
              src={require('./assets/dp-test-logo.svg')}
              alt="Logo"
              role="presentation"
            />
            <p>DevPledge</p>
          </div>
          <div className={styles['col-6']}>
            <Navbar />
          </div>
        </div>
      </div>
    </div>
    <hr />
    {/* child routes won't render without this */}
    <div className={styles['content-wrapper']}>
      {renderRoutes(route.routes)}
    </div>
  </div>
);
