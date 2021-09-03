const express = require('express');
const app = express();
const httpsRequest = require('https');

/* Assigning Port number */
const port = 3000;

/* creating the Server and listen to the assigned port */
app.listen(port, "0.0.0.0", () => {
    console.log(`Server Started successfully in port ${port}`);
});

app.get('/users', async (req, res) => {

    try {

       await httpsRequest.get('https://jsonplaceholder.typicode.com/users', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                let results = JSON.parse(data);

                let phoneLists = results.map((value)=> {
                    return {phone : value.phone}
                });
                return res.status(200).json({ phoneNumbers: phoneLists });
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            return res.status(400).json({ errorMessage: err });
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ errorMessage: err });
    }

})

