import { initializeApp } from
    'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getDatabase, ref, push, set, get, update, remove } from
    'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDV4JdW_zpKe2nXd2x4FR5YRsBbjMK6s4U",
  authDomain: "clover-0320.firebaseapp.com",
  databaseURL: "https://clover-0320-default-rtdb.firebaseio.com",
  projectId: "clover-0320",
  storageBucket: "clover-0320.appspot.com",
  messagingSenderId: "564028262077",
  appId: "1:564028262077:web:a8468a57b7a2d1bd3819d4",
  measurementId: "G-9S876VQ8Y2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
    fetchFriendshipList();
});

function fetchFriendshipList() {
    const friendsRef = ref(db, 'friends');
    get(friendsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const friends = data ? Object.values(data) : [];
                
                // Log the friends array for debugging
                console.log('Friends array:', friends);

                displayFriendshipList(friends);
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}


function displayFriendshipList(friends) {
    const tableBody = document.querySelector('#friend_table tbody');
    tableBody.innerHTML = '';

    friends.forEach(friend => {
        const row = tableBody.insertRow();
        const fieldsOrder = ['name', 'age', 'birthday', 'hobbies', 'love_language'];

        fieldsOrder.forEach(key => {
            const cell = row.insertCell();
            cell.innerHTML = friend[key];
        });

        // Add a data-id attribute to the row to store the id
        row.setAttribute('data-id', friend.id);

        const actionsCell = row.insertCell();
        actionsCell.innerHTML =
            `<button onclick="import('./script.js').
                then(module => module.editFriend('${friend.id}'))">
                    Edit</button>
            <button onclick="import('./script.js').
                then(module => module.deleteFriend('${friend.id}'))">
                    Delete</button>`;
    });
}

export function addToFriendshipList() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const birthday = document.getElementById('birthday').value;
    const hobbies = document.getElementById('hobbies').value;
    const loveLanguage = document.getElementById('love_language').value;

    if (!name || !age || !birthday || !hobbies || !loveLanguage) {
        alert('Please fill in all fields.');
        return;
    }

    const newFriendRef = push(ref(db, 'friends')).key;
    const newFriendId = newFriendRef;

    set(ref(db, `friends/${newFriendRef}`), {
        id: newFriendId,
        name: name,
        age: age,
        birthday: birthday,
        hobbies: hobbies,
        love_language: loveLanguage
    })
        .then(() => {
            alert('A New Friend Added Successfully!');
            fetchFriendshipList();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export function editFriend(id) {
    getFriendById(id).then(friend => {
        console.log('Friend details:', friend);

        if (!friend) {
            alert('Friend not found.');
            return;
        }

    const form = `
        <form id="edit_form">
            <label for="edit_name">Name:</label>
            <input type="text" id="edit_name" name="name"
                value="${friend.name}" required>

            <label for="edit_age">Age:</label>
            <input type="number" id="edit_age" name="age"
                value="${friend.age}" required>

            <label for="edit_birthday">Birthday:</label>
            <input type="date" id="edit_birthday" name="birthday"
                value="${friend.birthday}" required>

            <label for="edit_hobbies">Hobbies:</label>
            <input type="text" id="edit_hobbies" name="hobbies"
                value="${friend.hobbies}" required>

            <label for="edit_love_language">Love Language:</label>
            <select id="edit_love_language" name="love_language" required>
                <option value="Words of Affirmation">
                    Words of Affirmation</option>
                <option value="Acts of Service">Acts of Service</option>
                <option value="Giving Gifts">Giving Gifts</option>
                <option value="Quality Time">Quality Time</option>
                <option value="Physical Touch">Physical Touch</option>
            </select>
            <div id="popup_buttons">
                <button onclick="import('./script.js').
                    then(module => module.updateFriend('${friend.id}'))">
                        Update</button>
                <button onclick="import('./script.js').
                    then(module => module.cancelEdit())">Cancel</button>
            </div> 
        </form>
    `;
    
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = form;

    document.body.appendChild(popup);
});
}

export function cancelEdit() {
    closePopup();
}

export function updateFriend(id) {
    const name = document.getElementById('edit_name').value;
    const age = document.getElementById('edit_age').value;
    const birthday = document.getElementById('edit_birthday').value;
    const hobbies = document.getElementById('edit_hobbies').value;
    const loveLanguage = document.getElementById('edit_love_language').value;

    if (!name || !age || !birthday || !hobbies || !loveLanguage) {
        alert('Please fill in all fields.');
        return;
    }

    const data = {
        id: id,
        name: name,
        age: age,
        birthday: birthday,
        hobbies: hobbies,
        love_language: loveLanguage
    };

    update(ref(db, `friends/${id}`), data)
        .then(() => {
            alert('Friend Updated Successfully!');
            fetchFriendshipList();
            closePopup();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

export function getFriendById(id) {
    return get(ref(db, 'friends'))
        .then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                return Object.values(data).find(friend => friend.id === id);
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}

export function deleteFriend(id) {
    console.log('Deleting friend with ID:', id);

    const confirmDelete = confirm('Are you sure you want to delete this?');

    if (confirmDelete) {
        remove(ref(db, `friends/${id}`))
            .then(() => {
                alert('Deleted Successfully!');
                fetchFriendshipList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
