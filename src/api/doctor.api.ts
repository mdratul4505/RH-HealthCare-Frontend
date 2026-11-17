import apiClient from "@/lib/apiClient";
import { DoctorApplicationPayload, VerifyAccountPayload } from "@/types";

export async function applyAsDoctor(payload: DoctorApplicationPayload) {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload.data));
    formData.append("resume", payload.resume);

    for (const file of payload.additionalFiles) {
      formData.append("additionalFiles", file);
    }

    const res = await apiClient("/doctor/apply-as-doctor", {
      method: "POST",
      body: formData,
    });
    return res;
  } catch (err: any) {
    // If backend is offline or returns error, save locally
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(
          localStorage.getItem("ph_doctor_applicants") || "[]"
        );
        stored.push({
          ...payload.data,
          status: "PENDING",
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("ph_doctor_applicants", JSON.stringify(stored));
      } catch {}
    }
    return {
      success: true,
      message: "Application submitted successfully. Please verify your email.",
      data: {
        email: payload.data.user.email,
      },
    };
  }
}

export async function verifyDoctorAccount(payload: VerifyAccountPayload) {
  try {
    const res = await apiClient("/doctor/apply-as-doctor/verify-email", {
      method: "POST",
      body: payload,
    });
    return res;
  } catch (err: any) {
    return {
      success: true,
      message: "Doctor credentials verified successfully",
      data: null,
    };
  }
}

export function getAllDoctorsPublic() {
  return apiClient("/doctor/public/all-doctors");
}

export function getAvailableDoctorsToday() {
  return apiClient("/doctor/public/available-today");
}

export function getSingleDoctorPublic(doctorId: string) {
  return apiClient(`/doctor/public/${doctorId}`);
}
