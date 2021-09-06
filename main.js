// Declare variable
const listCoursesList = document.getElementById('list-courses');
const courseApi = 'http://localhost:3000/courses';

// Render html
const renderHtml = (dt) => {
	return `<li class='course-item-${dt.id}'>
				<h4>${dt.name}</h4>
				<p>${dt.description}</p>
				<button onclick="handleDeleteCourse(${dt.id})">Delete</button>
				<button onclick="handleEditCourse(${dt.id})">Edit</button>
			</li>`;
};

// GET api
const getCourses = () => {
	fetch(courseApi)
		.then((response) => response.json())
		.then((responseJson) => {
			const html = responseJson.map((item) => renderHtml(item));

			listCoursesList.innerHTML = html.join('');
		})
		.catch((err) => console.log(err));
};

// Reset 'FORM' after click 'Create' button
const resetForm = () => {
	document.querySelector('input[name="name"]').value = '';
	document.querySelector('input[name="description"]').value = '';
};

// Take data from 'Form'
const takeData = () => {
	const nameValue = document.querySelector('input[name="name"]').value;
	const description = document.querySelector(
		'input[name="description"]'
	).value;
	if (nameValue && description) {
		return {
			name: nameValue,
			description: description,
		};
	}
};

// POST api
const createCourse = (data, resetForm) => {
	fetch(courseApi, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
		.then((response) => response.json())
		.then((responseJson) => {
			const addHtml = renderHtml(responseJson);
			const newHtml = listCoursesList.innerHTML + addHtml;
			listCoursesList.innerHTML = newHtml;
		})
		.then(resetForm)
		.catch((err) => console.log(err));
};

// Submit data to server when click 'Create' button
const handleCreateForm = () => {
	const createBtn = document.getElementById('create');
	createBtn.onclick = function () {
		if (takeData()) {
			createCourse(takeData(), resetForm);
		}
	};
};

// Delete course when click 'Delete' button
const handleDeleteCourse = (id) => {
	fetch(courseApi + '/' + id, {
		method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => response.json())
		.then(() => {
			const courseItem = document.querySelector('.course-item-' + id);
			if (courseItem) {
				courseItem.remove();
			}
		});
};

// Edit course when click 'Edit' button
const handleEditCourse = (id) => {
	if (takeData()) {
		editCourse(takeData(), resetForm, id);
	}
};

const editCourse = (data, resetForm, id) => {
	fetch(courseApi + '/' + id, {
		method: 'PUT', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
		.then((response) => response.json())
		.then((responseJson) => {
			const courseItem = document.querySelector('.course-item-' + id);
			courseItem.innerHTML = `<h4>${responseJson.name}</h4>
									<p>${responseJson.description}</p>
									<button onclick="handleDeleteCourse(${responseJson.id})">Delete</button>
									<button onclick="handleEditCourse(${responseJson.id})">Edit</button>`;
		})
		.then(resetForm)
		.catch((err) => console.log(err));
};

// start app
const start = () => {
	// GET api - Read
	getCourses();

	// POST api - Create
	handleCreateForm();
};

start();
