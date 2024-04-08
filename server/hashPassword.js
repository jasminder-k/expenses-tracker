const bcrypt = require("bcrypt");

const hashPassword = async (incomingPassword) => {

  const hashedPassword = await bcrypt.hash(incomingPassword, 10);
  
  console.log(hashedPassword);
  //validates password if it is same
  const test1 = await bcrypt.compare(incomingPassword, hashedPassword);
  console.log(test1);
  return hashedPassword;
};


hashPassword("Test1");
hashPassword("Test2");