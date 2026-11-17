import apiClient from "@/lib/apiClient";

export interface BookAppointmentPayload {
  doctorId: string;
  scheduleId?: string;
  slotTime?: string;
}

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient("/appointment/book-appointment", {
    method: "POST",
    body: payload,
  });
}

export function payAppointment(appointmentId: string) {
  return apiClient("/appointment/pay-appointment", {
    method: "POST",
    body: { appointmentId },
  });
}

export function getMyAppointments() {
  return apiClient("/appointment/my-appointments");
}

export function getDoctorAppointments() {
  return apiClient("/appointment/doctor-appointments");
}

export function getAllAppointmentsAdmin() {
  return apiClient("/appointment/all-appointments");
}

export function getSingleAppointment(appointmentId: string) {
  return apiClient(`/appointment/${appointmentId}`);
}
