
const { writeDocument, readDocument } = require('./../services/firebase/firebaseStorage/firebaseStorage');
const { emailValidation, nameValidation, passwordValidation } = require('./../helpers/validations');
const { generateAccessToken } = require('./../helpers/token');
const { encrypt, compare } = require('./../helpers/encrypt');
const { userDuplicateVerification } = require('./../services/firebase/authFirebase/AuthFirebase');
const admin = require('./../services/firebase/firebase');

async function login(req, res) {
    const { email, password } = req.body;
    const collection = "users";
    const docName = email;
    try {
        let userData = await readDocument(collection, docName);
        if (emailValidation(email) && passwordValidation(password) && (typeof userData != "undefined")) {
            let isPassword = await compare(password, userData.password);
            if (isPassword) {
                let accessToken = generateAccessToken(email);
                res.status(200)
                    .json({
                        code: 200,
                        message: "Usuario autenticado exitosamente",
                        token: accessToken,
                        TipoUsuario: userData.TipoUsuario
                    });

            } else {
                res.status(400).json({ code: 400, message: "Usuario o contraseña incorrectos" });
            }

        } else {
            res.status(404).json({ code: 404, message: "El usuario no se encuentra registrado" });
        }

    } catch (error) {
        res.status(500).json({ code: 500, message: "Se ha generado un error" })
    }

}

async function signUp(req, res) {
    const { email, password, name } = req.body;
    const collection = "users";
    const docName = email;

    try {
        if (emailValidation(email) && passwordValidation(password) && nameValidation(name)) {

            const encryptedPassword = await encrypt(password);
            const doc = {
                email,
                password: encryptedPassword,
                name,
                TipoUsuario: "usuario"
            }
            let userVerification = await userDuplicateVerification(collection, docName);

            if (userVerification) {
                await writeDocument(doc, collection, docName);
                let accessToken = generateAccessToken(email);
                res.status(200)
                    .json({
                        code: 200,
                        message: "Usuario registrado exitosamente",
                        token: accessToken
                    });

            } else {
                res.status(400).json({ code: 400, message: "El usuario ya se encuentra registrado" });
            }
        } else {
            res.status(400).json({ code: 400, message: "Datos no validos" })
        }
    } catch (error) {
        res.status(500).json({ code: 500, message: "Se ha generado un error" })
    }
}

async function recuperarContrasena(req, res) {
    const { password, email } = req.body;
    try {
        let user = await readDocument('users', email);
      
        const encryptedPassword = await encrypt(password);
        user['password'] = encryptedPassword;
        await writeDocument(user, 'users', email);
        res.status(200).json({ code: 200, message: "contraseña reestablecida" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "Error" });
    }
}


function tokenValidation(req, res) {

    try {
        res.status(200).json({ code: 200, message: 'Token valido', validate: true });
    } catch (error) {
        res.status(500).json({ code: 500, message: "Internal server error" });
    }
}



module.exports = {
    signUp,
    login,
    tokenValidation,
    recuperarContrasena
}


































// async function signUp(req, res) {
//     const { email, password, name } = req.body;
//     const user = {
//         email,
//         password,
//         name
//     }

//     if (emailValidation(email) && passwordValidation(password) && nameValidation(name)) {
//         try {
//             const userResponse = await admin.auth().createUser({
//                 email: user.email,
//                 password: user.password,
//                 emailVerified: false,
//                 disabled: false
//             });
//             let uid = userResponse.uid;
//             let accessToken = generateAccessToken(uid);

//             await writeDocument({ name }, 'users', uid)

//             res.status(200).header('authorization', accessToken).send({ code: 200, token: accessToken });
//         } catch (err) {
//             const { code } = err;
//             if (code === 'auth/email-already-exists') {
//                 res.status(400).send({ error: 400, message: "El usuario ya se encuentra registrado" });
//             } else if (code === 'auth/invalid-password') {
//                 res.status(400).send({ error: 400, message: "La contraseña no cumple con los parametros minimos de seguridad" });
//             } else if (code === 'auth/internal-error') {
//                 res.status(500).send({ error: 500, message: "Error interno del servidor" })
//             }
//         }
//     } else {
//         res.status(400).send({ error: 400, message: "datos no validos" });
//     }

// }




