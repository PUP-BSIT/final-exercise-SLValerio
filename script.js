document.addEventListener("DOMContentLoaded", () => {
    const userNameInput = document.getElementById('user_name');
    const userCommentInput = document.getElementById('user_comment');
    const commentButton = document.getElementById('comment_button');
    const commentList = document.getElementById('comment_list');
    const displayCheckbox = document.getElementById('display_latest_checkbox');
    let commentsArray = [];

    function updateCommentList() {
        const displayLatest = displayCheckbox.checked;

        commentsArray.sort((a, b) =>
            displayLatest ? b.timestamp - a.timestamp :
                a.timestamp - b.timestamp
        );

        commentList.innerHTML = '';

        for (const comment of commentsArray) {
            const listComment = document.createElement('li');
            listComment.classList.add('comment-container');
            listComment.innerHTML = `${comment.userName}
                <p>${comment.userComment}</p>`;
            commentList.appendChild(listComment);
        }
    }

    commentButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const userComment = userCommentInput.value.trim();
        const timestamp = new Date();

        if (userName && userComment) {
            const comment = { userName, userComment, timestamp };
            commentsArray.push(comment);
            updateCommentList();
            userNameInput.value = '';
            userCommentInput.value = '';
        }
    });

    displayCheckbox.addEventListener('change', () => {
        updateCommentList();
    });

    updateCommentList();
});

document.getElementById("bgm").addEventListener("click", () => {
    const audio = document.getElementById("background_music");
    audio.play();
});

function toggleNav() {
    const navContainer = document.getElementById('navigation_container');
    const cloverLogo = document.getElementById('clover_logo');

    navContainer.classList.toggle('open');

    cloverLogo.style.left = navContainer.classList.contains('open') ?
        '190px' : '20px';

    if (!navContainer.classList.contains('open')) {
        navContainer.style.left = '-250px';
        return;
    }

    navContainer.style.left = '0';
}
