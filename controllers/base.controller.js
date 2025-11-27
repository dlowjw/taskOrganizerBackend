const fs = require("fs");

class BaseController {
  constructor(filename) {
    this.filename = filename;
    this.read = () => {
      return JSON.parse(fs.readFileSync(this.filename));
    };
    this.write = (data) => {
      return fs.writeFileSync(this.filename, JSON.stringify(data));
    };
    this.update = (id, data) => {
      const readData = this.read();
      readData[id] = {
        ...readData[id],
        ...data,
      };
      return this.write(readData);
    };

    this.delete = (id) => {
      const readData = this.read();
      if (id > readData.length - 1) throw new Error("INDEX OTU OF RANGE");
      readData.splice(id, 1);
      return this.write(readData);
    };
  }
}

module.exports = BaseController;
