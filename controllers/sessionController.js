const allowedUsers = [{ username: 'tomas', password: 'leon' }]

const login = (req, res) => {
	if (req.session?.nombre) res.redirect(`/?username=${req.session?.nombre}`);
	else {
		const { username, password } = req.body;
		const user = getUser(username);
		if (user && user.password === password) {
			req.session.nombre = username;
			res.redirect(`/?username=${req.session?.nombre}`)
		} else 
			res.redirect('/?msj=Usuario o password incorrectos')
	}
}


const logout = (req, res) => {
	try {
		req.session.destroy();
		res.redirect('/');
	} catch (error) {
		res.send(500, ' ' + error);
	}
}

const loginPage = (req, res) => {
	res.render('login.handlebars')
}

const getUser = username => allowedUsers.find(user => user.username === username);

export const sessionController = { login, loginPage, logout }
