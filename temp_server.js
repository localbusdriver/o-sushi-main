app.get("/register", userController.getRegister);
app.post("/register", userController.postRegister);

app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);

app.post("/logout", userController.postLogout);

app.get("/member", userController.getMemberPage);

//Display password reset page
app.get("/reset-password", userController.getResetPassword);

//Process password reset request
app.post("/reset-password", userController.postResetPassword);

//Use token to display password set page
app.get("/reset/:token", userController.getNewPassword);

//set the new password
app.post("/new-password", userController.postNewPassword);

app.get("/item/:itemId", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.itemId));
  if (!item) {
    return res.status(404).send("Item not found");
  }
  // Set the headers
  res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
  res.setHeader("Expires", new Date(Date.now() + 3600000).toUTCString()); // 1 hour from now
  res.setHeader("Last-Modified", new Date().toUTCString()); // Current server time

  res.json(item);
});

app.put("/item/:itemId", ensureAuthenticated, (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.itemId));
  if (!item) {
    return res.status(404).send("Item not found");
  }

  item.name = req.body.name || item.name;
  item.description = req.body.description || item.description;
  item.image = req.body.image || item.image;

  res.json(item);
});

app.delete("/item/:itemId", ensureAuthenticated, (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.itemId)
  );
  if (itemIndex === -1) {
    return res.status(404).send("Item not found");
  }
  items.splice(itemIndex, 1);
  res.json({ msg: "Item deleted" });
});

app.post("/item", ensureAuthenticated, (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };
  items.push(newItem);
  res.json(newItem);
});
