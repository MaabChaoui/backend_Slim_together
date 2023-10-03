import { Request, Response } from "express";
import { ILoginRequest } from "../../interfaces/requests.interfaces";
import { ILoginResponse } from "../../interfaces/responses.interfaces";
import { IResponseError } from "../../interfaces/responses.errors";

export async function userLoginController(req: Request, res: Response) {
  let resp: ILoginResponse;

  const { email, password }: ILoginRequest = req.body;

  //validate form?
  
  //login logic
    if (email && password){
        // @ts-ignore
        console.log("userLoginController: ",req.session)
        //check if email is registered

        //check if password is correct
    }
    else{
      //send message "email or password missing"
    }


  
  
  //if login successful, send User back to res
  /* req.session.user = {
    username: 'exampleUser',
    email: 'user@example.com',
  }; */
  //test api
  //console.log(req.body);

  res.json({
    message: "user logged in",
    email: email,
    password: password,
  });
}

export async function doctorLoginController(req: Request, res: Response) {
    const { email, password }: ILoginRequest = req.body;
    res.json(null)
}
