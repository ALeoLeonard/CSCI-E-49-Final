const htmlHeadContent = `
    <head>
        <title>Chandra Observation Search</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nova+Square&family=Roboto+Slab:wght@300&display=swap" rel="stylesheet">
        <style>body {
    font-family: 'Roboto Slab', serif;
    padding: 20px;
    background-color: #f4f4f4;
    color: #333;
}

h1, h2 {
    font-family: 'Nova Square', sans-serif;
    color: #007bff;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th, td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

th {
    background-color: #007bff;
    color: white;
}

.signin-button, .signout-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    margin-top: 20px;
}

.signin-button:hover, .signout-button:hover {
    background-color: #0056b3;
} </style>
    </head>
`;

module.exports = htmlHeadContent
