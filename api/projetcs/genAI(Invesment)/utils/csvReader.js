import fs from 'fs';
import path from "path";
import csv from 'csv-parser';

const CSVReader = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on("error", (err) => reject(err))
    })
}

export default CSVReader 