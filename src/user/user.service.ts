import { HttpException, Injectable, Logger } from '@nestjs/common';
import Joi from 'joi';
import { IUserInfomation } from 'src/interface/IUserInfomation.interface';
import { UserInfomationSchema } from 'src/schema/UserInfomation.schema';
import * as fs from 'fs';
import { join } from 'path';


@Injectable()
export class UserService {
    logger = new Logger(UserService.name)

    position: Array<string> = ["Backend Developer", "Frontend Developer", "DevOps"]

    location: Record<string, Record<string, string>> = {
        "Downtown": {
            district: "Central",
            province: "SomeProvince",
            postalCode: "12345",
        },
        "UpTown": {
            district: "West",
            province: "SomeProvince",
            postalCode: "54321",
        },
        "ChinaTown": {
            district: "East",
            province: "SomeProvince",
            postalCode: "13579",
        },
    }
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
            profilePic: "1_profileImage.jpeg",
            coverPic: "1_coverImage.jpeg",
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
                { year: "2010", university: "Some University" },
                { year: "2014", university: "Another University" },
                { year: "2018", university: "Another University" },
                { year: "2022", university: "Another University" }
            ],
            experienceInfo: [
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
                subdistrict: "UpTown",
                district: "West",
                province: "SomeProvinc2",
                postalCode: "54321",
                facebook: "john.doe",
                lineId: "john_doe_line",
                instagram: "john_doe_insta"
            },
            educationInfo: [
                { year: "2010", university: "Some University" },
                { year: "2014", university: "Another University" }
            ],
            experienceInfo: [
                { fromDate: "2015-01-01", toDate: "2017 - 12 - 31", experience: "Software Developer" },
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
        3:
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
                subdistrict: "UpTown",
                district: "West",
                province: "SomeProvinc2",
                postalCode: "54321",
                facebook: "john.doe",
                lineId: "john_doe_line",
                instagram: "john_doe_insta"
            },
            educationInfo: [
                { year: "2019", university: "20000" },

            ],
            experienceInfo: [
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

    async downloadFile(filename: string) {
        try {
            const file = join('/Users/titi.cha/Code/project/user-profile-nest/dist/images/', filename)
            const buffer = fs.readFileSync(file)
            return buffer
        } catch (err) {
            this.logger.error(err)
        }
    }

    async getPosition() {
        try {
            return this.position
        } catch (err) {
            this.logger.error(err)
        }
    }

    async getLocation() {
        try {
            return this.location
        } catch (err) {
            this.logger.error(err)
        }
    }

    async createUser(body: any) {
        try {
            let allUser = Object.keys(this.userInfo)
            let latestUser = allUser.length + 1
            this.userInfo[latestUser] = body
            return latestUser
        } catch (err) {
            this.logger.error(err)
        }
    }

    async receivefile(buffer: Buffer, id: number, fieldname: string, filename: string) {
        try {
            const findDot = filename.indexOf('.')
            const fileType = filename.substring(findDot)
            const newFilename = id.toString() + '_' + fieldname + fileType
            const located = join(__dirname, '../images/', newFilename)

            fs.writeFile(located, buffer, (err) => {
                if (err) {
                    this.logger.error(err)
                }
            });
            if (fieldname == 'profileImage') {
                this.userInfo[id]['profilePic'] = newFilename
            } else if (fieldname == 'coverImage') {
                this.userInfo[id]['coverPic'] = newFilename
            }
            console.log(located)
        } catch (err) {
            this.logger.error(err)
        }
    }
}
