/// <reference types="react-scripts" />
declare namespace NodeJS {
	interface ProcessEnv {
      		NODE_ENV: 'development' | 'production' | 'test';
            REACT_APP_API_ADDRESS: string;
            REACT_APP_GOOGLE_CLIENT_ID: string;
	}
}