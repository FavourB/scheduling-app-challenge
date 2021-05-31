import {API_ROOT} from './constants'

export const getAppointments = async () => {
    try {
        const appointments = await fetch(`${API_ROOT}/appointments`);
        return appointments.json();
        
    } catch (error) {
        console.log(error)
    }
}

export const getDoctors = async () => {
    try {
        const doctors = await fetch(`${API_ROOT}/doctors`);
        return doctors.json();
    } catch (error) {
        console.log(error)
    }
}

export const getPatients = async () => {
    try {
        const patients = await fetch(`${API_ROOT}/patients`);
        return patients.json();
    } catch (error) {
        console.log(error)
    }
}

export const cancelAppointment = async () => {
    try {
        const patients = await fetch(`${API_ROOT}/patients`);
        return patients.json();
    } catch (error) {
        console.log(error)
    }
}
