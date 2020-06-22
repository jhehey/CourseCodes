// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { alertActions } from '../redux/actions';

// import { HomePage } from './landing';

// // TODO: Dito icheck kung sino ung user na authenticated
// function App({ alert, paError }) {
// 	useEffect(() => {
// 		paError('Tite mo error');
// 	}, [paError]);

// 	return (
// 		<div className="App">
// 			{alert && console.log('ALERT TITE', alert)}
// 			<HomePage />
// 		</div>
// 	);
// }

// const mapStateToProps = (state) => ({
// 	alert: state.alert,
// });

// const mapDispatchToProps = (dispatch) => ({
// 	paError: (message) => {
// 		dispatch(alertActions.error(message));
// 	},
// });

// const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
// export { connectedApp as App };

import React from 'react';
import { HomePage } from './landing';
import { AlertPopup } from './common';

import { useDispatch } from 'react-redux';
import { alertActions } from '../redux/actions';

// TODO: Dito icheck kung sino ung user na authenticated
export const App = () => {
	const dispatch = useDispatch();

	const ayNaclick = (e) => {
		dispatch(alertActions.error({ message: 'tite', vertical: 'bottom' }));
	};

	const ayNaclickYungIsa = (e) => {
		dispatch(alertActions.success({ message: 'pepe', vertical: 'top' }));
	};

	return (
		<div className="App">
			<AlertPopup />
			<HomePage />
			<button onClick={ayNaclick}>click mo nga sige ano ha</button>
			<button onClick={ayNaclickYungIsa}>click mo nga ulet ako yamete</button>
		</div>
	);
};
