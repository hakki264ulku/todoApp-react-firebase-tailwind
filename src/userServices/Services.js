import firebase from '../firebase'

const auth = firebase.auth()

// Register a user
const register = async (email, password) => {
    try {
        return await auth.createUserWithEmailAndPassword(email, password)
    } catch (e) {
        throw new Error(e.message)
    }
}

const login = async (email, password) => {
    try {
        return await auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
        throw new Error(e.message)
    }
}

const logout = async () => {
    try {
        return await auth.signOut()
    } catch (e) {
        throw new Error(e.message)
    }
}

const checkUserIsSignedIn = (props) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            // User is not signed in
            props.history.push('/entryDashboard')
        } else {
            // User is signed in
            props.history.push('/userToDoPage')
        }
    });
}

export {
    register,
    login,
    logout,
    checkUserIsSignedIn
}