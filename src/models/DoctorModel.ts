import { ReviewModel } from "./ReviewModel";
import {AppointmentTimeModal} from "./AppointmentTimeModal";

export type DoctorModel = {
  id:string;
  fullName: string;
  title: string;
  imageUrl: string;
  about: string;
  isOnline: boolean;
  rating: number;
  reviews?: ReviewModel[];
};
