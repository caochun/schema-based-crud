import React, {useState, Fragment} from 'react'
import {AdvancedForm} from './components/AdvancedForm'
import UserTable from './components/tables/UserTable'

const App = () => {
    // Data
    const usersData = [
        {id: 1, name: 'Tania', username: 'floppydiskette'},
        {id: 2, name: 'Craig', username: 'siliconeidolon'},
        {id: 3, name: 'Ben', username: 'benisphere'},
    ]

    // const [formValues, setFormValues] = useState(usersData)


    const handleSubmit = async (values, {setSubmitting}) => {
        setSubmitting(true)
        // setFormValues(values)
        await new Promise((r) => setTimeout(r, 1000))
        setSubmitting(false)
    }


    const formSchema = [
        {name: 'id', label: 'ID', componentType: 'text', required: true},
        {name: 'name', label: 'Name', componentType: 'text', required: true},
        {name: 'username', label: 'Username', componentType: 'text', required: true}
    ]


    const initialFormState = {id: 0, name: '', username: ''}

    // Setting state
    const [users, setUsers] = useState(usersData)
    const [currentUser, setCurrentUser] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    // CRUD operations
    const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const deleteUser = id => {
        setEditing(false)

        setUsers(users.filter(user => user.id !== id))
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)

        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = user => {
        setEditing(true)

        setCurrentUser({id: user.id, name: user.name, username: user.username})
    }

    return (
        <div className="container">
            <h1>CRUD App</h1>
            <div className="flex-row">
                <div className="flex-large">

                    {editing ? (
                        <Fragment>
                            <h2>Edit user</h2>

                            <AdvancedForm schema={formSchema} onSubmit={handleSubmit} initialValues={currentUser}/>

                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Add user</h2>
                            <AdvancedForm schema={formSchema} onSubmit={handleSubmit} initialValues={initialFormState}/>
                        </Fragment>
                    )}
                </div>
                <div className="flex-large">
                    <h2>View users</h2>
                    <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>
                </div>
            </div>
        </div>
    )
}

export default App
