import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// https://api.api-ninjas.com/v1/animals?name=

app.get("/", async (req, res) => {
    res.render( __dirname + "/views/home.ejs");
});

app.post('/search', async (req, res) => {
    const apiKey = 'OBzQBOIgLTk/OHoGfxaZxA==NmbPaoVclpLSEPAC';
    const query = await req.body.q // Get the search query from the URL query string
    console.log(query);

    try {
        const response = await axios.get("https://api.api-ninjas.com/v1/animals?name=" + query, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const data = response.data;
        console.log(data);
        const { name, taxonomy, locations, characteristics } = data[0];
        res.render(__dirname + "/views/search.ejs", { name, taxonomy, locations, characteristics });
    } catch (error) {
        const name = null;
        console.error('Error fetching data:', error);
        res.render( __dirname + "/views/search.ejs", { error, name });
    }

});

app.listen(port, () => {
    console.log(`Server is running on ${ port }.`);
});
