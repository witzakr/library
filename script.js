// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve stored books from local storage or initialize an empty array
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];

    // Get the element representing the book list in the HTML
    const bookList = document.getElementById('bookList');

    // Function to render the list of books on the page
    function renderList() {
        // Clear the existing content of the book list
        bookList.innerHTML = "";

        // Create an unordered list element to hold the book items
        const ul = document.createElement('ul');

        // Iterate through each stored book and create list items with details
        storedBooks.forEach((book, index) => {
            // Create list item and a details div, initially hidden
            const li = document.createElement('li');
            const detailsDiv = document.createElement('div');
            detailsDiv.style.display = 'none';

            // Create a button to toggle the display of book details
            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Details';
            toggleButton.onclick = function () {
                // Toggle the display of the details div
                if (detailsDiv.style.display === 'none') {
                    detailsDiv.style.display = 'block';
                } else {
                    detailsDiv.style.display = 'none';
                }
            };

            // Set the inner HTML of the list item with book information
            li.innerHTML = `
                <span>${book.title}</span>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="removeBook(${index})">Remove</button>
            `;

            // Set the inner HTML of the details div with additional book details
            detailsDiv.innerHTML = `
                <span>Author: ${book.author}, Year: ${book.year}, Genre: ${book.genre}</span>
            `;

            // Append the toggle button and details div to the list item
            li.appendChild(toggleButton);
            li.appendChild(detailsDiv);

            // Append the list item to the unordered list
            ul.appendChild(li);
        });

        // Append the unordered list to the book list element
        bookList.appendChild(ul);
    }

    // Call the renderList function to display the initial list of books
    renderList();

    // Event listener for the "Add Book" button
    document.getElementById('addBook').addEventListener('click', function () {
        // Get user input for a new book
        const title = document.getElementById('Title').value;
        const author = document.getElementById('Author').value;
        const year = document.getElementById('Year').value;
        const genre = document.getElementById('Genre').value;

        // Check if all input fields are filled
        if (title.trim() !== "" && author.trim() !== "" && year.trim() !== "" && genre.trim() !== "") {
            // Create a new book object
            const newBook = {
                title: title,
                author: author,
                year: year,
                genre: genre
            };

            // Add the new book to the stored books array
            storedBooks.push(newBook);

            // Update the local storage with the modified stored books array
            localStorage.setItem('books', JSON.stringify(storedBooks));

            // Render the updated list of books
            renderList();

            // Clear the input fields
            document.getElementById('Title').value = "";
            document.getElementById('Author').value = "";
            document.getElementById('Year').value = "";
            document.getElementById('Genre').value = "";
        }
    });

    // Event listener for the "Clear List" button
    document.getElementById('Clearlist').addEventListener('click', function () {
        // Remove the 'books' item from local storage and reset the storedBooks array
        localStorage.removeItem('books');
        storedBooks.length = 0;

        // Render an empty list on the page
        renderList();
    });

    // Event listener for the "Load API" button
    document.getElementById('LoadAPI').addEventListener('click', function () {
        // Fetch data from a mock API
        fetch('https://mocki.io/v1/f439f7ac-e0ec-4a90-9f92-72089e23060c')
            .then(response => response.json())
            .then(data => {
                // Append the fetched data to the stored books array
                storedBooks.push(...data);

                // Update local storage with the modified stored books array
                localStorage.setItem('books', JSON.stringify(storedBooks));

                // Render the updated list of books
                renderList();
            })
            .catch(error => {
                // Log an error message if fetching data from the API fails
                console.error('Error fetching data from the API:', error);
            });
    });

    // Function to remove a book from the list based on its index
    window.removeBook = function (index) {
        storedBooks.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(storedBooks));
        renderList();
    };

    // Function to edit a book in the list based on its index
    window.editBook = function (index) {
        // Prompt the user for new information for the book
        const currentBook = storedBooks[index];
        const newTitle = prompt("Enter new title:", currentBook.title);
        const newAuthor = prompt("Enter new author:", currentBook.author);
        const newYear = prompt("Enter new year:", currentBook.year);
        const newGenre = prompt("Enter new genre:", currentBook.genre);

        // Check if the user provided valid information
        if (newTitle !== null && newAuthor !== null && newYear !== null && newGenre !== null) {
            // Update the book information in the stored books array
            storedBooks[index] = {
                title: newTitle,
                author: newAuthor,
                year: newYear,
                genre: newGenre
            };

            // Update local storage with the modified stored books array
            localStorage.setItem('books', JSON.stringify(storedBooks));

            // Render the updated list of books
            renderList();
        }
    };
});
