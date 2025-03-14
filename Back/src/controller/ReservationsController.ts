import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { ReservationsService } from "../Service/ReservationsService";
import { PageService } from "../Service/PageService";
import { DB } from "../app";
require('dotenv').config()

export class ReservationsController extends Controller {
    protected service: ReservationsService;

    constructor() {
        super();
        this.service = new ReservationsService();
    }

    public async test(Request: Request, Response: Response) {
        await DB.connection?.query("USE lab_b310;");
        const sql = `
        SELECT 
            r.reservation_id, 
            s.student_id, 
            s.student_name, 
            se.row_label, 
            se.seat_number, 
            t.start_time, 
            t.end_time, 
            r.create_time
        FROM Reservations r
        JOIN Students s ON r.student_id = s.student_id
        JOIN Seats se ON r.seat_id = se.seat_id
        JOIN Timeslots t ON r.timeslot_id = t.timeslot_id
        ORDER BY r.create_time;
    `;
        const resp = await DB.connection?.query(sql);
        Response.send(resp)
    }

    public async getStudentReservations(Request: Request, Response: Response) {
        try {
            const reservations = await this.service.getStudentReservations();
            Response.json({
                data: reservations
            });
        } catch (error) {
            logger.error(`Error fetching reservations: ${error}`);
            Response.status(500).json({
                message: "無法獲取預約紀錄"
            });
        }
    }
}