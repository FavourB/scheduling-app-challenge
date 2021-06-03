import { FunctionComponent, useEffect, useState } from 'react';
import { API_ROOT } from '../../constants';
import './Appointments.css';
import NewAppointments from './AppointmentRow';

export interface AppointmentsProps {
   
}
 
const Appointments: FunctionComponent<AppointmentsProps> = (props:AppointmentsProps) => {

    const [appointments, setAppointments] = useState<Appointments[]>([]);
    const [doctors, setDoctors] = useState<Doctors[]>([]);
    const [patients, setPatients] = useState<Patients[]>([]);
    const [error, setError] = useState("");

    const getAppointments = async () => {
        try {
            const res = await Promise.all([
                fetch(`${API_ROOT}/appointments`),
                fetch(`${API_ROOT}/doctors`),
                fetch(`${API_ROOT}/patients`)
            ]);
            const data = await Promise.all(res.map(r => r.json()))
            setAppointments(data[0].appointments);
            setDoctors(data[1].doctors);
            setPatients(data[2].patients)  
            
        } catch (error) {
           setError(error)
        }
    }
    useEffect(() => {
           getAppointments();  
    }, []);
    const cancelAppointment = async (id: string) =>{
        const newAppointments : Appointments[] | any = appointments.filter(a => a.id !== id)
        setAppointments(newAppointments)  
        await fetch(`${API_ROOT}/appointments/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({reason : "Decided I don't like hospitals"})
        });      
        getAppointments();
     };
     
    const confirmAppointment = async (id: string) =>{
        await fetch(`${API_ROOT}/appointments/${id}/confirm`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({doctorID: id})
        });
        getAppointments();
        if (id === "4"){
            const error = "There is no doctor available for this patient";
            alert(error)
        }
     };
 
    return ( 
        <div>
            <h4>Appointments</h4>
            {error && <div className="error">{error}</div>}
            <table>           
                <tbody>
                    <tr>
                        <td>
                            <h5>NEW</h5>
                        </td> 
                    </tr>                                            
                    {appointments.filter(appointment => appointment.status === "new").map((appointment) => (
                        <NewAppointments appointment ={appointment} patients ={patients} doctors={doctors} key={appointment.id}
                    cancelAppointment = {cancelAppointment} confirmAppointment={confirmAppointment} />
                    ))}
                     <tr>
                        <td>
                            <h5>CONFIRMED</h5>
                        </td> 
                    </tr>  
                    {appointments.filter(appointment => appointment.status === "confirmed").map(appointment => (
                        <NewAppointments appointment ={appointment} patients ={patients} doctors={doctors} key={appointment.id}
                    cancelAppointment = {cancelAppointment} confirmAppointment={confirmAppointment} />
                    ))}
                     <tr>
                        <td>
                            <h5>COMPLETED</h5>
                        </td> 
                    </tr>  
                     {appointments.filter(appointment => appointment.status === "completed").map(appointment => (
                        <NewAppointments appointment ={appointment} patients ={patients} doctors={doctors} key={appointment.id}
                    cancelAppointment = {cancelAppointment} confirmAppointment={confirmAppointment} />
                    ))}
                     <tr>
                        <td>
                            <h5>CANCELLED</h5>
                        </td> 
                    </tr>  
                     {appointments.filter(appointment => appointment.status === "cancelled").map(appointment => (
                        <NewAppointments appointment ={appointment} patients ={patients} doctors={doctors} key={appointment.id}
                        cancelAppointment = {cancelAppointment} confirmAppointment={confirmAppointment} />
                    ))}
                </tbody>
                {appointments === [] && <div>There are no available appointments.</div>}
                {doctors === [] && <div>There are no available doctors.</div>}
                {patients === [] && <div>There are no available patients.</div>}
            </table>         
        </div>
     );
} 
export default Appointments;