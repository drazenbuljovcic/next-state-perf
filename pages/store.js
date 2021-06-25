import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { connect, Provider } from 'react-redux';
import { store } from '../src/store/index'

const Store = (props = {}) => {
  console.log({ props })
  return (
    <>
      <h2>Store:</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
};
const ConnectedStore = connect(state => state, {})(Store);

const Home = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Head>
          <title>Next perf - store</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <ConnectedStore />
        </main>
      </div>
    </Provider>
  )
};

export default Home;


