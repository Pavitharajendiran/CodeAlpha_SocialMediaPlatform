const postsContainer = document.getElementById("posts");

function loadPosts() {
    fetch("http://localhost:5000/api/posts")
        .then(response => response.json())
        .then(posts => {
            postsContainer.innerHTML = "";

            posts.forEach(post => {
                postsContainer.innerHTML += `
                    <div class="post">
                        <h3>${post.user}</h3>
                        <p>${post.content}</p>

                        ${
                    post.image
                        ? `<img src="${post.image}" alt="Post image">`
                        : ""
                }

                        <button onclick="likePost('${post._id}')">
                            ❤️ Like
                        </button>

                        <span class="likes">
                            ${post.likes} Likes
                        </span>

                        <div class="comments">
                            <h4>Comments</h4>

                            <div id="comments-${post._id}">
                                Loading comments...
                            </div>

                            <input
                                type="text"
                                id="commentUser-${post._id}"
                                placeholder="Your name"
                            >

                            <input
                                type="text"
                                id="commentText-${post._id}"
                                placeholder="Write a comment"
                            >

                            <button onclick="addComment('${post._id}')">
                                Comment
                            </button>
                        </div>
                    </div>
                `;

                loadComments(post._id);
            });
        })
        .catch(error => {
            console.log("Error loading posts:", error);
        });
}

function createPost() {
    const user = document.getElementById("user").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").value;

    if (!user || !content) {
        alert("Please enter your name and post content!");
        return;
    }

    fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            content: content,
            image: image
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            document.getElementById("user").value = "";
            document.getElementById("content").value = "";
            document.getElementById("image").value = "";

            loadPosts();
        });
}

function likePost(id) {
    fetch(`http://localhost:5000/api/posts/${id}/like`, {
        method: "PUT"
    })
        .then(response => response.json())
        .then(() => {
            loadPosts();
        });
}

function loadComments(postId) {
    fetch(`http://localhost:5000/api/comments/${postId}`)
        .then(response => response.json())
        .then(comments => {
            const container = document.getElementById(
                `comments-${postId}`
            );

            if (comments.length === 0) {
                container.innerHTML = "<p>No comments yet.</p>";
                return;
            }

            container.innerHTML = "";

            comments.forEach(comment => {
                container.innerHTML += `
                    <p>
                        <strong>${comment.user}</strong>:
                        ${comment.text}
                    </p>
                `;
            });
        });
}

function addComment(postId) {
    const user = document.getElementById(
        `commentUser-${postId}`
    ).value;

    const text = document.getElementById(
        `commentText-${postId}`
    ).value;

    if (!user || !text) {
        alert("Please enter your name and comment!");
        return;
    }

    fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            postId: postId,
            user: user,
            text: text
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            document.getElementById(
                `commentUser-${postId}`
            ).value = "";

            document.getElementById(
                `commentText-${postId}`
            ).value = "";

            loadComments(postId);
        });
}

loadPosts();