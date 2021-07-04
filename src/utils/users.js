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

addUser({
    id: 1,
    username: "Yousuf",
    room: "test"
})

console.log(users);

// const res = addUser({
//     id: 12,
//     username: "Yousuf",
//     room: "  test"
// })

// console.log(res);

const removedUser = removeUser(1);

console.log(removedUser)
console.log(users);