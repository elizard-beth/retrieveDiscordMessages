// this was a quick and dirty js -> ts conversion... i just ended up using `any`

const fs: any = require('fs'); // Used for reading and writing to files
const { csvParse }: any = require('csv-string').parse; // Used to parse to an array
const dir: any = fs.opendirSync('./messages');
let dirent: any = null; 

while ((dirent = dir.readSync()) !== null) {
  if (dirent.name === "index.json") break; // index.json is TYPICALLY the final file in this folder, it is also not a folder.
  fs.readFile(`./messages/${dirent.name}/messages.csv`, 'utf8', function (err: string, data: string) { // Read the csv file
    let data2: any;
    if (err) console.log(err); // You know the drill, if it errors, tell the user
    data.replace('"', '“'); // Used to prevent errors in the JSON in relation to quotation characters
    data2 = csvParse(data); // Parse to an array
    data2 = data2.map(array => array.filter((_, index: number) => (index + 1) % 3 === 0)); // Removes dates, and message ids, remove if you wish to keep

    fs.writeFile('information.json', JSON.stringify(data2), function (err: string) { // Write the csv file contents to the JSON file
       if (err) console.log(err); // Ditto...
    });
  });
}
dir.closeSync();

console.log("Completed, check information.json.") // Tell the user the script is complete
