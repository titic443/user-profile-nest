import { Transform, Type } from "class-transformer"
import { IContactInfo, IEducationInfo, IExperienceInfo, ISkillInfo } from "./IUserInfomation.interface"

export class BodyRequestDTO {
    username: string = ''
    nickname: string = ''
    firstname: string = ''
    lastname: string = ''
    position: string = ''
    nationality: string = ''
    tel: string = ''
    startDate: string = ''
    profilePic: string = ''
    coverPic: string = ''
    @Transform((v) => JSON.parse(v.value))
    contactInfo: IContactInfo = {}
    @Transform((v) => JSON.parse(v.value))
    educationInfo: IEducationInfo[] = []
    @Transform((v) => JSON.parse(v.value))
    experienceInfo: IExperienceInfo[] = []
    @Transform((v) => JSON.parse(v.value))
    skillInfo: ISkillInfo[] = []
    @Transform((v) => JSON.parse(v.value))
    interestInfo: string[] = []
    @Transform((v) => JSON.parse(v.value))
    guildInfo: string[] = []
}