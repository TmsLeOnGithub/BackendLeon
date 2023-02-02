import { UsersDao } from "../db/index.js";
import os from 'os';
import { sendMail } from "../segundaEntrega/sendMailer.js";
const numCPUs = os.cpus().length;

const signup = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send({ success: false });

    const existUser = await UsersDao.getOne({ email });

    if (existUser && existUser.password) {
      return res.render({ success: false, error: "el usuario ya existe" });//////
    }

    if (existUser && !existUser.password) {
      const updateUser = await UsersDao.updateById(existUser._id, {
        ...existUser,
        password,
      });
      return res.send({ success: true });
    }

    // PASSWORD! podriamos usar bcrypt!

    sendMail({
      from: 'florencio.moore73@ethereal.email', 
      to: email, 
      subject: 'Nuevo registro',
      html: `<h1 style="color: blue;"> Nuevo usuario registrado. <span style="color: green;"> Email: ${email}</span></h1>`
    })

    await UsersDao.save({ email, password });

    res.send({ success: true });
  } catch (error) {
    console.log(error);

    res.send({ success: false });
  }
};



const login = (req, res) => {
  if (req.user) {
    res.redirect(`/?username=${req.user.email}`)
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

const signupPage = (req, res) => {
  res.render('signup.handlebars')
}

const errorSignupPage = (req, res) => {
  res.render('error-signup.handlebars')
}

const errorLoginPage = (req, res) => {
  res.render('faillogin.handlebars')
}

const infoPage = (req, res) => {///////////////////////////
  const processData = {
    cwd: process.cwd(),
    pid: process.pid,
    version: process.version,
    title: process.title,
    platform: process.platform,
    numCPUs: numCPUs,
    memoryUsage: process.memoryUsage.rss()
  }

  // console.log(processData);

  res.render('info.handlebars', { processData })///////////////////////////////////////////
}


export const sessionController = { login, loginPage, logout, signup, signupPage, errorSignupPage, errorLoginPage, infoPage }
