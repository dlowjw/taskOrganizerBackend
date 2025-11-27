const fs = require("fs");

class BaseController {
  constructor(filename) {
    this.filename = filename;
    this.read = (req, res) => {
      return res.send(JSON.parse(fs.readFileSync(this.filename)));
    };
    this.write = (req, res) => {
      try {
        const data = req.body;
        // const read = this.read();
        fs.writeFileSync(this.filename, JSON.stringify(data));

        res.status(201).json({
          msg: "data saved...",
        });
      } catch (error) {
        res.status(500).send(error.toString());
      }
    };
    this.update = (req, res) => {
      const readData = this.read();
      readData[req.params.id] = {
        ...readData[req.params.id],
        ...req.body,
      };
      res.status(200).json({
        msg: "data updated",
        data: json[req.params.index],
      });
    };

    this.delete = (id) => {
      const readData = this.read();
      if (id > readData.length - 1) throw new Error("INDEX OTU OF RANGE");
      readData.splice(id, 1);
      return this.write(readData);
    };
  }

  test(req, res) {
    res.send("ok");
  }
}

module.exports = BaseController;
