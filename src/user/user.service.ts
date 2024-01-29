import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) {}

    /**
     * Fetch all agent
     * users
     * @returns mixed
     * @throws BadRequestException
     */
    
    async fetchAllUsers () {
        try {
            const users = await this.prisma.user.findMany({});
            if(!users){
                throw new BadRequestException("No record found");
            }
            return users;
        } catch (error) {
            throw error;
        }
    }
}
