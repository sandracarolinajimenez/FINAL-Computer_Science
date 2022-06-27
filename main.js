const studentsList = document.getElementById('studentsList');
const searchBar = document.getElementById('searchBar');
let hpStudents = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredStudents = hpStudents.filter((student) => {
        return (
            student.name.toLowerCase().includes(searchString) ||
            student.house.toLowerCase().includes(searchString)
        );
    });
    displayStudents(filteredStudents);
});

const loadStudents = async () => {
    try {
        const res = await fetch('http://hp-api.herokuapp.com/api/characters/students');
        hpStudents = await res.json();
        displayStudents(hpStudents);
    } catch (err) {
        console.error(err);
    }
};

const displayStudents = (students) => {
    const htmlString = students
        .map((student) => {
            return `
            <li class="student">
                <h2>${student.name}</h2>
                <p>House: ${student.house}</p>
                </li>`;
        })
        .join('');
    studentsList.innerHTML = htmlString;
};

loadStudents();