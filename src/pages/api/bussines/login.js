import jwt from 'jsonwebtoken'

export default class Login {
  constructor(){
    
  }

  async getUser(token) {
    console.log(process.env.JWT)
    const decoded = jwt.verify(token, process.env.JWT);

    const securityToken = jwt.sign({
      name: decoded.user,
      uuid: 'AF383Rhd9DPdH38H2AWSE',
    }, process?.env?.JWT);
    
    return securityToken
  }

}