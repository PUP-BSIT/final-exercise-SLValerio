const backEnd = "https://valerio18.likha.website/api.php";

document.addEventListener('DOMContentLoaded', function () {
    fetchFriendshipList();
});

function fetchFriendshipList() {
    fetch(backEnd)
        .then(response => response.json())
        .then(data => displayFriendshipList(data));
}

function displayFriendshipList(friends) {
    const tableBody = document.querySelector('#friend_table tbody');
    tableBody.innerHTML = '';

    friends.forEach(friend => {
        const row = tableBody.insertRow();
        for (const key in friend) {
            if (key !== 'id') {
                const cell = row.insertCell();
                cell.innerHTML = friend[key];
            }
        }

        const actionsCell = row.insertCell();
        actionsCell.innerHTML =
            `<button onclick="editFriend(${friend.id})">Edit</button>
             <button onclick="deleteFriend(${friend.id})">Delete</button>`;
    });
}

function addToFriendshipList() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const birthday = document.getElementById('birthday').value;
    const hobbies = document.getElementById('hobbies').value;
    const loveLanguage = document.getElementById('love_language').value;

    if (!name || !age || !birthday || !hobbies || !loveLanguage) {
        alert('Please fill in all fields.');
        return;
    }

    const data = {
        name: name,
        age: age,
        birthday: birthday,
        hobbies: hobbies,
        love_language: loveLanguage
    };

    fetch(backEnd, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchFriendshipList();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function editFriend(id) {
    const friend = await getFriendById(id);

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
                <button type="button" onclick=
                    "updateFriend(${friend.id})">Update</button>
                <button type="button" onclick="cancelEdit()">Cancel</button>
            </div> 
        </form>
    `;

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = form;

    document.body.appendChild(popup);
}

function cancelEdit() {
    closePopup();
}

function updateFriend(id) {
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

    fetch(backEnd, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Updated Successfully!');
            fetchFriendshipList();
            closePopup();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

function getFriendById(id) {
    return fetch(backEnd)
        .then(response => response.json())
        .then(data => data.find(friend => friend.id == id))
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}


function deleteFriend(id) {
    const confirmDelete = confirm('Are you sure you want to delete this?');

    if (confirmDelete) {
        fetch(backEnd, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchFriendshipList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
