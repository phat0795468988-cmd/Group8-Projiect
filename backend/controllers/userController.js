// controllers/userController.js

// mảng tạm lưu user
let users = [
  // ví dụ mẫu
  //{ id: 1697040000000, name: "Nguyen Van A", email: "a@example.com" }
];

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  // validation cơ bản
  if (!name || !email) {
    return res.status(400).json({ message: "Name và email là bắt buộc" });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Email không hợp lệ" });
  }

  // tạo id đơn giản (timestamp)
  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim()
  };

  users.push(newUser);

  return res.status(201).json(newUser);
};