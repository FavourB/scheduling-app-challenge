import { FunctionComponent } from 'react';
import Moment from 'react-moment';
import './Appointments.css';

export interface AppointmentRowProps {
    appointment : Appointments
    doctors : Doctors[]
    patients: Patients[]
    cancelAppointment: (id: string) => void
    confirmAppointment: (id: string) => void
}
 
const AppointmentRow: FunctionComponent<AppointmentRowProps> = (props: AppointmentRowProps) => {
    const {patients, doctors, appointment, confirmAppointment, cancelAppointment} = props;
    return ( 
        <tr className={appointment.status === "completed" || appointment.status === "cancelled" ? "overlay" : ""}>
            <td className="cell-one">           
                {patients.filter(patient => patient.id === appointment.patientID).map(patient => (
                    <div key={patient.id}> 
                        <span className="title">Patient</span> : <span>{patient.name}</span>
                        <div><img src={patient.photoURL} alt="patient" className="image"/> </div>
                    </div>
                ))}
            </td>
            <td className="cells">
                <div >
                    <span className="title">Date</span>: <Moment format="DD MMM, YYYY">{appointment.requestedDate}</Moment>
                </div>
                <div>
                    <span className="title">Reason</span>: <br/>
                    {appointment.requestReason} 
                </div>
                <div>
                    {(appointment.status === "new" || appointment.status === "confirmed") && <span><span className="title">Actions</span> : <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button></span> }
                    {appointment.status === "new" && <button onClick={() => confirmAppointment(appointment.id)} className="button">Confirm</button>}
                </div>           
            </td>
            <td className="cells">
                {appointment.status === "new" ?  <span><span className="title">Doctor</span>: unassigned</span> : 
                <div>{doctors.filter(doctor => doctor.id === appointment.patientID).map(doctor => (
                    <div key={doctor.id}> <span className="title">Doctor</span > : <span>{doctor.name}</span>
                    <div><img src={doctor.photoURL} alt="patient" className="image"/> </div></div>
                ))}</div>
                }    
            </td>
        </tr>
     );
}
 
export default AppointmentRow;