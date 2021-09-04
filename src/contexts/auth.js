import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('systemUser')
    
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoadingAuth(false)
            }
    
            setLoading(false)
        }

        loadStorage()
    }, [])

    async function signIn(email, password)
    {
        setLoadingAuth(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid
            
            const dataProfile = await firebase.firestore().collection('users').doc(uid).get()

            let data = {
                uid: uid,
                nome: dataProfile.data().nome,
                avatarUrl: dataProfile.data().avatarUrl,
                email: dataProfile.data().email
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false)
            toast.success('Bem vindo!!')
        })
        .catch((error) => {
            console.log(error)
            toast.error('Algo deu errado')
            setLoadingAuth(false)
        })
    }

    async function signUp(name, email, password) 
    {
        setLoadingAuth(true)

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users').doc(uid)
            .set({
                name: name,
                avatarUrl: null
            }).then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false)
                toast.success('Bem vindo a plataforma')
            })
        }).catch((error) => {
            console.log(error)
            toast.error('Algo deu errado')
            setLoadingAuth(false)
        })
    }

    function storageUser(data)
    {
        localStorage.setItem('systemUser', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider 
        value={{ 
            signed: !!user, 
            user,
            loading,
            signUp,
            signIn,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;