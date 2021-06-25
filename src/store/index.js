import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { put } from 'redux-saga/effects';

const initialState = { user: { id: '1' } };
const composeEnhancer =
  // eslint-disable-next-line @typescript-eslint/dot-notation
  global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const reducer = (state = initialState, action) => {
    console.log({ action, state})
    switch (action.type) {
        case 'ADD_AGE': {
            return { ...state, age: action.payload.age };
        }
        default: {
            return { ...state };
        }
    }
};

function* saga() {
    const res = yield fetch('/api/user');
    const json = yield res.json();
    console.log({ json })
    yield put({ type: 'ADD_AGE', payload: json });
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = composeEnhancer(applyMiddleware(sagaMiddleware));
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(saga);
    return store;
};

export const store = configureStore();

console.log(store.getState());
