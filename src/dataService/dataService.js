import firebase from '../firebase'

const db = firebase.firestore()
//Get Reference For 'Todos' collection with respect to user id 
const getRef = async () => {
    return await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                reject('please authenticate first')
            } else {
                resolve(db.collection('ToDos').doc(user.uid))
            }
        });
    })
}

const addTask = async (task) => {
    const ref = await getRef()

    // Transaction is used to update data without overwriting it
    return db.runTransaction(async function (transaction) {
        return transaction.get(ref).then(async function (doc) {
            if (!doc.exists) {
                await ref.set({ todos: [task] })
                // If no task has created yet, refresh the page after first addition to render the page succesfully
                window.location.reload(true);
            }

            var newToDo = (doc.data().todos).concat(task);
            transaction.update(ref, { todos: newToDo });
        });
    })
        .then(function () {
            console.log("Transaction successfully committed!");
        })
        .catch(function (error) {
            console.log("Transaction failed: ", error);
        });
}

const getTasks = async () => {
    try {
        const ref = await getRef()
        const tasks = await ref.get()
        if (!tasks) throw new Error('No task found')
        return tasks.data().todos

    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteTask = async (taskToDelete) => {
    const ref = await getRef()

    await ref.update({
        todos: firebase.firestore.FieldValue.arrayRemove(taskToDelete)
    })
}

const updateTask = async (taskToUpdate, newTask) => {
    const ref = await getRef()

    // Transaction is used to update data without overwriting it
    return db.runTransaction(function (transaction) {
        return transaction.get(ref).then(function (doc) {
            if (!doc.exists) {
                return false
            }

            var newToDo = (doc.data().todos).map(todo => {

                if (todo === taskToUpdate) return newTask
                else return todo

            })

            transaction.update(ref, { todos: newToDo });
        });
    })
        .then(function () {
            console.log("Transaction successfully committed!");
        })
        .catch(function (error) {
            console.log("Transaction failed: ", error);
        });
}

export {
    addTask,
    deleteTask,
    updateTask,
    getTasks
}