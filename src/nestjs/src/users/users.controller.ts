import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Put, UseInterceptors,} from '@nestjs/common';
import {CreateAddressDto, CreateUserDto, UpdateUserDto} from './dto';
import {AddressPresenter, UserPresenter, UserUpdatePresenter} from './presenter/';
import {
    CreateAddressUseCase,
    CreateUserUseCase,
    DeactivateUserUseCase,
    DeleteAddressUseCase,
    GetAddressUseCase,
    UpdateUserUseCase
} from '@pds/academy-core/user/application';
import {ExcludeNullInterceptor} from 'src/@share/interceptors/exclude-null.interceptor';
import {GetCurrentUserId, Public} from "src/auth/decorators";


@Controller('user')
export class UsersController {
    @Inject(CreateUserUseCase.UseCase) private createUserUseCase: CreateUserUseCase.UseCase;

    @Inject(UpdateUserUseCase.UseCase) private updateUserUseCase: UpdateUserUseCase.UseCase;

    @Inject(DeactivateUserUseCase.UseCase) private deactivateUserUseCase: DeactivateUserUseCase.UseCase;

    @Inject(CreateAddressUseCase.UseCase) private createAddressUseCase: CreateAddressUseCase.UseCase

    @Inject(DeleteAddressUseCase.UseCase) private deleteAddressUseCase: DeleteAddressUseCase.UseCase

    @Inject(GetAddressUseCase.UseCase) private getAddressUseCase: GetAddressUseCase.UseCase


    @Post() @Public() @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        const output = await this.createUserUseCase.execute(createUserDto);
        return new UserPresenter(output);
    }

    @Put() @UseInterceptors(ExcludeNullInterceptor) @HttpCode(HttpStatus.OK)
    async update(@Body() updateUserDto: UpdateUserDto, @GetCurrentUserId() userId: string) {
        const output = await this.updateUserUseCase.execute({id: userId, ...updateUserDto});
        return new UserUpdatePresenter(updateUserDto);
    }

    @Delete() @HttpCode(HttpStatus.OK)
    async delete(@GetCurrentUserId() userId: string) {
        await this.deactivateUserUseCase.execute({id: userId})
    }

    @Put('address') @UseInterceptors(ExcludeNullInterceptor) @HttpCode(HttpStatus.OK)
    async update_address(@Body() createAddressDto: CreateAddressDto, @GetCurrentUserId() userId: string) {
        const output = await this.createAddressUseCase.execute({id: userId, ...createAddressDto});
        return new AddressPresenter(output);
    }

    @Get('address') @HttpCode(HttpStatus.OK)
    async get_address(@GetCurrentUserId() userId: string) {
        const output = await this.getAddressUseCase.execute({id: userId});
        return new AddressPresenter(output);
    }

    @Post('address') @UseInterceptors(ExcludeNullInterceptor) @HttpCode(HttpStatus.OK)
    async create_address(@Body() createAddressDto: CreateAddressDto, @GetCurrentUserId() userId: string) {
        const output = await this.createAddressUseCase.execute({id: userId, ...createAddressDto});
        return new AddressPresenter(createAddressDto);
    }

    @Delete('address') @HttpCode(HttpStatus.OK)
    async delete_address(@Body() @GetCurrentUserId() userId: string) {
        await this.deleteAddressUseCase.execute({id: userId});
    }

}
