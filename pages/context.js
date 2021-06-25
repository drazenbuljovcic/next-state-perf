import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';

import { useUserState, withUser } from '../src/context';
import { QueryClient, QueryClientProvider } from 'react-query';

const Context = () => {
    const state = useUserState();
    return (
        <pre>{JSON.stringify(state, null, 2)}</pre>
    )
};

const ConnectedContext = withUser(Context);

const queryClient = new QueryClient();
const Page = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={styles.container}>
            <Head>
                <title>Next perf - context</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                Context!
                </h1>
                <ConnectedContext />
            </main>
            </div>
        </QueryClientProvider>
    )
};

export default Page;
