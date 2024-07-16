import { HttpException, Injectable, Logger } from '@nestjs/common';
import { IUserInfomation } from 'src/interface/IUserInfomation.interface';

@Injectable()
export class UserService {
    logger = new Logger(UserService.name)

    userInfo: Record<number, IUserInfomation> = {
        1:
        {
            username: "john_doe",
            nickname: "John",
            firstname: "John",
            lastname: "Doe",
            position: "Developer",
            nationality: "Thai",
            tel: "123-456-7890",
            startDate: "2023-01-01",
            profilePic: "path/to/profilePic.jpg",
            coverPic: "path/to/coverPic.jpg",
            contactInfo: {
                address: "123 Main St",
                subdistrict: "Downtown",
                district: "Central",
                province: "SomeProvince",
                postalCode: "12345",
                facebook: "john.doe",
                lineId: "john_doe_line",
                instagram: "john_doe_insta"
            },
            educationInfo: [
                { year: 2010, university: "Some University" },
                { year: 2014, university: "Another University" }
            ],
            expirienceInfo: [
                { fromDate: "2015-01-01", toDate: "2017-12-31", experience: "Software Developer" },
                { fromDate: "2018-01-01", toDate: "2022-12-31", experience: "Senior Developer" }
            ],
            skillInfo: [
                { skill: "JavaScript", rate: 8 },
                { skill: "TypeScript", rate: 7 },
                { skill: "Angular", rate: 7 }
            ],
            interestInfo: ["Coding", "Music", "Gaming"],
            guildInfo: ["Developer Guild", "Music Guild"]
        },
        2:
        {
            username: "john_doe",
            nickname: "John",
            firstname: "John",
            lastname: "Doe",
            position: "Developer",
            nationality: "Thai",
            tel: "123-456-7890",
            startDate: "2023-01-01",
            profilePic: "path/to/profilePic.jpg",
            coverPic: "path/to/coverPic.jpg",
            contactInfo: {
                address: "123 Main St",
                subdistrict: "Downtown",
                district: "Central",
                province: "SomeProvince",
                postalCode: "12345",
                facebook: "john.doe",
                lineId: "john_doe_line",
                instagram: "john_doe_insta"
            },
            educationInfo: [
                { year: 2010, university: "Some University" },
                { year: 2014, university: "Another University" }
            ],
            expirienceInfo: [
                { fromDate: "2015-01-01", toDate: "2017-12-31", experience: "Software Developer" },
                { fromDate: "2018-01-01", toDate: "2022-12-31", experience: "Senior Developer" }
            ],
            skillInfo: [
                { skill: "JavaScript", rate: 8 },
                { skill: "TypeScript", rate: 7 },
                { skill: "Angular", rate: 7 }
            ],
            interestInfo: ["Coding", "Music", "Gaming"],
            guildInfo: ["Developer Guild", "Music Guild"]
        }
    }

    async getUser(id: string) {
        try {
            const userDetails = this.userInfo[id]
            if (userDetails) {
                return userDetails
            }
        } catch (err) {
            this.logger.error(err)
        }
    }
}
