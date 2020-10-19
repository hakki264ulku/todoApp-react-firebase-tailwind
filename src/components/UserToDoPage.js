import React, { useState, useEffect } from 'react';
import tw from 'twin.macro'
import 'twin.macro'
import { v4 as uuid } from 'uuid';

import { logout } from '../userServices/Services'
import { checkUserIsSignedIn } from '../userServices/Services'
import { addTask, getTasks, deleteTask, updateTask } from '../dataService/dataService'



const UserToDoPage = (props) => {

    const [toDo, setToDo] = useState()
    const [tasks, setTasks] = useState([])

    //If user is not signed in, redirects to the entryDashboard
    useEffect(() => {
        checkUserIsSignedIn(props)
    }, [])

    useEffect(() => {

        async function fetchData() {
            try {
                const tsks = await getTasks()
                setTasks(tsks)
            } catch (e) {
                console.log(e.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {

        async function fetchData() {

            try {
                const tsks = await getTasks()
                setTasks(tsks)
            } catch (e) {
                console.log(e.message)
            }
        }
        fetchData()
    }, [tasks])


    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (tasks.includes(toDo)) {
            alert('The task is already in the list!')
            return
        }

        try {
            await addTask(toDo)
        } catch (e) {
            alert(e.message)            
        }

    }

    const handleDelete = async (taskToDelete) => {
        const response = await deleteTask(taskToDelete)
        console.log(response)
    }

    const handleUpdate = async (taskToUpdate) => {

        const newTask = prompt('Update the task: ', taskToUpdate)

        const response = await updateTask(taskToUpdate, newTask)
    }

    return (
        <MainContainer>
            <Button onClick={async () => {
                await logout()
                props.history.push('/entryDashboard')
            }}>signOut</Button>

            <Container>
                <H2>YOUR TO DO LIST</H2>

                <Form onSubmit={(e) => onSubmitHandler(e)}>
                    <Input placeholder='To Do...' value={toDo} onChange={(e) => setToDo(e.target.value)} />
                    <Button>add</Button>
                </Form>
                {
                   tasks.length === 0 ? <TODO>PLEASE WRITE A NOTE OR REFRESH THE PAGE</TODO> :
                    tasks.map(t => (
                    <ListContainer key={uuid()}>
                        <TODO>{t.toUpperCase()}</TODO>
                        <div>
                            <ButtonTODO onClick={() => handleDelete(t)}>X</ButtonTODO>
                            <ButtonTODO onClick={() => handleUpdate(t)}>Update</ButtonTODO>
                        </div>
                    </ListContainer>
                ))}
            </Container>
        </MainContainer>
    )
}

const MainContainer = tw.div`bg-gray-300 pt-2 sm:pt-4 w-screen h-screen`

const Container = tw.div`flex bg-gray-300 pt-8 flex-col justify-center items-center`
const H2 = tw.h2`font-bold text-xl sm:text-2xl md:text-4xl text-blue-900 mb-2 md:mb-8 `

const Form = tw.form``
const Input = tw.input`sm:py-2 font-bold text-gray-900 sm:px-1 rounded mb-2 sm:mb-4 focus:outline-none`
const Button = tw.button`sm:px-2 sm:py-1 ml-2 font-bold text-xs sm:text-lg rounded border-orange-300 text-gray-800 hover:shadow-xl hover:text-gray-900 focus:outline-none`

const ListContainer = tw.div`flex justify-between items-center w-2/3 mb-1 bg-gray-500 px-2 py-2 rounded-lg shadow-xl`
const TODO = tw.div`font-bold px-1 sm:px-4 py-1 rounded text-xs sm:text-base md:text-xl text-gray-900`
const ButtonTODO = tw.button`sm:px-2 sm:py-1 ml-1 sm:ml-2 font-bold text-xs sm:text-lg rounded border-orange-300 text-gray-800 hover:shadow hover:text-gray-900 focus:outline-none`


export default UserToDoPage