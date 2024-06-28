import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Route from './route.jsx';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Route />
			<Toaster />
		</QueryClientProvider>
	</React.StrictMode>
);
