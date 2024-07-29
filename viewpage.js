

var viewPage = new URLSearchParams(document.location.search);
var id = viewPage.get("id");

console.log(id);

const apiUrl = 'http://localhost:3000/employees';

function calculateAge(dob) {
    console.log('dob:', dob);
    const [day, month, year] = dob.split('-')
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
// view employee function
fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(data => {

        const age = calculateAge(data.dob)
        document.getElementById('viewGender').innerHTML = data.gender
        document.getElementById('viewAge').innerHTML = age
        document.getElementById('viewDob').innerHTML = data.dob
        document.getElementById('viewPhone').innerHTML = data.phone
        document.getElementById('viewQualification').innerHTML = data.qualifications
        document.getElementById('viewAddress').innerHTML = data.address
        document.getElementById('viewuserName').innerHTML = data.username
        document.getElementById('viewEmail').innerHTML = data.email
        document.getElementById('viewName').innerHTML = data.salutation + data.firstName + data.lastName

        console.log(data, 'fetched sucsess');
        employeeid = data.id
        const imageUrl = `http://localhost:3000/avatars/${employeeid}.jpg`;
        const imageview = document.getElementById('avatar')
        imageview.src = imageUrl
    })
    .catch(error => {
        console.log(error, 'fetched error');
    })

// delete employee function
function dltepmploye(employeeId) {
    console.log('employee-id:', employeeId);

    const dltpop = document.getElementById('ui-4');
    if (dltpop) {
        dltpop.classList.add('active');
        document.querySelectorAll('.brightness').forEach(mainUi => {
            mainUi.classList.add('brightness-reduced');
        });

        const cnfrmDlt = document.getElementById('delete-employee-btn');
        if (cnfrmDlt) {
            cnfrmDlt.addEventListener('click', function dltPrsn() {
                fetch(`${apiUrl}/${employeeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('Employee deleted');
                            dltpop.classList.remove('active');
                            document.querySelectorAll('.brightness').forEach(mainUi => {
                                mainUi.classList.remove('brightness-reduced');
                                window.location.href = 'index.html'


                            });




                        } else {
                            console.error('Failed to delete employee');
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting employee:', error);
                    });

                cnfrmDlt.removeEventListener('click', dltPrsn);
            });
        } else {
            console.error('Delete confirmation button not found');
        }
    } else {
        console.error('Delete popup element not found');
    }
}
// close page function
function closePage(pageId) {

    const pages = document.querySelectorAll('.brightness');
    pages.forEach(page => {
        page.classList.add('active');

        console.log('removed')
    });
    const mainui = document.querySelectorAll('.brightness');
    mainui.forEach(mainui => {

        mainui.classList.remove('brightness-reduced');
        console.log('removed')
    });


    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('active');
        console.log('activated')
    }
}

// edit employe function
function editEmployee(employeeId) {
    const editForm = document.getElementById('ui-3');
    if (editForm) {
        editForm.classList.add('active');
        document.querySelectorAll('.brightness').forEach(mainUi => {
            mainUi.classList.add('brightness-reduced');
        });

        fetch(`${apiUrl}/${employeeId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('editSalutation').value = data.salutation;
                document.getElementById('editfirstName').value = data.firstName;
                document.getElementById('editlastName').value = data.lastName;
                document.getElementById('editemailAddress').value = data.email;
                document.getElementById('editmobileNumber').value = data.phone;
                document.getElementById('editaddress').value = data.address;
                document.getElementById('editcountry').value = data.country;
                document.getElementById('editstate').value = data.state;
                document.getElementById('editcity').value = data.city;
                document.getElementById('editPassword').value = data.password;
                document.getElementById('editQualification').value = data.qualifications;
                document.getElementById('editdob').value = editchangeFormat(data.dob);

                function editchangeFormat(dob) {
                    let [day, month, year] = dob.split("-");
                    return `${year}-${month}-${day}`;
                }

                if (data.gender === 'Male') {
                    document.getElementById('editgenderone').checked = true;
                } else {
                    document.getElementById('editgendertwo').checked = true;
                }

                const currentImageUrl = `http://localhost:3000/avatars/${employeeid}.jpg`;
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


                        function editsumbitchangeFormat(dob) {
                            let [day, month, year] = dob.split("-");
                            return `${year}-${month}-${day}`;
                        }

                        const editFormDetails = {
                            salutation: editsalutation,
                            firstName: editfirstName,
                            lastName: editlastName,
                            email: editemail,
                            phone: editphone,
                            dob: editsumbitchangeFormat(editdob),
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
            })
            .catch(error => {
                console.error('Error fetching employee:', error);
            });
    } else {
        console.error('Edit form element not found');
    }
}

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

document.getElementById('editavatars').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            
            const editImagePreview = document.getElementById('editImagePreview');
            editImagePreview.src = e.target.result;
            editImagePreview.style.display = 'block';
            
        };
        reader.readAsDataURL(file);
    }
});

