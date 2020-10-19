import React, { useState, useEffect } from 'react';
import tw from 'twin.macro'
import 'twin.macro'
import validator from 'validator'

import {register} from '../userServices/Services'

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if(password !== passwordVerify){
            alert('Passwords do not match!') 
            return
        }

        if(!validator.isEmail(email)){
            alert('Please enter a valid email!') 
            return
        }

        try {
            await register(email, password)
            props.history.push('/')
        } catch (e) {
            alert(e.message)            
        }
    }

    return (
        <Container>
            <H2>Register Page of TODO APP</H2>

            <Form onSubmit={(e)=>onSubmitHandler(e)}>
                <Span>Email</Span>
                <Input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} type='text'/>

                <Span>Password</Span>
                <Input placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} type='password'/>
                <Input placeholder='verify your password' value={passwordVerify} onChange={e=>setPasswordVerify(e.target.value)} type='password'/>
                <Button>Register</Button>
            </Form>
            <Button onClick={()=>props.history.push('/login')}>Login Page</Button>
        </Container>
    )
}

const Container = tw.div`flex flex-col pt-4 sm:pt-4 bg-gray-300 w-screen h-screen justify-center items-center`
const H2 = tw.h2`font-bold text-lg sm:text-2xl md:text-3xl text-blue-900 mb-2 md:mb-8 `

const Form = tw.form`flex flex-col pt-2`
const Span = tw.span`font-bold text-gray-900 mb-1`
const Input = tw.input`py-2 px-1 rounded mb-2 sm:mb-4 focus:outline-none`
const Button = tw.button`px-2 py-2 mt-2 font-bold text-lg rounded border-orange-300 text-gray-800 hover:shadow-xl hover:text-gray-900 focus:outline-none`

export default Register