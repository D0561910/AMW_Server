import "regenerator-runtime/runtime";
import admin from "../config/firebase.config";

var userItem = [];

admin.database().ref("/users").once("value", async function (snapshot) {
    var newPost = await snapshot.val();
    for (let index in newPost) {
        userItem.push({
            id: newPost[index].id,
            name: newPost[index].name,
            password: newPost[index].password,
        });
    }
});

function findUser(name, password) {
    return userItem.find(function (item) {
        return item.name === name && item.password === password;
    });
}

export default findUser;