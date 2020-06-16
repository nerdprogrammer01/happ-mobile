import { DoctorModel } from "./DoctorModel";
import { MemberModel } from "./MemberModel";

export type AppointmentModel = {
  id:string;
  title: string;
  doctor: DoctorModel;
  appointmentDate: Date;
  locationName: string;
  member:MemberModel;
  service:string;
  duration:number;
};
