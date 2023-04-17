import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPresenter } from './presenter/user.presenter';
import {
  CreateUserUserCase,
  UpdateUserUseCase,
} from '@pds/academy-core/src/user/application';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUpdatePresenter } from './presenter/user-update.presenter';
import { ExcludeNullInterceptor } from '../@share/interceptors/exclude-null.interceptor';

@Controller('user')
export class UsersController {
  @Inject(CreateUserUserCase.UseCase)
  private createUserUseCase: CreateUserUserCase.UseCase;

  @Inject(UpdateUserUseCase.UseCase)
  private updateUserUseCase: UpdateUserUseCase.UseCase;

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const output = await this.createUserUseCase.execute(createUserDto);
    return new UserPresenter(output);
  }

  @Put()
  @UseInterceptors(ExcludeNullInterceptor)
  async update(@Body() updateUserDto: UpdateUserDto) {
    const output = await this.updateUserUseCase.execute(updateUserDto);
    return new UserUpdatePresenter(updateUserDto);
  }
}
