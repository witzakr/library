document.addEventListener('DOMContentLoaded', function () {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const bookList = document.getElementById('bookList');

    function renderList() {
        bookList.innerHTML = "";
        storedBooks.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.innerHTML = `
                <span>${book.title} by ${book.author} (${book.year}) - ${book.genre}</span>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="removeBook(${index})">Remove</button>
            `;
            bookList.appendChild(bookItem);
        });
    }

    renderList();

    document.getElementById('addBook').addEventListener('click', function () {
        const title = document.getElementById('Title').value;
        const author = document.getElementById('Author').value;
        const year = document.getElementById('Year').value;
        const genre = document.getElementById('Genre').value;

        if (title.trim() !== "" && author.trim() !== "" && year.trim() !== "" && genre.trim() !== "") {
            const newBook = {
                title: title,
                author: author,
                year: year,
                genre: genre
            };

            storedBooks.push(newBook);
            localStorage.setItem('books', JSON.stringify(storedBooks));
            renderList();

            document.getElementById('Title').value = "";
            document.getElementById('Author').value = "";
            document.getElementById('Year').value = "";
            document.getElementById('Genre').value = "";
        }
    });

    document.getElementById('Clearlist').addEventListener('click', function () {
        localStorage.removeItem('books');
        storedBooks.length = 0;
        renderList();
    });

    document.getElementById('LoadAPI').addEventListener('click', function () {
        fetch('https://mocki.io/v1/f439f7ac-e0ec-4a90-9f92-72089e23060c')
            .then(response => response.json())
            .then(data => {
                storedBooks.push(...data);
                localStorage.setItem('books', JSON.stringify(storedBooks));
                renderList();
            })
            .catch(error => {
                console.error('Error fetching data from the API:', error);
            });
    });

    window.removeBook = function (index) {
        storedBooks.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(storedBooks));
        renderList();
    };

    window.editBook = function (index) {
        const currentBook = storedBooks[index];
        const newTitle = prompt("Enter new title:", currentBook.title);
        const newAuthor = prompt("Enter new author:", currentBook.author);
        const newYear = prompt("Enter new year:", currentBook.year);
        const newGenre = prompt("Enter new genre:", currentBook.genre);
    
        if (newTitle !== null && newAuthor !== null && newYear !== null && newGenre !== null) {
            storedBooks[index] = {
                title: newTitle,
                author: newAuthor,
                year: newYear,
                genre: newGenre
            };
    
            localStorage.setItem('books', JSON.stringify(storedBooks));
            renderList();
        }
    };
});
