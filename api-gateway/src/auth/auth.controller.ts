import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req) {
    return await this.authService.signIn(req.user);
  }

  @Post('signup')
  async signup(@Body() campos: UserDTO) {
    return await this.authService.singUp(campos);
  }
}
