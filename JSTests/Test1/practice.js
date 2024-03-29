// You are given a users database in the form of an objects' Array.
// Complete the function definition of 'updateUsers' function to perform the following tasks:

// 1 - Create user if does not exist, add orders if any and return users
// 2 - Create and Initialize order's array if it does not exist and add first order and return users
// 3 - Add order to existing order's array and return users
// 4 - If the item is already ordered return { msg: "Already ordered!" }


// Sample Input:
// Input is handled for you

// Sample Output:
// Output is handled for you


let users = [
    {
        name: "Rajneesh",
        age: 34,
        address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
        },
        orders: [{ id: 1, name: "GOT Book Series" }],
    },
    {
        name: "Bhavesh",
        age: 37,
        address: {
            local: "48 DT Row",
            city: "Hyderabad",
            state: "AP",
        },
    },
    {
        name: "Jasbir",
        age: 38,
        address: {
            local: "196 Lama Bhavan",
            city: "Gangtok",
            state: "Sikkim",
        },
        orders: [
            { id: 1, name: "Chair" },
            { id: 2, name: "PS5" },
        ],
    },
];

function updateUsers(users, userObject, item) {
    //write your code here
}