// src/redux/store.ts
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';


interface AuthState {
  user: { id: string; username: string; email: string; } | null;
  tempVerificationCode: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  user: null,
  tempVerificationCode: null, 
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState = initialAuthState, action: any): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload.user, tempVerificationCode: null };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, isAuthenticated: false, user: null, error: action.payload };
    case 'LOGOUT':
      return { ...initialAuthState };
    case 'SET_TEMP_VERIFICATION_CODE':
      return { ...state, tempVerificationCode: action.payload };
    case 'CLEAR_TEMP_VERIFICATION_CODE':
        return { ...state, tempVerificationCode: null };
    default:
      return state;
  }
};

// --- Root Reducer ---
const rootReducer = combineReducers({
  auth: authReducer,
});

// --- Store Configuration ---
const middleware = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const setTempVerificationCode = (code: string) => ({
  type: 'SET_TEMP_VERIFICATION_CODE',
  payload: code,
});

export const clearTempVerificationCode = () => ({
    type: 'CLEAR_TEMP_VERIFICATION_CODE',
});

export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await new Promise(resolve => setTimeout(() => {
      if (username === 'test' && password === 'password123') {
        resolve({ user: { id: '1', username: 'test', email: 'test@example.com' }, token: 'mock-jwt-token' });
      } else {
        throw new Error('Invalid credentials');
      }
    }, 500));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: (response as any).user } });
  } catch (error: any) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};