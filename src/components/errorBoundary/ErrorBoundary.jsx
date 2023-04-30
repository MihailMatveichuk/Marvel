import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ErrorBoundary = (props) => {
	const [error, setError] = useState(false);
	try {
		if (error) {
			return <ErrorMessage />;
		}

		return props.children;
	} catch (error) {
		setError(true);
	}
};

export default ErrorBoundary;
