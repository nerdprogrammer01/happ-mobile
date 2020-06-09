import { ReviewModel } from "./ReviewModel";
import {AppointmentTimeModal} from "./AppointmentTimeModal";

export type DoctorModel = {
  fullName: string;
  title: string;
  imageUrl: string;
  about: string;
  isOnline: boolean;
  rating: number;
  reviews: ReviewModel[];
  times : AppointmentTimeModal[];
};
