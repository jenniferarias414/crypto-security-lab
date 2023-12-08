const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          let verifyPW = bcrypt.compareSync(password, users[i].passHash)
          if(verifyPW) {
            let userToReturn = {...users[i]}
            delete userToReturn.passHash
            return res.status(200).send(userToReturn)
          }
          // res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const { username, email, firstName, lastName, password, password2 } = req.body

        for(let i=0; i<users.length; i++){
          if(users[i].username === username){
            return res.status(401).send('username already exists')
          }
        }
        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)

        const msgObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }

        users.push(msgObj)
        let userToReturn = {...msgObj}
        delete userToReturn.passHash 
        res.status(200).send(userToReturn)
    }
}