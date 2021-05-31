interface Appointments {
    id: string;
    patientID: string;
    requestReason: string;
    requestedDate: string;
    status: string;
    doctorID: string;
    statusReason: string;
}

interface Patients {
    id: string;
    name: string;
    photoURL: string;
    type: string;
}

interface Doctors {
    id: string;
    name: string;
    photoURL: string;
    type: string;
}