import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error){
        console.log(error);
    }
};
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error){
        console.log(error);
    }
}

app.get('/', (req, res)=> {
    res.send('mi primer API con Nodejs');
});

app.get('/libros', (req, res)=> {
    const data = readData();
    res.json(data.libros);
});

app.get("/libros/:id", (req, res)=> {
    const data = readData();
    const id = parseInt(req.params.id);
    const libros = data.libros.find((libros) => libros.id == id);
    res.json(libros);
});

app.post("/libros", (req, res)=> {
    const data = readData();
    const body = req.body;
    const newlibros = {
        id: data.libros.length + 1,
        ...body, 
    };
    data.libros.push(newlibros);
    writeData(data);
    res.json(newlibros);
});

app.put("/libros/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const librosIndex = data.libros.findIndex((libros) => libros.id === id);
    data.libros[librosIndex] = {
        ...data.libros[librosIndex],
        ...body,
    };
    writeData(data);
    res.json({ massage: "Libro actualizado exitosamente"});
});

app.delete("/libros/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const librosIndex = data.libros.findIndex((libros) => libros.id === id);
    data.libros.splice(librosIndex, 1);
    writeData(data);
    res.json({ massage: "Libro eliminado exitosamente"});
});

app. listen(3000, () => {
    console.log('Server listening on port 3000');
});

