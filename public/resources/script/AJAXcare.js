alert("External JavaScript is working");

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/titles", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var tableBody = document.getElementById("tableBody");
            data.forEach(function(movie) {
                var row = tableBody.insertRow();
                var idCell = row.insertCell(0);
                var titleCell = row.insertCell(1);
                idCell.textContent = movie._id;
                titleCell.textContent = movie.Title;
            });
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error('Error fetching data:', xhr.status);
            // Handling error display or logging here
        }
    };
    xhr.send();
};
