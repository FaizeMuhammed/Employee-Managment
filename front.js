


const apiUrl = 'http://localhost:3000/employees';
const tableBody = document.getElementById('employeinfo');

let employeesArray = [];

// Fetching data from API once and storing it locally
function fetchEmployees() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            employeesArray = data;
            showData(employeesArray);
        })
        .catch(error => {
            console.error('Error fetching:', error);
        });
}

// Displaying data from the local array
function showData(employees) {
    let temp = '';

    employees.forEach((employee, index) => {
        const imageUrl = `http://localhost:3000/avatars/${employee.id}.jpg`;
        temp += `
            <tr>
                <td scope="row">#${index + 1}</td>
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

// Adding a new employee function
const employeeForm = document.getElementById('eployeeForm');
if (employeeForm) {
    employeeForm.addEventListener('submit', function (event) {
        event.preventDefault();

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
                console.log('Employee added:', data);
                employeesArray.unshift(data);
                showData(employeesArray);
                uploadImage(data.id);
            })
            .catch(error => {
                console.error('Error adding employee:', error);
            });
    });
}

// Upload image function  
function uploadImage(employeeId) {
    const fileInput = document.getElementById('avatars');
    if (fileInput.files.length > 0) {
        const imageFile = fileInput.files[0];
        const imageData = new FormData();
        imageData.append('avatar', imageFile);

        fetch(`http://localhost:3000/employees/${employeeId}/avatar`, {
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

// Deleting an employee function
function deleteEmployee(employeeId) {
    const dltpop = document.getElementById('ui-4');

    dltpop.classList.add('active');
        document.querySelectorAll('.brightness').forEach(mainUi => {
            mainUi.classList.add('brightness-reduced');
        });
    
    const cnfrmDlt = document.getElementById('delete-employee-btn');
    cnfrmDlt.addEventListener('click',function dltprsn(){

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
                        showData(employeesArray);
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
                            employeesArray[index] = data;
                            showData(employeesArray);

                            // Check if a new image is uploaded
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
            })
            .catch(error => {
                console.error('Error uploading edited image:', error);
            });
    }
}

// Date formatting function
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
    fetchEmployees()


}
