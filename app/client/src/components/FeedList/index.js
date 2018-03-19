/* @flow */

import React from 'react';

import styles from './styles.scss';

type Props = { list: Array<Object> };

export default ({ list }: Props) => (
  <div className={styles.FeedList}>
    <div className={styles['title-bar']}>
      <h4>Your Feed</h4>
    </div>
    <div className={styles.row}>
      {list.map(item => (
        <div key={item.id} className={styles['col-12']}>
          <div data-foo="bar" className={styles['feed-item']}>
            <div>{item.problem}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
