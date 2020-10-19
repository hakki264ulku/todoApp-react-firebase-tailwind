import React, { useEffect } from 'react';
import tw from 'twin.macro'
import 'twin.macro'
import { Link } from 'react-router-dom'

import firebase from '../firebase'

const EntryDashboard = (props) => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is not signed in
                props.history.push('/userToDoPage')
            }
        });
    }, [])

    return (
        <MainContainer>
            <H1>Welcome to 'TO DO APP'</H1>
            <Container>
                <Dashboard>
                    <Link to='/login'>
                        <Button>Login</Button>
                    </Link>
                    <Link to='/register'>
                        <Button>Register</Button>
                    </Link>
                </Dashboard>
            </Container>
        </MainContainer>
    )
}


const MainContainer = tw.div`flex flex-wrap w-screen h-screen justify-center bg-gray-200`
const H1 = tw.h1`font-bold text-xl sm:text-4xl text-blue-900 italic`
const Container = tw.div`flex w-full h-screen justify-center items-center bg-gray-200`

const Dashboard = tw.div`flex flex-wrap flex-col px-2`
const Button = tw.button`w-full text-white text-lg md:text-2xl font-bold bg-gray-500
            rounded-lg mb-1 focus:outline-none hover:text-gray-800 hover:shadow-2xl px-4 py-2 md:px-6 md:py-4`

export default EntryDashboard