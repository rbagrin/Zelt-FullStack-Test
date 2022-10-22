import { Body, Controller, Get, Post, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkLoggedIn(request: Request): Promise<void> {
    try {
      const cookie = request.cookies['token'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException('Unauthorized.');
    } catch {
      throw new UnauthorizedException('Unauthorized.');
    }
  }

  @Post('/register')
  async register(
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<void> {
    this.appService.register(name, password);
  }

  @Post('/login')
  async login(
    @Body('name') name: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const token = await this.appService.login(name, password);

    response.cookie('token', token, { httpOnly: true });
    return 'Success';
  }

  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    response.clearCookie('token');
    return 'Success';
  }

  @Get('/check_login_status')
  async checkLoginStatus(@Req() request: Request): Promise<boolean> {
    try {
      await this.checkLoggedIn(request);
      return true;
    } catch {
      return false;
    }
  }

  @Get('/hello-world')
  helloWorld(): string {
    return 'Hello World!';
  }
}
