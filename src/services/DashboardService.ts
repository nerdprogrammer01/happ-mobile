import { DashboardItemsModel, AppointmentModel } from "../models";
import { doctorsList, campaignList, departmentList } from "../datas";
import moment from "moment";

export const globalAppointmentDate = moment(new Date())
  .add(7, "days")
  .hour(14)
  .minute(30)
  .toDate();

export const globalAppointment: AppointmentModel = {
  id:"1",
  title: "Upcoming appoinment",
  token:"",
  doctor: {
    id:"1",
    fullName: "Dr. Busra Tekin",
    about: "About",
    title: "Doctor",
    imageUrl:
      "https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png",
    isOnline: true,
    rating: 5,
    reviews: []
  },
  member: {fullName: "Chima", title:"Patient", imageUrl:
  "https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png",  about: "About", isOnline: true
},
  appointmentDate: globalAppointmentDate,
  locationName: "Central Hospital",
  service : "hello",
  duration : 30
};

export default class DashboardService {
  public static getDashboardItems(): Promise<DashboardItemsModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const model: DashboardItemsModel = {
          appointment: globalAppointment,
          campaigns: campaignList,
          doctors: doctorsList,
          departments: departmentList
        };
        resolve(model);
      }, 100);
    });
  }
}
