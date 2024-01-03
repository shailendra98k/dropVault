const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const download = require("download");
require("./config/mongoose");
require("./config/sequelize");
require("./config/nodeMailer");
const {
  getEmailVerifyContent,
  getVerificationSuccessContent,
} = require("./utils");
const app = express();
const PORT = 8000;
const Directory = require("./Model/Directory");
const File = require("./Model/File");
const User = require("./Model/User");
const { createDecipher } = require("crypto");
const { v4: uuid } = require("uuid");
const mailer = require("./config/nodeMailer");

app.use(fileUpload());

var corsOptions = {
  origin: ["http://www.example.com/", "http://localhost:3000"],
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(bodyParser());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/create_directory", (req, res) => {
  console.log("Req Body is: ", req.body);
  console.log("Creating Directory: ", { dir: req.body.directory, files: [] });
  Directory.create({ dir: req.body.directory, files: [] });
  res.send("Done");
});

app.get("/get_files", (req, res) => {
  console.log("Curr_dir is: ", req.query.dir);
  Directory.find({ dir: req.query.dir }).then((dir) => {
    console.log(dir);
    res.send(dir[0]);
  });
});

app.post("/api/v1/addNewFolder", (req, res) => {
  const currDir = req.body.currDir;
  const newFolderName = req.body.name;
  const dir_path =
    req.body.current_dir == "/"
      ? `/${req.body.user_id}/${req.body.name}`
      : `/${req.body.user_id}${req.body.current_dir}/${req.body.name}`;
  const base_dir =
    req.body.current_dir == "/"
      ? `/${req.body.user_id}`
      : `/${req.body.user_id}${req.body.current_dir}`;
  console.log("Dir_path is: ", base_dir);
  Directory.findOne({ dir_path: base_dir }).then(async (dir) => {
    console.log("Dir in new folder is: ", dir);
    const data = {
      name: req.body.name,
      dir_path: dir_path,
    };

    const directory = await Directory.create(data);
    dir.sub_dirs.push(directory.id);

    fs.mkdir(`${__dirname}/../storage${dir_path}`, (err) => {
      console.log(`${__dirname}/../storage${dir_path}  created...`);
    });
    dir.save();
    res.status(201);
  });
});

app.post("/api/v1/add-document", async (req, res) => {
  console.log("Req is: ", req.body);

  //   var bodyFormData = new FormData();
  //   bodyFormData.append('file', "Hi")
  //   bodyFormData.append('filename', 'abcccdd.txt');
  //   bodyFormData.append('description',"aded from React Dropbox" );
  //
  //   axios.post("http://127.0.0.1:8001/document-add/",data, headers).then((res)=>{
  //        console.log("Resonse from file server: ", res.data)
  //   }).catch((err)=>{
  //        console.log("Error from file server: ",err)
  //   })
  //
  //   console.log("Req body : ", req.body)
  //   console.log("Req fils : ", req.files)

  const dir_path =
    req.body.current_dir == "/"
      ? `/${req.body.user_id}`
      : `/${req.body.user_id}${req.body.current_dir}`;

  const dir = await Directory.findOne({ dir_path: dir_path });

  console.log(`upload${req.body.current_dir}`);
  console.log("Dir receive drom databse is, ", dir);
  console.log("Request body is: ", req.body);

  var metadata = {};
  metadata["filename"] = req.body.name;
  metadata["size"] = req.body.size;
  metadata["type"] = req.body.type;
  metadata["id"] = req.body.id;

  console.log("Creating File onject");
  const file = await File.create(metadata);
  console.log("created file onject", file);
  dir.files.push(file._id);

  dir.save();
  console.log("File pushed in dir and saved", dir);
  return res.status(200).send("File is associated with the user");
});

app.get("/view", (req, res) => {
  res.sendFile(`${__dirname}\\upload\\${req.query.filename}`);
});

app.post("/api/v1/sign-up/", async (req, res) => {
  /**
   * On signup, 3 task needs to be performed
   * 1. Obviously, user need to be cretaed in (Mysql DB)
   * 2. A directory to be creteas specificly for that user in the storage
   * 3. Now that directory is created, we need to store the new directory info in MongoDB
   */
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  console.log("User is: ", user);
  if (user && user.verfied) {
    return res.status(403).send("User with email already exists!!!");
  }
  if (user && !user.verfied) {
    const mailOptions = {
      from: "shailendra.kumar@dropvault.fun",
      to: req.body.email,
      subject: "Email Verification",
      html: getEmailVerifyContent(user.identifier),
    };

    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return res.status(403).send("Verification mail sent to email again");
  }

  //create a new user
  try {
    const new_user = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      identifier: uuid(),
    });
    await Directory.create({
      name: new_user.id,
      dir_path: `/${new_user.id}`,
    });
    const info = await mailer.sendMail({
      from: "shailendra.kumar@dropvault.fun", // Sender's email address
      to: req.body.email, // Recipient's email address
      subject: "Email Verification", // Subject of the email
      html: getEmailVerifyContent(user.identifier), // Email content in plain text
    });
    res.status(201).send("Verification mail sent to email");
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/v1/sign-in/", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (!user) {
    return res.status(403).send("Incorrect credentials!!!");
  }
  if (!user.verified) {
    return res
      .status(403)
      .send("Please verify this account vis link sent on email!!!");
  }

  //TODO: Return bearerToken in the cookie response header
  //TODO: bearerToken mechanism should be implemented first

  return res.status(200).json({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
});

app.get("/api/v1/account-verify/:id", async (req, res) => {
  const user = await User.findOne({
    where: {
      identifier: req.params.id,
    },
  });
  if (!user) {
    return res.status(400).send("Bad Request");
  }
  await user.update({
    verified: true,
  });

  return res.status(200).send(getVerificationSuccessContent());
});

app.post("/api/v1/", (req, res) => {
  let dir_path =
    req.body.current_dir == "/"
      ? `/${req.body.user_id}`
      : `/${req.body.user_id}${req.body.current_dir}`;
  Directory.findOne({ dir_path: dir_path })
    .populate({ path: "files", options: { sort: { updatedAt: -1 } } })
    .populate({ path: "sub_dirs" })
    .then((dir) => {
      console.log("Dir and data is:", dir);
      if (!dir)
        return res.send({
          sub_dirs: [],
          files: [],
        });
      const data = {
        sub_dirs: dir.sub_dirs,
        files: dir.files,
      };

      return res.send(data);
    });
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT);
});
