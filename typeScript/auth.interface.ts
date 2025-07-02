

export interface IregisterProps {
    id: string;
    name: string;
    email: string;
    password: string;
    token: string;
    message: string;
    status: number;
}

export interface registerProps extends IregisterProps {
    user: IregisterProps
}



export interface loginResponse {
    id: string;
    name: string;
    email: string;
    password: string;
    token: string;
    message: string;
    status: number;
}

export interface loginProps extends loginResponse {
    user: loginResponse
}



export interface otpResponse {
    otp: string;
    email: string;
    message: string;
    status: number;
}

export interface otpProps extends otpResponse {
    data: otpResponse
}


export interface upDateResponse {
  user_id: string;
  password: string;
  message: string;
  status: number;
}

export interface updateProps extends upDateResponse {
  data: upDateResponse;
}
