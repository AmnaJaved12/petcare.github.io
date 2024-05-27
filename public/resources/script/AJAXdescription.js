

alert("External JavaScript is working");

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/descriptions", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                displayData(data);
            } else {
                console.error('Error fetching data:', xhr.status);
                // Handling error display or logging here
            }
        }
    };
    xhr.send();
};

function displayData(data) {
    var tableBody = document.getElementById("tableBody");
    data.forEach(function(item) {
        var row = tableBody.insertRow();
        var idCell = row.insertCell(0);
        var titleCell = row.insertCell(1);
        var descriptionCell = row.insertCell(2);

        idCell.textContent = item._id;
        titleCell.textContent = item.Title;
        descriptionCell.textContent = item.Description;
    });
}
