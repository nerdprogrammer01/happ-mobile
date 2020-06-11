import { DoctorModel } from "./DoctorModel";

export type NewAppointmentModel = {
  appointmentDate?: Date;
  appointmentType: string;
  appointmentCategory:string;
  appointmentActivity:string;
  doctor?: DoctorModel;
  appointmentService?:string;
  fee? : number;
};