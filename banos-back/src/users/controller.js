
const {
    writeDocument,
    readDocument
} = require('./../services/firebase/firebaseStorage/firebaseStorage');

const admin = require('./../services/firebase/firebase');

const {
    emailValidation,
    nameValidation,
    passwordValidation
} = require('./../helpers/validations');

const { generateAccessToken } = require('./../helpers/token');

const { getAuth } = require('firebase-admin/auth')

async function login(req, res) {
    const { email, password } = req.body;
    getAuth()
        .getUserByEmail(email)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(userRecord);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });

}



async function signUp(req, res) {
    const { email, password, name } = req.body;
    const user = {
        email,
        password,
        name
    }

    if (emailValidation(email) && passwordValidation(password) && nameValidation(name)) {
        try {
            const userResponse = await admin.auth().createUser({
                email: user.email,
                password: user.password,
                emailVerified: false,
                disabled: false
            });
            let uid = userResponse.uid;
            let accessToken = generateAccessToken(uid);

            await writeDocument({ name }, 'users', uid)

            res.status(200).header('authorization', accessToken).send({ code: 200, token: accessToken });
        } catch (err) {
            const { code } = err;
            if (code === 'auth/email-already-exists') {
                res.status(400).send({ error: 400, message: "El usuario ya se encuentra registrado" });
            } else if (code === 'auth/invalid-password') {
                res.status(400).send({ error: 400, message: "La contraseña no cumple con los parametros minimos de seguridad" });
            } else if (code === 'auth/internal-error') {
                res.status(500).send({ error: 500, message: "Error interno del servidor" })
            }
        }
    } else {
        res.status(400).send({ error: 400, message: "datos no validos" });
    }

}





module.exports = {
    signUp,
    login,

}

// const {
//     getAuth,
//     createUserWithEmailAndPassword,
// } = require('firebase/auth');
// const {
//     getAuth: getAdminAuth,
// } = require('firebase-admin/auth');
// const firestore = require('firebase-admin').firestore();

// async function register(req, res) {
//     const { email, password, secureNote } = req.body;
//     if (!secureNote) {
//         res
//             .status(400)
//             .json({ error: { code: 'no-secure-note' } });
//         return;
//     }

//     try {
//         const auth = getAuth();
//         const credential = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );
//         const adminAuth = getAdminAuth();
//         const token = await adminAuth.createCustomToken(
//             credential.user.uid
//         );
//         await firestore
//             .doc(`users/${credential.user.uid}`)
//             .set({ secureNote });
//         res.status(201).json({ token });
//     } catch (err) {
//         const { code } = err;
//         if (code === 'auth/email-already-in-use') {
//             res.status(400);
//         } else {
//             res.status(500);
//         }
//         res.json({
//             error: {
//                 code: code ? code.replace('auth/', '') : undefined,
//             },
//         });
//     }
// }

// module.exports = {register};