const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const historyList = document.getElementById('history-list');

// Predefined books
const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic', status: 'available' },
    { title: '1984', author: 'George Orwell', category: 'Dystopian', status: 'available' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic', status: 'available' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', status: 'available' },
    { title: 'Moby-Dick', author: 'Herman Melville', category: 'Adventure', status: 'available' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance', status: 'available' },
];

const borrowingHistory = [];

function renderBooks(filter = '') {
    bookList.innerHTML = '';
    books.filter((book) => {
        return (
            book.title.toLowerCase().includes(filter.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.toLowerCase()) ||
            book.category.toLowerCase().includes(filter.toLowerCase())
        );
    }).forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${book.title}</strong> by ${book.author} (${book.category}) - <em>${book.status}</em>`;

        // Container for action buttons
        const actionContainer = document.createElement('div');
        actionContainer.style.display = 'flex';
        actionContainer.style.gap = '10px';
        actionContainer.style.alignItems = 'center';

        const borrowButton = document.createElement('button');
        borrowButton.textContent = book.status === 'available' ? 'Borrow' : 'Return';
        borrowButton.style.backgroundColor = book.status === 'available' ? 'green' : 'orange';
        borrowButton.style.color = 'white';
        borrowButton.style.border = 'none';
        borrowButton.style.padding = '5px 10px';
        borrowButton.style.borderRadius = '5px';
        borrowButton.addEventListener('click', () => {
            book.status = book.status === 'available' ? 'borrowed' : 'available';
            if (book.status === 'borrowed') {
                borrowingHistory.push(`${book.title} borrowed on ${new Date().toLocaleString()}`);
            }
            renderBooks(filter);
            renderHistory();
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.borderRadius = '5px';
        deleteButton.addEventListener('click', () => {
            books.splice(index, 1); // Remove the book at the current index
            renderBooks(filter);   // Re-render the book list
        });

        actionContainer.appendChild(borrowButton);
        actionContainer.appendChild(deleteButton);
        li.appendChild(actionContainer);
        bookList.appendChild(li);
    });
}

function renderHistory() {
    historyList.innerHTML = '';
    borrowingHistory.forEach((entry) => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    books.push({ title, author, category, status: 'available' });
    renderBooks();
    bookForm.reset();
});

searchInput.addEventListener('input', (e) => {
    renderBooks(e.target.value);
});

renderBooks();
renderHistory();
