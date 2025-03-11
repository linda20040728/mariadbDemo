import { Service } from "../abstract/Service";
import { Seat } from "../interfaces/Seat"
import { Student } from "../interfaces/Student";
import { Timeslot } from "../interfaces/Timeslots";
import { DB } from "../app";

interface Reservations {
    reservation_id: number;
    student: Student;
    seat: Seat;
    timeslot: Timeslot;
    create_time: string;
}

export class ReservationsService extends Service{
    public async getStudentReservations(): Promise<Reservations[]> {
        await DB.connection?.query("USE lab_b310;");
        const query = `
            SELECT 
                reserve.reservation_id, 
                reserve.student_id,
                reserve.seat_id,
                reserve.timeslot_id,
                reserve.create_time,
                stu.student_name, 
                seats.row_label, 
                seats.seat_number, 
                time.start_time, 
                time.end_time
            FROM Reservations reserve
            JOIN Students stu ON reserve.student_id = stu.student_id
            JOIN Seats seats ON reserve.seat_id = seats.seat_id
            JOIN Timeslots time ON reserve.timeslot_id = time.timeslot_id
            ORDER BY reserve.reservation_id    
        `;
        
        const rows = await DB.connection?.query(query) || [];

        const reservations: Reservations[] = rows.map((row: any) => {
            return {
                reservation_id: row.reservation_id,
                student: {
                    student_id: row.student_id,
                    student_name: row.student_name
                },
                seat: {
                    seat_id: row.seat_id,
                    row_label: row.row_label,
                    seat_number: row.seat_number
                },
                timeslot: {
                    timeslot_id: row.timeslot_id,
                    start_time: row.start_time,
                    end_time: row.end_time
                },
                create_time: row.create_time
            };
        });
          
        return reservations;
    }
}