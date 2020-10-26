'use strict';

var emplist;

var $ = function (id) {
    return document.getElementById(id);
}
window.addEventListener('load', employee);

function employee() {
    emplist = [
        {name: "Michael Scofield", title: "Applied Scientist", extension:3109 },
        {name: "Lincoln Burrows", title: "SDE", extension: 3110},
        {name: "Sara Tancredi", title: "HR", extension: 3112},
        {name: "Fernando Sucre", title: "Finance", extension: 3113},
    ];

    loadEmployees();

    var addBtn = $('newEmployee');
    addBtn.addEventListener('click', increaseEmployee);
}

function clear(form) {
    form.reset();
    var errorNodes = form.querySelectorAll('.error');
    for (var i = 0; i < errorNodes.length; i++) {
        errorNodes[i].classList.add('hide');
    }
}

function throwError(element) {
    var error = element.parentNode.querySelector('.error');
    error.innerHTML = "Mandatory field";
    error.classList.remove('hide');
}

function deleteEmployee(extension) {
    emplist = emplist.filter(function(employee) {
        return employee.extension != extension;
    });

    loadEmployees();
}

function loadEmployees() {
    var table = $('employeesTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for (var i = 0; i < emplist.length; i++) {
        var row = document.createElement('tr');
        row.insertCell(0).innerHTML = emplist[i].name;
        row.insertCell(1).innerHTML = emplist[i].title;
        row.insertCell(2).innerHTML = emplist[i].extension;

        var deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', emplist[i].extension);
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener('click', function(e) {
            var extension = e.currentTarget.id;
            deleteEmployee(extension);
        });

        row.insertCell(3).append(deleteBtn);

        tbody.append(row);
    }

    var count = $('employeeCount');
    count.innerHTML = emplist.length;
}

function increaseEmployee(event) {
    event.preventDefault();

    var hasError = false;
    var form = event.currentTarget.closest('form');
    var name = form.querySelector('input[name="name"]');
    var title = form.querySelector('input[name="title"]');
    var extension = form.querySelector('input[name="extension"]');

    var requiredFields = [name, title, extension];
    for (var i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value === '') {
            throwError(requiredFields[i]);
            hasError = true;
        }
    }

    if (hasError) {
        return false;
    }

    emplist.push({
        name: name.value,
        title: title.value,
        extension: extension.value
    });

    loadEmployees();
    clear(form);
}



