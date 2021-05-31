import { FunctionComponent, useEffect, useState } from 'react';
import Moment from 'react-moment';
import {getAppointments, getDoctors, getPatients} from '../../API';
import { API_ROOT } from '../../constants';
import './Appointments.css';

export interface AppointmentsProps {
   
}
 
const Appointments: FunctionComponent<AppointmentsProps> = (props:AppointmentsProps) => {

    const [appointments, setAppointments] = useState<Appointments[]>([]);
    const [doctors, setDoctors] = useState<Doctors[]>([]);
    const [patients, setPatients] = useState<Patients[]>([]);
 
    useEffect(() => {
        getAppointments()
        .then(({ appointments  }: Appointments[] | any) => setAppointments(appointments)      
        )       
        .catch((err: Error) => console.log(err))
        getDoctors()
        .then(({ doctors  }: Doctors[] | any) => setDoctors(doctors)      
        )       
        .catch((err: Error) => console.log(err))
        getPatients()
        .then(({ patients  }: Patients[] | any) => setPatients(patients)      
        )       
        .catch((err: Error) => console.log(err))     
    }, []);
      console.log(appointments)
      console.log(doctors)
      console.log(patients)

    const cancelAppointment = async (id: string) =>{
        const newAppointments : Appointments[] | any = appointments.filter(a => a.id !== id)
        setAppointments(newAppointments)  
        const response = await fetch(`${API_ROOT}/appointments/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({reason : "Decided I don't like hospitals"})
        });
     
        const data = await response.json( );
        const appointment = data.appointment
        console.log(appointment);    
        getAppointments().then(({ appointments  }: Appointments[] | any) => setAppointments(appointments)      
        )  
     };
     
    const confirmAppointment = async (id: string) =>{
        const response = await fetch(`${API_ROOT}/appointments/${id}/confirm`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({doctorID: id})
        });
     
        const data = await response.json( );
        const appointment = data.appointment
        console.log(appointment);    
        getAppointments().then(({ appointments  }: Appointments[] | any) => setAppointments(appointments)      
        )  
     };
   
    return ( 
        <div>
            <h4>Appointments</h4>
            <table>           
                    <tr>
                        <td>
                            <h5>NEW</h5>
                        </td> 
                    </tr>                  
                           <tbody>
                    {appointments.filter(appointment => appointment.status === "new").map(appointment => (
                    <tr>
                        <td className="cell-one">
                           
                            {patients.filter(patient => patient.id === appointment.patientID).map(patient => (
                                <div> <span className="title">Patient</span > : <span>{patient.name}</span>
                                <div><img src={patient.photoURL} alt="patient" className="image"/> </div></div>
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
                                <span className="title">Actions</span> : <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                                <button onClick={() => confirmAppointment(appointment.id)} className="button">Confirm</button>
                            </div>
                           
                           
                        </td>
                        <td className="cells">
                        <span className="title">Doctor</span>: unassigned
                        </td>
                    </tr>
                    ))}
                     <tr>
                        <td>
                            <h5>CONFIRMED</h5>
                        </td> 
                    </tr>  
                    {appointments.filter(appointment => appointment.status === "confirmed").map(appointment => (
                    <tr key={appointment.id} >
                        <td className="cell-one">
                            {patients.filter(patient => patient.id === appointment.patientID).map(patient => (
                                <div> <span className="title">Patient</span > : <span>{patient.name}</span>
                                <div><img src={patient.photoURL} alt="patient" className="image"/> </div></div>
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
                                <span className="title">Actions</span> : <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                            </div>
                           
                        </td>
                        <td className="cells">
                            {doctors.filter(doctor => doctor.id === appointment.patientID).map(doctor => (
                                <div> <span className="title">Doctor</span > : <span>{doctor.name}</span>
                                <div><img src={doctor.photoURL} alt="patient" className="image"/> </div></div>
                            ))}
                        </td>
                    </tr>
                    ))}
                     <tr>
                        <td>
                            <h5>COMPLETED</h5>
                        </td> 
                    </tr>  
                     {appointments.filter(appointment => appointment.status === "completed").map(appointment => (
                    <tr className="overlay">
                        <td className="cell-one">
                            {patients.filter(patient => patient.id === appointment.patientID).map(patient => (
                                <div> <span className="title">Patient</span > : <span>{patient.name}</span>
                                <div><img src={patient.photoURL} alt="patient" className="image"/> </div></div>
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
                                <span className="title">Diagnosis</span> : <br/>
                                {appointment.statusReason}
                            </div>
                           
                        </td>
                        <td className="cells">
                            {doctors.filter(doctor => doctor.id === appointment.patientID).map(doctor => (
                                <div> <span className="title">Doctor</span > : <span>{doctor.name}</span>
                                <div><img src={doctor.photoURL} alt="patient" className="image"/> </div></div>
                            ))}
                        </td>
                    </tr>
                    ))}
                     <tr>
                        <td>
                            <h5>CANCELLED</h5>
                        </td> 
                    </tr>  
                     {appointments.filter(appointment => appointment.status === "cancelled").map(appointment => (
                        <tr className="overlay">
                        <td className="cell-one">
                            {patients.filter(patient => patient.id === appointment.patientID).map(patient => (
                                <div> <span className="title">Patient</span > : <span>{patient.name}</span>
                                <div><img src={patient.photoURL} alt="patient" className="image"/> </div></div>
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
                                <span className="title">Reason for Cancellation</span> : <br/>
                                {appointment.statusReason}
                            </div>                           
                        </td>
                        <td className="cells">
                            {doctors.filter(doctor => doctor.id === appointment.patientID).map(doctor => (
                                <div> <span className="title">Doctor</span > : <span>{doctor.name}</span>
                                <div><img src={doctor.photoURL} alt="patient" className="image"/> </div></div>
                            ))}
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>         
        </div>
     );
}
 
export default Appointments;