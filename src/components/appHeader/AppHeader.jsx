import './appHeader.scss';

const AppHeader = () => {
	return (
		<header className='app__header'>
			<h1 className='app__title'>
				<a href='#' alt='link'>
					<span>Marvel</span> information portal
				</a>
			</h1>
			<nav className='app__menu'>
				<ul>
					<li>
						<a href='#' alt='link'>
							Characters
						</a>
					</li>
					/
					<li>
						<a href='#' alt='link'>
							Comics
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;
