exports.getMessage = (req,res) => {
  res.json({
   "messages": [
     {"text": "Welcome to our store!"},
     {"text": "How can I help you?"}
   ]
  })
};
