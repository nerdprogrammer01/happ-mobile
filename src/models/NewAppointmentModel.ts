import { DoctorModel } from "./DoctorModel";

export type NewAppointmentModel = {
  appointmentDate?: Date;
  appointmentType: number;
  appointmentCategory:number;
  appointmentActivity:number;
  doctor?: DoctorModel;
  appointmentService?:number;
  fee? : number;
};