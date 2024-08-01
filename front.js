


const apiUrl = 'http://localhost:3000/employees';
const tableBody = document.getElementById('employeinfo');
const searchInput = document.getElementById('search');
const paginationButtons = document.querySelector('.pagination');
const pageCountElement = document.getElementById('pagecount');
const tableSizeSelect = document.getElementById('table_size');

let employeesArray = [];
let currentPage = 1;
let employeesPerPage = parseInt(tableSizeSelect.value, 10);
// Fetching data from API once and storing it locally
function fetchEmployees() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched successfully', data);
            employeesArray = data;
            showData(employeesArray, currentPage);
            setupPagination(employeesArray);
        })
        .catch(error => {
            console.error('Error fetching:', error);
        });
}

// Displaying data from the local array with pagination
function showData(employees, page) {
    const start = (page - 1) * employeesPerPage;
    const end = start + employeesPerPage;
    const paginatedEmployees = employees.slice(start, end);
    let temp = '';


    paginatedEmployees.forEach((employee, index) => {
        console.log(employee.id, "fdgfgfdg")

        const imageUrl = `http://localhost:3000/avatars/${employee.id}.jpg`;
        temp += `
            <tr>
                <td scope="row">#${start + index + 1}</td>
                <td>
                <img src="${imageUrl}" alt="Avatar" style="width: 20px; height: 20px; border-radius: 30%; margin-right: 10px;">
                ${employee.salutation} ${employee.firstName} ${employee.lastName}
                </td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.gender}</td>
                <td>${employee.dob}</td>
                <td>${employee.country}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ...
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="viepage.html?id=${employee.id}" ><span class="material-symbols-outlined">visibility</span> View Details</a></li>
                            <li><a class="dropdown-item" href="#" onclick="editEmployee('${employee.id}')"><span class="material-symbols-outlined">edit</span> Edit</a></li>
                            <li><a class="dropdown-item" href="#" onclick="deleteEmployee('${employee.id}')"><span class="material-symbols-outlined">delete</span> Delete</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = temp;
}


// pagination fumction
function setupPagination(employees) {
    const pageCount = Math.ceil(employees.length / employeesPerPage);
    let buttons = '';

    buttons += `<button onclick="changePage('prev')" ${currentPage === 1 ? 'disabled' : ''}>🠄</button>`;
    for (let i = 1; i <= pageCount; i++) {
        buttons += `<button onclick="changePage(${i})" class="${i === currentPage ? 'active-page' : ''}">${i}</button>`;
    }
    buttons += `<button onclick="changePage('next')" ${currentPage === pageCount ? 'disabled' : ''}>🠆</button>`;

    paginationButtons.innerHTML = buttons;

    pageCountElement.innerHTML = `in ${employees.length}`;
}

// Changing the page
function changePage(page) {
    if (page === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (page === 'next' && currentPage < Math.ceil(employeesArray.length / employeesPerPage)) {
        currentPage++;
    } else if (typeof page === 'number') {
        currentPage = page;
    }
    showData(employeesArray, currentPage);
    setupPagination(employeesArray);
}

// Filtering employees based on search input
function searchEmployees(query) {
    const filteredEmployees = employeesArray.filter(employee => {
        return (
            employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(query.toLowerCase()) ||
            employee.email.toLowerCase().includes(query.toLowerCase())
        );
    });
    currentPage = 1;
    showData(filteredEmployees, currentPage);
    setupPagination(filteredEmployees);
}
// Event listener for search input
searchInput.addEventListener('input', (e) => {
    searchEmployees(e.target.value);
});
// //  adding function
function showaddPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const mainui = document.querySelectorAll('.brightness');
    mainui.forEach(mainui => {
        mainui.classList.add('brightness-reduced');
    });

    const selectedPage = document.getElementById('ui-2');
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    const employeeForm = document.getElementById('eployeeForm');
    if (employeeForm) {

        function validateGender() {
            const genderRadios = document.getElementsByName('gender');
            const genderError = document.getElementById('genderError');
            let genderChecked = false;

            // Check if any radio button is selected
            for (const radio of genderRadios) {
                if (radio.checked) {
                    genderChecked = true;
                    break;
                }
            }

            if (!genderChecked) {
                genderError.style.display = 'block';
                return false;
            } else {
                genderError.style.display = 'none';
                return true;
            }
        }
        let isValid = false;
        // validation function
        function validateForm() {
            isValid = true;

            const salutation = document.getElementById('Salutation');
            const salutationError = document.getElementById('SalutationError');
            if (salutation.value === 'select') {
                salutationError.style.display = 'block';
                isValid = false;
            } else {
                salutationError.style.display = 'none';
            }


            const firstName = document.getElementById('firstName');
            const firstNameError = document.getElementById('firstNameError');
            if (firstName.value.trim() === '') {
                firstNameError.style.display = 'block';
                isValid = false;
            } else {
                firstNameError.style.display = 'none';
            }


            const lastName = document.getElementById('lastName');
            const lastNameError = document.getElementById('lastNameError');
            if (lastName.value.trim() === '') {
                lastNameError.style.display = 'block';
                isValid = false;
            } else {
                lastNameError.style.display = 'none';
            }


            const emailAddress = document.getElementById('emailAddress');
            const emailAddressError = document.getElementById('emailAddressError');
            if (emailAddress.value.trim() === '') {
                emailAddressError.style.display = 'block';
                isValid = false;
            } else {
                emailAddressError.style.display = 'none';
            }


            const mobileNumber = document.getElementById('mobileNumber');
            const mobileNumberError = document.getElementById('mobileNumberError');
            if (mobileNumber.value.length !== 10 || isNaN(mobileNumber.value)) {
                mobileNumberError.style.display = 'block';
                isValid = false;
            } else {
                mobileNumberError.style.display = 'none';
            }


            const dob = document.getElementById('dob');
            const dobError = document.getElementById('dobError');
            if (dob.value.trim() === '') {
                dobError.style.display = 'block';
                isValid = false;
            } else {
                dobError.style.display = 'none';
            }


            isValid = validateGender() && isValid;

            const genderRadios = document.getElementsByName('gender');
            genderRadios.forEach(radio => {
                radio.addEventListener('change', validateGender);
            });

            const address = document.getElementById('address');
            const addressError = document.getElementById('addressError');
            if (address.value.trim() === '') {
                addressError.style.display = 'block';
                isValid = false;
            } else {
                addressError.style.display = 'none';
            }


            const country = document.getElementById('country');
            const countryError = document.getElementById('countryError');
            if (country.value === 'select') {
                countryError.style.display = 'block';
                isValid = false;
            } else {
                countryError.style.display = 'none';
            }


            const state = document.getElementById('state');
            const stateError = document.getElementById('stateError');
            if (state.value === 'select') {
                stateError.style.display = 'block';
                isValid = false;
            } else {
                stateError.style.display = 'none';
            }


            const city = document.getElementById('city');
            const cityError = document.getElementById('cityError');
            if (city.value.trim() === '') {
                cityError.style.display = 'block';
                isValid = false;
            } else {
                cityError.style.display = 'none';
            }


            const password = document.getElementById('Password');
            const passwordError = document.getElementById('PasswordError');
            if (!password.value || !/[A-Z]/.test(password.value)) {
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }


            const qualification = document.getElementById('Qualification');
            const qualificationError = document.getElementById('QualificationError');
            if (qualification.value.trim() === '') {
                qualificationError.style.display = 'block';
                isValid = false;
            } else {
                qualificationError.style.display = 'none';
            }



            return isValid;
        }


        // if valid ===adding an employee
        const addempbtn = document.getElementById('addemployeeebtn')
        addempbtn.addEventListener('click', function (event) {
            event.preventDefault();
            console.log(validateForm())
            if (validateForm()) {
                sbmtEmployee()
                const salutation = document.getElementById('Salutation').value;
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('emailAddress').value;
                const phone = document.getElementById('mobileNumber').value;
                const dob = document.getElementById('dob').value;
                const username = firstName + "" + lastName;
                const address = document.getElementById('address').value;
                const country = document.getElementById('country').value;
                const state = document.getElementById('state').value;
                const city = document.getElementById('city').value;
                const password = document.getElementById('Password').value;
                const qualification = document.getElementById('Qualification').value;
                const genderRadios = document.getElementsByName('gender');
                let genderValue;
                for (const radio of genderRadios) {
                    if (radio.checked) {
                        genderValue = radio.value;
                        break;
                    }
                }

                const formattedDob = changeFormat(dob);
                const formDetails = {
                    salutation,
                    firstName,
                    lastName,
                    email,
                    phone,
                    dob: formattedDob,
                    gender: genderValue,
                    qualifications: qualification,
                    address,
                    city,
                    state,
                    country,
                    username,
                    password
                };
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDetails)
                })
                    .then(response => response.json())
                    .then(data => {
                        formDetails.id = data.id
                        console.log('Employee added:', formDetails.id);

                        employeesArray.unshift(formDetails);

                        console.log(employeesArray);
                        uploadImage(formDetails.id);
                        showData(employeesArray, 1);

                        showParagraph()
                    })
                    .catch(error => {
                        console.error('Error adding employee:', error);
                    });

            }
            else {
                validateForm()
            }
        });


    }
}

// Upload image function  
async function uploadImage(employeeId) {
    const fileInput = document.getElementById('avatars');
    if (fileInput.files.length > 0) {
        const imageFile = fileInput.files[0];
        const imageData = new FormData();
        imageData.append('avatar', imageFile);

        await fetch(`http://localhost:3000/employees/${employeeId}/avatar`, {
            method: 'POST',
            body: imageData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Image uploaded successfully:', data);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    }

}

// showing sucsess message on dom
function showParagraph() {
    var p = document.getElementById('sucsessMsg');
    p.style.display = 'flex';
    setTimeout(function () {
        p.style.display = 'none';
    }, 10000);
}
function showdltmsg() {
    var d = document.getElementById('sucsessdltMsg')
    d.style.display = 'flex';
    setTimeout(function () {
        d.style.display = 'none';
    }, 10000);

}
function showeditmsg() {
    var c = document.getElementById('sucsesseditMsg')
    c.style.display = 'flex';
    setTimeout(function () {
        c.style.display = 'none';
    }, 10000);

}

// Deleting an employee function
function deleteEmployee(employeeId) {
    const dltpop = document.getElementById('ui-4');

    dltpop.classList.add('active');
    document.querySelectorAll('.brightness').forEach(mainUi => {
        mainUi.classList.add('brightness-reduced');
    });

    const cnfrmDlt = document.getElementById('delete-employee-btn');
    cnfrmDlt.addEventListener('click', function dltprsn() {
        closePage('ui-4')

        const index = employeesArray.findIndex(employee => employee.id === employeeId);
        if (index !== -1) {
            fetch(`${apiUrl}/${employeeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Employee deleted');
                        employeesArray.splice(index, 1);
                        showData(employeesArray, 1);
                        showdltmsg()
                    } else {
                        console.error('Failed to delete employee');
                    }
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                });
        }

    })


}

// Editing an employee function
function editEmployee(employeeId) {
    const editForm = document.getElementById('ui-3');
    if (editForm) {
        editForm.classList.add('active');
        document.querySelectorAll('.brightness').forEach(mainUi => {
            mainUi.classList.add('brightness-reduced');
        });

        const employee = employeesArray.find(emp => emp.id === employeeId);
        if (employee) {
            document.getElementById('editSalutation').value = employee.salutation;
            document.getElementById('editfirstName').value = employee.firstName;
            document.getElementById('editlastName').value = employee.lastName;
            document.getElementById('editemailAddress').value = employee.email;
            document.getElementById('editmobileNumber').value = employee.phone;
            document.getElementById('editaddress').value = employee.address;
            document.getElementById('editcountry').value = employee.country;
            document.getElementById('editstate').value = employee.state;
            document.getElementById('editcity').value = employee.city;
            document.getElementById('editPassword').value = employee.password;
            document.getElementById('editQualification').value = employee.qualifications;
            document.getElementById('editdob').value = editchangeFormat(employee.dob);

            function editchangeFormat(dob) {
                let [day, month, year] = dob.split("-");
                return `${year}-${month}-${day}`;
            }

            if (employee.gender === 'Male') {
                document.getElementById('editgenderone').checked = true;
            } else {
                document.getElementById('editgendertwo').checked = true;
            }

            // Show current image
            const currentImageUrl = `http://localhost:3000/avatars/${employee.id}.jpg`;
            const imagePreview = document.getElementById('editImagePreview');
            imagePreview.src = currentImageUrl;
            imagePreview.style.display = 'block';

            const editEmployeeForm = document.getElementById('editEployeeForm');
            if (editEmployeeForm) {
                editEmployeeForm.addEventListener('submit', function (event) {
                    event.preventDefault();

                    const editsalutation = document.getElementById('editSalutation').value;
                    const editfirstName = document.getElementById('editfirstName').value;
                    const editlastName = document.getElementById('editlastName').value;
                    const editemail = document.getElementById('editemailAddress').value;
                    const editphone = document.getElementById('editmobileNumber').value;
                    const editdob = document.getElementById('editdob').value;
                    const editusername = editfirstName + "" + editlastName;
                    const editaddress = document.getElementById('editaddress').value;
                    const editcountry = document.getElementById('editcountry').value;
                    const editstate = document.getElementById('editstate').value;
                    const editcity = document.getElementById('editcity').value;
                    const editpassword = document.getElementById('editPassword').value;
                    const editQualification = document.getElementById('editQualification').value;
                    const editgenderRadios = document.getElementsByName('editgenderone');
                    let editgenderValue;
                    for (const radio of editgenderRadios) {
                        if (radio.checked) {
                            editgenderValue = radio.value;
                            break;
                        }
                    }
                    console.log(editgenderValue);

                    const editFormDetails = {
                        salutation: editsalutation,
                        firstName: editfirstName,
                        lastName: editlastName,
                        email: editemail,
                        phone: editphone,
                        dob: changeFormat(editdob),
                        gender: editgenderValue,
                        qualifications: editQualification,
                        address: editaddress,
                        city: editcity,
                        state: editstate,
                        country: editcountry,
                        username: editusername,
                        password: editpassword
                    };

                    fetch(`${apiUrl}/${employeeId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editFormDetails)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Employee updated:', data);
                            const index = employeesArray.findIndex(emp => emp.id === employeeId);
                            employeesArray[index] = editFormDetails;
                            showData(employeesArray, 1);
                            const selectedPage = document.getElementById('ui-3');
                            if (selectedPage) {
                                selectedPage.classList.remove('active');
                            }

                            const editFileInput = document.getElementById('editavatars');
                            if (editFileInput.files.length > 0) {
                                uploadEditImage(employeeId);
                            }


                        })
                        .catch(error => {
                            console.error('Error updating employee:', error);
                        });
                });
            } else {
                console.error('Edit employee form not found');
            }
        }
    } else {
        console.error('Edit form element not found');
    }
}

// Upload edit image function
function uploadEditImage(employeeId) {
    const editFileInput = document.getElementById('editavatars');
    if (editFileInput.files.length > 0) {
        const imageFile = editFileInput.files[0];
        const imageData = new FormData();
        imageData.append('avatar', imageFile);

        fetch(`http://localhost:3000/employees/${employeeId}/avatar`, {
            method: 'POST',
            body: imageData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Edited image uploaded successfully:', data);
                showeditmsg()
            })
            .catch(error => {
                console.error('Error uploading edited image:', error);
            });
    }
}

// Date changing function
function changeFormat(dob) {
    let [year, month, day] = dob.split("-");
    return `${day}-${month}-${year}`;
}

// Load data on page load
window.onload = fetchEmployees;

// Show page function
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const mainui = document.querySelectorAll('.brightness');
    mainui.forEach(mainui => {
        mainui.classList.add('brightness-reduced');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}


function sbmtEmployee() {
    const pages = document.querySelectorAll('.brightness');
    pages.forEach(page => {
        page.classList.add('active');
    });
    const mainui = document.querySelectorAll('.brightness');
    mainui.forEach(mainui => {
        mainui.classList.remove('brightness-reduced');
    });

    const selectedPage = document.getElementById('ui-2');
    if (selectedPage) {
        selectedPage.classList.remove('active');
    }
}

// Close page function
function closePage(pageId) {
    const pages = document.querySelectorAll('.brightness');
    pages.forEach(page => {
        page.classList.add('active');
    });
    const mainui = document.querySelectorAll('.brightness');
    mainui.forEach(mainui => {
        mainui.classList.remove('brightness-reduced');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('active');
    }
}

document.getElementById('avatars').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const upldText = document.getElementById('upldText');
            const spanupld = document.getElementById('spanupld');
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            upldText.style.display = 'none';
            spanupld.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('editavatars').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const editspanupld = document.getElementById('spanupld');
            const editupldText = document.getElementById('editupldText');
            const editImagePreview = document.getElementById('editImagePreview');
            editImagePreview.src = e.target.result;
            editImagePreview.style.display = 'block';
            editupldText.style.display = 'none';
            editspanupld.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});
function cancelEdit(pageId) {
    const pages = document.querySelectorAll('.brightness');
    pages.forEach(page => {
        page.classList.add('active');
    });
    const mainui = document.querySelectorAll('.brightness');
    mainui.forEach(mainui => {
        mainui.classList.remove('brightness-reduced');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('active');
    }



}
function closecancelPage() {
    const pages = document.querySelectorAll('.brightness');
    pages.forEach(page => {
        page.classList.add('active');
    });
    const mainui = document.querySelectorAll('.brightness');
    mainui.forEach(mainui => {
        mainui.classList.remove('brightness-reduced');
    });

    const selectedPage = document.getElementById('ui-2');
    if (selectedPage) {
        selectedPage.classList.remove('active');
    }
    


}
// setting table size
tableSizeSelect.addEventListener('change', (e) => {
    employeesPerPage = parseInt(e.target.value, 10);
    currentPage = 1;
    showData(employeesArray, currentPage);
    setupPagination(employeesArray);
});


