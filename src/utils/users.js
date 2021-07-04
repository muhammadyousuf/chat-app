const users = [];

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();
    if (!username || !room) {
        return {
            'error': "username and room are required"
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if (existingUser) {
        return {
            'error': "Username is in use!"
        }
    }

    const user = { id, username, room };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

// addUser({
//     id: 1,
//     username: "Yousuf",
//     room: "test"
// })

// addUser({
//     id: 2,
//     username: "Muhammad Yousuf",
//     room: "test"
// })

// addUser({
//     id: 3,
//     username: "Yousuf",
//     room: "test2"
// })

// const user = getUser(2);
// console.log(user)

// const userList = getUsersInRoom("test")
// console.log(userList)

//console.log(users);

// const res = addUser({
//     id: 12,
//     username: "Yousuf",
//     room: "  test"
// })

// console.log(res);

// const removedUser = removeUser(1);

// console.log(removedUser)
// console.log(users);