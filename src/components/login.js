import React, { useState } from 'react';
import tw from 'twin.macro'
import 'twin.macro'

import {login} from '../userServices/Services'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        
        try {
            const result = await login(email, password)
            props.history.push('/UserToDoPage')
        } catch (e) {
            alert(e.message) 
        }
    }

    return (
        <Container>
            <H2>Login Page of TODO APP</H2>

            <Form onSubmit={(e)=>onSubmitHandler(e)}>
                <Span>Email</Span>
                <Input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} type='text'/>
                
                <Span>Password</Span>
                <Input placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} type='password'/>
                <Button>Login</Button>
            </Form>
                <Button onClick={()=>props.history.push('/register')}>Register Page</Button>
        </Container>
    )
}

const Container = tw.div`flex flex-col bg-gray-300 w-screen h-screen justify-center items-center`
const H2 = tw.h2`font-bold text-lg sm:text-2xl md:text-3xl text-blue-900 mb-2 md:mb-8 `

const Form = tw.form`flex flex-col w-2/3 sm:w-1/3`
const Span = tw.span`font-bold text-gray-900 mb-1`
const Input = tw.input`py-2 px-1 rounded mb-2 sm:mb-4 focus:outline-none`
const Button = tw.button`p-1 sm:px-2 sm:py-2 mt-2 font-bold text-base sm:text-xl rounded border-orange-300 text-gray-800 hover:shadow-xl hover:text-gray-900 focus:outline-none`

export default Login